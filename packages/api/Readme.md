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

## Environment variables
| Name | Required | Default | Description |
| --- | --- | --- | --- |
| SERAIL_PORT| true | X | The serial port |
| LISTEN_PORT | false | 3000 | The listen port for server |
| DEBUG | false | false | Enable Debug log |
| MONGO_URL | true | undefined | The mongo URL to connection |