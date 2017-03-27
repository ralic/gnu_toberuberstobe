/*
 * Game world realm dairy GUI type
 * Copyright 2016, 2017 William Lupshenko
 * 
 * This file is a part of ToberUberStobe
 * 
 * ToberUberStobe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the license, or
 * (at your option) any later version
 */

game.realms.gameWorld.guiTypes.dairy = {
	//Secondary variables
		data: {
			selectedPage: 0
		},
		defaultData: {
			selectedPage: 0
		},
		
		get allAchievementTypes() {
			return Object.keys(
				game.realms.gameWorld.achievementTypes
			).map(function(currentValue) {
				return game.realms.gameWorld.achievementTypes[currentValue];
			});
		},
	
	//Methods
		handleHotkeys: function() {
			for (var i = 0; i < game.hotkeys.pressed.length; i++) {
				switch (game.hotkeys.pressed[i]) {
					case game.config.list.main.hotkeys.menu:
						game.sounds.gui_click.play();
						
						game.realms.gameWorld.currentGuiType =
							game.realms.gameWorld.guiTypes.default;
						
						break;
					case game.config.list.main.hotkeys.left:
						game.sounds.gui_scroll.play();
						
						if (this.data.selectedPage > 0) {
							this.data.selectedPage--;
						} else {
							this.data.selectedPage = Math.ceil(
								this.allAchievementTypes.length / 4
							) - 1;
						}
						
						break;
					case game.config.list.main.hotkeys.right:
						game.sounds.gui_scroll.play();
						
						if (
							(this.data.selectedPage + 1) < Math.ceil(
								this.allAchievementTypes.length / 4
							)
						) {
							this.data.selectedPage++;
						} else {
							this.data.selectedPage = 0;
						}
						
						break;
				}
			}
			
			game.hotkeys.pressed.length = 0;
			game.hotkeys.released.length = 0;
		},
		
		render: function() {
			var layer = [
				{
					type: "sprite",
					
					texture:
						game.textures.gui_gameWorld_dairy,
					
					x: 0,
					y: 0
				},
				
				{
					type: "text",
					
					fontSize: 6,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "center",
					
					string:
						game.currentLocale.gui_gameWorld_dairy_title,
					
					x: 160,
					y: 68
				},
				
				{
					type: "text",
					
					fontSize: 6,
					fontColor:
						game.colorScheme.text_dark,
					textAlign: "right",
					
					string:
						game.currentLocale.gui_settings_page +
						(this.data.selectedPage + 1) + "/" +
						Math.ceil(this.allAchievementTypes.length / 4),
					
					x: 237,
					y: 68
				}
			];
			
			//Render achievements
				for (
					var i = this.data.selectedPage * 4;
					i < this.data.selectedPage * 4 + 4;
					i++
				) {
					if (this.allAchievementTypes[i]) {
						layer.push(
							{
								type: "sprite",
								
								texture:
									this.allAchievementTypes[i].icon,
								
								x: [
									93,
									167,
									93,
									167
								][i - this.data.selectedPage * 4],
								y: [
									73,
									73,
									127,
									127
								][i - this.data.selectedPage * 4]
							},
							
							{
								type: "text",
								
								fontSize: 6,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "left",
								
								string:
									this.allAchievementTypes[i].title,
								
								x: [
									111,
									185,
									111,
									185
								][i - this.data.selectedPage * 4],
								y: [
									84,
									83,
									138,
									138
								][i - this.data.selectedPage * 4]
							},
							{
								type: "text",
								
								fontSize: 4,
								fontColor:
									game.colorScheme.text_dark,
								textAlign: "center",
								
								string:
									this.allAchievementTypes[i].whatToDo,
								
								x: [
									123,
									197,
									123,
									197
								][i - this.data.selectedPage * 4],
								y: [
									97,
									97,
									151,
									151
								][i - this.data.selectedPage * 4]
							},
							{
								type: "text",
								
								fontSize: 6,
								fontColor: [
									game.colorScheme.text_bad,
									game.colorScheme.text_good
								][+(
									Object.keys(
										game.realms.gameWorld.achievementTypes
									)[i] in
										game.realms.gameWorld.playerObject.achievements
								)],
								textAlign: "center",
								
								string: [
									game.currentLocale.gui_gameWorld_dairy_achievements_uncompleted,
									game.currentLocale.gui_gameWorld_dairy_achievements_completed
								][+(
									Object.keys(
										game.realms.gameWorld.achievementTypes
									)[i] in
										game.realms.gameWorld.playerObject.achievements
								)],
								
								x: [
									123,
									197,
									123,
									197
								][i - this.data.selectedPage * 4],
								y: [
									110,
									110,
									164,
									164
								][i - this.data.selectedPage * 4]
							}
						);
					}
				}
			
			return layer;
		}
};
