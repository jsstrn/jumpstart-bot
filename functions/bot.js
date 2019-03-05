require("dotenv").config();
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;
const BOT_TOKEN = process.env.BOT_USER_ACCESS_TOKEN;

const axios = require("axios");

const fetch = axios.create({
  baseURL: "https://slack.com/api",
  headers: {
    Authorization: `Bearer ${BOT_TOKEN}`,
    "Content-Type": "application/json"
  }
});

const eventType = {
  appMention: "app_mention",
  eventCallback: "event_callback",
  urlVerification: "url_verification"
};

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const { type } = body;

  console.log("type:", type);
  console.log("method", event.httpMethod);

  if (event.httpMethod === "GET") {
    callback(null, {
      statusCode: 200,
      body: "You've reached the bot"
    });
  }

  if (event.httpMethod === "POST") {
    if (type === eventType.urlVerification) {
      const { challenge, token } = body;
      if (token === VERIFICATION_TOKEN) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            challenge
          })
        });
      }
    }

    if (type === eventType.eventCallback && body.event.type === eventType.appMention) {
      callback(null, { statusCode: 200 });
      const { channel } = body.event;

      console.log("Bot has been mentioned. Sending reply now...");
      fetch
        .post("/chat.postMessage", {
          channel,
          text: "Hello, this is JumpStart Bot!"
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
