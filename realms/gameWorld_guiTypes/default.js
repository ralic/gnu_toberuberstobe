/*
 * Game world realm default GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.default = {
	//Secondary variables
		data: {},
		defaultData: {},
	
	//Methods
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				switch (game.hotkeys.pressed[i]) {
					case game.config.list.main.hotkeys.menu:
						game.sounds.gui_click.play();
						
						game.config.write("gameWorld");
						
						game.curRealm =
							game.realms.menu;
						
						window.clearInterval(game.realms.gameWorld.chunkUpdater);
						
						break;
					case game.config.list.main.hotkeys.use:
						game.realms.gameWorld.objectTypes[
							game.realms.gameWorld.playerObject.type
						].useItem(
							game.realms.gameWorld.playerObject,
							
							game.config.list.gameWorld.playerPosition.x,
							game.config.list.gameWorld.playerPosition.y
						);
						
						break;
					case game.config.list.main.hotkeys.useOther:
						game.sounds.gui_click.play();
						
						var 
							selectedPoint = game.realms.gameWorld.objectTypes[
								game.realms.gameWorld.playerObject.type
							].selectedPointOf(
								game.realms.gameWorld.playerObject,
								
								game.config.list.gameWorld.playerPosition.x,
								game.config.list.gameWorld.playerPosition.y
							),
							selectedObject = game.config.list.gameWorld.objects[
								selectedPoint.x
							][
								selectedPoint.y
							];
						
						game.realms.gameWorld.curGuiType =
							game.realms.gameWorld.objectTypes[(
								selectedObject ||
								game.realms.gameWorld.playerObject
							).type].gui ||
							game.realms.gameWorld.objectTypes[
								game.realms.gameWorld.playerObject.type
							].gui;
						
						if (
							game.realms.gameWorld.playerObject.isGod &&
							
							game.realms.gameWorld.curGuiType ==
								game.realms.gameWorld.guiTypes.inventory
						) {
							game.realms.gameWorld.curGuiType =
								game.realms.gameWorld.guiTypes.godInventory;
						}
						
						break;
					case game.config.list.main.hotkeys.magic:
						game.sounds.gui_gameWorld_default_godModeSwitching.play();
						
						game.realms.gameWorld.playerObject.isGod = [
							true,
							false
						][+game.realms.gameWorld.playerObject.isGod]
						
						break;
					case game.config.list.main.hotkeys.down:
						if (
							game.config.list.gameWorld.cameraPosition.y <
								game.config.list.gameWorld.size -
								game.realms.gameWorld.chunkSize.height - 1 &&
							
							!game.config.list.gameWorld.objects[
								game.config.list.gameWorld.playerPosition.x
							][
								game.config.list.gameWorld.playerPosition.y + 1
							]
						) {
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y + 1
								]
							] = [
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y + 1
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
							
							game.config.list.gameWorld.cameraPosition.y++;
							game.config.list.gameWorld.playerPosition.y++;
						}
						
						game.realms.gameWorld.objectTypes[
							game.realms.gameWorld.playerObject.type
						].direct(
							game.realms.gameWorld.playerObject,
							
							0
						);
						
						break;
					case game.config.list.main.hotkeys.left:
						if (
							game.config.list.gameWorld.cameraPosition.x > 1 &&
							
							!game.config.list.gameWorld.objects[
								game.config.list.gameWorld.playerPosition.x - 1
							][
								game.config.list.gameWorld.playerPosition.y
							]
						) {
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x - 1
								][
									game.config.list.gameWorld.playerPosition.y
								]
							] = [
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x - 1
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
							
							game.config.list.gameWorld.cameraPosition.x--;
							game.config.list.gameWorld.playerPosition.x--;
						}
						
						game.realms.gameWorld.objectTypes[
							game.realms.gameWorld.playerObject.type
						].direct(
							game.realms.gameWorld.playerObject,
							
							1
						);
						
						break;
					case game.config.list.main.hotkeys.up:
						if (
							game.config.list.gameWorld.cameraPosition.y > 1 &&
							
							!game.config.list.gameWorld.objects[
								game.config.list.gameWorld.playerPosition.x
							][
								game.config.list.gameWorld.playerPosition.y - 1
							]
						) {
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y - 1
								]
							] = [
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y - 1
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
							
							game.config.list.gameWorld.cameraPosition.y--;
							game.config.list.gameWorld.playerPosition.y--;
						}
						
						game.realms.gameWorld.objectTypes[
							game.realms.gameWorld.playerObject.type
						].direct(
							game.realms.gameWorld.playerObject,
							
							2
						);
						
						break;
					case game.config.list.main.hotkeys.right:
						if (
							game.config.list.gameWorld.cameraPosition.x <
								game.config.list.gameWorld.size -
								game.realms.gameWorld.chunkSize.width - 1 &&
							
							!game.config.list.gameWorld.objects[
								game.config.list.gameWorld.playerPosition.x + 1
							][
								game.config.list.gameWorld.playerPosition.y
							]
						) {
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x + 1
								][
									game.config.list.gameWorld.playerPosition.y
								]
							] = [
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x + 1
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
							
							game.config.list.gameWorld.cameraPosition.x++;
							game.config.list.gameWorld.playerPosition.x++;
						}
						
						game.realms.gameWorld.objectTypes[
							game.realms.gameWorld.playerObject.type
						].direct(
							game.realms.gameWorld.playerObject,
							
							3
						);
						
						break;
				}
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		render: function() {
			var 
				layer = [
					{
						type: "sprite",
						
						texture:
							game.textures.gui_gameWorld_default,
						
						x: 0,
						y: 0
					},
					
					{
						type: "sprite",
						
						texture:
							game.textures.gui_gameWorld_default_healthBar,
						
						x: 9,
						y: 213,
						
						width:
							game.realms.gameWorld.playerObject.health * 0.62,
						height: 2
					},
					{
						type: "sprite",
						
						texture:
							game.textures.gui_gameWorld_default_hungerBar,
						
						x: 9,
						y: 221,
						
						width:
							game.realms.gameWorld.playerObject.hunger * 0.62,
						height: 2
					},
					{
						type: "sprite",
						
						texture:
							game.textures.gui_gameWorld_default_thirstBar,
						
						x: 9,
						y: 229,
						
						width:
							game.realms.gameWorld.playerObject.thirst * 0.62,
						height: 2
					},
					
					{
						type: "text",
						
						fontSize: 6,
						fontColor:
							game.colorScheme.text_light,
						textAlign: "left",
						
						string: [
							game.realms.gameWorld.playerObject.experience,
							game.curLocale.gui_gameWorld_default_godMode
						][+game.realms.gameWorld.playerObject.isGod],
						
						x: 17,
						y: 15
					}
				];
			
			if (game.realms.gameWorld.playerObject.inventory[0]) {
				layer.push({
					type: "sprite",
					
					texture: game.realms.gameWorld.itemTypes[
						game.realms.gameWorld.playerObject.inventory[0].type
					].textureOf(game.realms.gameWorld.playerObject.inventory[0]),
					
					x: 294,
					y: 214
				});
			}
			
			return layer;
		}
};
