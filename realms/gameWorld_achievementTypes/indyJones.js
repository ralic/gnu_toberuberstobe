/*
 * Game world realm Indy Jones achievement
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.achievementTypes.indyJones = {
	get icon() {
		return game.textures.items_ironOre;
	},
	
	get title() {
		return game.currentLocale.gui_gameWorld_achievements_indyJones_title;
	},
	get whatToDo() {
		return game.currentLocale.gui_gameWorld_achievements_indyJones_whatToDo;
	}
};
