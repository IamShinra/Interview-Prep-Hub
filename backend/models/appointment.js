import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    appointmentTime: Date,
    videoCallLink: String,
    amount: Number,
    paymentStatus: String
});

const Appointment = mongoose.model('appointments', appointmentSchema);

export default Appointment;

