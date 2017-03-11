/*
 * Game world realm cat object type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.objectTypes.cat = {
	update: function(object, x, y) {
		if (object.health <= 0) {
			game.config.list.gameWorld.spawnedMobsCount--;
			
			game.realms.gameWorld.playerObject.experience +=
				this.prototype.health;
			
			game.config.list.gameWorld.objects[x][y] = null;
			
			game.realms.gameWorld.objectTypes[
				game.realms.gameWorld.playerObject.type
			].catchItems(
				game.realms.gameWorld.playerObject,
				
				[new game.realms.gameWorld.itemTypes.catMeat.New()]
			);
		} else {
			game.realms.gameWorld.useAiOn(object, x, y);
		}
	},
	
	attack: function(object, x, y) {
		game.config.list.gameWorld.particles[x][y] =
			new game.realms.gameWorld.particleTypes.attack.New();
		
		game.sounds.entities_cat_attack.play();
		
		var 
			selectedPoint = this.selectedPointOf(object, x, y),
			selectedObject = game.config.list.gameWorld.objects[
				selectedPoint.x
			][
				selectedPoint.y
			];
		
		if (selectedObject) {
			selectedObject.health -= object.attackDamage;
		}
	},
	
	direct: function(object, direction) {
		game.sounds.entities_cat_walking.play();
		
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
		y: 0
	},
	textureOf: function(object) {
		if (object.health > this.prototype.health / 2) {
			switch (object.step) {
				case 0:
					return [
						game.textures.entities_cat_down,
						game.textures.entities_cat_left,
						game.textures.entities_cat_up,
						game.textures.entities_cat_right
					][object.rotation];
				case 1:
					return [
						game.textures.entities_cat_down_1,
						game.textures.entities_cat_left_1,
						game.textures.entities_cat_up_1,
						game.textures.entities_cat_right_1
					][object.rotation];
			}
		} else {
			switch (object.step) {
				case 0:
					return [
						game.textures.entities_damagedCat_down,
						game.textures.entities_damagedCat_left,
						game.textures.entities_damagedCat_up,
						game.textures.entities_damagedCat_right
					][object.rotation];
				case 1:
					return [
						game.textures.entities_damagedCat_down_1,
						game.textures.entities_damagedCat_left_1,
						game.textures.entities_damagedCat_up_1,
						game.textures.entities_damagedCat_right_1
					][object.rotation];
			}
		}
	},
	
	New: function GameWorldObject(additions) {
		game.config.list.gameWorld.spawnedMobsCount++;
		
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.objectTypes.cat.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "cat",
		
		canWalk: true,
		canAttack: true,
		
		attackDamage: 0.4,
		health: 80,
		
		rotation: 0,
		step: 0
	}
};
