/**
 *  Modbus slave example 2:
 *  The purpose of this example is to link the Arduino digital and analog
 *	pins to an external device.
 *
 *  Recommended Modbus Master: QModbus
 *  http://qmodbus.sourceforge.net/
 */

#include <ModbusRtu.h>
#include <SoftwareSerial.h>

#define ID   129

SoftwareSerial serial(4, 7); // RX, TX
Modbus slave(ID); // Modbus slave(ID, 0, 0); // this is slave ID and RS-232 or USB-FTDI
boolean led;
int8_t state = 0;
unsigned long tempus;

// data array for modbus network sharing
uint16_t au16data[17];

/**
 *  Setup procedure
 */
void setup() {
  io_setup(); // I/O settings
  // start communication
  slave.begin( &serial, 115200 ); // slave.begin( 115200 );
  tempus = millis() + 100;
  digitalWrite(13, HIGH );
}

/**
 *  Loop procedure
 */
void loop() {
  // poll messages
  // blink led pin on each valid message
  state = slave.poll( au16data, 17);

  if (state > 4) {
    tempus = millis() + 50;
    digitalWrite(13, HIGH);
  }
  if (millis() > tempus) digitalWrite(13, LOW );

  // link the Arduino pins to the Modbus array
  io_poll();
} 

/**
 * pin maping:
 * 2 - digital input
 * 3 - analog output
 * 4 - software rx / digital input
 * 5 - analog output
 * 6 - analog output
 * 7 - software tx / digital input
 * 8 - digital input
 * 9 - analog output
 * 10 - analog output
 * 11 - analog output
 * 12 - digital output
 * 13 - digital output
 * 14 - analog input
 * 15 - analog input
 * 16 - analog input
 * 17 - analog input
 * 18 - analog input
 * 19 - analog input
 *
 * pin 13 is reserved to show a successful query
 */
void io_setup() {
  // define i/o
  pinMode(2, INPUT);
//  pinMode(4, INPUT);
//  pinMode(7, INPUT);
  pinMode(8, INPUT);

  pinMode(3, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);

  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);

  analogWrite(3, 0 );
  analogWrite(5, 0 );
  analogWrite(6, 0 );
  analogWrite(9, 0 );
  analogWrite(10, 0 );
  analogWrite(11, 0 );

  digitalWrite(12, LOW );
  digitalWrite(13, HIGH );// this is for the UNO led pin

  au16data[0] = ID;
//  io_setid();
}

/**
 *  Link between the Arduino pins and the Modbus array
 */
void io_poll() {
//  io_setid();

  // set digital outputs -> au16data[1]
  digitalWrite( 12, bitRead( au16data[1], 0 ));
//  digitalWrite( 13, bitRead( au16data[1], 1 ));

  // set analog outputs
  analogWrite( 3, au16data[2] );
  analogWrite( 5, au16data[3] );
  analogWrite( 6, au16data[4] );
  analogWrite( 9, au16data[5] );
  analogWrite( 10, au16data[6] );
  analogWrite( 11, au16data[7] );

  // read analog inputs
  au16data[8] = analogRead( 0 );
  au16data[9] = analogRead( 1 );
  au16data[10] = analogRead( 2 );
  au16data[11] = analogRead( 3 );
  au16data[12] = analogRead( 4 );
  au16data[13] = analogRead( 5 );

  // diagnose communication
  au16data[14] = slave.getInCnt();
  au16data[15] = slave.getOutCnt();
  au16data[16] = slave.getErrCnt();
}

void io_setid() {
  // get digital inputs -> au16data[0]
  bitWrite( au16data[0], 0, digitalRead( 2 ));
  bitWrite( au16data[0], 1, digitalRead( 4 ));
  bitWrite( au16data[0], 2, digitalRead( 7 ));
  bitWrite( au16data[0], 3, digitalRead( 8 ));
  slave.setID( au16data[0] );
}

