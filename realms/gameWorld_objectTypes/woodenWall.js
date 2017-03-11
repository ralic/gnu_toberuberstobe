/*
 * Game world realm wooden wall object type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.objectTypes.woodenWall = {
	update: function(object, x, y) {
		if (object.health <= 0) {
			game.config.list.gameWorld.objects[x][y] = null;
			
			game.realms.gameWorld.objectTypes[
				game.realms.gameWorld.playerObject.type
			].catchItems(
				game.realms.gameWorld.playerObject,
				
				[
					new game.realms.gameWorld.itemTypes.log.New(),
					new game.realms.gameWorld.itemTypes.log.New(),
					new game.realms.gameWorld.itemTypes.log.New(),
					new game.realms.gameWorld.itemTypes.log.New()
				]
			);
		}
	},
	
	textureOffset: {
		x: 0,
		y: -16
	},
	textureOf: function(object) {
		if (object.health > this.prototype.health / 2) {
			return game.textures.blocks_woodenWall;
		} else {
			return game.textures.blocks_damagedWoodenWall;
		}
	},
	
	New: function GameWorldObject(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.objectTypes.woodenWall.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "woodenWall",
		
		health: 80
	}
};
