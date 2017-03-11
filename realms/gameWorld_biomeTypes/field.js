/*
 * Game world realm field biome type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.biomeTypes.field = {
	backgroundTextures: [
		"dirt",
		"dirt_1",
		"dirt_2",
		"dirt_3"
	],
	objectTypes: {
		grass: {
			constructor:
				game.realms.gameWorld.objectTypes.grass.New,
			
			chance: 0.5
		},
		
		rock: {
			constructor:
				game.realms.gameWorld.objectTypes.rock.New,
			
			chance: 0.001
		},
		
		tomato: {
			constructor:
				game.realms.gameWorld.objectTypes.tomato.New,
			
			chance: 0.04
		},
		carrot: {
			constructor:
				game.realms.gameWorld.objectTypes.carrot.New,
			
			chance: 0.02
		},
		eggplant: {
			constructor:
				game.realms.gameWorld.objectTypes.eggplant.New,
			
			chance: 0.01
		}
	},
	
	spawningMobs: {
		cat: {
			constructor:
				game.realms.gameWorld.objectTypes.cat.New,
			
			chance: 0.125
		}
	},
	
	chance: 0.0375
};
