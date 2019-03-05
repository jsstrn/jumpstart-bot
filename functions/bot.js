require("dotenv").config();

const TOKEN = process.env.VERIFICATION_TOKEN;

const eventType = {
  urlVerification: "url_verification"
};

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);

  if (event.httpMethod === "GET") {
    callback(null, {
      statusCode: 200,
      body: "You've reached the bot"
    });
  }

  if (event.httpMethod === "POST") {
    const { type } = body;
    if (type === eventType.urlVerification) {
      const { challenge, token } = body;
      if (token === TOKEN) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            challenge
          })
        });
      }
    }
  }
};
