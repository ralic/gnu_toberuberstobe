/*
 * Game world realm gazelle object type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.objectTypes.gazelle = {
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
				
				[new game.realms.gameWorld.itemTypes.gazelleMeat.New()]
			);
			
			game.realms.gameWorld.playerObject.achievements.hunter = null;
		} else {
			game.realms.gameWorld.useAiOn(object, x, y);
		}
	},
	
	attack: function(object, x, y) {
		game.config.list.gameWorld.particles[x][y] =
			new game.realms.gameWorld.particleTypes.attack.New();
		
		game.sounds.entities_gazelle_attack.play();
		
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
		game.sounds.entities_gazelle_walking.play();
		
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
		x: -8,
		y: -16
	},
	textureOf: function(object) {
		if (object.health > this.prototype.health / 2) {
			switch (object.step) {
				case 0:
					return [
						game.textures.entities_gazelle_down,
						game.textures.entities_gazelle_left,
						game.textures.entities_gazelle_up,
						game.textures.entities_gazelle_right
					][object.rotation];
				case 1:
					return [
						game.textures.entities_gazelle_down_1,
						game.textures.entities_gazelle_left_1,
						game.textures.entities_gazelle_up_1,
						game.textures.entities_gazelle_right_1
					][object.rotation];
			}
		} else {
			switch (object.step) {
				case 0:
					return [
						game.textures.entities_damagedGazelle_down,
						game.textures.entities_damagedGazelle_left,
						game.textures.entities_damagedGazelle_up,
						game.textures.entities_damagedGazelle_right
					][object.rotation];
				case 1:
					return [
						game.textures.entities_damagedGazelle_down_1,
						game.textures.entities_damagedGazelle_left_1,
						game.textures.entities_damagedGazelle_up_1,
						game.textures.entities_damagedGazelle_right_1
					][object.rotation];
			}
		}
	},
	
	New: function GameWorldObject(additions) {
		game.config.list.gameWorld.spawnedMobsCount++;
		
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.objectTypes.gazelle.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "gazelle",
		
		canWalk: true,
		canAttack: true,
		
		attackDamage: 0.6,
		health: 120,
		
		rotation: 0,
		step: 0
	}
};
