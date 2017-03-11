/*
 * Game world realm AI part
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.useAiOn = function(object, x, y) {
	var objectsAroundObject = [
		game.config.list.gameWorld.objects[x][y + 1],
		game.config.list.gameWorld.objects[x - 1][y],
		game.config.list.gameWorld.objects[x][y - 1],
		game.config.list.gameWorld.objects[x + 1][y]
	];
	
	//Detect player
		if (object.canAttack) {
			for (var i = 0; i < objectsAroundObject.length; i++) {
				if (
					objectsAroundObject[i] ==
						game.realms.gameWorld.playerObject
				) {
					object.rotation = i;
					
					game.realms.gameWorld.objectTypes[
						object.type
					].attack(
						object,
						
						x, y
					);
					
					return;
				}
			}
		}
	
	//Go to player
		if (object.canWalk) {
			if (
				!objectsAroundObject[0] &&
				game.config.list.gameWorld.playerPosition.y > y
			) {
				[
					game.config.list.gameWorld.objects[x][y],
					game.config.list.gameWorld.objects[x][y + 1]
				] =
					[
						game.config.list.gameWorld.objects[x][y + 1],
						game.config.list.gameWorld.objects[x][y]
					];
				
				game.realms.gameWorld.objectTypes[
					object.type
				].direct(
					object,
					
					0
				);
			} else if (
				!objectsAroundObject[1] &&
				game.config.list.gameWorld.playerPosition.x < x
			) {
				[
					game.config.list.gameWorld.objects[x][y],
					game.config.list.gameWorld.objects[x - 1][y]
				] =
					[
						game.config.list.gameWorld.objects[x - 1][y],
						game.config.list.gameWorld.objects[x][y]
					];
				
				game.realms.gameWorld.objectTypes[
					object.type
				].direct(
					object,
					
					1
				);
			} else if (
				!objectsAroundObject[2] &&
				game.config.list.gameWorld.playerPosition.y < y
			) {
				[
					game.config.list.gameWorld.objects[x][y],
					game.config.list.gameWorld.objects[x][y - 1]
				] =
					[
						game.config.list.gameWorld.objects[x][y - 1],
						game.config.list.gameWorld.objects[x][y]
					];
				
				game.realms.gameWorld.objectTypes[
					object.type
				].direct(
					object,
					
					2
				);
			} else if (
				!objectsAroundObject[3] &&
				game.config.list.gameWorld.playerPosition.x > x
			) {
				[
					game.config.list.gameWorld.objects[x][y],
					game.config.list.gameWorld.objects[x + 1][y]
				] =
					[
						game.config.list.gameWorld.objects[x + 1][y],
						game.config.list.gameWorld.objects[x][y]
					];
				
				game.realms.gameWorld.objectTypes[
					object.type
				].direct(
					object,
					
					3
				);
			}
		}
};
