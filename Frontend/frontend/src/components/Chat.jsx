import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 🔥 CONNECT SOCKET ONLY ONCE
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("receiveMessage", (reply) => {
      setIsTyping(false);

      setChat((prev) => [
        ...prev,
        {
          type: "ai",
          text:
            reply ||
            "Stay hydrated, take rest, and consult a doctor if needed.",
        },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { type: "user", text: message }]);
    setIsTyping(true);

    socketRef.current.emit("sendMessage", message);
    setMessage("");
  };

  // 🔥 AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat-box">
      <h2>💬 AI Chatbot</h2>

      <div className="messages">
        {chat.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="message ai typing">Typing...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={message}
          placeholder="Ask your health query..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;