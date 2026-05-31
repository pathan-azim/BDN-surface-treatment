import express from "express";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;
// ... keep everything else below this exactly the same


// Middleware (Fixed: Removed duplicate declarations and middleware assignments)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer storage (keeps files in system memory briefly to forward as an email attach)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Mail Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// API Routes
app.post("/api/contact", upload.single("attachment"), async (req, res) => {
  const { name, phone, email, message, coatingRequest } = req.body;

  // Simple validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email fields are required." });
  }

  // Construct Email payload
  const mailOptions = {
    from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
    to: "bdnsurfacetreatmentsolution@gmail.com", 
    replyTo: email,
    subject: `New Lead: Coating Request from ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>General Message:</strong><br/>${message || "None"}</p>
      <p><strong>Coating Request Details:</strong><br/>${coatingRequest || "None"}</p>
    `,
    attachments: req.file ? [{
      filename: req.file.originalname,
      content: req.file.buffer
    }] : []
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Inquiry successfully dispatched via email." });
  } catch (error) {
    console.error("Email sending failure:", error);
    res.status(500).json({ error: "Internal server error failing to dispatch application mail." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
