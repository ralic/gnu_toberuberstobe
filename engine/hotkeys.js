/*
 * Hotkeys module
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.hotkeys = {
	//Secondary variables
		pressed: [],
		released: [],
	
	//Methods
		catch: function(keyCode, isDown) {
			[
				this.released,
				this.pressed
			][+isDown].push(keyCode);
		}
};
