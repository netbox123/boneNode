#include <OneWire.h>
#include <Timer.h>
#include <Time.h>

int      delayTime = 100;                 // delay  

Timer    t;
OneWire  oneWireA (4) ;                   // on pin 4  Buffertank
OneWire  oneWireB (2) ;                   // on pin 2  Kachel - Buiten
int      myPins[54];                      // pin buffer
int      myPinDelay[54];                  // pin time for timed off
byte     pinByteRead;
char     pinCharRead;
String   pinNum1, pinNum2, sCommandString;
boolean  myPinSwitch = false;
char     VetusCharRead;
String   VetusContent1, VetusContent2;
boolean  myVetusSwitch = false;
String   bmv_V, bmv_I, bmv_CE, bmv_SOC, bmv_TTG, bmv_Alarm, bmv_Relay;
String   s_BU = "284bbd9440041", t_BU = "";
String   s_WK = "284bb954001d", t_WK = "";
String   s_K1 = "287fa94400f1", t_K1 = "";
String   s_K2 = "28d0a89540029", t_K2 = "";
String   s_B1 = "28c3869540071", t_B1 = "";
String   s_B2 = "2877df95400cc", t_B2 = "";
String   s_B3 = "283448954006", t_B3 = "";
String   s_G1 = "285b819540030", t_G1 = "";
String   s_G2 = "28d0995400d7", t_G2 = "";
unsigned long   nowTimesec;

void aqua()
{
  toffLamp(32,150);  // turn aqua on for 6 sec.
}

void setup()
{
  pinNum1 = ""; pinNum2 = "";
  int   count = 23;        //  OUTPUT startport
  while (count < 43)       //  OUTPUT endport (42)
  {
    pinMode(count, OUTPUT); digitalWrite(count, LOW);
    count++;
  }
  count = 43;              //  INPUT startport
  while (count < 54)       //  INPUT endport
  {
    pinMode(count, INPUT);
    count++;
  }
  Serial.begin(9600);     // for debugging
  Serial1.begin(9600);    // receive from RadxaRock 
  Serial2.begin(9600);    // Send to RadxaRock 
  Serial3.begin(19200);    // Vetus Accumonitor
  t.every(1000, SendSerial);
  t.every(1000, GetTempA);
  t.every(1000, GetTempB);
  t.every(1000, RunActions);
  t.every(30*60*1000, aqua); // aqua 
  StartupScript();
}

void loop()
{
  t.update();
  CheckSerial2(); // Radxa
  CheckSerial3(); // Vetus
  ReadInputs();
}

// ----------------------------------------------------

void RunActions()
{  
  nowTimesec = now();
  // loop trough outputs trough outputs to turn off toff items
  int count = 20;            //  OUTPUT startport
  while (count < 45)         //  OUTPUT endport
  {
    if (myPinDelay[count] > 0 & myPinDelay[count] < nowTimesec){
      digitalWrite(count, 0);
      myPins[count] = 0;
      myPinDelay[count] = 0;
    }
    count++;
  }
}

void StartupScript()
{
  digitalWrite(23, HIGH); myPins[23] = 1; delay(delayTime);
  digitalWrite(31, HIGH); myPins[31] = 1; delay(delayTime);
  digitalWrite(35, HIGH); myPins[35] = 1; delay(delayTime);
  digitalWrite(37, HIGH); myPins[37] = 1; delay(delayTime);
  digitalWrite(40, HIGH); myPins[40] = 1; delay(delayTime);
}

void CheckSerial2()
{
  if (Serial2.available()) {
    pinCharRead = Serial2.read();
    //Serial.print(pinCharRead);
    if (pinCharRead != '\n') {
      sCommandString.concat(pinCharRead);
    }

    if (pinCharRead == '\n') {
      receiveserialstring(sCommandString);
      sCommandString ="";
      while(Serial2.available()){
        Serial2.read();
      }
     } 
    
  }
}

