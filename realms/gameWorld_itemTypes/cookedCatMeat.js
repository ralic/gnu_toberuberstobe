/*
 * Game world realm cooked cat meat item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.cookedCatMeat = {
	use: function(object, slot) {
		game.sounds.items_foodEating.play();
		
		object.inventory[slot] = null;
		
		object.hunger += 50;
		object.thirst += 10;
	},
	
	textureOf: function() {
		return game.textures.items_cookedCatMeat;
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.cookedCatMeat.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "cookedCatMeat"
	}
};

game.realms.gameWorld.cookingRecipes.cookedCatMeat = {
	in: "catMeat",
	
	out: game.realms.gameWorld.itemTypes.cookedCatMeat.New
};
