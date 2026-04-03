const Support = require("../models/SupportRequest");

// @desc Create support request
// @route POST /api/support
// @access Public
exports.createRequest = async (req, res) => {
  try {
    const { name, issue } = req.body;

    // ✅ Validation
    if (!name || !issue) {
      return res.status(400).json({
        message: "Name and issue are required",
      });
    }

    // ✅ Create request
    const request = await Support.create({
      name,
      issue,
    });

    res.status(201).json({
      success: true,
      message: "Support request created",
      data: request,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// @desc Get all requests
// @route GET /api/support
// @access Public (can be admin later)
exports.getRequests = async (req, res) => {
  try {
    const data = await Support.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};