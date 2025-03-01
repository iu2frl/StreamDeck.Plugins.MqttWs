function sendMqtt(jsonObj, broker, port, username, password, ssl, clientid, topic, msg, retain) {
    if(clientid == "") {
        clientid = makeId(8);
    }
    
    client = new Paho.MQTT.Client(broker, Number(port), clientid);
    client.connect({ 
        onSuccess: () =>
        {
            message = new Paho.MQTT.Message(msg);
            message.destinationName = topic;
            message.retained = retain === "true" ? true : false;
            
            client.send(message);

            $SD.api.showOk(jsonObj);

            client.disonnect();

            return;
        },
        onFailure: () =>
        {
            $SD.api.showAlert(jsonObj);
        },
        timeout: 5,
        useSSL: ssl === "true" ? true : false,
        userName: username ? username : "",
        password: password ? password : ""
    });
}

$SD.on('connected', (jsonObj) => connected(jsonObj));

function connected(jsonObj) {
    console.log(`[connected] ${JSON.stringify(jsonObj)}`);
    // Register button actions
    $SD.on('com.iu2frl.mqtt.btnAction.willAppear', (jsonObj) => action.onWillAppear(jsonObj));
    $SD.on('com.iu2frl.mqtt.btnAction.keyDown', (jsonObj) => action.onKeyDown(jsonObj));
    $SD.on('com.iu2frl.mqtt.btnAction.keyUp', (jsonObj) => action.onKeyUp(jsonObj));
    $SD.on('com.iu2frl.mqtt.btnAction.didReceiveSettings', (jsonObj) => action.onDidReceiveSettings(jsonObj));
    $SD.on('com.iu2frl.mqtt.btnAction.propertyInspectorDidAppear', (jsonObj) => { });
    $SD.on('com.iu2frl.mqtt.btnAction.propertyInspectorDidDisappear', (jsonObj) => { });
    $SD.on('com.iu2frl.mqtt.btnAction.sendToPlugin', (jsonObj) => action.onSendToPlugin(jsonObj));
    // Register knob actions
    $SD.on('com.iu2frl.mqtt.knbAction.willAppear', (jsonObj) => action.onWillAppear(jsonObj));
    $SD.on('com.iu2frl.mqtt.knbAction.dialDown', (jsonObj) => action.onKeyDown(jsonObj));
    $SD.on('com.iu2frl.mqtt.knbAction.dialUp', (jsonObj) => action.onKeyUp(jsonObj));
    $SD.on('com.iu2frl.mqtt.knbAction.dialRotate', (jsonObj) => action.onDialRotate(jsonObj));
    $SD.on('com.iu2frl.mqtt.knbAction.didReceiveSettings', (jsonObj) => action.onDidReceiveSettings(jsonObj));
    $SD.on('com.iu2frl.mqtt.knbAction.propertyInspectorDidAppear', (jsonObj) => { });
    $SD.on('com.iu2frl.mqtt.knbAction.propertyInspectorDidDisappear', (jsonObj) => { });
    $SD.on('com.iu2frl.mqtt.knbAction.sendToPlugin', (jsonObj) => action.onSendToPlugin(jsonObj));
};

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const action = {
    onDidReceiveSettings: (jsonObj) => {
        console.log(`[onDidReceiveMessage] ${JSON.stringify(jsonObj)}`);
    },
    onWillAppear: (jsonObj) => {
        console.log(`[onWillAppear] ${JSON.stringify(jsonObj)}`);
        $SD.api.sendToPropertyInspector(jsonObj.context, Utils.getProp(jsonObj, "payload.settings", {}), jsonObj.action);
    },
    onSendToPlugin: (jsonObj) => {
        console.log(`[onSendToPlugin] ${JSON.stringify(jsonObj)}`);
        if (jsonObj.payload) {
            $SD.api.setSettings(jsonObj.context, jsonObj.payload);
        }
    },
    onKeyDown: (jsonObj) => {
        let settings = jsonObj.payload.settings;

        sendMqtt(jsonObj.context, settings.valBroker, settings.valPort, settings.valUsername, settings.valPassword, settings.valSsl, settings.valClientId, settings.valTopic, settings.valMessage1, settings.valRetain);
    },
    onKeyUp: (jsonObj) => {
        let settings = jsonObj.payload.settings;

        sendMqtt(jsonObj.context, settings.valBroker, settings.valPort, settings.valUsername, settings.valPassword, settings.valSsl, settings.valClientId, settings.valTopic, settings.valMessage2, settings.valRetain);
    },
    onDialRotate: (jsonObj) => {
        let settings = jsonObj.payload.settings;
        let ticks = jsonObj.payload.ticks;
        if (ticks >= 0) {
            sendMqtt(jsonObj.context, settings.valBroker, settings.valPort, settings.valUsername, settings.valPassword, settings.valSsl, settings.valClientId, settings.valTopic, settings.valMessage3, settings.valRetain);
        }
        else {
            sendMqtt(jsonObj.context, settings.valBroker, settings.valPort, settings.valUsername, settings.valPassword, settings.valSsl, settings.valClientId, settings.valTopic, settings.valMessage4, settings.valRetain);
        }
    }
};