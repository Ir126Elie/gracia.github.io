const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const accountSid = 'AC82d3fec2606fef5fdecb8f4ff8b0b25e'; // 
const authToken = 'Y9b9d5dbb61178efd6083928eaaf284ef'; // 
const client = new twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { to, body } = req.body;

    client.messages.create({
        to: to,
        from: '+17756187601', // Remplacez par votre numéro Twilio
        body: body,
    })
    .then(message => res.send(`SMS envoyé avec succès : ${message.sid}`))
    .catch(error => res.status(500).send(`Erreur : ${error.message}`));
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});