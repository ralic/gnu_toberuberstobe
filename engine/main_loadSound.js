/*
 * Main module sounds loading part
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.loadSound = function(pathToAudioFile) {
	var audioElement = new Audio();
	audioElement.src = pathToAudioFile;
	audioElement.relativeSrc = pathToAudioFile;
	
	audioElement.addEventListener("canplay", function() {
		game.loadedSoundsCount++;
	});
	audioElement.addEventListener("error", function() {
		alert(new ReferenceError(
			"can't load sound " +
			this.relativeSrc
		));
		
		game.loadedSoundsCount++;
	});
	
	return audioElement;
};
