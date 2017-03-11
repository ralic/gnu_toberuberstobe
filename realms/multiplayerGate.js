/*
 * Multiplayer gate realm
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.multiplayerGate = {
	//Secondary variables
		controls: [
			{
				type: "text",
				
				get string() {
					return game.curLocale.gui_multiplayerGate_login;
				},
				
				x: 160,
				y: 73
			},
			{
				type: "textField",
				
				get string() {
					return game.realms.multiplayerGate.login;
				},
				
				x: 100,
				y: 77,
				
				event: function() {
					var value = prompt("", game.realms.multiplayerGate.login);
					
					if (value) {
						game.realms.multiplayerGate.login = value;
					} else if (value == "") {
						game.realms.multiplayerGate.login =
							"";
					}
				}
			},
			
			{
				type: "text",
				
				get string() {
					return game.curLocale.gui_multiplayerGate_serverIp;
				},
				
				x: 160,
				y: 140
			},
			{
				type: "textField",
				
				get string() {
					return game.realms.multiplayerGate.serverIp;
				},
				
				x: 100,
				y: 144,
				
				event: function() {
					var value = prompt("", game.realms.multiplayerGate.serverIp);
					
					if (value) {
						game.realms.multiplayerGate.serverIp = value;
					} else if (value == "") {
						game.realms.multiplayerGate.serverIp =
							"127.0.0.1";
					}
				}
			},
			
			{
				type: "button",
				
				get caption() {
					return game.curLocale.gui_multiplayerGate_connect;
				},
				
				x: 100,
				y: 212,
				
				event: function() {
					game.socket.login = game.realms.multiplayerGate.login;
					game.socket.host =
						"http://" +
						game.realms.multiplayerGate.serverIp;
					
					var loginData = game.socket.emit("connection", {
						login: game.socket.login
					});
					
					if (loginData) {
						if (loginData.isAllowed) {
							game.socket.sessionId = loginData.sessionId;
							
							game.curRealm =
								game.realms.multiplayerWorld;
							
							return;
						}
					}
					
					game.realms.multiplayerWorld.disconnect((
						loginData ||
						{}
					).reason || "no connection");
				}
			}
		],
		selectedControl: 0,
		
		login: "",
		serverIp: "127.0.0.1",
	
	//Methods
		update: function() {
			this.handleHotkeys();
			
			return [
				this.renderBase(),
				this.renderControls()
			];
		},
		
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				switch (game.hotkeys.pressed[i]) {
					case game.config.list.main.hotkeys.menu:
						game.sounds.gui_click.play();
						
						game.config.write("main");
						
						game.curRealm =
							game.realms.menu;
						
						break;
					case game.config.list.main.hotkeys.use:
						game.sounds.gui_click.play();
						
						if (this.controls[this.selectedControl].event) {
							this.controls[this.selectedControl].event();
						}
						
						break;
					case game.config.list.main.hotkeys.down:
						game.sounds.gui_scroll.play();
						
						if (
							this.selectedControl <
								this.controls.length - 1
						) {
							this.selectedControl++;
						} else {
							this.selectedControl = 0;
						}
						
						break;
					case game.config.list.main.hotkeys.up:
						game.sounds.gui_scroll.play();
						
						if (this.selectedControl > 0) {
							this.selectedControl--;
						} else {
							this.selectedControl =
								this.controls.length - 1;
						}
						
						break;
				}
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		renderBase: function() {
			return [
				{
					type: "sprite",
					
					texture:
						game.textures.gui_multiplayerGate,
					
					x: 0,
					y: 0
				}
			];
		},
		renderControls: function() {
			var layer = [
				{
					type: "text",
					
					fontSize: 16,
					fontColor:
						game.colorScheme.text_light,
					textAlign: "center",
					
					string:
						game.curLocale.gui_multiplayerGate_title,
					
					x: 160,
					y: 22
				}
			];
			
			for (var i = 0; i < this.controls.length; i++) {
				switch (this.controls[i].type) {
					case "text":
						layer.push(
							{
								type: "text",
								
								fontSize: 10,
								fontColor: [
									game.colorScheme.text_light,
									game.colorScheme.text_selected
								][+(i == this.selectedControl)],
								textAlign: "center",
								
								string:
									this.controls[i].string,
								
								x: this.controls[i].x,
								y: this.controls[i].y
							}
						);
						
						break;
					case "button":
						layer.push(
							{
								type: "sprite",
								
								texture: [
									game.textures.gui_button,
									game.textures.gui_button_selected
								][+(i == this.selectedControl)],
								
								x: this.controls[i].x,
								y: this.controls[i].y
							},
							
							{
								type: "text",
								
								fontSize: 12,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "center",
								
								string:
									this.controls[i].caption,
								
								x: this.controls[i].x + 60,
								y: this.controls[i].y + 15
							}
						);
						
						break;
					case "squareButton":
						layer.push(
							{
								type: "sprite",
								
								texture: [
									game.textures.gui_squareButton,
									game.textures.gui_squareButton_selected
								][+(i == this.selectedControl)],
								
								x: this.controls[i].x,
								y: this.controls[i].y
							},
							
							{
								type: "text",
								
								fontSize: 12,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "center",
								
								string:
									this.controls[i].caption,
								
								x: this.controls[i].x + 10,
								y: this.controls[i].y + 15
							}
						);
						
						break;
					case "textField":
						layer.push(
							{
								type: "sprite",
								
								texture: [
									game.textures.gui_textField,
									game.textures.gui_textField_selected
								][+(i == this.selectedControl)],
								
								x: this.controls[i].x,
								y: this.controls[i].y
							},
							
							{
								type: "text",
								
								fontSize: 12,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "center",
								
								string:
									this.controls[i].string.slice(0, 13),
								
								x: this.controls[i].x + 60,
								y: this.controls[i].y + 15
							}
						);
						
						break;
				}
			}
			
			return layer;
		}
};
