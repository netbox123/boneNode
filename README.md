BoneNode a Beaglebone black remote
==============

A set of pages and scripts for the (http://beagleboard.org/Products/BeagleBone%20Black).
It my first Github project, code is still a mess and not tested yet.
This is for
   * HMI interfacing the BBB
   * learning jqx widgets and how to get rid of them ;)
   * Arduino is great, the BBB changed everything, NodeJS rocks.

In the end this will be coolest remote ever.

This is far from stable!

INSTALLATION
------------
- Get MySql, php working on the BBB
- Install phpMyAdmin, load the nodesql.sql database
- Install Dallas one-wire temperature reading http://hipstercircuits.com/dallas-one-wire-temperature-reading-on-beaglebone-black-with-dto/
- Move all the files to the var/lib/cloud9 directory on the BBB
- start app.js
- console log should be something like this:
  info: socket.io started 
  Loading database into array...
  Server listening on 192.168.1.41:4000
  
- if you get a file read error, you've forgotten to change the dallas temperature ID's 

SAMPLE PROJECT
--------------

login with youre browser 192.168.1.41:4000
Have fun!


TODO
----

Stuff to do:

* reorganize the structure
* cleaning the code 
* moving jqx out of the code 
* Building the windows really dynamic, and scrolling
* starting echo BB-W1:00A0 > /sys/devices/bone_capemgr.9/slots automatic
* getting the time from the browser when it is not set.
* adding alarms on temperatures and accu monitor

Done
----

History:

* 7 times/2 sec I read the temperature files, want that to move that to python. 
* Splitted the getTemperatures(2sec) loop from the getSerial (1sec) loop
* Buttons(inputs) switch to ground, added inverse mode (for the PIR sensors)
* SerialPort works in Python, each 23 packets (approx 1 sec) read in nodejs.
* Added timed-timed-off action. e.g. 7-toff-10 turns on device 7 and off after 10 sec.
* Added toggle action e.g. 25-toggle-xx toggles device 25
* ActionScripts work  4-on-100;16-off-0 turns device 4 on, 16 off
* an Input(key,button or PIR) triggers an actionscript.
* moving jqx out of the code 
