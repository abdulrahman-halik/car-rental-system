import React, { useState } from 'react';
import { dummyBookingsData } from '../../assets/assets';
import Title from '../../components/owner/Title';

const ManageBookings = () => {
    const currency = import.meta.env.VITE_APP_CURRENCY;

    // Use local state to manage bookings
    const [bookings, setBookings] = useState(dummyBookingsData);

    // Handle status change
    const handleStatusChange = (index, newStatus) => {
        const updatedBookings = [...bookings];
        updatedBookings[index].status = newStatus;
        setBookings(updatedBookings);
    };

    return (
        <div className="flex-1 w-full bg-gray-50 min-h-screen px-4 md:px-10 pt-10 pb-12 font-outfit">
            <Title
                title="Manage Bookings"
                subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
            />

            {/* Desktop Table View */}
            <div className="hidden md:block w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm mt-8 bg-white">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                        <tr>
                            <th className="p-4">Car Name</th>
                            <th className="p-4">Date Range</th>
                            <th className="p-4">Total Price</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className='p-4'>
                                    <div className="flex items-center gap-3">
                                        <img src={booking.car.image} alt="" className='h-12 w-14 object-cover rounded-md border border-gray-200' />
                                        <div>
                                            <p className='font-semibold text-gray-900'>{booking.car.brand} {booking.car.model}</p>
                                            <p className='text-xs text-gray-400'>ID: #{index + 1230}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className='p-4 text-gray-600 font-medium'>
                                    {booking.pickupDate.split("T")[0]} <span className="text-gray-400 mx-1">to</span> {booking.returnDate.split("T")[0]}
                                </td>
                                <td className='p-4 font-medium text-gray-900'>
                                    {currency} {booking.price}
                                </td>
                                <td className='p-4'>
                                    <span className='px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200'>
                                        Offline
                                    </span>
                                </td>
                                <td className='p-4'>
                                    <div className="relative group max-w-[140px]">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(index, e.target.value)}
                                            className={`appearance-none w-full pl-3 pr-8 py-1.5 text-xs font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm transition-all
                                                ${booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-white text-gray-700 border-gray-300'
                                                }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="confirmed">Confirmed</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden mt-6 space-y-4">
                {bookings.map((booking, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
                        <div className="flex items-center gap-4 border-b border-gray-100 pb-3">
                            <img src={booking.car.image} alt="" className='h-16 w-16 object-cover rounded-lg border border-gray-200' />
                            <div>
                                <h3 className='font-bold text-gray-900'>{booking.car.brand} {booking.car.model}</h3>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                    <span className='px-2 py-0.5 rounded bg-gray-100 border border-gray-200'>Offline</span>
                                </div>
                            </div>
                            <div className="ml-auto flex flex-col items-end">
                                <span className="font-bold text-lg text-blue-600">{currency}{booking.price}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 uppercase font-semibold">Date Range</span>
                                <span className="font-medium text-gray-700">
                                    {booking.pickupDate.split("T")[0]} <span className="text-gray-400 mx-1">to</span> {booking.returnDate.split("T")[0]}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 font-medium">Action:</span>
                            </div>

                            <div className="relative">
                                <select
                                    value={booking.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                    className={`appearance-none pl-3 pr-8 py-2 text-xs font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
                                         ${booking.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-200' :
                                            booking.status === 'cancelled' ? 'bg-red-50 text-red-600 border-red-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="cancelled">Reject</option>
                                    <option value="confirmed">Approve</option>
                                </select>
                                <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 
                                    ${booking.status === 'confirmed' ? 'text-green-600' :
                                        booking.status === 'cancelled' ? 'text-red-600' :
                                            'text-blue-600'
                                    }`}>
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageBookings;