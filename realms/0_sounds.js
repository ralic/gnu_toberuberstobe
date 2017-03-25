/*
 * Realms sounds loading module
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
	//GUI
		gui_click:
			game.loadSound("sounds/gui/click.ogg"),
		gui_scroll:
			game.loadSound("sounds/gui/scroll.ogg"),
		
		gui_background:
			game.loadSound("sounds/gui/background.ogg"),
		
		gui_gameOver:
			game.loadSound("sounds/gui/gameOver.ogg")
});

game.sounds.gui_background.loop = true;
