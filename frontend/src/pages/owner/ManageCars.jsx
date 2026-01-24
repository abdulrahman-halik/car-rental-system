import React, { useState } from "react";
import { dummyCarData, assets } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageCars = () => {
    const currency = import.meta.env.VITE_APP_CURRENCY;

    // Use local state for cars
    const [cars, setCars] = useState(dummyCarData);

    // Toggle Availability Handler
    const handleToggleAvailability = (index) => {
        const updatedCars = [...cars];
        updatedCars[index].isAvailable = !updatedCars[index].isAvailable;
        setCars(updatedCars);
    };

    // Delete Handler
    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            const updatedCars = cars.filter((_, i) => i !== index);
            setCars(updatedCars);
        }
    };

    return (
        <div className="flex-1 w-full bg-gray-50 min-h-screen px-4 md:px-10 pt-10 pb-12 font-outfit">
            <Title
                title="Manage Cars"
                subtitle="View all listed cars, update their details, or remove them from the booking platform."
            />

            <div className="mt-8">
                {/* Desktop View - Table */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full border-collapse text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Car Name</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {cars.map((car, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="p-4 flex items-center gap-4">
                                        <img
                                            src={car.image}
                                            alt="car"
                                            className="h-14 w-14 rounded-lg object-cover shadow-sm bg-gray-100"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800 text-base">
                                                {car.brand} {car.model}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {car.seating_capacity} Seats • {car.transmission}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="p-4 font-medium text-gray-700">{car.category}</td>

                                    <td className="p-4">
                                        <span className="font-semibold text-gray-800">{currency} {car.pricePerDay}</span>
                                        <span className="text-xs text-gray-500"> /day</span>
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${car.isAvailable
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {car.isAvailable ? "Available" : "Not Available"}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => handleToggleAvailability(index)}
                                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-all"
                                                title={car.isAvailable ? "Mark Unavailable" : "Mark Available"}
                                            >
                                                <img
                                                    src={car.isAvailable ? assets.eye_icon : assets.eye_close_icon}
                                                    alt="toggle"
                                                    className="w-5 h-5 opacity-70 hover:opacity-100"
                                                />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all"
                                                title="Delete Car"
                                            >
                                                <img
                                                    src={assets.delete_icon}
                                                    alt="delete"
                                                    className="w-5 h-5 opacity-70 hover:opacity-100"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cars.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No cars found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden flex flex-col gap-4">
                    {cars.map((car, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all active:scale-[0.99]">
                            <div className="flex gap-4">
                                <img
                                    src={car.image}
                                    alt="car"
                                    className="h-24 w-24 rounded-lg object-cover bg-gray-100 shrink-0"
                                />
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                                                {car.brand} {car.model}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {car.category} • {car.seating_capacity} Seats • {car.transmission}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-3">
                                        <div>
                                            <span className="font-bold text-gray-900 text-lg">{currency} {car.pricePerDay}</span>
                                            <span className="text-xs text-gray-500">/day</span>
                                        </div>
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${car.isAvailable
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {car.isAvailable ? "Available" : "Unavailable"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center gap-3">
                                <button
                                    onClick={() => handleToggleAvailability(index)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${car.isAvailable
                                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        }`}
                                >
                                    <img
                                        src={car.isAvailable ? assets.eye_icon : assets.eye_close_icon}
                                        alt="toggle"
                                        className="w-4 h-4"
                                    />
                                    {car.isAvailable ? "Hide" : "Show"}
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                >
                                    <img
                                        src={assets.delete_icon}
                                        alt="delete"
                                        className="w-4 h-4"
                                    />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {cars.length === 0 && (
                        <div className="p-8 text-center text-gray-500 bg-white rounded-xl">
                            No cars found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCars;
