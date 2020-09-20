const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require("@sendgrid/mail");
const cors = require("cors")({
    origin: true
});
const serviceAccount = require("./redux-rating-app-firebase-adminsdk-serviceaccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
exports.sendEmail = functions.https.onCall((data, context) => {
    const { apiKey, sender, to, title, body }  = data;
    const msg = {
        to: to,
        from: sender,
        subject: title,
        text: body
    }
    sgMail.setApiKey(
        apiKey
    );
    try {
        sgMail.send(msg);
        return {
            "msg" : "success"
        };
    } catch(e) {
        throw new Error();
    }
});

exports.createUser = functions.https.onCall((data, context) => {
    const { mailAddress, password } = data;
    return admin.auth().createUser({
        email: mailAddress,
        emailVerified: true,
        password: password,
        disabled: false
    })
        .then(function(user) {
            return {
                "uid": user.uid
            }
        })
        .catch(function(error) {
            throw new Error(error);
        });
})

exports.deleteUser = functions.https.onCall((data, context) => {
    const { uid } = data;
    return admin.auth().deleteUser(uid)
        .then(function () {
            return {
                "msg": "success"
            }
        }).catch(function(error) {
            throw new Error(error);
        });
})
