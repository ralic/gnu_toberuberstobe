/*
 * Realms textures loading module
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

Object.assign(game.textures, {
	//Common
		gui_button:
			game.loadTexture("textures/gui/button.png"),
		gui_button_selected:
			game.loadTexture("textures/gui/button_selected.png"),
		
		gui_squareButton:
			game.loadTexture("textures/gui/squareButton.png"),
		gui_squareButton_selected:
			game.loadTexture("textures/gui/squareButton_selected.png"),
		
		gui_textField:
			game.loadTexture("textures/gui/textField.png"),
		gui_textField_selected:
			game.loadTexture("textures/gui/textField_selected.png"),
		
		gui_itemSelector:
			game.loadTexture("textures/gui/itemSelector.png"),
		gui_itemSelector_1:
			game.loadTexture("textures/gui/itemSelector_1.png"),
	
	//Menu
		gui_menu:
			game.loadTexture("textures/gui/menu.png"),
		gui_menu_animatedShit:
			game.loadTexture("textures/gui/menu_animatedShit.png"),
		gui_menu_background:
			game.loadTexture("textures/gui/menu_background.png"),
	
	//Multiplayer gate
		gui_multiplayerGate:
			game.loadTexture("textures/gui/multiplayerGate.png"),
	
	//Authors
		gui_authors:
			game.loadTexture("textures/gui/authors.png"),
	
	//Settings
		gui_settings:
			game.loadTexture("textures/gui/settings.png"),
	
	//Game over
		gui_gameOver:
			game.loadTexture("textures/gui/gameOver.png")
});
