import React, { useState } from 'react';
import Navigation from '../../../component/Navigation';
import AppointmentPage from './appointBooking';

function Appointments() {

    const appointments = [
        {
            name: 'Neil Sims',
            profession: 'Software Engineer',
            description: 'Lorem ipsum dolor sit amet.',
            image: 'https://i.pravatar.cc/150?img=1',
            price: '320 INR'
        },
        {
            name: 'Sara Lee',
            profession: 'Cloud Computing Engineer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: 'https://i.pravatar.cc/150?img=2',
            price: '500 INR'
        },
        {
            name: 'John Doe',
            profession: 'Web Developer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.',
            image: 'https://i.pravatar.cc/150?img=3',
            price: '280 INR'
        },
        {
            name: 'Alice Johnson',
            profession: 'DevOps Engineer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://i.pravatar.cc/150?img=4',
            price: '600 INR'
        },
        {
            name: 'Chris Evans',
            profession: 'Database Administrator',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat condimentum velit.',
            image: 'https://i.pravatar.cc/150?img=5',
            price: '450 INR'
        },
        {
            name: 'Diana Prince',
            profession: 'Machine Learning Engineer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel orci id nulla tincidunt commodo. Donec nec nisl id nulla.',
            image: 'https://i.pravatar.cc/150?img=6',
            price: '550 INR'
        },
        {
            name: 'Bruce Wayne',
            profession: 'Cybersecurity Analyst',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst. Nam volutpat justo nec enim auctor, ac gravida felis fringilla.',
            image: 'https://i.pravatar.cc/150?img=7',
            price: '700 INR'
        },
        {
            name: 'Clark Kent',
            profession: 'Frontend Developer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
            image: 'https://i.pravatar.cc/150?img=8',
            price: '380 INR'
        },
        {
            name: 'Barry Allen',
            profession: 'Full Stack Developer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.',
            image: 'https://i.pravatar.cc/150?img=9',
            price: '490 INR'
        },
        {
            name: 'Peter Parker',
            profession: 'Mobile App Developer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo.',
            image: 'https://i.pravatar.cc/150?img=10',
            price: '610 INR'
        },
        {
            name: 'Tony Stark',
            profession: 'AI Engineer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
            image: 'https://i.pravatar.cc/150?img=11',
            price: '950 INR'
        },
        {
            name: 'Natasha Romanoff',
            profession: 'Data Scientist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
            image: 'https://i.pravatar.cc/150?img=12',
            price: '880 INR'
        },
        {
            name: 'Steve Rogers',
            profession: 'Network Engineer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.',
            image: 'https://i.pravatar.cc/150?img=13',
            price: '740 INR'
        },
        {
            name: 'Wanda Maximoff',
            profession: 'Blockchain Developer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.',
            image: 'https://i.pravatar.cc/150?img=14',
            price: '920 INR'
        },
        {
            name: 'Stephen Strange',
            profession: 'Cloud Architect',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero.',
            image: 'https://i.pravatar.cc/150?img=15',
            price: '1,000 INR'
        },
    ];
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    if(selectedAppointment) {
        return <AppointmentPage appointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment}/>
    }

    return (
        <div className='w-full h-screen flex'>
            <div className=''>
                <Navigation />
            </div>
            {/* mainBody */}
            <div className='w-full ml-5 mr-10 my-10 overflow-y-scroll no-scrollbar'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                        <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Available Appointments</h5>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {appointments.map((appointment, index) => (
                                <li key={index} className="py-3 sm:py-4" onClick={() => setSelectedAppointment(appointment)}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-12 h-12 rounded-full" src={appointment.image} alt={`${appointment.name} image`} />
                                        </div>
                                        <div className="flex-shrink-0 w-40 ms-4 ">
                                            <p className="text-base font-medium text-gray-900 truncate dark:text-white text-wrap">
                                                {appointment.name}
                                            </p>
                                            <p className="text-base text-theme-gray truncate dark:text-gray-400 text-wrap">
                                                {appointment.profession}
                                            </p>
                                        </div>
                                        <div className="mx-3 flex-1 justify-start">
                                            <p className="text-lg text-black truncate dark:text-gray-400 text-wrap">
                                                {appointment.description}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {appointment.price}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointments;
