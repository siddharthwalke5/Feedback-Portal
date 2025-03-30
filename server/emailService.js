const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send email
const sendUpdateEmail = async (clientEmail, message, feedbackTitle) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: clientEmail,
      subject: `Update on your feedback: ${feedbackTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Feedback Update</h2>
          <p style="color: #4b5563; font-size: 16px;">We have an update regarding your feedback:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #1f2937; margin: 0;">${message}</p>
          </div>
          <p style="color: #4b5563; font-size: 14px;">Thank you for your feedback!</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
};

module.exports = { sendUpdateEmail };
