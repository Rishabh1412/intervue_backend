const nodemailer = require('nodemailer');
require('dotenv').config();

// Replace with your actual credentials and test recipient
const EMAIL_USER = process.env.EMAIL_USER || 'your_email@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'your_16_char_app_password';
const RECIPIENT_EMAIL = 'palakpr0308@gmail.com'; // Replace this

// OTP Generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Send OTP function
const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: `"OTP Tester" <${EMAIL_USER}>`,
    to,
    subject: 'Your OTP Code (Test)',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP Email sent:', info.response);
  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
  }
};

// Main test logic
(async () => {
  const otp = generateOTP();
  console.log('Generated OTP:', otp);
  await sendOTPEmail(RECIPIENT_EMAIL, otp);
})();
