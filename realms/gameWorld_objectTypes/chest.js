/*
 * Game world realm chest object type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.objectTypes.chest = {
	update: function(object, x, y) {
		if (object.health <= 0) {
			game.config.list.gameWorld.objects[x][y] = null;
			
			game.realms.gameWorld.objectTypes[
				game.realms.gameWorld.playerObject.type
			].catchItems(
				game.realms.gameWorld.playerObject,
				
				[new game.realms.gameWorld.itemTypes.chest.New()].concat(
					object.inventory
				)
			);
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
	
	textureOffset: {
		x: 0,
		y: 0
	},
	textureOf: function(object) {
		if (object.health > this.prototype.health / 2) {
			return game.textures.blocks_chest;
		} else {
			return game.textures.blocks_damagedChest;
		}
	},
	
	gui:
		game.realms.gameWorld.guiTypes.chest,
	
	New: function GameWorldObject(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.objectTypes.chest.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "chest",
		
		inventory: new Array(48),
		
		health: 50
	}
};
