const router = require('express').Router();
const auth = require('../middleware/auth');
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', auth, async (req, res) => {
  try {
    const { title, message, category, priority } = req.body;
    const newFeedback = new Feedback({
      title,
      message,
      category,
      priority,
      user: req.user.id, // Attach the user ID from the JWT token
    });
    await newFeedback.save();
    res.json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;