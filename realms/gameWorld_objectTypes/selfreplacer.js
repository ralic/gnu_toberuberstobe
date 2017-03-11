/*
 * Game world realm selfreplacer object type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.objectTypes.selfreplacer = {
	update: function(object, x, y) {
		if (!isFinite(object.health)) {
			game.config.list.gameWorld.objects[x][y] = null;
		}
	},
	
	textureOffset: {
		x: 0,
		y: 0
	},
	textureOf: function(object) {
		return game.textures.blocks_selfreplacer;
	},
	
	gui:
		game.realms.gameWorld.guiTypes.selfreplacer,
	
	New: function GameWorldObject(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.objectTypes.selfreplacer.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "selfreplacer",
		
		health: 0
	}
};
