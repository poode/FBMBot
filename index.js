const express = require(`express`);
const bodyParser = require(`body-parser`);

const config = require(`./config/config`);

const app = express();

app.get('/ok',(req, res)=>{
    res.send('I am Ok');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const verificationController = require(`./controllers/verification`);
const messageWebhookController = require(`./controllers/messageWebhook`);
app.get(`/`, verificationController);
app.post(`/`, messageWebhookController);

app.listen(config.port, () => console.log(`Webhook server is listening, port ${config.port}`));