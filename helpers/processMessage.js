const config = require(`../config/config`);
const { BotReply, botLoaded, errorHandler } = require('../riveEngine');
//APT_AI_TOKEN is from Dialogflow
// const API_AI_TOKEN = config.API_AI_TOKEN;

// this token from facebook app
const FACEBOOK_ACCESS_TOKEN = config.FACEBOOK_ACCESS_TOKEN;

// const apiAiClient = require(`apiai`)(API_AI_TOKEN);
const request = require(`request`);

const sendTextMessage = (senderId, text) => {
    request({
        url: `https://graph.facebook.com/v2.6/me/messages`,
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: `POST`,
        json: {
            recipient: { id: senderId },
            // message: { text },
            message: {
                // "attachment":{
                //     "type":"template",
                //     "payload":{
                //       "template_type":"button",
                      "text":text,
                //       "buttons":[
                //         {
                //           "type":"postback",
                //           "title": text,
                //           "payload": text
                //         }
                //       ]
                //     }
                //   }
            }
              
        }
    });
};

module.exports = async (event) => {
    // console.log('event >', event);
    const senderId = event.sender.id;
    const message = event.message? event.message.text : event.postback.payload;
    try {
        // console.log('user message', message)
        await botLoaded;
        const theReplyFromBotBrain = await BotReply(senderId, message);
        console.log('message and reply', { senderId, hisMessage: message, theReplyFromBotBrain });
        sendTextMessage(senderId, theReplyFromBotBrain);
    } catch (error) {
        errorHandler(error);
    }  
};