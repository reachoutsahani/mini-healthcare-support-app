const express = require("express");
const router = express.Router();

router.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Form Data:", req.body);

  res.json({
    success: true,
    message: "Form submitted successfully",
  });
});

module.exports = router;