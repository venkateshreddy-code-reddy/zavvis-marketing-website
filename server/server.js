require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ✅ contact route (Zavvis fields)
app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, company, topic, updates } = req.body || {};

  if (!firstName || !lastName || !email || !company || !topic) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Gmail App Password
      },
    });

    const subject = `New Zavvis Lead: ${firstName} ${lastName} (${company})`;

    const text = `
New Zavvis contact form submission

Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}
Updates Opt-in: ${updates ? "Yes" : "No"}

Message:
${topic}
`.trim();

    const html = `
<div style="font-family: Arial, sans-serif; color:#111; line-height:1.5;">
  <h2 style="margin:0 0 12px;">New Zavvis contact form submission</h2>
  <table style="border-collapse:collapse; width:100%; max-width:680px;">
    <tr><td style="padding:8px 0; width:140px;"><b>Name</b></td><td style="padding:8px 0;">${escapeHtml(
      firstName
    )} ${escapeHtml(lastName)}</td></tr>
    <tr><td style="padding:8px 0;"><b>Email</b></td><td style="padding:8px 0;">${escapeHtml(
      email
    )}</td></tr>
    <tr><td style="padding:8px 0;"><b>Company</b></td><td style="padding:8px 0;">${escapeHtml(
      company
    )}</td></tr>
    <tr><td style="padding:8px 0;"><b>Updates</b></td><td style="padding:8px 0;">${
      updates ? "Yes" : "No"
    }</td></tr>
  </table>

  <div style="margin-top:16px; padding:14px; background:#f6f6fb; border:1px solid #e8e8f5; border-radius:10px;">
    <div style="font-weight:700; margin-bottom:8px;">Message</div>
    <div style="white-space:pre-wrap;">${escapeHtml(topic)}</div>
  </div>

  <p style="margin-top:16px; color:#666;">Sent from the Zavvis landing page form.</p>
</div>
`.trim();

    await transporter.sendMail({
      from: `"Zavvis Website" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email, // ✅ Reply goes to the person who filled form
      subject,
      text,
      html,
    });

    return res.json({ ok: true, message: "Email sent" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ ok: false, error: "Email failed" });
  }
});

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => console.log(`✅ API listening on http://localhost:${PORT}`));
