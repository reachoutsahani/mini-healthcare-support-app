const axios = require("axios");
require("dotenv").config();

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await axios({
      method: "post",
      url: "https://openrouter.ai/api/v1/chat/completions",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        model: "meta-llama/llama-3-8b-instruct", // 🔥 working free model
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
    });

    const reply = response.data.choices[0].message.content;

    return res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.log("🔥 ERROR FULL:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
};