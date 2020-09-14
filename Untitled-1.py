import paho.mqtt.client as mqtt
import time
mqttc=mqtt.Client()
numero1=0
numero2=0
sms=""
inf=""
i=0
def on_message(client,obj,msg):
    sms=(msg.payload.decode('utf-8'))
    obtenerNums(sms)

def obtenerNums(sms):
    global mqttc,i
    valores=sms.split(":")
    dat1=int(valores[1])
    dat2=int(valores[3])
    if(valores[4]=="S"):
        result=dat1+dat2
        text="Operacion Suma: "+str(dat1)+"+"+str(dat2)+"="+str(result)
    if(sms.split(":")[4]=="R"):
        result=dat1-dat2
        text="Operacion Resta: "+str(dat1)+"-"+str(dat2)+"="+str(result)
    mqttc.publish("edgaraguagalloeym@hotmail.com/test1",str(result))
    
    i=i+1
    guardarOperacion(text)
    print(str(result))

def guardarOperacion(info):
    file=open("operaciones.txt","a")
    file.write(info)
    file.close()

def main():
    global sms,mqttc
    mqttc.on_message=on_message
    mqttc.username_pw_set("edgaraguagalloeym@hotmail.com","edgar321")
    mqttc.connect("maqiatto.com",1883)
    mqttc.subscribe("edgaraguagalloeym@hotmail.com/test",0)
    mqttc.publish("edgaraguagalloeym@hotmail.com/test1","hola")
     
    rc=0
    print("inicio..")
    
    while rc==0:
        
        rc=mqttc.loop()
        #mqttc.publish("edgaraguagalloeym@hotmail.com/test1","sensor="+str(i))