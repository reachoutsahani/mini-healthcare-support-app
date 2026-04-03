import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", message);

    setChat((prev) => [...prev, { type: "user", text: message }]);
    setMessage("");
  };

  useEffect(() => {
    const handler = (reply) => {
      setChat((prev) => [...prev, { type: "ai", text: reply }]);
    };

    socket.on("receiveMessage", handler);

    return () => {
      socket.off("receiveMessage", handler);
    };
  }, []);

  return (
    <div className="chat-box">
      <h2>💬 AI Chatbot</h2>

      <div className="messages">
        {chat.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            <b>{msg.type === "user" ? "You" : "AI"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        placeholder="Ask your health query..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;