import {functions} from '../firebase';
import {config} from '../const/config';

/**
 * Validate input email
 * @param email
 * @returns {boolean}
 */
export const isValidEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}

export const sendEmail = async(to, title, body, retryCount) => {
    try {
        functions.httpsCallable('sendEmail')({
            "apiKey": config().common.mailApiKey,
            "sender": config().common.sender,
            "to": to,
            "title": title,
            "body": body
        });
    } catch(e) {
        if (!retryCount || retryCount === 3) {
            alert("メールの送信に失敗しました");
            return;
        }
        await sleep(1000 + 1000 * retryCount);
        sendEmail(to, title, body, retryCount + 1);
    }
};


/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const datetimeToString = (dt) => {
    return dt.getFullYear() + '-'
        + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
        + ('00' + dt.getDate()).slice(-2) + ' '
        + ('00' + dt.getHours()).slice(-2) + ':'
        + ('00' + dt.getMinutes()).slice(-2) + ':'
        + ('00' + dt.getSeconds()).slice(-2)
};

const sleep = (msec) => {
    return new Promise(function(resolve) {
        setTimeout(function() {resolve()}, msec);
    })
}

export const createAuthUser = (mailAddress, password) => {
    return functions.httpsCallable('createUser')({
        "mailAddress": mailAddress,
        "password": password
    });
}

export const deleteAuthUser = (uid) => {
    return functions.httpsCallable('deleteUser')({
        "uid": uid
    })
}

const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const generateRandomChar = (len) => {
    let result = "";
    let cl = CHARACTERS.length;
    for(let i=0; i<len; i++){
        result += CHARACTERS[Math.floor(Math.random()*cl)]; // Math.randomは0 ~ 1未満
    }
    return result;
}

