/*
 * Game world realm map generator
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.generator = {
	//Secondary variables
		
	
	//Methods
		run: function(gameWorld) {
			//Generate biomes map
				for (var x = 0; x < gameWorld.size / 100; x++) {
					gameWorld.biomes[x] = [];
					
					for (var y = 0; y < gameWorld.size / 100; y++) {
						for (var i in game.realms.gameWorld.biomeTypes) {
							if (
								Math.random() <
									game.realms.gameWorld.biomeTypes[i].chance
								) {
								gameWorld.biomes[x][y] = i;
								
								break;
							}
							gameWorld.biomes[x][y] = "desert";
						}
					}
				}
			
			//Generate background
				for (var x = 0; x < gameWorld.size; x++) {
					gameWorld.background[x] = [];
					
					for (var y = 0; y < gameWorld.size; y++) {
						var
							x1 = Math.floor(x / 100),
							y1 = Math.floor(y / 100),
							
							curBiome = game.realms.gameWorld.biomeTypes[
								gameWorld.biomes[x1][y1]
							];
						
						gameWorld.background[x][y] =
							curBiome.backgroundTextures[
								Math.floor(
									Math.random() *
									curBiome.backgroundTextures.length
								)
							];
					}
				}
			
			//Generate objects
				for (var x = 0; x < gameWorld.size; x++) {
					gameWorld.objects[x] = [];
					
					for (var y = 0; y < gameWorld.size; y++) {
						var
							x1 = Math.floor(x / 100),
							y1 = Math.floor(y / 100),
							
							curBiome = game.realms.gameWorld.biomeTypes[
								gameWorld.biomes[x1][y1]
							];
						
						for (var i in curBiome.objectTypes) {
							if (
								Math.random() <
									curBiome.objectTypes[i].chance
							) {
								gameWorld.objects[x][y] = new
									curBiome.objectTypes[
										i
									].constructor();
								
								break;
							}
							gameWorld.objects[x][y] = null;
						}
					}
				}
				
				//Spawn player
					gameWorld.cameraPosition.x = 1;
					gameWorld.cameraPosition.y = 1;
					
					gameWorld.playerPosition.x =
						game.realms.gameWorld.playerOffset.x + 1;
					gameWorld.playerPosition.y =
						game.realms.gameWorld.playerOffset.y + 1;
					
					gameWorld.objects[
						gameWorld.playerPosition.x
					][
						gameWorld.playerPosition.y
					] =
						new game.realms.gameWorld.objectTypes.player.New();
				
				//Generate game world barrier
					for (
						var x = game.realms.gameWorld.playerOffset.x;
						x < gameWorld.size - game.realms.gameWorld.playerOffset.x;
						x++
					) {
						for (var y in {
							[game.realms.gameWorld.playerOffset.y]: null,
							[
								gameWorld.size -
								game.realms.gameWorld.playerOffset.y - 1
							]: null
						}) {
							gameWorld.objects[x][y] =
								new game.realms.gameWorld.objectTypes.barrier.New(); 
						}
					}
					
					for (var x in {
						[game.realms.gameWorld.playerOffset.x]: null,
						[
							gameWorld.size -
							game.realms.gameWorld.playerOffset.x
						]: null
					}) {
						for (
							var y = game.realms.gameWorld.playerOffset.y;
							y < gameWorld.size - game.realms.gameWorld.playerOffset.y;
							y++
						) {
							gameWorld.objects[x][y] =
								new game.realms.gameWorld.objectTypes.barrier.New(); 
						}
					}
			
			//Generate particles
				for (var x = 0; x < gameWorld.size; x++) {
					gameWorld.particles[x] = [];
					
					for (var y = 0; y < gameWorld.size; y++) {
						gameWorld.particles[x][y] = null;
					}
				}
		},
		
		spawnMobs: function(gameWorld) {
			if (gameWorld.spawnedMobsCount < gameWorld.size) {
				var
					curObjectPosition = {
						x: Math.floor(Math.random() * gameWorld.size),
						y: Math.floor(Math.random() * gameWorld.size)
					},
					
					spawningMobs = game.realms.gameWorld.biomeTypes[
						gameWorld.biomes[
							Math.floor(curObjectPosition.x / 100)
						][
							Math.floor(curObjectPosition.y / 100)
						]
					].spawningMobs;
				
				if (!gameWorld.objects[
					curObjectPosition.x
				][
					curObjectPosition.y
				]) {
					for (var i in spawningMobs) {
						if (Math.random() < spawningMobs[i].chance) {
							gameWorld.objects[
								curObjectPosition.x
							][
								curObjectPosition.y
							] = new spawningMobs[i].constructor();
							
							break;
						}
					}
				}
			}
		}
};
