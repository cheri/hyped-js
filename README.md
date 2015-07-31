## What is HypedJS? 
HypedJS is a lightweight, open-source JavaScript tool that lets you quickly create and embed hypertext stories and experiences.

## How do I use HypedJS?
1. Fork and clone a local copy of the repo.

2. Skip to Step 3 if you want to view the demo.  Otherwise, continue to Step 2.

3. To make change the text, edit the demo.json file. This file contains data about each passage in your hypertext experience.

  * Each passage should have an identifying **title**, static text that describes the **scene**, and an array of **choices**.
  
  * A scene is an array of Strings, with each element being a separate paragraph in the scene. Each choice contains the text for that choice, and a reference (title) for the passage to which this choice should link.

  * The first passage displayed should have a title of **Start**.

4. Open the terminal / command line.

  * Change directory (cd) into the HypedJS folder.

  * Type **python -m SimpleHTTPServer** to get a simple server running. This will avoid cross-origin issues when reading the JSON file locally.

5. Open localhost:8000 in your web browser to view the result.


5) That's it! You can play around with the JS, CSS, and HTML to make it your own.

## Extra Magic 

# Setting Variables
You can set hidden variables with String or number values.  Somewhere inside your scene description, simply write **@@set PARAM-NAME to PARAM-VALUE@@**.

To retrieve and state the value for a parameter, use the command **@@get PARAM-NAME@@**. You can state a parameter value during a scene, or inside the text of a choice.

Examples:
* @@set hunger to full@@
* @@set potions to 3@@
* You have @@get potions@@ potions. 

# Conditional Statements
You can control what text the player will see based on the value of a variable by using a conditional, or if-statement.

When using an if-statement, the following operators ('OP') are supported: eq (equals), gt (greater than), lt (less than), geq (greater than or equal to), and leq (less than or equal to).

To use an if-statement, use the command **@@if PARAM-NAME OP VALUE@@**.  Then state the text that should appear if that expression is true.

Optionally, you may then write '@@else@@', and then state the text that should appear if the expression is false.

Finally, complete the if-statement with a terminating @@endif@@.

Examples: 
 * @@if hunger eq full@@You feel full.@@endif@@
 * @@if potions gt 0@@You have at least one potion to use.@@else@@You have no more potions.@@endif@@ 
