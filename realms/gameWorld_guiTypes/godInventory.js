/*
 * Game world realm god inventory GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.godInventory = {
	//Secondary variables
		data: {
			mode: 0,
			selectedPage: 0,
			selectedItem: {
				x: 0,
				y: 0
			}
		},
		defaultData: {
			mode: 0,
			selectedPage: 0,
			selectedItem: {
				x: 0,
				y: 0
			}
		},
		
		get allItemTypes() {
			return [null].concat(
				Object.keys(
					game.realms.gameWorld.itemTypes
				).map(function(curValue) {
					return new game.realms.gameWorld.itemTypes[curValue].New();
				})
			);
		},
	
	//Methods
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				switch (game.hotkeys.pressed[i]) {
					case game.config.list.main.hotkeys.menu:
						game.sounds.gui_click.play();
						
						game.realms.gameWorld.curGuiType =
							game.realms.gameWorld.guiTypes.default;
						
						break;
					case game.config.list.main.hotkeys.use:
						switch (this.data.mode) {
							case 0:
								if (this.allItemTypes[
									this.data.selectedPage * 48 +
									this.data.selectedItem.y * 8 +
									this.data.selectedItem.x
								]) {
									game.realms.gameWorld.objectTypes[
										game.realms.gameWorld.playerObject.type
									].catchItems(
										game.realms.gameWorld.playerObject,
									
										[
											new game.realms.gameWorld.itemTypes[
												this.allItemTypes[
													this.data.selectedPage * 48 +
													this.data.selectedItem.y * 8 +
													this.data.selectedItem.x
												].type
											].New()
										]
									);
								} else {
									game.sounds.entities_player_itemCatching.play();
								}
								
								break;
							case 1:
								game.sounds.gui_click.play();
								
								[
									game.realms.gameWorld.playerObject.inventory[0],
									game.realms.gameWorld.playerObject.inventory[
										this.data.selectedItem.y * 8 + this.data.selectedItem.x
									]
								] = [
									game.realms.gameWorld.playerObject.inventory[
										this.data.selectedItem.y * 8 + this.data.selectedItem.x
									],
									game.realms.gameWorld.playerObject.inventory[0]
								];
								
								break;
						}
						
						break;
					case game.config.list.main.hotkeys.useOther:
						game.sounds.gui_click.play();
						
						this.data.mode = [1, 0][this.data.mode];
						this.data.selectedItem.x = 0;
						this.data.selectedItem.y = 0;
						
						break;
					case game.config.list.main.hotkeys.magic:
						if (this.data.mode == 1) {
							game.sounds.entities_player_itemCatching.play();
							
							game.realms.gameWorld.playerObject.inventory[
								this.data.selectedItem.y * 8 + this.data.selectedItem.x
							] = null;
						}
						
						break;
					case game.config.list.main.hotkeys.down:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedItem.y < 5) {
							this.data.selectedItem.y++;
						} else if (
							this.data.mode == 0 &&
							(this.data.selectedPage + 1) < Math.ceil(
								this.allItemTypes.length / 48
							)
						) {
							this.data.selectedPage++;
							
							this.data.selectedItem.y = 0;
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
						} else if (
							this.data.mode == 0 &&
							this.data.selectedPage > 0
						) {
							this.data.selectedPage--;
							
							this.data.selectedItem.y = 5;
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
						game.textures.gui_gameWorld_godInventory,
					
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
						game.curLocale.gui_gameWorld_godInventory_title,
					
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
						game.curLocale.gui_gameWorld_godInventory_allItems,
					
					x: 160,
					y: 123
				},
				
				{
					type: "text",
					
					fontSize: 6,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "right",
					
					string:
						game.curLocale.gui_settings_page +
						(this.data.selectedPage + 1) + "/" +
						Math.ceil(this.allItemTypes.length / 48),
					
					x: 237,
					y: 12
				}
			];
			
			//Render all item types
				for (var y = 0; y < 6; y++) {
					for (var x = 0; x < 8; x++) {
						var curItem = this.allItemTypes[
							this.data.selectedPage * 48 +
							y * 8 + x
						];
						
						if (curItem) {
							layer.push({
								type: "sprite",
								
								texture: game.realms.gameWorld.itemTypes[
									curItem.type
								].textureOf(curItem),
								
								x: 92 + x * 17,
								y: 14 + y * 17
							});
						}
					}
				}
			
			//Render player inventory
				for (var y = 0; y < 6; y++) {
					for (var x = 0; x < 8; x++) {
						var curItem =
							game.realms.gameWorld.playerObject.inventory[
								y * 8 + x
							];
						
						if (curItem) {
							layer.push({
								type: "sprite",
								
								texture: game.realms.gameWorld.itemTypes[
									curItem.type
								].textureOf(curItem),
								
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
