//#include <OneWire.h>
#include "SimpleBLE.h"

SimpleBLE ble;
String beaconMsg = "LEDGPS";

void setup() {
    Serial.begin(9600);
    Serial.setDebugOutput(true);
}

void loop() {
    float value = getValue();
//    Serial.println(value);
//    beaconMsg = "ESP"+String(value);
    Serial.println("bluetooth on");
    ble.begin(beaconMsg);
}

float getValue(){
  float sensorValue;
  
  //Enter your code to get sensorValues here....
  
  return sensorValue;  //returns the value that gets displayed in the app
}
