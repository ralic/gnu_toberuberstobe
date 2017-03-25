/*
 * Game world realm player object type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.objectTypes.player = {
	update: function(object, x, y) {
		if (object.experience >= 25000) {
			object.achievements.indyJones = null;
		}
		
		if (!object.isGod) {
			object.hunger -=
				this.indicatorsData.reduction.onStay.hunger;
			object.thirst -=
				this.indicatorsData.reduction.onStay.thirst;
			
			if (object.health < this.prototype.health) {
				object.health +=
					this.indicatorsData.healthRegeneration;
			}
			
			if (
				object.health <= 0 ||
				object.health >=
					this.indicatorsData.maxValues.health ||
				object.hunger <= 0 ||
				object.hunger >=
					this.indicatorsData.maxValues.hunger ||
				object.thirst <= 0 ||
				object.thirst >=
					this.indicatorsData.maxValues.thirst
			) {
				game.realms.gameWorld.fail(object, x, y);
			}
		} else {
			object.health =
				this.prototype.health;
			object.hunger =
				this.prototype.hunger;
			object.thirst =
				this.prototype.thirst;
		}
	},
	
	useItem: function(object, x, y) {
		if (!object.isGod) {
			object.hunger -=
				this.indicatorsData.reduction.onItemUsing.hunger;
			object.thirst -=
				this.indicatorsData.reduction.onItemUsing.thirst;
		}
		
		game.config.list.gameWorld.particles[x][y - 1] =
			new game.realms.gameWorld.particleTypes.attack.New();
		
		if (object.inventory[0]) {
			var usingMethod = game.realms.gameWorld.itemTypes[
				object.inventory[0].type
			].use;
			
			if (usingMethod) {
				usingMethod(object, 0, x, y);
				
				return;
			}
		}
		
		game.sounds.entities_player_attack.play();
		
		var 
			selectedPoint = this.selectedPointOf(object, x, y),
			selectedObject = game.config.list.gameWorld.objects[
				selectedPoint.x
			][
				selectedPoint.y
			];
		
		if (selectedObject) {
			selectedObject.health -= [
				object.attackDamage,
				Infinity
			][+object.isGod];
		}
	},
	catchItems: function(object, items) {
		game.sounds.entities_player_itemCatching.play();
		
		for (var i = 0; i < items.length; i++) {
			for (var j = 0; j < object.inventory.length; j++) {
				if (!object.inventory[j]) {
					object.inventory[j] = items[i];
					
					break;
				}
			}
		}
	},
	
	direct: function(object, direction) {
		game.sounds.entities_player_walking.play();
		
		if (!object.isGod) {
			object.hunger -=
				this.indicatorsData.reduction.onWalking.hunger;
			object.thirst -=
				this.indicatorsData.reduction.onWalking.hunger;
		}
		
		object.rotation = direction;
		object.step = [1, 0][object.step];
	},
	
	selectedPointOf: function(object, x, y) {
		return {
			x: [
				x,
				x - 1,
				x,
				x + 1
			][object.rotation],
			
			y: [
				y + 1,
				y,
				y - 1,
				y
			][object.rotation]
		};
	},
	
	textureOffset: {
		x: 0,
		y: -16
	},
	textureOf: function(object) {
		if (object.health > this.prototype.health / 2) {
			switch (object.step) {
				case 0:
					return [
						game.textures.entities_player_down,
						game.textures.entities_player_left,
						game.textures.entities_player_up,
						game.textures.entities_player_right
					][object.rotation];
				case 1:
					return [
						game.textures.entities_player_down_1,
						game.textures.entities_player_left_1,
						game.textures.entities_player_up_1,
						game.textures.entities_player_right_1
					][object.rotation];
			}
		} else {
			switch (object.step) {
				case 0:
					return [
						game.textures.entities_damagedPlayer_down,
						game.textures.entities_damagedPlayer_left,
						game.textures.entities_damagedPlayer_up,
						game.textures.entities_damagedPlayer_right
					][object.rotation];
				case 1:
					return [
						game.textures.entities_damagedPlayer_down_1,
						game.textures.entities_damagedPlayer_left_1,
						game.textures.entities_damagedPlayer_up_1,
						game.textures.entities_damagedPlayer_right_1
					][object.rotation];
			}
		}
	},
	
	gui:
		game.realms.gameWorld.guiTypes.inventory,
	
	New: function GameWorldObject(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.objectTypes.player.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "player",
		
		
		inventory: new Array(46).concat([
			new game.realms.gameWorld.itemTypes.waterBottle.New({
				fullness: 0
			}),
			
			new game.realms.gameWorld.itemTypes.dairy.New()
		]),
		
		isGod: false,
		
		attackDamage: 1,
		health: 100,
		hunger: 100,
		thirst: 100,
		experience: 0,
		
		rotation: 0,
		step: 0,
		
		achievements: {}
	},
	indicatorsData: {
		healthRegeneration: 0.01,
		
		reduction: {
			onStay: {
				hunger: 0.00833,
				thirst: 0.01666
			},
			onItemUsing: {
				hunger: 0.03332,
				thirst: 0.06664
			},
			onWalking: {
				hunger: 0.01666,
				thirst: 0.03332
			}
		},
		
		maxValues: {
			health: NaN,
			hunger: 200,
			thirst: 200
		}
	}
};

Object.defineProperty(
	game.realms.gameWorld.objectTypes, "player",
	
	{
		enumerable: false
	}
);
