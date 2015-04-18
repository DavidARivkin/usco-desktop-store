desktop "store" for usco project : for use with drag & droped files etc

General information
-------------------
This repository contains both the:
- node.js version:
desktop-store.coffee in the src folder
- polymer.js/browser version which is a combo of
lib/desktop-store.js (browserified version of the above)
desktop-store.html


How to generate browser/polymer.js version (with require support):
------------------------------------------------------------------
Type: 

  grunt build-browser-lib
  

How to generate node.js version
----------------------

  coffee --bare -c -o dist src/desktop-store.coffee

This will generate the correct browser(ified) version of the source in the lib folder
