/*
 * Game world realm chest GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.chest = {
	//Secondary variables
		data: {
			mode: 0,
			selectedItem: {
				x: 0,
				y: 0
			}
		},
		defaultData: {
			mode: 0,
			selectedItem: {
				x: 0,
				y: 0
			}
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
						).type == "chest") {
							chestInventory = playerSelectedObject.inventory;
						} else {
							game.realms.gameWorld.currentGuiType =
								game.realms.gameWorld.guiTypes.default;
							
							break;
						}
						
						switch (this.data.mode) {
							case 0:
								game.realms.gameWorld.objectTypes[
									game.realms.gameWorld.playerObject.type
								].catchItems(
									game.realms.gameWorld.playerObject,
									
									[chestInventory[
										this.data.selectedItem.y * 8 + this.data.selectedItem.x
									]]
								);
								
								chestInventory[
									this.data.selectedItem.y * 8 + this.data.selectedItem.x
								] = null;
								
								break;
							case 1:
								game.realms.gameWorld.objectTypes[
									playerSelectedObject.type
								].catchItems(
									playerSelectedObject,
									
									[game.realms.gameWorld.playerObject.inventory[
										this.data.selectedItem.y * 8 + this.data.selectedItem.x
									]]
								);
								
								game.realms.gameWorld.playerObject.inventory[
									this.data.selectedItem.y * 8 + this.data.selectedItem.x
								] = null;
								
								break;
						}
						
						break;
					case game.config.list.main.hotkeys.useOther:
						game.sounds.gui_click.play();
						
						this.data.mode = [1, 0][this.data.mode];
						this.data.selectedItem.x = 0;
						this.data.selectedItem.y = 0;
						
						break;
					case game.config.list.main.hotkeys.down:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedItem.y < 5) {
							this.data.selectedItem.y++;
						}
						
						break;
					case game.config.list.main.hotkeys.left:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedItem.x > 0) {
							this.data.selectedItem.x--;
						}
						
						break;
					case game.config.list.main.hotkeys.up:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedItem.y > 0) {
							this.data.selectedItem.y--;
						}
						
						break;
					case game.config.list.main.hotkeys.right:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedItem.x < 7) {
							this.data.selectedItem.x++;
						}
						
						break;
				}
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		render: function() {
			var layer = [
				{
					type: "sprite",
					
					texture:
						game.textures.gui_gameWorld_chest,
					
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
						game.currentLocale.gui_gameWorld_chest_title,
					
					x: 160,
					y: 12
				},
				{
					type: "text",
					
					fontSize: 6,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_gameWorld_chest_inventory,
					
					x: 160,
					y: 123
				}
			];
			
			//Render chest inventory
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
					).type == "chest") {
						chestInventory = playerSelectedObject.inventory;
					} else {
						game.realms.gameWorld.currentGuiType =
							game.realms.gameWorld.guiTypes.default;
						
						return [];
					}
				
				for (var y = 0; y < 6; y++) {
					for (var x = 0; x < 8; x++) {
						var currentItem = chestInventory[
							y * 8 + x
						];
						
						if (currentItem) {
							layer.push({
								type: "sprite",
								
								texture: game.realms.gameWorld.itemTypes[
									currentItem.type
								].textureOf(currentItem),
								
								x: 92 + x * 17,
								y: 14 + y * 17
							});
						}
					}
				}
			
			//Render player inventory
				for (var y = 0; y < 6; y++) {
					for (var x = 0; x < 8; x++) {
						var currentItem =
							game.realms.gameWorld.playerObject.inventory[
								y * 8 + x
							];
						
						if (currentItem) {
							layer.push({
								type: "sprite",
								
								texture: game.realms.gameWorld.itemTypes[
									currentItem.type
								].textureOf(currentItem),
								
								x: 92 + x * 17,
								y: 126 + y * 17
							});
						}
					}
				}
			
			layer.push({
				type: "sprite",
				
				texture:
					game.textures.gui_itemSelector,
				
				x: 92 + this.data.selectedItem.x * 17,
				y: [
					14,
					126
				][this.data.mode] + this.data.selectedItem.y * 17
			});
			
			return layer;
		}
};
