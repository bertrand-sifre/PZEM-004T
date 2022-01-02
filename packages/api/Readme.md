# API for PZEM-004T
An express server API for module PZEM-004T on a Serial Port.

# Features
* Getter and setter for all features of module.
* History tracking
* Change periodicity for tracking

## Routes
* GET /measurements
* GET /voltage
* GET /current
* GET /power
* GET /frequency
* GET /power-factor
* GET /alarm
* GET /alarm-thresold
* POST /alarm-thresold 
* GET /address
* POST /address
* POST /reset-energy
* POST /calibration