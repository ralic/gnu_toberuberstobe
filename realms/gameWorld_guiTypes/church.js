/*
 * Game world realm church GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.church = {
	//Secondary variables
		objects: [
			{
				get texture() {
					return game.textures.gui_gameWorld_church_selectedCactus;
				},
				
				description: {
					get text() {
						return game.currentLocale.gui_gameWorld_church_thirst;
					},
					
					x: 34,
					y: 182,
				},
				
				x: 20,
				y: 142,
				
				event: function() {
					game.realms.gameWorld.playerObject.thirst += 0.5;
				}
			},
			
			{
				get texture() {
					return game.textures.gui_gameWorld_church_selectedBook;
				},
				
				description: {
					get text() {
						return game.currentLocale.gui_gameWorld_church_health;
					},
					
					x: 161,
					y: 187,
				},
				
				x: 139,
				y: 166,
				
				event: function() {
					game.realms.gameWorld.playerObject.health += 0.5;
				}
			},
			
			{
				get texture() {
					return game.textures.gui_gameWorld_church_selectedPope;
				},
				
				description: {
					get text() {
						return game.currentLocale.gui_gameWorld_church_hunger;
					},
					
					x: 273,
					y: 220,
				},
				
				x: 231,
				y: 84,
				
				event: function() {
					game.realms.gameWorld.playerObject.hunger += 0.5;
				}
			}
		],
		data: {
			selectedObject: 1
		},
		defaultData: {
			selectedObject: 1
		},
	
	//Methods
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				switch (game.hotkeys.pressed[i]) {
					case game.config.list.main.hotkeys.menu:
						game.sounds.gui_click.play();
						
						game.realms.gameWorld.currentGuiType =
							game.realms.gameWorld.guiTypes.default;
						
						break;
					case game.config.list.main.hotkeys.left:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedObject > 0) {
							this.data.selectedObject--;
						} else {
							this.data.selectedObject = this.objects.length - 1;
						}
						
						break;
					case game.config.list.main.hotkeys.right:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedObject < this.objects.length - 1) {
							this.data.selectedObject++;
						} else {
							this.data.selectedObject = 0;
						}
						
						break;
					case game.config.list.main.hotkeys.use:
						game.sounds.gui_click.play();
						
						this.objects[this.data.selectedObject].event();
						
						game.sounds.gui_gameWorld_church_praying.play();
						
						break;
				}
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		render: function() {
			var 
				playerSelectedPoint = game.realms.gameWorld.objectTypes[
					game.realms.gameWorld.playerObject.type
				].selectedPointOf(
					game.realms.gameWorld.playerObject,
					
					game.config.list.gameWorld.playerPosition.x,
					game.config.list.gameWorld.playerPosition.y
				),
				playerSelectedObject = game.config.list.gameWorld.objects[
					playerSelectedPoint.x
				][
					playerSelectedPoint.y
				];
			
			if ((
				playerSelectedObject ||
				{}
			).type != "church") {
				game.realms.gameWorld.currentGuiType =
					game.realms.gameWorld.guiTypes.default;
				
				return [];
			}
			
			return [
				{
					type: "sprite",
					
					texture:
						game.textures.gui_gameWorld_church,
					
					x: 0,
					y: 0
				},
				
				{
					type: "sprite",
					
					texture:
						this.objects[this.data.selectedObject].texture,
					
					x: this.objects[this.data.selectedObject].x,
					y: this.objects[this.data.selectedObject].y
				},
				{
					type: "text",
					
					fontSize: 5,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "center",
					
					string:
						this.objects[this.data.selectedObject].description.text,
					
					x: this.objects[this.data.selectedObject].description.x,
					y: this.objects[this.data.selectedObject].description.y
				}
			];
		}
};
