/*
 * Game world realm dry grass item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.dryGrass = {
	textureOf: function() {
		return game.textures.items_dryGrass;
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.dryGrass.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "dryGrass"
	}
};

game.realms.gameWorld.cookingRecipes.dryGrass = {
	in: "grass",
	
	out: game.realms.gameWorld.itemTypes.dryGrass.New
};

game.realms.gameWorld.cookingRecipes._fuelTypes.dryGrass = null;
