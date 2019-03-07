exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: "Hello, I am JumpStart Slack Bot 🤖"
  });
};
