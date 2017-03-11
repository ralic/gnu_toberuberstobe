/*
 * Menu realm
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.menu = {
	//Secondary variables
		buttons: [
			{
				get caption() {
					return game.curLocale.gui_menu_play;
				},
				
				x: 100,
				y: 80,
				
				event: function() {
					if (game.config.list.gameWorld.objects.length != 0) {
						game.realms.gameWorld.curGuiType =
							game.realms.gameWorld.guiTypes.default;
						
						game.curRealm =
							game.realms.gameWorld;
						
						game.realms.gameWorld.chunkUpdater = window.setInterval(
							game.realms.gameWorld.updateChunk,
						25);
					} else {
						game.realms.gameWorld.generator.run(
							game.config.list.gameWorld
						);
						
						game.config.write("gameWorld");
						
						this.event();
					}
				}
			},
			
			{
				get caption() {
					return game.curLocale.gui_menu_multiplayer;
				},
				
				x: 100,
				y: 110,
				
				event: function() {
					game.curRealm =
						game.realms.multiplayerGate;
				}
			},
			
			{
				get caption() {
					return game.curLocale.gui_menu_exit;
				},
				
				x: 100,
				y: 140,
				
				event: function() {
					win.close();
				}
			},
			
			{
				get caption() {
					return game.curLocale.gui_menu_authors;
				},
				
				x: 8,
				y: 212,
				
				event: function() {
					game.curRealm =
						game.realms.authors;
				}
			},
			
			{
				get caption() {
					return game.curLocale.gui_menu_settings;
				},
				
				x: 192,
				y: 212,
				
				event: function() {
					game.curRealm =
						game.realms.settings;
				}
			}
		],
		selectedButton: 0,
		
		animatedShitScroll: 0,
		
	//Methods
		update: function() {
			this.handleHotkeys();
			
			return [
				this.renderBase(),
				this.renderButtons()
			];
		},
		
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				switch (game.hotkeys.pressed[i]) {
					case game.config.list.main.hotkeys.use:
						game.sounds.gui_click.play();
						
						this.buttons[this.selectedButton].event();
						
						break;
					case game.config.list.main.hotkeys.down:
						game.sounds.gui_scroll.play();
						
						if (this.selectedButton < this.buttons.length - 1) {
							this.selectedButton++;
						} else {
							this.selectedButton = 0;
						}
						
						break;
					case game.config.list.main.hotkeys.up:
						game.sounds.gui_scroll.play();
						
						if (this.selectedButton > 0) {
							this.selectedButton--;
						} else {
							this.selectedButton = this.buttons.length - 1;
						}
						
						break;
				}
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		renderBase: function() {
			if (
				this.animatedShitScroll <
					-(game.textures.gui_menu_animatedShit.width - game.screen.width)
			) {
				this.animatedShitScroll = 0;
			} else {
				this.animatedShitScroll--;
			}
			
			return [
				{
					type: "sprite",
					
					texture:
						game.textures.gui_menu_background,
					
					x: 0,
					y: 0
				},
				
				{
					type: "sprite",
					
					texture:
						game.textures.gui_menu_animatedShit,
					
					x: this.animatedShitScroll,
					y: 0
				},
				
				{
					type: "sprite",
					
					texture:
						game.textures.gui_menu,
					
					x: 0,
					y: 0
				}
			];
		},
		renderButtons: function() {
			var layer = [];
			
			for (var i = 0; i < this.buttons.length; i++) {
				layer.push(
					{
						type: "sprite",
						
						texture: [
							game.textures.gui_button,
							game.textures.gui_button_selected
						][+(i == this.selectedButton)],
						
						x: this.buttons[i].x,
						y: this.buttons[i].y
					},
					
					{
						type: "text",
						
						fontSize: 12,
						fontColor:
							game.colorScheme.text_dark,
						textAlign: "center",
						
						string:
							this.buttons[i].caption,
						
						x: this.buttons[i].x + 60,
						y: this.buttons[i].y + 15
					}
				);
			}
			
			return layer;
		}
};
