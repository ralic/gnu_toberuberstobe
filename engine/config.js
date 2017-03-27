/*
 * Config module
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.config = {
	//Secondary variables
		list: {},
		defaultList: {
			main: {
				locale: "en_US",
				
				hotkeys: {
					menu: "Escape",
					use: "KeyE",
					useOther: "KeyR",
					magic: "F2",
					
					down: "KeyS",
					left: "KeyA",
					up: "KeyW",
					right: "KeyD"
				}
			},
			
			gameWorld: {
				background: [],
				
				objects: [],
				spawnedMobsCount: 0,
				
				particles: [],
				
				playerPosition: {},
				cameraPosition: {},
				
				size: 1000,
				
				biomes: []
			}
		},
		
		pathPrefix: "config/",
		paths: {
			main: "main.json",
			gameWorld: "gameWorld.json"
		},
		
	//Methods
		read: function() {
			this.list = JSON.parse(JSON.stringify(
				this.defaultList
			));
			
			for (var i in this.list) {
				var currentConfig = "";
				try {
					currentConfig = fs.readFileSync(
						this.pathPrefix +
						this.paths[i],
					"utf-8");
				} catch(e) {}
				
				if (currentConfig) {
					try {
						this.list[i] = JSON.parse(currentConfig);
					} catch(e) {
						alert(new ReferenceError(
							"can't read config " +
							this.pathPrefix +
							this.paths[i] +
							
							" (" + e + ")"
						));
					}
				}
			}
		},
		
		write: function(parameter) {
			try {
				fs.writeFileSync(
					this.pathPrefix +
					this.paths[parameter],
					
					JSON.stringify(this.list[parameter])
				);
			} catch(e) {
				alert(new ReferenceError(
					"can't write config " +
					this.pathPrefix +
					this.paths[parameter] +
					
					" (" + e + ")"
				));
			}
		}
};
