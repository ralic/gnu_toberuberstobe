/*
 * Game world realm door GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.door = {
	//Secondary variables
		data: {},
		defaultData: {},
	
	//Methods
		handleHotkeys: function() {
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		render: function() {
			switch (game.realms.gameWorld.playerObject.rotation) {
				case 0:
					if (
						!game.config.list.gameWorld.objects[
							game.config.list.gameWorld.playerPosition.x
						][
							game.config.list.gameWorld.playerPosition.y + 2
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
								game.config.list.gameWorld.playerPosition.y + 2
							]
						] =
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y + 2
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
						
						game.config.list.gameWorld.cameraPosition.y += 2;
						game.config.list.gameWorld.playerPosition.y += 2;
					}
					
					break;
				case 1:
					if (
						!game.config.list.gameWorld.objects[
							game.config.list.gameWorld.playerPosition.x - 2
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
								game.config.list.gameWorld.playerPosition.x - 2
							][
								game.config.list.gameWorld.playerPosition.y
							]
						] =
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x - 2
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
						
						game.config.list.gameWorld.cameraPosition.x -= 2;
						game.config.list.gameWorld.playerPosition.x -= 2;
					}
					
					break;
				case 2:
					if (
						!game.config.list.gameWorld.objects[
							game.config.list.gameWorld.playerPosition.x
						][
							game.config.list.gameWorld.playerPosition.y - 2
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
								game.config.list.gameWorld.playerPosition.y - 2
							]
						] =
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y - 2
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
						
						game.config.list.gameWorld.cameraPosition.y -= 2;
						game.config.list.gameWorld.playerPosition.y -= 2;
					}
					
					break;
				case 3:
					if (
						!game.config.list.gameWorld.objects[
							game.config.list.gameWorld.playerPosition.x + 2
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
								game.config.list.gameWorld.playerPosition.x + 2
							][
								game.config.list.gameWorld.playerPosition.y
							]
						] =
							[
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x + 2
								][
									game.config.list.gameWorld.playerPosition.y
								],
								game.config.list.gameWorld.objects[
									game.config.list.gameWorld.playerPosition.x
								][
									game.config.list.gameWorld.playerPosition.y
								]
							];
						
						game.config.list.gameWorld.cameraPosition.x += 2;
						game.config.list.gameWorld.playerPosition.x += 2;
					}
					
					break;
			}
			
			game.realms.gameWorld.curGuiType =
				game.realms.gameWorld.guiTypes.default;
			
			return [];
		}
};
