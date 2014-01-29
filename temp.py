import sys  
import serial
import Adafruit_BBIO.UART as UART

# /dev/ttyO1 on pin 26 pinmux mode 0
UART.setup("UART1") 
ser = serial.Serial(port = "/dev/ttyO1", baudrate=19200)
ser.close()
ser.open()
x = 0
sr = ""
if ser.isOpen():
    while True:
    	x = x+1
        sr += ser.readline()
        if x>23:
        	x = 0
        	print(sr)
        	sys.stdout.flush()
        	sr = ""
        	
                        