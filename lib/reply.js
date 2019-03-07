const isGreeting = text => {
  let msg = text.toLowerCase();
  return msg.includes("hello") || msg.includes("hi");
};

const isFeedback = text => {
  let msg = text.toLowerCase();
  return msg.includes("feedback");
};

const isAssignment = text => {
  let msg = text.toLowerCase();
  return msg.includes("assignment");
};

const isAboutBot = text => {
  let msg = text.toLowerCase();
  return (
    msg.includes("what can you do") || msg.includes("what are you able to do")
  );
};

const reply = text => {
  let message = "Sorry, I don't understand your request.";

  if (isGreeting(text)) {
    message = "Hello, this is JumpStart Bot!";
  }

  if (isAboutBot(text)) {
    message = "I'm not able to do much right now.";
  }

  if (isFeedback(text)) {
    message =
      "Please submit your feedback to https://tinyurl.com/jumpstart-feedback-form";
  }

  if (isAssignment(text)) {
    message =
      "Please submit your assignment to https://tinyurl.com/jumpstart-assignment";
  }

  return message;
};

module.exports = reply;
