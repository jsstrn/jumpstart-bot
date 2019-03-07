const url = "https://tinyurl.com/jumpstart-feedback-form";

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `Please submit your feedback to ${url}`
  });
};
