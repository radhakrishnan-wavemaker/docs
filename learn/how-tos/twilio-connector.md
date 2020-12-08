---
title: "Integrate Twilio Connector into WaveMaker App"
id: "twilio-connector"
sidebar_label: "Integrate Twilio Connector"
---
---

Learn how to send/receive SMS, MMS and also WhatsApp Messages using Twilio connector.

## Twilio Service

Twilio is a cloud based communication platform which performs communication functions using it API's. Twilio lets you receive SMS, MMS, WhatsApp, Voice messages or even respond to the messages and many more services. 

This connector exposes api to send messages to and receive messages from Twilio using WaveMaker application.

## Step 1: Importing the twilio-connector to project

1. Download the latest twilio connector zip [here](https://github.com/wavemaker/twilio-connector/releases)
2. Import the downloaded twilio connector zip into your app using the [Import Resource](/learn/app-development/services/3rd-party-libraries) option to the **Connector** folder.

## Step 2: Configure twilio configurable properties in profiles
1. By default externalized connector properties are added in the project profiles [Know More](/learn/connectors/connectors-import#externalizing-connector-properties).
2. Connector externalized properties are prefixed with **connector.${connectorName}**

```Java
connector.twilio-connector.default.twilio.account.SID=
connector.twilio-connector.default.twilio.auth.token=
connector.twilio-connector.default.twilio.phone.number=
connector.twilio-connector.default.twilio.verify.api.key=
```

## Step 3: Interact with Twilio from Application:
Register your phone number in Twilio cloud account by validating the OTP sent to the given phone number sent by twilio.

Autowire the Connector Service into the added JavaService.

Import Statement: 
```Java
import com.wavemaker.connector.twilio.TwilioConnector;
```
```Java
@Autowired
private TwilioConnector twilioConnector;
```

### Start Verifying your Number:
Verify API makes it simple to add user verification to your application. It supports codes sent via voice, SMS, and email. This API return value will be used to check if the given phone number is valid or not.

Import Statements.
```Java
import com.wavemaker.connector.twilio.constant.Channel;
import com.wavemaker.connector.twilio.model.VerificationResult;
```

```Java
public VerificationResult sendOTP(String phoneNumber){
    return twilioConnector.startVerification(phoneNumber,Channel.SMS);
}
```

:::note
Channel here refers to an Enum class with values.

SMS("sms"), CALL("call"), EMAIL("email");
:::

### Validate OTP sent to given channel:
This API will validate the entered OTP and registers the User in twilio.

```Java
public Boolean validateOTP(String phoneNumber, String otpCode){
    VerificationResult result=twilioConnector.checkVerification(phoneNumber,otpCode);
    return result.isValid();
}
```

### Send SMS to device:
Send SMS with given message body to the given number.
```Java
public void sendSMSToDevice(String phoneNumber, String messageBody){
    twilioConnector.sendSMS(phoneNumber,messageBody);
}
```

### Send MMS messages to device:
Import Statements.
```Java
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.ArrayList;
```
```Java
public void sendMMSToPhoneNumber(String phoneNumber, String messageBody){
    List<URI> mediaUris = new ArrayList<>();
    URI url = null;
    try {
        url = new URI("");          //Add URI's here
    } catch (URISyntaxException e) {
        throw new RuntimeException(e);
    }
    mediaUris.add(url);
    twilioConnector.sendMMS(phoneNumber,messageBody,mediaUris);
}
```

### Respond to SMS/MMS received from Twilio:
When the user sends SMS to the twilio phone number then twilio will respond back to your message with the message that is sent in this API.
```Java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
```
```Java
public void respondToMessage(HttpServletRequest request,HttpServletResponse response){
    String result= twilioConnector.respondToSMSOrMMS("Your Message Here..");
    try{
        response.setContentType("application/xml");
        response.getWriter().write(result);
        response.getWriter().flush();
        response.getWriter().close();
    }catch(IOException e){
        throw new RuntimeException(e);
    }
}
```

:::note
This method API should be configured in the Twilio Account under PhoneNumber section as Webhook.
:::

### Receive WhatsApp Messages:
Receive Message From Twilio to your WhatsApp.
Import Statements.
```Java
import java.net.URI;
import java.util.List;
```
```Java
public void sendWhatsAppMessage(String phoneNumber, String messageBody){
    List<URI> mediaUris = new ArrayList<>();
    URI url = null;
    try {
        url = new URI("");              //Add URI's here
    } catch (URISyntaxException e) {
        throw new RuntimeException(e);
    }
    mediaUris.add(url);
    twilioConnector.sendWhatsAppMessage(phoneNumber,messageBody,mediaUris);
}
```

### Respond to WhatsApp Message received:
When the user sends WhatsApp message to the twilio phone number then twilio will respond back to your message with the message that is sent in this API.
```Java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
```
```Java
public void respondToWhatsAppMessage(HttpServletRequest request,HttpServletResponse response){
    String result = twilioConnector.respondWhatsAppMessage("Your Message Here..");
    try{
        response.setContentType("application/xml");
        response.getWriter().write(result);
        response.getWriter().flush();
        response.getWriter().close();
    }catch(IOException e){
        throw new RuntimeException(e);
    }
}
```
:::note
This method API should be configured in "WhatsApp Sandbox Settings" section in the Twilio Account under Programming PhoneNumber section as Webhook.
:::