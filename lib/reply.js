
const isGreeting = text => {
  let msg = text.toLowerCase();
  return msg.includes("hello") || msg.includes("hi");
};

const isAboutBot = text => {
  let msg = text.toLowerCase();
  return (
    msg.includes("what can you do") || msg.includes("what are you able to do")
  );
};

const reply = text => {
  let message = "Sorry, I don't understand your request."

  if (isGreeting(text)) {
    message = `Hello, this is JumpStart Bot!`;
  }

  if (isAboutBot(text)) {
    message = `I'm not able to do much right now.`;
  }

  return message;
};

module.exports = reply;
