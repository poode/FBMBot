const config = require(`../config/config`);

//APT_AI_TOKEN is from Dialogflow
const API_AI_TOKEN = config.API_AI_TOKEN;

// this token from facebook app
const FACEBOOK_ACCESS_TOKEN = config.FACEBOOK_ACCESS_TOKEN;

const apiAiClient = require(`apiai`)(API_AI_TOKEN);
const request = require(`request`);

const sendTextMessage = (senderId, text) => {
    request({
        url: `https://graph.facebook.com/v2.6/me/messages`,
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: `POST`,
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, { sessionId: config.sessionID });
    apiaiSession.on(`response`, (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on(`error`, error => console.log(error));
    apiaiSession.end();
};