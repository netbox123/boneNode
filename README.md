BoneNode a webremote for BeagleboneBlack / RadxaRock etc.
==============
   * Receives switches, and sensors data serial 1/sec. from Arduino Due or BBB.
   * Window and item data from mySQL or JSON.
   * NodeJS rocks, this is 100% phpFree.
In the end this will be coolest remote ever.


INSTALLATION
------------
- Set the hasMySQL, hasBonescript and runMode variables in app.js
- start app.js


SAMPLE PROJECT
--------------
This project is loaded with a sample project
login with youre browser 192.168.7.2:4000
Have fun!


VERSION HISTORY
--------------
0.1.5
- Window Log added.
- a Gauge for temperature readings.
- Switch added to the pageitems.
--------------
0.1.4
- Inputs state pushed to client
- Window Serial Monitor added.
- Starting without mySQL possible, reading data from JSON
--------------
0.1.3
- Saving window properties > Menu Window:Edit   
- Saving pegeitem properties > Menu Item:Edit   
--------------
0.1.2
- Moving a pageitem is pushed to other clients.
- removed the use of local connected GPIO's, serial in only. 
--------------
0.1.1
- Removed scrolling and jumping in one long page.
--------------
0.1.0
- Birth. 


Stuff to do:

* Isolating MySQL code, for running this on Heroku without changes.
* cleaning the code, as always.
