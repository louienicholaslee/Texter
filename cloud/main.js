var twilio = require('twilio')('AC200485bbc33dc1a228f14cf8ef6ded1d', '05014eb5a1b6fd533f65186a1e9334b9');
// This is a trial account I made

// This is for the restuarant side.
Parse.Cloud.define("verifyCode", function(request, response) {
    var verificationCode = Math.floor(Math.random()*999999);
    var user = Parse.User.current();
    user.set("phoneVerificationCode", verificationCode);
    user.save();
    
    twilio.sendSms({
        From: +12565761076,
        To: request.params.phoneNumber,
        Body: "Your verification code is " + verificationCode + "."
    }, function(err, responseData) { 
        if (err) {
          response.error(err);
        } else { 
          response.success("Success");
        }
    });
});

// This is for the restuarant side.
Parse.Cloud.define("verifyPhoneNumber", function(request, response) {
    var user = Parse.User.current();
    var verificationCode = user.get("phoneVerificationCode");
    if (verificationCode == request.params.phoneVerificationCode) {
        user.set("phoneNumber", request.params.phoneNumber);
        user.save();
        response.success("Success");
    } else {
        response.error("Invalid verification code.");
    }
});

// Request needs a phoneNumber and order param.
Parse.Cloud.define("sendOrder", function(request, response) {
    twilio.sendSms({
        From: +12565761076,
        To: request.params.phoneNumber,
        Body: request.params.order
    }, function(err, responseData) {
        if (err) {
            console.log(err);
        } else {
            console.log(responseData.from);
            console.log(responseData.body);
        }
    });
});

