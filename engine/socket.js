/*
 * Socket module
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.socket = {
	//Secondary variables
		
	
	//Methods
		emit: function(event, data) {
			var xhr = new XMLHttpRequest();
			
			xhr.open("POST", this.host, false);
			xhr.overrideMimeType("application/json");
			
			data.event = event;
			try {
				xhr.send(JSON.stringify(data));
				
				return JSON.parse(xhr.responseText);
			} catch(e) {
				return null;
			}
		}
};
