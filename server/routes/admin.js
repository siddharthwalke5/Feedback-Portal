const express = require('express');
const router = require('express').Router();
const auth = require('../middleware/auth');
const { sendUpdateEmail } = require('../emailService');
const Feedback = require('../models/Feedback');
const PDFDocument = require('pdfkit');

router.get('/feedbacks', auth, auth.adminCheck, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'username email');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/export', auth, auth.adminCheck, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'username email');
    
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=feedbacks.pdf');
    
    doc.pipe(res);
    feedbacks.forEach(feedback => {
      doc.text(`Title: ${feedback.title}`);
      doc.text(`User: ${feedback.user.username}`);
      doc.text(`Message: ${feedback.message}`);
      doc.moveDown();
    });
    doc.end();
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update feedback status (Admin only)
router.put('/feedbacks/:id', auth, auth.adminCheck, async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'username email');
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete feedback (Admin only)
router.delete('/feedbacks/:id', auth, auth.adminCheck, async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Send update email to client
router.post('/feedbacks/:id/update', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const feedbackId = req.params.id;

    // Get the feedback and associated user from the database
    const feedback = await Feedback.findById(feedbackId).populate('user');
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Send email to the client
    await sendUpdateEmail(
      feedback.user.email,
      message,
      feedback.title
    );

    // Update the feedback with the new message
    feedback.updates = feedback.updates || [];
    feedback.updates.push({
      message,
      timestamp: new Date(),
      adminId: req.user.id
    });
    await feedback.save();

    res.json({ message: 'Update sent successfully' });
  } catch (error) {
    console.error('Error sending update:', error);
    res.status(500).json({ message: 'Failed to send update' });
  }
});

module.exports = router;