/*
 * Game world realm raw stone knife item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.rawStoneKnife = {
	use: function(object, slot) {
		game.sounds.gui_click.play();
		
		if (Math.random() < 0.75) {
			object.inventory[slot] =
				new game.realms.gameWorld.itemTypes.stoneKnife.New();
		} else {
			object.inventory[slot] = null;
		}
	},
	
	textureOf: function() {
		return game.textures.items_rawStoneKnife;
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.rawStoneKnife.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "rawStoneKnife"
	}
};

game.realms.gameWorld.craftingRecipes.rawStoneKnife = {
	in: [
		"rock",
		"rock"
	],
	
	out: game.realms.gameWorld.itemTypes.rawStoneKnife.New
};
