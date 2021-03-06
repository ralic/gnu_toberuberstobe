/*
 * Game world realm oven item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.oven = {
	use: function(object, slot, x, y) {
		var 
			selectedPoint = game.realms.gameWorld.objectTypes[
				object.type
			].selectedPointOf(object, x, y),
			
			selectedObject = game.config.list.gameWorld.objects[
				selectedPoint.x
			][
				selectedPoint.y
			];
		
		if (!selectedObject) {
			game.sounds.items_blockPlacing.play();
			
			object.inventory[slot] = null;
			
			game.config.list.gameWorld.objects[
				selectedPoint.x
			][
				selectedPoint.y
			] = new game.realms.gameWorld.objectTypes.oven.New();
		}
	},
	
	textureOf: function() {
		return game.textures.items_oven;
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.oven.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "oven"
	}
};

game.realms.gameWorld.craftingRecipes.oven = {
	in: [
		"brick",
		"brick",
		"brick"
	],
	
	out: game.realms.gameWorld.itemTypes.oven.New
};
