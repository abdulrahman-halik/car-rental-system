import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyCarData, assets } from '../assets/assets';
import Loader from '../components/Loader';

const CarDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_APP_CURRENCY;
    const car = dummyCarData.find(car => car._id === id);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return car ? (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-8 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer group"
            >
                <img
                    src={assets.arrow_icon}
                    alt=""
                    className="w-3.5 h-auto rotate-180 opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-sm font-medium">Back to all cars</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-12">

                {/* Left Column: Image & Details */}
                <div className="flex flex-col gap-8">

                    {/* Car Image */}
                    <div className="w-full">
                        <img
                            src={car.image}
                            alt={car.model}
                            className="w-full h-[350px] md:h-[500px] object-cover rounded-2xl shadow-sm border border-gray-100"
                        />
                    </div>

                    {/* Title & Specs */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {car.brand} {car.model}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 text-base md:text-lg">
                                <span>{car.category}</span>
                                <span>|</span>
                                <span>{car.year}</span>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: assets.users_icon, label: "Seats", value: `${car.seating_capacity} Seats` },
                                { icon: assets.fuel_icon, label: "Fuel Type", value: car.fuel_type },
                                { icon: assets.car_icon, label: "Transmission", value: car.transmission },
                                { icon: assets.location_icon, label: "Location", value: car.location },
                            ].map(({ icon, value }) => (
                                <div
                                    key={value}
                                    className="flex flex-col items-center justify-center gap-3 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                        <img src={icon} alt="" className="h-6 w-auto opacity-80" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-gray-800">
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="border-gray-100" />

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Description
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {car.description}
                            </p>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Features */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Features
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                {[
                                    "360 Camera",
                                    "Bluetooth Connectivity",
                                    "GPS Navigation System",
                                    "Heated Leather Seats",
                                    "Rear View Mirror",
                                    "Adaptive Cruise Control",
                                    "Apple CarPlay / Android Auto"
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center text-gray-600 py-2"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                                            <img
                                                src={assets.check_icon || assets.tick_icon}
                                                className="h-3 w-3 object-contain"
                                                alt=""
                                            />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Right Column: Booking Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 sticky top-24 h-fit rounded-2xl p-6 lg:p-8 space-y-6"
                >

                    <div className="flex items-baseline justify-between mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                            {currency} {car.pricePerDay}
                        </span>
                        <span className="text-gray-400 font-medium">per day</span>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="pickup-date" className="text-sm font-semibold text-gray-900 block">
                                Pickup Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="pickup-date"
                                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
                                    required
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="return-date" className="text-sm font-semibold text-gray-900 block">
                                Return Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="return-date"
                                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary-dull transition-all duration-300 py-4 font-semibold text-white text-lg rounded-xl shadow-lg shadow-primary/30 active:scale-[0.99] cursor-pointer mt-4">
                        Book Now
                    </button>

                    <div className="text-center text-xs text-gray-400 font-medium mt-4">
                        No credit card required to reserve
                    </div>

                </form>

            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default CarDetails;
