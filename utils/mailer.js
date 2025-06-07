const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debug output
});


const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Auth Server" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your One-Time Password (OTP)',

    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,

    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="color: #333;">🔐 Your One-Time Password (OTP)</h2>
        <p>Hello,</p>
        <p>Here is your OTP code. Please use this code to proceed. It is valid for <strong>5 minutes</strong>.</p>
        <div style="margin: 20px 0; text-align: center;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; background: #eef; padding: 10px 20px; border-radius: 6px; color: #333; letter-spacing: 2px;">
            ${otp}
          </span>
        </div>
        <p style="color: #777;">If you didn’t request this, please ignore this email.</p>
        <p>Thank you,<br/><strong>Auth Server Team</strong></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};


module.exports = { sendOTPEmail };
