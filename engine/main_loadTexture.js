/*
 * Main module textures loading part
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.loadTexture = function(pathToImage) {
	var imageElement = new Image();
	imageElement.src = pathToImage;
	imageElement.relativeSrc = pathToImage;
	
	imageElement.addEventListener("load", function() {
		game.loadedTexturesCount++;
	});
	imageElement.addEventListener("error", function() {
		alert(new ReferenceError(
			"can't load texture " +
			this.relativeSrc
		));
		
		game.loadedTexturesCount++;
	});
	
	return imageElement;
};
