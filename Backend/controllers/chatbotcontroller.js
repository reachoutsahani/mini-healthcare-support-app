const axios = require("axios");
console.log("KEY:", process.env.OPENROUTER_API_KEY);
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a healthcare assistant. Give short helpful answers.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No response";

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("❌ OPENROUTER ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
};