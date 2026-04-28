require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Verification endpoint for WhatsApp webhook
app.get('/webhook', (req, res) => {
  const verify_token = process.env.WHATSAPP_VERIFY_TOKEN;
  
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Endpoint to receive messages
app.post('/webhook', async (req, res) => {
  let body = req.body;

  if (body.object) {
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0]) {
      let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body.entry[0].changes[0].value.messages[0].from;
      let msg_body = body.entry[0].changes[0].value.messages[0].text.body.toLowerCase().trim();
      
      console.log(`Received message: ${msg_body} from ${from}`);

      // Here we would typically forward this to an n8n webhook or database
      // For now, we just log it.
      
      if (['approve', 'regenerate', 'skip'].includes(msg_body)) {
         // Forward to n8n webhook to trigger next steps
         console.log(`Valid command received: ${msg_body}`);
         try {
             const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5679/webhook/whatsapp-reply';
             await axios.post(n8nWebhookUrl, {
                 from,
                 action: msg_body
             });
         } catch (e) {
             console.error("Error forwarding to n8n:", e.message);
         }
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`WhatsApp Webhook server is listening on port ${PORT}`);
});
