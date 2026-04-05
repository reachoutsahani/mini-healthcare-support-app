const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) {
    return setSuccess("Please fill all fields!");
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "https://mini-healthcare-support-app-4qm9.onrender.com/api/support",
      form,
      {
        timeout: 10000, // 🔥 wait for backend wakeup
      }
    );

    setForm({ name: "", email: "", message: "" });
    setSuccess(res.data.message || "Form submitted successfully!");
  } catch (err) {
    console.log(err);

    setSuccess(
      "Server waking up... please try again in 5 seconds ⏳"
    );
  } finally {
    setLoading(false);
  }
};