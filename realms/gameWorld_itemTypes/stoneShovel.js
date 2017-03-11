/*
 * Game world realm stone shovel item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.stoneShovel = {
	use: function(object, slot, x, y) {
		game.sounds.entities_player_attack.play();
		
		if (object.inventory[slot].durability <= 0) {
			object.inventory[slot] = null;
		} else {
			var 
				selectedPoint = game.realms.gameWorld.objectTypes[
					object.type
				].selectedPointOf(object, x, y),
				selectedObject = game.config.list.gameWorld.objects[
					selectedPoint.x
				][
					selectedPoint.y
				];
			
			if (selectedObject) {
				selectedObject.health -=
					object.attackDamage +
					object.inventory[slot].attackDamage;
				
				object.inventory[slot].durability--;
			}
		}
	},
	
	textureOf: function(item) {
		if (item.durability > this.prototype.durability / 2) {
			return game.textures.items_stoneShovel;
		} else {
			return game.textures.items_damagedStoneShovel;
		}
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.stoneShovel.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "stoneShovel",
		
		attackDamage: 5,
		
		durability: 50
	}
};
