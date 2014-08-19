import sys  
import serial
import Adafruit_BBIO.UART as UART

# /dev/ttyO1 on pin 26 pinmux mode 0
UART.setup("UART5") 
ser = serial.Serial(port = "/dev/ttyO5", baudrate=19200)
ser.close()
ser.open()
x = 0
sr = ""
if ser.isOpen():
    while True:
        sr = ser.readline()
        print(sr)
        sys.stdout.flush()
        sr = ""
        	
                        