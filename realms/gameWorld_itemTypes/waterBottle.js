/*
 * Game world realm water bottle item type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.itemTypes.waterBottle = {
	use: function(object, slot) {
		game.sounds.items_drinksDrinking.play();
		
		object.inventory[slot].fullness--;
		if (object.inventory[slot].fullness < 0) {
			object.inventory[slot] =
				new game.realms.gameWorld.itemTypes.bottle.New();
		}
		
		object.thirst += 20;
	},
	
	textureOf: function(item) {
		return [
			game.textures.items_waterBottle,
			game.textures.items_waterBottle_1,
			game.textures.items_waterBottle_2
		][item.fullness];
	},
	
	New: function GameWorldItem(additions) {
		Object.assign(this,
			JSON.parse(JSON.stringify(
				game.realms.gameWorld.itemTypes.waterBottle.prototype
			)),
			
			JSON.parse(JSON.stringify(
				additions || {}
			))
		);
	},
	prototype: {
		type: "waterBottle",
		
		fullness: 2
	}
};

game.realms.gameWorld.craftingRecipes.waterBottle = {
	in: [
		"bottle",
		"cactusPulp",
		"cactusPulp",
		"cactusPulp"
	],
	
	out: game.realms.gameWorld.itemTypes.waterBottle.New
};
game.realms.gameWorld.craftingRecipes.waterBottle_1 = {
	in: [
		"bottle",
		"tomato",
		"tomato",
		"tomato"
	],
	
	out: game.realms.gameWorld.itemTypes.waterBottle.New
};
game.realms.gameWorld.craftingRecipes.waterBottle_2 = {
	in: [
		"bottle",
		"eggplant",
		"eggplant"
	],
	
	out: game.realms.gameWorld.itemTypes.waterBottle.New
};
