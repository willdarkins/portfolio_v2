import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTE: send email
app.post("/send", async (req, res) => {
  const { name, email, message, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ success: false, message: "Captcha missing" });
  }

  // Verify CAPTCHA with Google
  try {
    const googleVerify = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken,
        },
      }
    );

    if (!googleVerify.data.success) {
      return res.status(400).json({ success: false, message: "Captcha failed" });
    }
  } catch (err) {
    console.error("Captcha error", err);
    return res.status(500).json({ success: false, message: "Captcha error" });
  }

  // Send email using NodeMailer
  try {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Mail error", err);
    return res.status(500).json({ success: false, message: "Email failed" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🌐 Server running on PORT ${PORT}`));
