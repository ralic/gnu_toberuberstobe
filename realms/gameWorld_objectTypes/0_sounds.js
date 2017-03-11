/*
 * Game world realm object sounds
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

Object.assign(game.sounds, {
	//Entities
		entities_player_attack:
			game.loadSound("sounds/entities/player_attack.wav"),
		entities_player_itemCatching:
			game.loadSound("sounds/entities/player_itemCatching.wav"),
		entities_player_walking:
			game.loadSound("sounds/entities/player_walking.wav"),
		
		entities_cat_attack:
			game.loadSound("sounds/entities/cat_attack.wav"),
		entities_cat_walking:
			game.loadSound("sounds/entities/cat_walking.wav"),
		
		entities_fox_attack:
			game.loadSound("sounds/entities/fox_attack.wav"),
		entities_fox_walking:
			game.loadSound("sounds/entities/fox_walking.wav"),
		
		entities_gazelle_attack:
			game.loadSound("sounds/entities/gazelle_attack.wav"),
		entities_gazelle_walking:
			game.loadSound("sounds/entities/gazelle_walking.wav")
});
