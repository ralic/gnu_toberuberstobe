/*
 * Game world realm selfreplacer GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.selfreplacer = {
	//Secondary variables
		data: {
			selectedPage: 0,
			selectedObject: {
				x: 0,
				y: 0
			}
		},
		defaultData: {
			selectedPage: 0,
			selectedObject: {
				x: 0,
				y: 0
			}
		},
		
		get allObjectTypes() {
			return [null].concat(
				Object.keys(
					game.realms.gameWorld.objectTypes
				).map(function(currentValue) {
					return new game.realms.gameWorld.objectTypes[currentValue].New();
				})
			);
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
					case game.config.list.main.hotkeys.use:
						game.sounds.gui_click.play();
						
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
						).type != "selfreplacer") {
							game.realms.gameWorld.currentGuiType =
								game.realms.gameWorld.guiTypes.default;
							
							break;
						}
						
						if (this.allObjectTypes[
							this.data.selectedPage * 48 +
							this.data.selectedObject.y * 8 +
							this.data.selectedObject.x
						]) {
							game.config.list.gameWorld.objects[
								playerSelectedPoint.x
							][
								playerSelectedPoint.y
							] = new
								game.realms.gameWorld.objectTypes[
									this.allObjectTypes[
										this.data.selectedPage * 48 +
										this.data.selectedObject.y * 8 +
										this.data.selectedObject.x
									].type
								].New();
						} else {
							game.config.list.gameWorld.objects[
								playerSelectedPoint.x
							][
								playerSelectedPoint.y
							] = null;
						}
						
						game.realms.gameWorld.currentGuiType =
							game.realms.gameWorld.guiTypes.default;
						
						break;
					case game.config.list.main.hotkeys.down:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedObject.y < 5) {
							this.data.selectedObject.y++;
						} else if (
							(this.data.selectedPage + 1) < Math.ceil(
								this.allObjectTypes.length / 48
							)
						) {
							this.data.selectedPage++;
							
							this.data.selectedObject.y = 0;
						}
						
						break;
					case game.config.list.main.hotkeys.left:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedObject.x > 0) {
							this.data.selectedObject.x--;
						}
						
						break;
					case game.config.list.main.hotkeys.up:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedObject.y > 0) {
							this.data.selectedObject.y--;
						} else if (this.data.selectedPage > 0) {
							this.data.selectedPage--;
							
							this.data.selectedObject.y = 5;
						}
						
						break;
					case game.config.list.main.hotkeys.right:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedObject.x < 7) {
							this.data.selectedObject.x++;
						}
						
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
			).type != "selfreplacer") {
				game.realms.gameWorld.currentGuiType =
					game.realms.gameWorld.guiTypes.default;
				
				return [];
			}
			
			var layer = [
				{
					type: "sprite",
					
					texture:
						game.textures.gui_gameWorld_selfreplacer,
					
					x: 0,
					y: 0
				},
				
				{
					type: "text",
					
					fontSize: 6,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_gameWorld_selfreplacer_title,
					
					x: 160,
					y: 68
				},
				
				{
					type: "text",
					
					fontSize: 6,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "right",
					
					string:
						game.currentLocale.gui_settings_page +
						(this.data.selectedPage + 1) + "/" +
						Math.ceil(this.allObjectTypes.length / 48),
					
					x: 237,
					y: 68
				}
			];
			
			//Render all object types
				for (var y = 0; y < 6; y++) {
					for (var x = 0; x < 8; x++) {
						var currentObject =
							this.allObjectTypes[
								this.data.selectedPage * 48 +
								y * 8 + x
							];
						
						if (currentObject) {
							layer.push({
								type: "sprite",
								
								texture: game.realms.gameWorld.objectTypes[
									currentObject.type
								].textureOf(currentObject),
								
								x: 92 + x * 17,
								y: 70 + y * 17,
								
								width: 16,
								height: 16
							});
						}
					}
				}
			
			layer.push({
				type: "sprite",
				
				texture:
					game.textures.gui_itemSelector,
				
				x: 92 + this.data.selectedObject.x * 17,
				y: 70 + this.data.selectedObject.y * 17
			});
			
			return layer;
		}
};
