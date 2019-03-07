require("dotenv").config();
const axios = require("axios");
const reply = require("../lib/reply");
const eventType = require("../lib/eventTypes");

const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;
const BOT_TOKEN = process.env.BOT_USER_ACCESS_TOKEN;

const fetch = axios.create({
  baseURL: "https://slack.com/api",
  headers: {
    Authorization: `Bearer ${BOT_TOKEN}`,
    "Content-Type": "application/json"
  }
});

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
      } else {
        callback(null, {
          statusCode: 401,
          body: "Unauthorized"
        });
      }
      return;
    }

    if (body.event && body.event.type === eventType.appMention) {
      callback(null, { statusCode: 200 });
      const { channel, text, user } = body.event;

      let message = reply(text);
      fetch.post("/chat.postMessage", {
        channel,
        text: message
      });
    }
  }
};