void CheckSerial3()
{
  if (Serial3.available()) {
    VetusCharRead = Serial3.read();
    if (VetusCharRead != '\t' & VetusCharRead != '\n') {
      if (!myVetusSwitch) {
        VetusContent1.concat(VetusCharRead);
      } else {
        VetusContent2.concat(VetusCharRead);
      }
    }
    if (VetusCharRead == '\n') {
      VetusContent2.trim();
      if (VetusContent1 == "V")     {bmv_V = VetusContent2;};
      if (VetusContent1 == "I")     {bmv_I = VetusContent2;};
      if (VetusContent1 == "CE")    {bmv_CE = VetusContent2;};
      if (VetusContent1 == "SOC")   {bmv_SOC = VetusContent2;};
      if (VetusContent1 == "TTG")   {bmv_TTG = VetusContent2;};
      if (VetusContent1 == "Alarm") {bmv_Alarm = VetusContent2;};
      if (VetusContent1 == "Relay") {bmv_Relay = VetusContent2;};
      /* Reset the variables for the next round */
      VetusContent1 = "";VetusContent2 = "";myVetusSwitch = false;
      /*Listen for an tab sign (byte code \t) used as a delimiter */
    } else if (VetusCharRead == '\t') {
      myVetusSwitch = true;
    }
  }
}

void GetTempA() // Kachel - Buiten - Woonkamer
{
  byte i;
  byte present = 0;
  String theaddress = "";
  byte type_s;
  byte data[12];
  byte addr[8];
  float celsius, fahrenheit;
  String stringCelsius;
  static char strfbufferC[9];

  if ( !oneWireA.search(addr)) {
    oneWireA.reset_search();
    delay(250);
    return;
  }
  //Serial.print("ROM =");
  for ( i = 0; i < 8; i++) {
    //Serial.write(' ');
    //Serial.print(addr[i], HEX);
    theaddress.concat(String(addr[i], HEX));
  }
  //Serial.println(theaddress);
  oneWireA.reset();
  oneWireA.select(addr);
  oneWireA.write(0x44, 1);        // start conversion, with parasite power on at the end
  //delay(1000);     // maybe 750ms is enough, maybe not
  present = oneWireA.reset();
  oneWireA.select(addr);
  oneWireA.write(0xBE);         // Read Scratchpad
  for ( i = 0; i < 9; i++) {           // we need 9 bytes
    data[i] = oneWireA.read();
  }
  int16_t raw = (data[1] << 8) | data[0];
  if (type_s) {
    raw = raw << 3; // 9 bit resolution default
    if (data[7] == 0x10) {
      // "count remain" gives full 12 bit resolution
      raw = (raw & 0xFFF0) + 12 - data[6];
    }
  } else {
    byte cfg = (data[4] & 0x60);
    // at lower res, the low bits are undefined, so let's zero them
    if (cfg == 0x00) raw = raw & ~7;  // 9 bit resolution, 93.75 ms
    else if (cfg == 0x20) raw = raw & ~3; // 10 bit res, 187.5 ms
    else if (cfg == 0x40) raw = raw & ~1; // 11 bit res, 375 ms
    //// default is 12 bit resolution, 750 ms conversion time
  }
  celsius = (float)raw / 16.0;
  stringCelsius = String(celsius);
  if (theaddress == s_WK) {
    t_WK = stringCelsius;
  };
  if (theaddress == s_BU) {
    t_BU = stringCelsius;
  };
  if (theaddress == s_K1) {
    t_K1 = stringCelsius;
  };
  if (theaddress == s_K2) {
    t_K2 = stringCelsius;
  };
}

