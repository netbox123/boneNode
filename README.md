# [BoneNode](http://georgeosddev.github.com/markdown-edit)

a webremote for BeagleboneBlack / RadxaRock etc.
* Receives switches, and sensors data serial 1/sec. from Arduino Due or BBB.
* Window and item data from mySQL or JSON.
* NodeJS rocks, this is 100% phpFree.

In the end this will be coolest remote ever.<br>

[![Screen Shot](https://raw.githubusercontent.com/netbox123/boneNode/master/Screenshot2.png)](https://github.com/netbox123/boneNode/blob/master/Screenshot2.png)

## INSTALLATION

Set these vars in app.js
```bash
var hasMySQL        = 1;                // Loading from: 0=jsonFile, 1=MySQL 
var hasBonescript   = 1;                // Bonescript: 0=no, 1=available
var runMode         = 0;                // Run mode: 0=normal, 1=demo mode
//----------------------------------------------------------------------------//
var serialPortDue   = '/dev/ttyO4';
var outputFilePath  = '/var/lib/cloud9/bbb_app/data/';
var tempdirectory   = '/sys/bus/w1/devices/';
```
start app.js

## Features

### Windows
* **Drag and Drop**.
* **Minimize, Maximize button**.
* **Close all, Show all**.
* **Resizing**.

### Window items
* **Drag and Drop**.
* **Move resize**.
* **New, Delete**.

### Sample project
This project is loaded with a sample project
login with youre browser 192.168.7.2:4000
Have fun!

### Version history
**0.1.6**
- Window items can be added and removed from client

**0.1.5**
- Window Log added.
- a Gauge for temperature readings.
- Switch added to the pageitems.

**0.1.4**
- Inputs state pushed to client
- Window Serial Monitor added.
- Starting without mySQL possible, reading data from JSON

**0.1.3**
- Saving window properties > Menu Window:Edit   
- Saving pegeitem properties > Menu Item:Edit  

**0.1.2**
- Moving a pageitem is pushed to other clients.
- removed the use of local connected GPIO's, serial in only. 

**0.1.1**
- Removed scrolling and jumping in one long page.

**0.1.0**
- Birth.