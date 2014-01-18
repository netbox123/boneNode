BoneNode a Beaglebone black remote
==============

A set of pages and scripts for the (http://beagleboard.org/Products/BeagleBone%20Black).
It my first Github projects, code is still a mess and not tested yet.
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

* adding (timed)events and controlscripts
* reorganize the structure
* cleaning the code 
* Serial in for my accu monitor 
* moving jqx out of the code 