void GetTempB() // Buffertank - Generator
{
  byte i;
  byte present = 0;
  String theaddress = "";
  byte type_s;
  byte data[12];
  byte addr[8];
  float celsius, fahrenheit;
  String stringCelsius;
  static char strfbufferC[9];

  if ( !oneWireB.search(addr)) {
    oneWireB.reset_search();
    delay(250);
    return;
  }
  //Serial.print("ROM =");
  for ( i = 0; i < 8; i++) {
    //Serial.write(' ');
    //Serial.print(addr[i], HEX);
    theaddress.concat(String(addr[i], HEX));
  }
  //Serial.println(theaddress);
  oneWireB.reset();
  oneWireB.select(addr);
  oneWireB.write(0x44, 1);        // start conversion, with parasite power on at the end
  //delay(1000);     // maybe 750ms is enough, maybe not
  present = oneWireB.reset();
  oneWireB.select(addr);
  oneWireB.write(0xBE);         // Read Scratchpad
  for ( i = 0; i < 9; i++) {           // we need 9 bytes
    data[i] = oneWireB.read();
  }
  int16_t raw = (data[1] << 8) | data[0];
  if (type_s) {
    raw = raw << 3; // 9 bit resolution default
    if (data[7] == 0x10) {
      // "count remain" gives full 12 bit resolution
      raw = (raw & 0xFFF0) + 12 - data[6];
    }
  } else {
    byte cfg = (data[4] & 0x60);
    // at lower res, the low bits are undefined, so let's zero them
    if (cfg == 0x00) raw = raw & ~7;  // 9 bit resolution, 93.75 ms
    else if (cfg == 0x20) raw = raw & ~3; // 10 bit res, 187.5 ms
    else if (cfg == 0x40) raw = raw & ~1; // 11 bit res, 375 ms
    //// default is 12 bit resolution, 750 ms conversion time
  }
  celsius = (float)raw / 16.0;
  stringCelsius = String(celsius);
  if (theaddress == s_B1) {
    t_B1 = stringCelsius;
  };
  if (theaddress == s_B2) {
    t_B2 = stringCelsius;
  };
  if (theaddress == s_B3) {
    t_B3 = stringCelsius;
  };
  if (theaddress == s_G1) {
    t_G1 = stringCelsius;
  };
  if (theaddress == s_G2) {
    t_G2 = stringCelsius;
  };
}

void ReadInputs()
{
  int count = 42;            //  INPUT startport
  while (count < 54)         //  INPUT endport
  {
    int val = digitalRead(count);
    if( val != myPins[count]){
      if( val ){
        // on press
        Serial.println("On press" + String(count));
          if (count == 51){
            Serial.println("schakelaar >> home WK on");
            switchLamp(23,1);delay(delayTime);switchLamp(31,1);delay(delayTime);switchLamp(35,1);delay(delayTime);switchLamp(37,1);delay(delayTime);switchLamp(40,1);
          } else if (count == 45){
            Serial.println("toggle nachtlampje");
            toggleLamp(24);
          } else if (count == 46){
            Serial.println("Aqua on");
            switchLamp(32,1);
          } else if (count == 47){
            Serial.println("Aqua off");
            switchLamp(32,0);
          } else if (count == 48){
            Serial.println("toffLamp toilet");
            toffLamp(33,30);
          } else if (count == 49){
            Serial.println("nachtlampje >> all off");
            switchLamp(23,0);switchLamp(31,0);switchLamp(35,0);switchLamp(37,0);switchLamp(40,0);switchLamp(24,1);
            switchLamp(27,0);switchLamp(30,0);switchLamp(24,0);switchLamp(26,0);
          } else if (count == 52){
            Serial.println("butt_white >> boven aan");
            switchLamp(27,1);switchLamp(30,1);switchLamp(24,1);
          }
        } else {
        // On release
        Serial.println("On release" + String(count));
        if (count == 51){
          Serial.println("schakelaar >> away all off");
            switchLamp(23,0);delay(delayTime);switchLamp(31,0);delay(delayTime);switchLamp(35,0);delay(delayTime);switchLamp(37,0);delay(delayTime);switchLamp(40,0);delay(delayTime);switchLamp(24,0);
            switchLamp(27,0);switchLamp(30,0);switchLamp(24,0);switchLamp(26,0);
        } else {
        }
      }
      myPins[count] = val;
    }
    count++;
  }
}


