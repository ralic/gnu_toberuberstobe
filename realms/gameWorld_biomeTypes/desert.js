/*
 * Game world realm desert biome type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.biomeTypes.desert = {
	backgroundTextures: [
		"sand",
		"sand_1",
		"sand_2",
		"sand_3",
		"sand_4",
		"sand_5",
		"sand_6",
		"sand_7"
	],
	objectTypes: {
		smallCactus: {
			constructor:
				game.realms.gameWorld.objectTypes.smallCactus.New,
			
			chance: 0.004
		},
		bigCactus: {
			constructor:
				game.realms.gameWorld.objectTypes.bigCactus.New,
			
			chance: 0.002
		},
		
		dryGrass: {
			constructor:
				game.realms.gameWorld.objectTypes.dryGrass.New,
			
			chance: 0.001
		},
		
		rock: {
			constructor:
				game.realms.gameWorld.objectTypes.rock.New,
			
			chance: 0.001
		},
		
		haloxylon: {
			constructor:
				game.realms.gameWorld.objectTypes.haloxylon.New,
			
			chance: 0.00025
		},
	},
	
	spawningMobs: {
		cat: {
			constructor:
				game.realms.gameWorld.objectTypes.cat.New,
			
			chance: 0.125
		},
		
		fox: {
			constructor:
				game.realms.gameWorld.objectTypes.fox.New,
			
			chance: 0.0625
		},
		
		gazelle: {
			constructor:
				game.realms.gameWorld.objectTypes.gazelle.New,
			
			chance: 0.03125
		}
	},
	
	chance: 0
};
