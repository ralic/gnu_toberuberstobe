/*
 * Multiplayer world realm
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.multiplayerWorld = {
	//Secondary variables
		
	
	//Methods
		disconnect: function(errorMessage) {
			if (
				game.currentRealm == game.realms.multiplayerGate ||
				game.currentRealm == this
			) {
				game.currentRealm =
					game.realms.menu;
				
				alert(
					"Disconnected from server " +
					
					"(" + errorMessage + ")"
				);
			}
		},
		
		update: function() {
			this.ping();
			
			this.handleHotkeys();
			
			return this.render();
		},
		
		ping: function() {
			var pingData = game.socket.emit("ping", {
				login: game.socket.login,
				sessionId: game.socket.sessionId
			});
			
			if (pingData) {
				if (!pingData.error) {
					return;
				}
			}
			
			this.disconnect((
				pingData ||
				{}
			).error || "connection lost");
		},
		
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				var keyPressData = game.socket.emit("keyPress", {
					login: game.socket.login,
					sessionId: game.socket.sessionId,
					
					keyCode: game.hotkeys.pressed[i],
					isDown: true
				});
				
				if (keyPressData) {
					if (!keyPressData.error) {
						continue;
					}
				}
				
				this.disconnect((
					keyPressData ||
					{}
				).error || "connection lost");
			}
			for (var i = 0; i < game.hotkeys.released.length; i++) {
				var keyPressData = game.socket.emit("keyPress", {
					login: game.socket.login,
					sessionId: game.socket.sessionId,
					
					keyCode: game.hotkeys.pressed[i],
					isDown: false
				});
				
				if (keyPressData) {
					if (!keyPressData.error) {
						continue;
					}
				}
				
				this.disconnect((
					keyPressData ||
					{}
				).error || "connection lost");
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		render: function() {
			this.renderingData = game.socket.emit("rendering", {
				login: game.socket.login,
				sessionId: game.socket.sessionId
			});
			
			if (this.renderingData) {
				if (!this.renderingData.error) {
					//Render graphics
						for (var i = 0; i < this.renderingData.gfx.length; i++) {
							for (var j = 0; j < this.renderingData.gfx[i].length; j++) {
								switch (this.renderingData.gfx[i][j].type) {
									case "sprite":
										this.renderingData.gfx[i][j].texture = game.textures[
											this.renderingData.gfx[i][j].texture
										];
										
										break;
								}
							}
						}
					
					//Play sounds
						for (var i = 0; i < this.renderingData.sounds.length; i++) {
							game.sounds[this.renderingData.sounds[i]].play();
						}
					
					return this.renderingData.gfx;
				}
			}
			
			this.disconnect((
				this.renderingData ||
				{}
			).error || "connection lost");
			
			return [];
		}
};
