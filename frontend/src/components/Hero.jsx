import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('');

    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-0 bg-light bg-[url('/bg_pattern.png')] bg-cover bg-no-repeat overflow-hidden">

            {/* Header Text */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-heading text-center leading-tight">
                Premium Luxury <br />
                <span className="text-primary">Car Rentals</span>
            </h1>

            <p className="mt-4 text-gray-500 text-center text-sm md:text-base max-w-2xl px-4">
                Experience the pinnacle of automotive excellence. From sleek sedans to rugged SUVs/M5, find your perfect drive today.
            </p>

            {/* Search Bar */}
            <form
                className="
                    flex flex-col md:flex-row
                    items-center
                    gap-4
                    p-2 md:p-3
                    mt-10
                    rounded-2xl md:rounded-full
                    bg-white
                    shadow-[0px_10px_40px_rgba(0,0,0,0.06)]
                    w-11/12 max-w-4xl
                    mx-auto
                    z-10
                    relative
                "
            >
                {/* Location */}
                <div className="flex flex-col w-full md:w-1/3 px-4 md:border-r border-gray-200">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Pick-up Location</label>
                    <div className="flex items-center gap-2">
                        <img src={assets.location_icon} alt="loc" className="w-4 h-4 opacity-50" />
                        <select
                            required
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="bg-transparent outline-none w-full text-gray-700 font-medium py-1"
                        >
                            <option value="">Select Location</option>
                            {cityList.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Pickup Date */}
                <div className="flex flex-col w-full md:w-1/3 px-4 md:border-r border-gray-200">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Pick-up Date</label>
                    <div className="flex items-center gap-2">
                        <img src={assets.calendar_icon || assets.search_icon} alt="cal" className="w-4 h-4 opacity-50" />
                        {/* Fallback to search icon if calendar not in assets, checking assets next... assuming calendar exists or using type date icon */}
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="text-gray-700 font-medium outline-none w-full"
                            required
                        />
                    </div>
                </div>

                {/* Return Date */}
                <div className="flex flex-col w-full md:w-1/3 px-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Return Date</label>
                    <div className="flex items-center gap-2">
                        <img src={assets.calendar_icon || assets.search_icon} alt="cal" className="w-4 h-4 opacity-50" />
                        <input
                            type="date"
                            className="text-gray-700 font-medium outline-none w-full"
                            required
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button
                    className="
                        bg-primary hover:bg-blue-600
                        text-white
                        p-4
                        rounded-xl md:rounded-full
                        transition-all duration-300
                        shadow-lg shadow-blue-500/30
                        md:ml-2
                    "
                >
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="invert w-6 h-6"
                    />
                </button>
            </form>

            {/* Hero Image & Badges */}
            <div className="relative w-full max-w-3xl mt-8 mb-12">
                {/* Badge 1 */}
                <div className="hidden md:flex items-center gap-3 absolute top-0 left-[-2rem] bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm z-20 border border-white">
                    <div className="bg-blue-50 p-2 rounded-full">
                        <span className="text-primary font-bold text-xl">500+</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">Luxury Vehicles</p>
                </div>

                {/* Main Image */}
                <img
                    src={assets.main_car3}
                    alt="Premium Remote Car"
                    className="w-full h-auto object-contain drop-shadow-2xl z-10 relative"
                />

                {/* Badge 2 */}
                <div className="hidden md:flex items-center gap-3 absolute bottom-0 right-[-2rem] bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm z-20 border border-white">
                    <div className="bg-blue-50 p-2 rounded-full">
                        <span className="text-primary font-bold text-xl">4.9/5</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                </div>

                {/* Gradient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-400/20 blur-[90px] -z-10 rounded-full pointer-events-none"></div>
            </div>

        </div>
    );
};

export default Hero;
