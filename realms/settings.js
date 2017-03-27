/*
 * Settings realm
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.settings = {
	//Secondary variables
		controls: [],
		selectedPage: 0,
		selectedControl: 0,
	
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
						
						game.currentRealm =
							game.realms.menu;
						
						break;
					case game.config.list.main.hotkeys.use:
						game.sounds.gui_click.play();
						
						if (this.controls[
							this.selectedPage
						][
							this.selectedControl
						].event) {
							this.controls[
								this.selectedPage
							][
								this.selectedControl
							].event();
						}
						
						break;
					case game.config.list.main.hotkeys.down:
						game.sounds.gui_scroll.play();
						
						if (
							this.selectedControl <
								this.controls[this.selectedPage].length - 1
						) {
							this.selectedControl++;
						} else {
							this.selectedControl = 0;
						}
						
						break;
					case game.config.list.main.hotkeys.left:
						game.sounds.gui_scroll.play();
						
						if (this.selectedPage > 0) {
							this.selectedPage--;
						} else {
							this.selectedPage =
								this.controls.length - 1;
						}
						this.selectedControl = 0;
						
						break;
					case game.config.list.main.hotkeys.up:
						game.sounds.gui_scroll.play();
						
						if (this.selectedControl > 0) {
							this.selectedControl--;
						} else {
							this.selectedControl =
								this.controls[this.selectedPage].length - 1;
						}
						
						break;
					case game.config.list.main.hotkeys.right:
						game.sounds.gui_scroll.play();
						
						if (this.selectedPage < this.controls.length - 1) {
							this.selectedPage++;
						} else {
							this.selectedPage = 0;
						}
						this.selectedControl = 0;
						
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
						game.textures.gui_settings,
					
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
						game.currentLocale.gui_settings_title,
					
					x: 160,
					y: 22
				},
				
				{
					type: "text",
					
					fontSize: 8,
					fontColor:
						game.colorScheme.text_light,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_settings_page +
						(this.selectedPage + 1) + "/" +
						this.controls.length,
					
					x: 160,
					y: 232
				}
			];
			
			for (var i = 0; i < this.controls[this.selectedPage].length; i++) {
				switch (this.controls[this.selectedPage][i].type) {
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
									this.controls[this.selectedPage][i].string,
								
								x: this.controls[this.selectedPage][i].x,
								y: this.controls[this.selectedPage][i].y
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
								
								x: this.controls[this.selectedPage][i].x,
								y: this.controls[this.selectedPage][i].y
							},
							
							{
								type: "text",
								
								fontSize: 12,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "center",
								
								string:
									this.controls[this.selectedPage][i].caption,
								
								x: this.controls[this.selectedPage][i].x + 60,
								y: this.controls[this.selectedPage][i].y + 15
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
								
								x: this.controls[this.selectedPage][i].x,
								y: this.controls[this.selectedPage][i].y
							},
							
							{
								type: "text",
								
								fontSize: 12,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "center",
								
								string:
									this.controls[this.selectedPage][i].caption,
								
								x: this.controls[this.selectedPage][i].x + 10,
								y: this.controls[this.selectedPage][i].y + 15
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
								
								x: this.controls[this.selectedPage][i].x,
								y: this.controls[this.selectedPage][i].y
							},
							
							{
								type: "text",
								
								fontSize: 12,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "center",
								
								string:
									this.controls[this.selectedPage][i].string.slice(0, 13),
								
								x: this.controls[this.selectedPage][i].x + 60,
								y: this.controls[this.selectedPage][i].y + 15
							}
						);
						
						break;
				}
			}
			
			return layer;
		}
};
