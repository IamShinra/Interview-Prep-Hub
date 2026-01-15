import mongoose from "mongoose";
import express from "express";
import Stripe from "stripe";
import Appointment from "../models/appointment.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe Secret Key
const appointmentRouter = express.Router();

const createIntent = async (req, res) => {
    let { amount } = req.body;
    amount = parseInt(amount.split(' ')[0], 10);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in the smallest currency unit
            currency: 'inr', // Use INR as currency
            payment_method_types: ['card'], // Allow card payments
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Payment Intent Creation Failed:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createAppointment = async (req, res) => {
    let { userName, userEmail, appointmentTime, videoCallLink, amount } = req.body;
    amount = parseInt(amount.split(' ')[0], 10);
    
    try {
        const newAppointment = new Appointment({
            userName,
            userEmail,
            appointmentTime,
            videoCallLink,
            amount,
            paymentStatus: 'paid'
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to book appointment' });
    }
}
appointmentRouter.route("/create-payment-intent")
    .post(createIntent)

appointmentRouter.route("/book")
    .post(createAppointment)


export default appointmentRouter;