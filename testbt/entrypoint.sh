#!/bin/bash

# start services
service dbus start
service bluetooth start

# start application
# node build/index.js
npm run start

