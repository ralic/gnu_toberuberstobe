/*
 * Game world realm stoneland biome type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.biomeTypes.stoneland = {
	backgroundTextures: [
		"stone",
		"stone_1",
		"stone_2",
		"stone_3"
	],
	objectTypes: {
		stone: {
			constructor:
				game.realms.gameWorld.objectTypes.stone.New,
			
			chance: 0.25
		},
		
		rock: {
			constructor:
				game.realms.gameWorld.objectTypes.rock.New,
			
			chance: 0.125
		},
		
		ironOre: {
			constructor:
				game.realms.gameWorld.objectTypes.ironOre.New,
			
			chance: 0.005
		},
		coal: {
			constructor:
				game.realms.gameWorld.objectTypes.coal.New,
			
			chance: 0.01
		}
	},
	
	spawningMobs: {
		fox: {
			constructor:
				game.realms.gameWorld.objectTypes.fox.New,
			
			chance: 0.0625
		}
	},
	
	chance: 0.025
};
