/*
 * Main module
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

var
	fs = require("fs"),
	win = nw.Window.get(),
	
	game = {
		//Secondary variables
			screen: {
				width: 320,
				height: 240
			},
			
			textures: {},
			loadedTexturesCount: 0,
			sounds: {},
			loadedSoundsCount: 0,
			colorScheme: {},
			
			locales: {},
			get curLocale() {
				return this.locales[
					this.config.list.main.locale
				] || this.locales[
					this.config.defaultList.main.locale
				];
			},
			
			realms: {},
		
		//Methods
			init: function() {
				this.loadContent();
				
				this.config.read();
				
				//Setup canvas
					this.canvasElement = document.getElementById("canvas");
					this.canvasContext = this.canvasElement.getContext("2d");
					
					this.canvasContext.imageSmoothingEnabled = false;
				
				this.starter = window.setInterval(this.start, 100);
			},
			
			start: function() {
				if (
					game.loadedTexturesCount ==
						Object.keys(game.textures).length &&
					game.loadedSoundsCount ==
						Object.keys(game.sounds).length
				) {
					window.clearInterval(game.starter);
					
					game.sounds.gui_background.play();
					
					document.getElementById("loadingScreen").remove();
					
					game.curRealm =
						game.realms.menu;
					
					game.renderer = window.setInterval(game.update, 4);
				}
			},
			
			update: function() {
				var layers = game.curRealm.update();
				
				game.canvasContext.clearRect(
					0,
					0,
					
					game.canvasElement.width,
					game.canvasElement.height
				);
				
				for (var i = 0; i < layers.length; i++) {
					for (var j = 0; j < layers[i].length; j++) {
						switch (layers[i][j].type) {
							case "sprite":
								try {
									game.canvasContext.drawImage(
										layers[i][j].texture,
										
										layers[i][j].x *
										(innerWidth / game.screen.width),
										layers[i][j].y *
										(innerHeight / game.screen.height),
										
										(layers[i][j].width || layers[i][j].texture.width) *
										(innerWidth / game.screen.width),
										(layers[i][j].height || layers[i][j].texture.height) *
										(innerHeight / game.screen.height)
									);
								} catch(e) {
									alert(new ReferenceError(
										"renderer crashed " +
										
										"(can't render image (" + e + "))"
									));
									
									window.clearInterval(game.renderer);
									
									return;
								}
								
								break;
							case "text":
								game.canvasContext.textAlign = layers[i][j].textAlign; 
								
								game.canvasContext.font =
									layers[i][j].fontSize *
									(innerWidth / game.screen.height) + "px " +
									"font";
								
								game.canvasContext.fillStyle = layers[i][j].fontColor;
								
								try {
									game.canvasContext.fillText(
										layers[i][j].string,
										
										layers[i][j].x *
										(innerWidth / game.screen.width),
										layers[i][j].y *
										(innerHeight / game.screen.height)
									);
								} catch(e) {
									alert(new ReferenceError(
										"renderer crashed " +
										
										"(can't render text (" + e + "))"
									));
									
									window.clearInterval(game.renderer);
									
									return;
								}
								
								break;
							default:
								alert(new TypeError(
									"renderer crashed " +
									
									"(type " +
									layers[i][j].type +
									" doesn't exist)"
								));
								
								window.clearInterval(game.renderer);
								
								return;
						}
					}
				}
			}
	};
