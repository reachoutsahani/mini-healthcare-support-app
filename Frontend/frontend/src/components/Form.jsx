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
    try {
      const res = await axios.post(
        "http://localhost:5000/api/support/submit",
        form
      );

      // reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });

      // show success message
      setSuccess(res.data.message || "Form submitted successfully!");
    } catch (err) {
      console.error(err);
      setSuccess("Something went wrong!");
    }
  };

  return (
    <div className="form-box">
      <h2>📝 Patient Support</h2>

      {success && <p className="success-msg">{success}</p>}

      <input
        value={form.name}
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        value={form.email}
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        value={form.message}
        placeholder="Describe your problem"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Form;