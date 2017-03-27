/*
 * Game world realm oven GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.oven = {
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
						).type == "oven") {
							ovenInventory = playerSelectedObject.inventory;
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
									
									[ovenInventory[
										this.data.selectedItem.y * 8 + this.data.selectedItem.x
									]]
								);
								
								ovenInventory[
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
						
						if (
							this.data.mode == 1 &&
							this.data.selectedItem.y < 5
						) {
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
						
						if (
							this.data.mode == 1 &&
							this.data.selectedItem.y > 0
						) {
							this.data.selectedItem.y--;
						}
						
						break;
					case game.config.list.main.hotkeys.right:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedItem.x < [
							2,
							7
						][this.data.mode]) {
							this.data.selectedItem.x++;
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
				).type == "oven") {
					ovenInventory = playerSelectedObject.inventory;
				} else {
					game.realms.gameWorld.currentGuiType =
						game.realms.gameWorld.guiTypes.default;
					
					return [];
				}
			
			//Try to cook ingridient
				if (ovenInventory[0] && ovenInventory[1]) {
					if (
						ovenInventory[0].type in
							game.realms.gameWorld.cookingRecipes._fuelTypes
					) {
						for (var i in game.realms.gameWorld.cookingRecipes) {
							if (
								ovenInventory[1].type ==
									game.realms.gameWorld.cookingRecipes[i].in
							) {
								ovenInventory[0] = null;
								ovenInventory[1] = null;
								ovenInventory[2] = new
									game.realms.gameWorld.cookingRecipes[
										i
									].out();
								
								break;
							}
						}
					}
				}
			
			var layer = [
				{
					type: "sprite",
					
					texture:
						game.textures.gui_gameWorld_oven,
					
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
						game.currentLocale.gui_gameWorld_oven_title,
					
					x: 160,
					y: 36
				},
				{
					type: "text",
					
					fontSize: 6,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_gameWorld_oven_inventory,
					
					x: 160,
					y: 96
				}
			];
			
			//Render oven inventory
				for (var y = 0; y < 6; y++) {
					for (var x = 0; x < 8; x++) {
						var currentItem = ovenInventory[
							y * 8 + x
						];
						
						if (currentItem) {
							layer.push({
								type: "sprite",
								
								texture: game.realms.gameWorld.itemTypes[
									currentItem.type
								].textureOf(currentItem),
								
								x: [
									110,
									144,
									195
								][y * 8 + x],
								y: 55 + y * 17
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
								
								x: 93 + x * 17,
								y: 99 + y * 17
							});
						}
					}
				}
			
			layer.push({
				type: "sprite",
				
				texture:
					game.textures.gui_itemSelector,
				
				x: [
					[
						110,
						144,
						195
					][this.data.selectedItem.y * 8 + this.data.selectedItem.x],
					93 + this.data.selectedItem.x * 17
				][this.data.mode],
				y: [
					55,
					99 + this.data.selectedItem.y * 17
				][this.data.mode]
			});
			
			return layer;
		}
};
