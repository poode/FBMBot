const config = require(`../config/config`);
module.exports = (req, res) => {
    const hubChallenge = req.query[`hub.challenge`];
    const hubMode = req.query[`hub.mode`];

    // FBMbot is string to verify which server we connect
    const verifyTokenMatches = (req.query[`hub.verify_token`] === config.stringToken);
    if (hubMode && verifyTokenMatches) {
        res.status(200).send(hubChallenge);
    } else {
        res.status(403).end();
    }
};