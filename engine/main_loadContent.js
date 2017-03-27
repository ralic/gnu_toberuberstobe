/*
 * Main module content content loading part
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.contentFolders = [
	"engine/main_addons/",
	
	"locales/",
	
	"realms/",
		"realms/settings_pages/",
		
		"realms/gameWorld_guiTypes/",
		"realms/gameWorld_backgroundTextures/",
		"realms/gameWorld_particleTypes/",
		"realms/gameWorld_itemTypes/",
		"realms/gameWorld_objectTypes/",
		"realms/gameWorld_biomeTypes/",
		"realms/gameWorld_achievementTypes/"
];

game.loadContent = function() {
	for (var i = 0; i < this.contentFolders.length; i++) {
		var currentFolderContents = [];
		try {
			currentFolderContents = fs.readdirSync(
				this.contentFolders[i]
			).filter(function(fileName) {
				if (fileName.indexOf(".js") + 1) {
					return true;
				}
				
				return false;
			});
		} catch(e) {
			alert(new ReferenceError(
				"can't load content folder " +
				this.contentFolders[i] +
				
				" (" + e + ")"
			));
		}
		
		for (var j = 0; j < currentFolderContents.length; j++) {
			try {
				new Function("", fs.readFileSync(
					this.contentFolders[i] +
					currentFolderContents[j],
				"utf-8"))();
			} catch(e) {
				alert(new ReferenceError(
					"can't load script " +
					this.contentFolders[i] +
					currentFolderContents[j] +
					
					" (" + e + ")"
				));
			}
		}
	}
};
