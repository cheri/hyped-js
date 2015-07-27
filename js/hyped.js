/**
 * Copyright (c) 2015 Sarah Harmon
 * 
 * This source code is free to use under the GNU General Public License (GPL) with author attribution.
 *
 **/

/* 
 * Creates a Passage object.
 * 
 * Parameters:
 	* Title: Passage name (String).
 	* Scene: Static text description of scene (String array - each element is a paragraph).
 	* Choices: List of choices for the passage (String array).
 */
function Passage(title,scene,choices){
	this.title = title;
	this.scene = scene;
	this.choices = choices;
}

Passage.prototype = {
	constructor:Passage,
	getTitle:function(){return this.title;},
	getScene:function(){return this.scene;},
	getChoices:function(){return this.choices;},
	
	setTitle:function(new_title){this.title=new_title;},
	setScene:function(new_scene){this.scene=new_scene;},
	setChoices:function(new_choices){this.choices=new_choices;},

	render:function(){
		// Check for commands.
		for(k=0;k<this.scene.length;k++){
			this.scene[k] = check_commands(this.scene[k]);
		}		

		// Show scene description.
		change_text_with_breaks('scene-description',this.scene);	

		// Show choice points.		
		var element = document.getElementById("choice-points");
		for (i=0; i<this.choices.list.length;i++){			
			// Check for commands in the current choice point.
			this.choices.list[i].text = check_commands(this.choices.list[i].text);

			// Show choice point.
			element.innerHTML +=  "<p class='choice-point' id="+ this.choices.list[i].link + " onClick='click_choice(this.id)'>" + this.choices.list[i].text + "</p>";
		}
	}
}

/*
 * Creates a Choices object.
 *
 * Parameters
 	* List: all choices (Choice array).
 */
 
function Choices(listOfChoices){
	this.list = listOfChoices;
}
Choices.prototype = {
	constructor:Choices,	
	
	addChoice:function(text,link){
		var ch = new Choice();		
		ch.text = text;
		ch.link = link;		
		this.list.push(ch);		
	}
}

/*
 * Creates a Choice object. 
 *
 * Parameters:
 	* Text: text for a choice (String).
 	* Link: name of the passage the choice leads to (String). 	
 */

function Choice(text,link){
	this.text = text;
	this.link = link;
}

Choice.prototype = {
	constructor:Choice
}


/*
 * When you click a choice, show the passage that follows.
 */
function click_choice(chosenLink){	
	// Clear choices shown on screen.
	document.getElementById("choice-points").innerHTML = "";

	// Display chosen passage.		
	passages[chosenLink].render();	
}

/* 
 * Change text for an element of a certain id.  
 * Each paragraph is represented as an element in the text array.
 */
function change_text_with_breaks(id, text_array){
	var text = "";

	// Add breaks after each text chunk.	
	for (var i = 0; i < text_array.length; i++) {
		text += text_array[i] + "<br /><br />"
	}

	// Remove final break.
	text = text.substring(0,text.length-6);

	// Change text for element of a certain id.
	document.getElementById(id).innerHTML = text;
}

/* 
 * Check for commands in scene description.
 */
function check_commands(text){
	// Make an array of all of the commands.	
	var re = /\@@(.*?)\@@/g;
	var commands = text.match(re);
	
	if (commands){
		// For each command,
		for (var i=0; i<commands.length; i++){
			// Trim @@ marker on both sides.
			commands[i] = commands[i].slice(2,-2);

			// Act on the command, if it does not modify the surrounding text.
			follow_command(commands[i]);
		}
		
		// If command was a request for a parameter value, state the value.
		text = text.replace(/\@@(get\s.*?)\@@/g, function(matched){  			
  			return store.get(matched.slice(6,-2));
		});		

		// Return text with commands removed.
		text = text.replace(re,"");
	}
	
	return text;
}

/*
 * Reads a string containing a command, and attempts
 * to follow the command, if the command is known.
 * 
 * Currently handles:
 *	- @@set PARAM to VALUE@@: Sets a variable to a number or string.
 */
function follow_command(text){
	// If the command is setting a parameter, do so.
	if (~text.indexOf("set ")){		
		// Determine parameter name.
		var setRemoved = text.slice(4);
		var firstSpace = setRemoved.indexOf(" ");
		var paramName = setRemoved.slice(0, firstSpace);

		// Determine parameter value.  
		var value = setRemoved.slice(paramName.length+4);

		// Set parameter to value.
		// Value may be a float (number) or a String.
		if (isNumeric(value)){
			store.set(paramName, parseFloat(value));						
		}
		else {
			store.set(paramName, value);				
		}
	}	
}

/* 
 * Check if an input String contains a number.
 */
function isNumeric(s) {
  return !isNaN(parseFloat(s)) && isFinite(s);
}
