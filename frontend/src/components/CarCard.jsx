import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {

    const currency = import.meta.env.VITE_APP_CURRENCY;
    const navigate = useNavigate();

    return (
        <div
            onClick={() => { navigate(`/car/${car._id}`); scrollTo(0, 0); }}
            className="
                group rounded-2xl overflow-hidden bg-white
                hover:shadow-xl transition-all duration-300
                cursor-pointer border border-gray-100 flex flex-col h-full
            "
        >
            <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img
                    src={car.image}
                    alt="Car Image"
                    className="
                        w-full h-full object-cover
                        transition-transform duration-700
                        group-hover:scale-110
                    "
                />

                {car.isAvailable && (
                    <p
                        className="
                            absolute top-4 left-4
                            bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1
                            rounded-full text-gray-800 uppercase tracking-wide
                        "
                    >
                        Available Now
                    </p>
                )}

                <div
                    className="
                        absolute bottom-4 right-4
                        bg-white/90 backdrop-blur-md
                        px-4 py-1.5
                        rounded-lg shadow-sm
                    "
                >
                    <span className="font-bold text-gray-900">
                        {currency} {car.pricePerDay}
                    </span>
                    <span className="text-xs text-gray-500 font-medium ml-1">
                        / Day
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 mb-4 uppercase tracking-wider font-medium">
                        {car.category} • {car.year}
                    </p>

                    <hr className="border-gray-100 mb-4" />

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        <div className="flex items-center text-xs text-gray-500 font-medium">
                            <img src={assets.users_icon} alt="" className="h-4 w-4 mr-2 opacity-60" />
                            <span>{car.seating_capacity} Seats</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 font-medium">
                            <img src={assets.fuel_icon} alt="" className="h-4 w-4 mr-2 opacity-60" />
                            <span>{car.fuel_type}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 font-medium">
                            <img src={assets.car_icon} alt="" className="h-4 w-4 mr-2 opacity-60" />
                            <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 font-medium">
                            <img src={assets.location_icon} alt="" className="h-4 w-4 mr-2 opacity-60" />
                            <span>{car.location}</span>
                        </div>
                    </div>
                </div>

                <button
                    className="
                        w-full mt-6 bg-[#0B0F19] text-white py-3 rounded-xl
                        font-medium text-sm transition-transform active:scale-[0.98]
                        group-hover:bg-primary duration-300
                    "
                >
                    Rent Now
                </button>
            </div>
        </div>
    );
};

export default CarCard;
