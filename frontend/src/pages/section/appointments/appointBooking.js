// 'use client'
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../api/axios.js';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import FormInput from '../../../component/FormInput.js';
import { toast } from 'react-toastify';
import Loader from '../../../component/Loader.js';

// 4000 0035 6000 0008
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`); // Replace with your Stripe Public Key
// const stripePromise = (async () => {
//     for (;;) {
//       try {
//         // This sleep here makes it easier to reproduce locally, we're delaying the loading of Stripe
//         await new Promise((r) => setTimeout(r, 20000));

//         // console.log(process.env.STRIPE_PUBLIC_KEY)
//         return await loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);
//       } catch (err) {
//         console.error(err);
//         await new Promise((r) => setTimeout(r, 5000));
//       }
//     }
//   })();

function AppointmentBooking({ appointment, setSelectedAppointment }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [amount, setAmount] = useState(appointment ? appointment.price : "0"); // Example amount in USD
    const stripe = useStripe();
    const elements = useElements();
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    // Effect to handle routing after dialog closes
    useEffect(() => {
        if (!open) {
            setSelectedAppointment(null);
        }
    }, [open]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log('Payment processing...');
        if (!stripe || !elements) return;

        // Create Payment Intent and get the clientSecret
        const { data } = await axios.post('/appointment/create-payment-intent', { amount });
        const clientSecret = data.clientSecret;  // Extract clientSecret string
        // Use the clientSecret string directly
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            console.log("error=>", result.error);
            toast.error("Payment failed");
        } else if (result.paymentIntent.status === 'succeeded') {
            toast.success("Payment successful");

            // Book appointment
            const appointmentResponse = await axios.post('/appointment/book', {
                userName,
                userEmail,
                appointmentTime,
                videoCallLink: `https://zoom.us/meeting/${Math.random().toString(36).substring(7)}`,
                amount
            });

            // Send confirmation email
            await axios.post('/api/email/send-confirmation', {
                userName,
                userEmail,
                appointmentTime,
                videoCallLink: appointmentResponse.data.videoCallLink,
            });

            toast.success("Appointment booked and email sent successfully!");
            setUserEmail('');
            setUserName('');
            setAppointmentTime('');
        }
        setLoading(false);
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <h2 data-popover-target="popover-default">Book a Video Call Appointment</h2>

                                <FormInput label={"Name"} type={"text"} placeholder={"Enter your name"} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={userName} onChange={setUserName} />
                                <FormInput label={"Email"} type={"email"} placeholder={"Enter your email"} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={userEmail} onChange={setUserEmail} />
                                <FormInput label={"Appointment Time"} type={"datetime-local"} placeholder={"Select appointment time"} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={appointmentTime} onChange={setAppointmentTime} />
                                <CardElement className="border-2 rounded-lg p-2 mb-4 focus:outline-orange-400" />

                                <p className="text-sm text-gray-500 dark:text-gray-400">use this card number 4000003560000008</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Amount : {amount}</p>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={async (event) => {
                                        await handleSubmit(event);
                                        setOpen(false);
                                    }}
                                    disabled={!stripe}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Book Appointment
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-20">
                    <Loader />
                </div>
            )}
        </>
    );
};

function AppointmentPage({ appointment, setSelectedAppointment }) {
    return (
        <Elements stripe={stripePromise}>
            <AppointmentBooking appointment={appointment} setSelectedAppointment={setSelectedAppointment} />
        </Elements>
    );
};

export default AppointmentPage;