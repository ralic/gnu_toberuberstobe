/*
 * Game world realm oasis biome type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.biomeTypes.oasis = {
	backgroundTextures: [
		"dirt",
		"dirt_1",
		"dirt_2",
		"dirt_3"
	],
	objectTypes: {
		acacia: {
			constructor:
				game.realms.gameWorld.objectTypes.acacia.New,
			
			chance: 0.0075
		},
		
		grass: {
			constructor:
				game.realms.gameWorld.objectTypes.grass.New,
			
			chance: 0.25
		},
		
		rock: {
			constructor:
				game.realms.gameWorld.objectTypes.rock.New,
			
			chance: 0.001
		}
	},
	
	spawningMobs: {
		gazelle: {
			constructor:
				game.realms.gameWorld.objectTypes.gazelle.New,
			
			chance: 0.03125
		}
	},
	
	chance: 0.05
};
