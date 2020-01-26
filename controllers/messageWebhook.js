const processMessage = require(`../helpers/processMessage`);
module.exports = (req, res) => {
    // console.log(req.body)
    if (req.body.object === `page` && req.body.entry instanceof Array) {
        req.body.entry.forEach(entry => {
            if (entry) {
                // console.log({...entry})
                entry.messaging.forEach(event => {
                    // console.log('>>>Event>>>',event.postback);
                    if (event.message && event.message.text ||
                        event.postback && event.postback.payload) {
                        processMessage(event);
                    }
                });
            }
        });
        res.status(200).end();
    }
};