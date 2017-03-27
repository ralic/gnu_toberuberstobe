/*
 * Settings realm language page
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
			return game.currentLocale.gui_settings_language_title;
		},
		
		x: 160,
		y: 37
	},
	
	//---
	
	{
		type: "textField",
		
		get string() {
			return game.config.list.main.locale;
		},
		
		x: 100,
		y: 45,
		
		event: function() {
			var value = prompt("", game.config.list.main.locale);
			
			if (value) {
				game.config.list.main.locale = value;
			} else if (value == "") {
				game.config.list.main.locale =
					game.config.defaultList.main.locale;
			}
		}
	},
	
	{
		type: "text",
		
		string: "English (USA)",
		
		x: 160,
		y: 81,
		
		event: function() {
			game.config.list.main.locale = "en_US";
		}
	},
	{
		type: "text",
		
		string: "Русский (Россия)",
		
		x: 160,
		y: 93,
		
		event: function() {
			game.config.list.main.locale = "ru_RU";
		}
	},
	{
		type: "text",
		
		string: "日本語（日本）",
		
		x: 160,
		y: 109,
		
		event: function() {
			game.config.list.main.locale = "ja_JP";
		}
	}
]);
