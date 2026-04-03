const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// 🔥 Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/support", require("./routes/supportRoutes"));
app.use("/api/chatbot", require("./routes/chatbotRoutes")); // 🔥 FIXED

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🔥 SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  socket.on("sendMessage", async (message) => {
    try {
      const axios = require("axios");

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a healthcare assistant. Give short helpful answers.",
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
          },
        }
      );

      const reply = response.data.choices[0].message.content;

      socket.emit("receiveMessage", reply);
    } catch (error) {
      console.error("❌ SOCKET ERROR:", error.response?.data || error.message);
      socket.emit("receiveMessage", "AI error, try again");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);