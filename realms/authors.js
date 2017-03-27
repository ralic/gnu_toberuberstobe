/*
 * Authors realm
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.authors = {
	//Secondary variables
		
	
	//Methods
		update: function() {
			this.handleHotkeys();
			
			var layers = [[
				{
					type: "sprite",
					
					texture:
						game.textures.gui_authors,
					
					x: 0,
					y: 0
				},
				
				{
					type: "text",
					
					fontSize: 16,
					fontColor:
						game.colorScheme.text_light,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_authors_title,
					
					x: 160,
					y: 22
				},
				
				{
					type: "text",
					
					fontSize: 8,
					fontColor:
						game.colorScheme.text_light,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_authors_of +
						nw.App.manifest.name + " " +
						nw.App.manifest.version,
					
					x: 160,
					y: 34
				}
			]];
			
			for (
				var i = 0;
				i < game.currentLocale.gui_authors_text.length;
				i++
			) {
				layers[0].push({
					type: "text",
					
					fontSize: 8,
					fontColor:
						game.colorScheme.text_light,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_authors_text[i],
					
					x: 160,
					y: 48 + i * 10
				});
			}
			
			return layers;
		},
		
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				if (game.hotkeys.pressed[i] ==
					game.config.list.main.hotkeys.menu
				) {
					game.sounds.gui_click.play();
					
					game.currentRealm =
						game.realms.menu;
				}
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		}
};
