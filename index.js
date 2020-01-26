const express = require(`express`);
const bodyParser = require(`body-parser`);

const config = require(`./config/config`);
const PORT = process.env.PORT  || config.port

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/healthcheck',(req, res)=>{
    res.send('I am Ok');
});


const verificationController = require(`./controllers/verification`);
const messageWebhookController = require(`./controllers/messageWebhook`);
app.get(`/`, verificationController);
app.post(`/`, messageWebhookController);

app.listen(PORT, () => console.log(`Webhook server is listening, port ${ PORT }`));
