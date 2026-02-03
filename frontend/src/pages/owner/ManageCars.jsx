import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ManageCars = () => {
    const { isOwner, axios, currency } = useAppContext();

    const [cars, setCars] = useState([]);

    const fetchOwnerCars = async () => {
        try {
            const { data } = await axios.get("/api/owner/cars");

            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const toggleAvailability = async (carId) => {
        try {
            const { data } = await axios.post(
                "/api/owner/toggle-car",
                { carId }
            );

            if (data.success) {
                toast.success(data.message);
                fetchOwnerCars();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const deleteCar = async (carId) => {
        try {
            const confirm = window.confirm(
                "Are you sure you want to delete this car?"
            );

            if (!confirm) return null;

            const { data } = await axios.post(
                "/api/owner/delete-car",
                { carId }
            );

            if (data.success) {
                toast.success(data.message);
                fetchOwnerCars();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        isOwner && fetchOwnerCars();
    }, [isOwner]);

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
                                <th className="p-4 font-semibold text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {cars.map((car, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                                            <img
                                                src={car.image}
                                                alt="car"
                                                className="h-full w-full object-contain p-1"
                                            />
                                        </div>

                                        <div>
                                            <p className="font-semibold text-gray-800 text-base">
                                                {car.brand} {car.model}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {car.seating_capacity} Seats •{" "}
                                                {car.transmission}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="p-4 font-medium text-gray-700">
                                        {car.category}
                                    </td>

                                    <td className="p-4">
                                        <span className="font-semibold text-gray-800">
                                            {currency} {car.pricePerDay}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {" "}
                                            /day
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${car.isAvailable
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {car.isAvailable
                                                ? "Available"
                                                : "Not Available"}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() =>
                                                    toggleAvailability(car._id)
                                                }
                                                className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all border border-gray-200 shadow-sm hover:shadow"
                                                title={
                                                    car.isAvailable
                                                        ? "Mark Unavailable"
                                                        : "Mark Available"
                                                }
                                            >
                                                <img
                                                    src={
                                                        car.isAvailable
                                                            ? assets.eye_icon
                                                            : assets.eye_close_icon
                                                    }
                                                    alt="toggle"
                                                    className="w-6 h-6"
                                                />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteCar(car._id)
                                                }
                                                className="p-2.5 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all border border-gray-200 shadow-sm hover:shadow"
                                                title="Delete Car"
                                            >
                                                <img
                                                    src={assets.delete_icon}
                                                    alt="delete"
                                                    className="w-6 h-6"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {cars.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-8 text-center text-gray-500"
                                    >
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
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all active:scale-[0.99]"
                        >
                            <div className="flex gap-4">
                                <div className="h-24 w-32 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                                    <img
                                        src={car.image}
                                        alt="car"
                                        className="h-full w-full object-contain p-1"
                                    />
                                </div>

                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                                            {car.brand} {car.model}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {car.category} •{" "}
                                            {car.seating_capacity} Seats •{" "}
                                            {car.transmission}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-3">
                                        <div>
                                            <span className="font-bold text-gray-900 text-lg">
                                                {currency} {car.pricePerDay}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                /day
                                            </span>
                                        </div>

                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${car.isAvailable
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {car.isAvailable
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center gap-3">
                                <button
                                    onClick={() =>
                                        toggleAvailability(car._id)
                                    }
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${car.isAvailable
                                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        }`}
                                >
                                    <img
                                        src={
                                            car.isAvailable
                                                ? assets.eye_icon
                                                : assets.eye_close_icon
                                        }
                                        alt="toggle"
                                        className="w-4 h-4"
                                    />
                                    {car.isAvailable ? "Hide" : "Show"}
                                </button>

                                <button
                                    onClick={() => deleteCar(car._id)}
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
