import express from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post('/send-confirmation', async (req, res) => {
    const { userName, userEmail, appointmentTime, videoCallLink } = req.body;

    try {
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email details
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: userEmail,
            subject: `Appointment Confirmation - Interview Prep Hub`,
            html: `
              <h3>Hello ${userName},</h3>
              <p>Your appointment has been successfully booked.</p>
              <ul>
                <li><strong>Date & Time:</strong> ${new Date(appointmentTime).toLocaleString()}</li>
                <li><strong>Google Meet Link:</strong> <a href="${videoCallLink}" target="_blank">Join Meeting</a></li>
              </ul>
              <p>Thank you for using Interview Prep Hub!</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Email sending failed' });
    }
});

export default router;