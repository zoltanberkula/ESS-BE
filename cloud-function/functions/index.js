const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

exports.essDataInsert = functions.pubsub
  .topic("ess-topic")
  .onPublish((message, context) => {
    console.log("Function essDataInsert triggered at:", context.timestamp);

    let data = {
      timestamp: Date.now(),
      data: message.json,
    };

    return admin.firestore().collection("ESS-DATA").add(data);
  });