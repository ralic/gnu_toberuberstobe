/*
 * Game world realm
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld = {
	//Secondary variables
		backgroundTextures: {},
		itemTypes: {},
		objectTypes: {},
		particleTypes: {},
		guiTypes: {},
		biomeTypes: {},
		achievementTypes: {},
		craftingRecipes: {},
		cookingRecipes: {
			_fuelTypes: {}
		},
		
		get playerObject() {
			return game.config.list.gameWorld.objects[
				game.config.list.gameWorld.playerPosition.x
			][
				game.config.list.gameWorld.playerPosition.y
			];
		},
		set playerObject(value) {
			game.config.list.gameWorld.objects[
				game.config.list.gameWorld.playerPosition.x
			][
				game.config.list.gameWorld.playerPosition.y
			] = value;
		},
		
		playerOffset: {
			x: 10,
			y: 7
		},
		
		chunkSize: {
			width: 20,
			height: 15
		},
	
	//Methods
		fail: function() {
			game.config.list.gameWorld = JSON.parse(JSON.stringify(
				game.config.defaultList.gameWorld
			));
			game.config.write("gameWorld");
			
			game.curRealm =
				game.realms.gameOver;
			
			window.clearInterval(this.chunkUpdater);
		},
		
		updateChunk: function() {
			//Update objects
				for (
					var x = 0;
					x < game.realms.gameWorld.chunkSize.width;
					x++
				) {
					for (
						var y = 0;
						y < game.realms.gameWorld.chunkSize.height;
						y++
					) {
						var curObject = game.config.list.gameWorld.objects[
							game.config.list.gameWorld.cameraPosition.x + x
						][
							game.config.list.gameWorld.cameraPosition.y + y
						];
						
						if (curObject) {
							var curObjectType =
								game.realms.gameWorld.objectTypes[curObject.type];
							
							if (curObjectType.update) {
								curObjectType.update(
									curObject,
									
									game.config.list.gameWorld.cameraPosition.x + x,
									game.config.list.gameWorld.cameraPosition.y + y
								);
							}
						}
					}
				}
				
				game.realms.gameWorld.generator.spawnMobs(
					game.config.list.gameWorld
				);
			
			//Update particles
				for (
					var x = 0;
					x < game.realms.gameWorld.chunkSize.width;
					x++
				) {
					for (
						var y = 0;
						y < game.realms.gameWorld.chunkSize.height;
						y++
					) {
						var curParticle = game.config.list.gameWorld.particles[
							game.config.list.gameWorld.cameraPosition.x + x
						][
							game.config.list.gameWorld.cameraPosition.y + y
						];
						
						if (curParticle) {
							curParticle.lifetime--;
							
							if (curParticle.lifetime <= 0) {
								game.config.list.gameWorld.particles[
									game.config.list.gameWorld.cameraPosition.x + x
								][
									game.config.list.gameWorld.cameraPosition.y + y
								] = null;
							}
						}
					}
				}
		},
		
		update: function() {
			this.curGuiType.handleHotkeys();
			
			return [
				this.renderBackground(),
				this.renderObjects(),
				this.renderParticles(),
				this.curGuiType.render()
			];
		},
		
		renderBackground: function() {
			var layer = [];
			
			for (var y = 0; y < this.chunkSize.height; y++) {
				for (var x = 0; x < this.chunkSize.width; x++) {
					var curBackgroundTexture = this.backgroundTextures[
						game.config.list.gameWorld.background[
							game.config.list.gameWorld.cameraPosition.x + x
						][
							game.config.list.gameWorld.cameraPosition.y + y
						]
					]();
					
					 if (curBackgroundTexture) {
						layer.push({
							type: "sprite",
							
							texture:
								curBackgroundTexture,
							
							x: x * 16,
							y: y * 16
						});
					}
				}
			}
			
			return layer;
		},
		renderObjects: function() {
			var layer = [];
			
			for (var y = 0; y < this.chunkSize.height; y++) {
				for (var x = 0; x < this.chunkSize.width; x++) {
					var curObject = game.config.list.gameWorld.objects[
						game.config.list.gameWorld.cameraPosition.x + x
					][
						game.config.list.gameWorld.cameraPosition.y + y
					];
					
					if (curObject) {
						var 
							curObjectType = this.objectTypes[curObject.type],
							curObjectTexture = curObjectType.textureOf(curObject);
						
						layer.push({
							type: "sprite",
							
							texture:
								curObjectTexture,
							
							x: x * 16 + curObjectType.textureOffset.x,
							y: y * 16 + curObjectType.textureOffset.y
						});
					}
				}
			}
			
			return layer;
		},
		renderParticles: function() {
			var layer = [];
			
			for (var y = 0; y < this.chunkSize.height; y++) {
				for (var x = 0; x < this.chunkSize.width; x++) {
					var curParticle = game.config.list.gameWorld.particles[
						game.config.list.gameWorld.cameraPosition.x + x
					][
						game.config.list.gameWorld.cameraPosition.y + y
					];
					
					if (curParticle) {
						var curParticleTexture = this.particleTypes[
							curParticle.type
						].textureOf(curParticle);
						
						layer.push({
							type: "sprite",
							
							texture:
								curParticleTexture,
							
							x: x * 16,
							y: y * 16
						});
					}
				}
			}
			
			return layer;
		}
};
