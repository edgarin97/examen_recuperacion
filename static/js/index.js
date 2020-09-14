//https://www.eclipse.org/paho/clients/js/
var menret;
// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "edgaraguagalloeym@hotmail.com",
    password: "edgar321",
    onSuccess:onConnect,
    onFailure:doFail
  }
  // connect the client
  client.connect(options);
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
    client.subscribe("edgaraguagalloeym@hotmail.com/test1");
  }
  function doFail(e){
    console.log(e);
  }
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
  // called when a message arrives
/*  function onMessageArrived(message) {
    menret=message.payloadString;
    console.log(menret);
    resul(menret);
  }*/

function onMessageArrived(message) {
    console.log("new sms: "+message.payloadString);
    document.getElementById("resu").value=message.payloadString

}
function suma() {
	var n1=document.getElementById("num1");
	var n2=document.getElementById("num2");
	sms="numero1:"+n1.value+":numero2:"+n2.value+":S";
  envpro(sms) 
}
function resta() {
	var n1=document.getElementById("num1");
	var n2=document.getElementById("num2");
	sms="numero1:"+n1.value+":numero2:"+n2.value+":R";
  envpro(sms)

}
/*function resul(){
	var result=document.getElementById("resul")
    re=mensaje.split("");
    if(re[0]=="suma"){
    resul.value=parseInt(re[1])
    if(resul.value==0){
      aviso.innerHTML="ingrese valores"
    }
  } 
    suma();
    re=mensaje.split("");
    if(re[0]=="resta"){
    resul.value=parseInt(re[1])
    if(resul.value==0){
      aviso.innerHTML="ingrese valores"
    }
  } 
    resta();
}
*/
function envpro(toSend){
  console.log(toSend);
  message = new Paho.MQTT.Message(toSend);
  message.destinationName = "edgaraguagalloeym@hotmail.com/test";
  client.send(message);
}
  
