import { useState } from "react";
import axios from "axios";

function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      return setSuccess("Please fill all fields!");
    }

    try {
      const res = await axios.post(
        "https://mini-healthcare-support-app-4qm9.onrender.com/api/chatbot/message",
        form
      );

      setForm({ name: "", email: "", message: "" });
      setSuccess(res.data.message || "Submitted successfully!");
    } catch (err) {
      setSuccess("Something went wrong!");
    }
  };

  return (
    <div className="form-box">
      <h2>📝 Patient Support</h2>

      {success && <p className="success-msg">{success}</p>}

      <input
        value={form.name}
        placeholder="Your Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        value={form.email}
        placeholder="Your Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        value={form.message}
        placeholder="Describe your problem..."
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
}

export default Form;