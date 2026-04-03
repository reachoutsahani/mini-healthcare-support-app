const getBotReply = (message) => {
  if (!message) return "Please enter a message.";

  const msg = message.toLowerCase().trim();

  // 👋 Greetings
  if (["hi", "hello", "hey"].some(word => msg.includes(word))) {
    return "Hi 👋 Welcome to Healthcare Support! How can I assist you today?";
  }

  // 🆘 Help options
  if (msg.includes("help")) {
    return (
      "I can help you with:\n" +
      "1️⃣ Register as patient/volunteer\n" +
      "2️⃣ Create support request\n" +
      "3️⃣ Connect with doctor\n" +
      "4️⃣ Emergency guidance"
    );
  }

  // 🧑‍⚕️ Doctor
  if (msg.includes("doctor") || msg.includes("medical")) {
    return "🩺 We will connect you with a doctor or volunteer shortly.";
  }

  // 🚨 Emergency
  if (msg.includes("emergency")) {
    return "🚨 Please contact your nearest hospital or dial emergency services immediately.";
  }

  // 📝 Registration
  if (msg.includes("register") || msg.includes("signup")) {
    return "You can register using the registration form on the homepage.";
  }

  // 📦 Support request
  if (msg.includes("support") || msg.includes("issue")) {
    return "Please go to 'Create Support Request' and submit your issue.";
  }

  // 🙏 Thanks
  if (msg.includes("thank")) {
    return "You're welcome 😊 Happy to help!";
  }

  // ❌ Default fallback
  return "Sorry, I didn't understand that. Please try asking in a different way.";
};

module.exports = getBotReply;