/*
 * Game world realm cooked gazelle meat item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.cookedGazelleMeat = {
	use: function(object, slot) {
		game.sounds.items_foodEating.play();
		
		object.inventory[slot] = null;
		
		object.hunger += 70;
		object.thirst += 20;
	},
	
	textureOf: function() {
		return game.textures.items_cookedGazelleMeat;
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.cookedGazelleMeat.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "cookedGazelleMeat"
	}
};

game.realms.gameWorld.cookingRecipes.cookedGazelleMeat = {
	in: "gazelleMeat",
	
	out: game.realms.gameWorld.itemTypes.cookedGazelleMeat.New
};
