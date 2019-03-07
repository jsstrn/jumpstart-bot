require("dotenv").config();
const axios = require("axios");

const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;
const BOT_TOKEN = process.env.BOT_USER_ACCESS_TOKEN;

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

const isGreeting = text => {
  let msg = text.toLowerCase();
  return msg.includes("hello") || msg.includes("hi");
};

const isAboutBot = text => {
  let msg = text.toLowerCase();
  return msg.includes("what can you do") || msg.includes("what are you able to do");
};

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const { type } = body;

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

    if (body.event.type === eventType.appMention) {
      callback(null, { statusCode: 200 });
      const { channel, text, user } = body.event;

      let message = "Sorry, I don't understand your request.";

      if (isGreeting(text)) {
        message = `Hello, this is JumpStart Bot!`;
      }

      if (isAboutBot(text)) {
        message = `I'm not able to do much right now.`;
      }

      fetch.post("/chat.postMessage", {
        channel,
        text: message
      });
    }
  }
};
