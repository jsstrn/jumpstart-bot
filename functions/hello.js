exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: "Hello, I am the JumpStart Slack Bot"
  });
};
