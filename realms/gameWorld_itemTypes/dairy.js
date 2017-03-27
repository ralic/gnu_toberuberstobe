/*
 * Game world realm dairy item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.dairy = {
	use: function() {
		game.sounds.gui_click.play();
		
		game.realms.gameWorld.currentGuiType =
			game.realms.gameWorld.guiTypes.dairy;
	},
	
	textureOf: function() {
		return game.textures.items_dairy;
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.dairy.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "dairy"
	}
};
