const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ==============================
// ✅ FORM ROUTE (FIXED)
// ==============================
app.post("/api/support", (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 FORM DATA:", name, email, message);

  // simple success response
  res.json({
    message: "Form submitted successfully ✅",
  });
});

// ==============================
// 🔥 SOCKET CHAT (WORKING)
// ==============================
io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("💬 User:", message);

    // ✅ FAKE AI (always works)
    setTimeout(() => {
      socket.emit(
        "receiveMessage",
        "Doctor AI 🤖: Stay hydrated, take rest, and consult a doctor if needed."
      );
    }, 1000);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// ==============================
// TEST ROUTE
// ==============================
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ==============================
// SERVER START
// ==============================
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});