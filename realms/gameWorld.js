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
			game.sounds.gui_gameOver.play();
			
			game.config.list.gameWorld = JSON.parse(JSON.stringify(
				game.config.defaultList.gameWorld
			));
			game.config.write("gameWorld");
			
			game.currentRealm =
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
						var currentObject = game.config.list.gameWorld.objects[
							game.config.list.gameWorld.cameraPosition.x + x
						][
							game.config.list.gameWorld.cameraPosition.y + y
						];
						
						if (currentObject) {
							var currentObjectType =
								game.realms.gameWorld.objectTypes[currentObject.type];
							
							if (currentObjectType.update) {
								currentObjectType.update(
									currentObject,
									
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
						var currentParticle = game.config.list.gameWorld.particles[
							game.config.list.gameWorld.cameraPosition.x + x
						][
							game.config.list.gameWorld.cameraPosition.y + y
						];
						
						if (currentParticle) {
							currentParticle.lifetime--;
							
							if (currentParticle.lifetime <= 0) {
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
			this.currentGuiType.handleHotkeys();
			
			return [
				this.renderBackground(),
				this.renderObjects(),
				this.renderParticles(),
				this.currentGuiType.render()
			];
		},
		
		renderBackground: function() {
			var layer = [];
			
			for (var y = 0; y < this.chunkSize.height; y++) {
				for (var x = 0; x < this.chunkSize.width; x++) {
					var currentBackgroundTexture = this.backgroundTextures[
						game.config.list.gameWorld.background[
							game.config.list.gameWorld.cameraPosition.x + x
						][
							game.config.list.gameWorld.cameraPosition.y + y
						]
					]();
					
					 if (currentBackgroundTexture) {
						layer.push({
							type: "sprite",
							
							texture:
								currentBackgroundTexture,
							
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
					var currentObject = game.config.list.gameWorld.objects[
						game.config.list.gameWorld.cameraPosition.x + x
					][
						game.config.list.gameWorld.cameraPosition.y + y
					];
					
					if (currentObject) {
						var 
							currentObjectType = this.objectTypes[currentObject.type],
							currentObjectTexture = currentObjectType.textureOf(currentObject);
						
						layer.push({
							type: "sprite",
							
							texture:
								currentObjectTexture,
							
							x: x * 16 + currentObjectType.textureOffset.x,
							y: y * 16 + currentObjectType.textureOffset.y
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
					var currentParticle = game.config.list.gameWorld.particles[
						game.config.list.gameWorld.cameraPosition.x + x
					][
						game.config.list.gameWorld.cameraPosition.y + y
					];
					
					if (currentParticle) {
						var currentParticleTexture = this.particleTypes[
							currentParticle.type
						].textureOf(currentParticle);
						
						layer.push({
							type: "sprite",
							
							texture:
								currentParticleTexture,
							
							x: x * 16,
							y: y * 16
						});
					}
				}
			}
			
			return layer;
		}
};
