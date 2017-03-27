/*
 * Game world realm inventory GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.inventory = {
	//Secondary variables
		data: {
			selectedItem: {
				x: 0,
				y: 0
			},
			selectedForCraftingItems: []
		},
		defaultData: {
			selectedItem: {
				x: 0,
				y: 0
			},
			selectedForCraftingItems: []
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
						
						if (this.data.selectedForCraftingItems.length == 0) {
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
						} else {
							var selectedForCraftingItemsTypes =
								this.data.selectedForCraftingItems.map(function(currentValue) {
									return (game.realms.gameWorld.playerObject.inventory[
										currentValue.y * 8 + currentValue.x
									] || {type: null}).type;
								}, this);
							
							for (var i in game.realms.gameWorld.craftingRecipes) {
								if (
									JSON.stringify(
										game.realms.gameWorld.craftingRecipes[i].in
									) ==
										JSON.stringify(selectedForCraftingItemsTypes)
								) {
									for (
										var j = 0;
										j < this.data.selectedForCraftingItems.length;
										j++
									) {
										game.realms.gameWorld.playerObject.inventory[
											this.data.selectedForCraftingItems[j].y * 8 +
											this.data.selectedForCraftingItems[j].x
										] = null;
										
										game.realms.gameWorld.playerObject.inventory[
											this.data.selectedItem.y * 8 +
											this.data.selectedItem.x
										] = new game.realms.gameWorld.craftingRecipes[
											i
										].out();
									}
									
									break;
								}
							}
							
							this.data.selectedForCraftingItems.length = 0;
						}
						
						break;
					case game.config.list.main.hotkeys.useOther:
						game.sounds.gui_click.play();
						
						var
							slotAvailable = true,
							oldSlotNumber;
						
						for (var i = 0; i < this.data.selectedForCraftingItems.length; i++) {
							if (
								this.data.selectedForCraftingItems[i].x ==
									this.data.selectedItem.x &&
								this.data.selectedForCraftingItems[i].y ==
									this.data.selectedItem.y
							) {
								slotAvailable = false;
								oldSlotNumber = i;
								
								break;
							}
						}
						
						if (slotAvailable) {
							this.data.selectedForCraftingItems.push({
								x: this.data.selectedItem.x,
								y: this.data.selectedItem.y
							});
						} else {
							this.data.selectedForCraftingItems.splice(oldSlotNumber, 1);
						}
						
						break;
					case game.config.list.main.hotkeys.magic:
						game.sounds.entities_player_itemCatching.play();
						
						game.realms.gameWorld.playerObject.inventory[
							this.data.selectedItem.y * 8 + this.data.selectedItem.x
						] = null;
						
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
						game.textures.gui_gameWorld_inventory,
					
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
						game.currentLocale.gui_gameWorld_inventory_title,
					
					x: 160,
					y: 68
				}
			];
			
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
								y: 70 + y * 17
							});
						}
					}
				}
			
			for (var i = 0; i < this.data.selectedForCraftingItems.length; i++) {
				layer.push({
					type: "sprite",
					
					texture:
						game.textures.gui_itemSelector_1,
					
					x: 92 + this.data.selectedForCraftingItems[i].x * 17,
					y: 70 + this.data.selectedForCraftingItems[i].y * 17
				});
			}
			layer.push({
				type: "sprite",
				
				texture:
					game.textures.gui_itemSelector,
				
				x: 92 + this.data.selectedItem.x * 17,
				y: 70 + this.data.selectedItem.y * 17
			});
			
			return layer;
		}
};
