const url = "https://tinyurl.com/jumpstart-assignment";

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `Please submit your assignment to ${url}`
  });
};
