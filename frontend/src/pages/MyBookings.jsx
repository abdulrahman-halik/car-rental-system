import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const MyBookings = () => {
    const { axios, user, currency } = useAppContext();
    const [bookings, setBookings] = useState([]);

    const fetchMyBookings = async () => {
        try {
            const { data } = await axios.get("/api/bookings/user");
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) fetchMyBookings();
    }, [user]);

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 min-h-screen">
            <Title
                title="My Bookings"
                subtitle="View and manage your recent bookings"
                align="left"
            />

            <div className="flex flex-col gap-6 mt-8">
                {bookings.map((booking, index) => (
                    <div
                        key={booking._id}
                        className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row gap-6 md:gap-8 items-start"
                    >
                        {/* Car Image */}
                        <div className="w-full md:w-80 shrink-0 rounded-lg overflow-hidden h-48 md:h-48 bg-gray-100">
                            <img
                                src={booking.car.image}
                                alt={`${booking.car.brand} ${booking.car.model}`}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Car Info */}
                            <div className="md:col-span-1 space-y-1">
                                <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded mb-2">
                                    Booking #{index + 1}
                                </span>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {booking.car.brand} {booking.car.model}
                                </h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    {booking.car.year} • {booking.car.category}
                                </p>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                                    <img
                                        src={assets.location_icon_colored}
                                        alt="Location"
                                        className="w-4 h-4 opacity-70"
                                    />
                                    <span>{booking.car.location}</span>
                                </div>
                            </div>

                            {/* Dates & Status */}
                            <div className="md:col-span-1 flex flex-col justify-center space-y-3">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
                                        Rental Period
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                        <img
                                            src={assets.calendar_icon_colored}
                                            alt="Date"
                                            className="w-4 h-4"
                                        />
                                        <span>
                                            {booking.pickupDate.split("T")[0]}{" "}
                                            <span className="text-gray-400 mx-1">→</span>{" "}
                                            {booking.returnDate.split("T")[0]}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${booking.status === "confirmed"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                            }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${booking.status === "confirmed"
                                                    ? "bg-green-600"
                                                    : "bg-amber-600"
                                                }`}
                                        ></span>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div className="md:col-span-1 flex flex-col justify-center md:items-end md:text-right gap-1 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                                <p className="text-xs text-gray-400 font-medium">Total Amount</p>
                                <h3 className="text-2xl font-bold text-primary">
                                    {currency}
                                    {booking.price.toLocaleString()}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    Booked on {booking.createdAt.split("T")[0]}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {bookings.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No bookings found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
