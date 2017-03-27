/*
 * Settings realm controls page
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.settings.controls.push([
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_title;
		},
		
		x: 160,
		y: 37
	},
	
	//---
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_exit;
		},
		
		x: 98,
		y: 58
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.menu.toString();
		},
		
		x: 38,
		y: 66,
		
		event: function() {
			var value = prompt("", game.config.list.main.hotkeys.menu);
			
			if (value) {
				game.config.list.main.hotkeys.menu = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.menu =
					game.config.defaultList.main.hotkeys.menu;
			}
		}
	},
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_magic;
		},
		
		x: 222,
		y: 58
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.magic.toString();
		},
		
		x: 162,
		y: 66,
		
		event: function() {
			var value = prompt("", game.config.list.main.hotkeys.magic);
			
			if (value) {
				game.config.list.main.hotkeys.magic = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.magic =
					game.config.defaultList.main.hotkeys.magic;
			}
		}
	},
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_use;
		},
		
		x: 98,
		y: 102
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.use.toString();
		},
		
		x: 38,
		y: 110,
		
		event: function() {
			var value = prompt("", game.config.list.main.hotkeys.use);
			
			if (value) {
				game.config.list.main.hotkeys.use = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.use =
					game.config.defaultList.main.hotkeys.use;
			}
		}
	},
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_use2;
		},
		
		x: 222,
		y: 102
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.useOther.toString();
		},
		
		x: 162,
		y: 110,
		
		event: function() {
			var value = prompt("", game.config.list.main.hotkeys.useOther);
			
			if (value) {
				game.config.list.main.hotkeys.useOther = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.useOther =
					game.config.defaultList.main.hotkeys.useOther;
			}
		}
	},
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_left;
		},
		
		x: 98,
		y: 146
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.left.toString();
		},
		
		x: 38,
		y: 154,
		
	event: function() {
			var value = prompt("", game.config.list.main.hotkeys.left);
			
			if (value) {
				game.config.list.main.hotkeys.left = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.left =
					game.config.defaultList.main.hotkeys.left;
			}
		}
	},
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_right;
		},
		
		x: 222,
		y: 146
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.right.toString();
		},
		
		x: 162,
		y: 154,
		
		event: function() {
			var value = prompt("", game.config.list.main.hotkeys.right);
			
			if (value) {
				game.config.list.main.hotkeys.right = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.right =
					game.config.defaultList.main.hotkeys.right;
			}
		}
	},
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_up;
		},
		
		x: 98,
		y: 190
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.up.toString();
		},
		
		x: 38,
		y: 198,
		
		event: function() {
			var value = prompt("", game.config.list.main.hotkeys.up);
			
			if (value) {
				game.config.list.main.hotkeys.up = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.up =
					game.config.defaultList.main.hotkeys.up;
			}
		}
	},
	
	{
		type: "text",
		
		get string() {
			return game.currentLocale.gui_settings_controls_down;
		},
		
		x: 222,
		y: 190
	},
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.hotkeys.down.toString();
		},
		
		x: 162,
		y: 198,
		
		event: function() {
			var value = prompt("", game.config.list.main.hotkeys.down);
			
			if (value) {
				game.config.list.main.hotkeys.down = value;
			} else if (value == "") {
				game.config.list.main.hotkeys.down =
					game.config.defaultList.main.hotkeys.down;
			}
		}
	}
]);
