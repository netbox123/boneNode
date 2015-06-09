# [BoneNode](http://georgeosddev.github.com/markdown-edit)

a webremote for BeagleboneBlack / RadxaRock etc.
* Receives switches, and sensor data serial 1/sec. from Arduino Due or BBB.
* Window and item data from mySQL or JSON.
* NodeJS rocks, this is 100% phpFree.
* IPad ready.

In the end this will be coolest remote ever.<br>

Safari client 
[![Screen Shot](https://raw.githubusercontent.com/netbox123/boneNode/master/Screenshots/Screenshot2.png)](https://github.com/netbox123/boneNode/blob/master/Screenshots/Screenshot2.png)

Mobile client
[![Screen Shot](https://raw.githubusercontent.com/netbox123/boneNode/master/Screenshots/ScreenshotMobi.png)](https://github.com/netbox123/boneNode/blob/master/Screenshots/ScreenshotMobi.png)

HTML client<br>
[![Screen Shot](https://raw.githubusercontent.com/netbox123/boneNode/master/Screenshots/ScreenshotHtml.png)](https://github.com/netbox123/boneNode/blob/master/Screenshots/ScreenshotHtml.png)

OSX client (workable beta version)<br>
[![Screen Shot](https://raw.githubusercontent.com/netbox123/boneNode/master/Screenshots/Screenshot7.png)](https://github.com/netbox123/boneNode/blob/master/Screenshots/Screenshot7.png)
## INSTALLATION

Set these vars in app.js
```bash
var hasMySQL        = 1;                // Loading from: 0=jsonFile, 1=MySQL 
var hasBonescript   = 1;                // Bonescript: 0=no, 1=available
var runMode         = 0;                // Run mode: 0=normal, 1=demo mode
//----------------------------------------------------------------------------//
var serialPortDue   = '/dev/ttyO4';
var outputFilePath  = '/var/lib/cloud9/bbb_app/data/';
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

**0.3.1**
- URL encoding added 

**0.3.0**
- OSX client workable.
- Changed editing the server from socket to URL

**0.2.3**
- Loading JSon into NSTableView finally works

**0.2.2**
- Birth of OSX Client

**0.2.1**
- Touch client Devices and Actions work now.
- You can reach the touch client with: 192.168.7.2:4000/mobi

**0.2.0**
- jqx dependancies removed.
- beginning of a touch client

**0.1.9**
- Layout update after socket reconnect

**0.1.8**
- code and css cleanup session 
- added 'Safari' window for offline viewing pdf's from Beaglebone
- added 'Safari' window for browsing without leaving app.

**0.1.7**
- Live charts for power and temperatures

**0.1.6**
- the Dock on/off can be saved in preferences window
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
- fullscreen on IPad, user-scaling/scrolling off

**0.1.2**
- Moving a pageitem is pushed to other clients.
- removed the use of local connected GPIO's, serial in only. 

**0.1.1**
- Removed scrolling and jumping in one long page.

**0.1.0**
- Birth.