void SendSerial()
{
  digitalWrite(38, HIGH); myPins[38] = 1;
  String json;
  json = "{\"due\":{\"step\":";
  json = json + String(nowTimesec);
  json = json + ",\"t_BU\":";
  json = json + t_BU;
  json = json + ",\"t_WK\":";
  json = json + t_WK;
  json = json + ",\"t_K1\":";
  json = json + t_K1;
  json = json + ",\"t_K2\":";
  json = json + t_K2;
  json = json + ",\"t_B1\":";
  json = json + t_B1;
  json = json + ",\"t_B2\":";
  json = json + t_B2;
  json = json + ",\"t_B3\":";
  json = json + t_B3;
  json = json + ",\"t_G1\":";
  json = json + t_G1;
  json = json + ",\"t_G2\":";
  json = json + t_G2;
  json = json + ",\"bmv_V\":";
  json = json + bmv_V;
  json = json + ",\"bmv_I\":";
  json = json + bmv_I;
  json = json + ",\"bmv_CE\":";
  json = json + bmv_CE;
  json = json + ",\"bmv_SOC\":";
  json = json + bmv_SOC;
  json = json + ",\"bmv_TTG\":";
  json = json + bmv_TTG;
  json = json + ",\"bmv_Alarm\":";
  json = json + "\"" + bmv_Alarm + "\"";
  json = json + ",\"bmv_Relay\":";
  json = json + "\"" + bmv_Relay + "\"";
  
  String valstr = "";
  int count = 20;            //  startport
  while (count < 54)         //  endport
  {
   valstr += myPins[count];
   count++;
  }
  json = json + ",\"pins\":";
  json = json + "\"" + valstr + "\"";
  json = json + "}}";
  //Serial.print(json);
  Serial2.println(json);
  //digitalWrite(38, LOW);
  //myPins[38] = 0;
}

void switchLamp(int deviceid, int onoff) {
  digitalWrite(deviceid, onoff);
  myPins[deviceid] = onoff;
}

void toggleLamp(int deviceid) {
  int val = digitalRead(deviceid);
  if (val){
    digitalWrite(deviceid, 0);
    myPins[deviceid] = 0;
  } else {
    digitalWrite(deviceid, 1);
    myPins[deviceid] = 1;
  }
}

void toffLamp(int deviceid, int sec) {
  myPinDelay[deviceid] = nowTimesec + sec;
  digitalWrite(deviceid, 1);
  myPins[deviceid] = 1;
}

// convert arduino String to int
int stringToInt(String string){
  char char_string[string.length()+1];
  string.toCharArray(char_string, string.length()+1);
  return atoi(char_string);
}

void receiveserialstring(String thestring) {
  Serial.println("thestring " + thestring);
  char* command = strtok(&thestring[0], ";");
  while (command != 0)
  {
    char* separator = strchr(command, '-');
    
    if (separator != 0)
    {
        *separator = 0;
        int cLampId = atoi(command);
        ++separator;
        char* sepvalue = strchr(separator, '-');
        *sepvalue = 0;
        String cAction = String(separator);
        ++sepvalue;
        int cValue = atoi(sepvalue);
        
        if (cAction == "on"){
          switchLamp(cLampId,1);
        } else if (cAction == "off") {
          switchLamp(cLampId,0);
        } else if (cAction == "toggle") {
          toggleLamp(cLampId);
        } else if (cAction == "toff") {
          toffLamp(cLampId, cValue);
        }
        
        Serial.println("cLampId " + String(cLampId) +" cAction " + cAction +" cValue " + String(cValue));
    }
    command = strtok(0, ";");
  }
}
