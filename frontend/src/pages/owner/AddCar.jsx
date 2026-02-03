import React, { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const AddCar = () => {
    const { axios, currency } = useAppContext();

    const [image, setImage] = useState(null);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        pricePerDay: 0,
        category: '',
        transmission: '',
        fuel_type: '',
        seating_capacity: 0,
        location: '',
        description: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return null;

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('carData', JSON.stringify(car));

            const { data } = await axios.post('/api/owner/add-car', formData);

            if (data.success) {
                toast.success(data.message);
                setImage(null);
                setCar({
                    brand: '',
                    model: '',
                    year: 0,
                    pricePerDay: 0,
                    category: '',
                    transmission: '',
                    fuel_type: '',
                    seating_capacity: 0,
                    location: '',
                    description: '',
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 w-full bg-gray-50 min-h-screen px-4 md:px-10 pt-10 pb-12 font-outfit">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Title
                        title="Add New Car"
                        subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <form
                        onSubmit={onSubmitHandler}
                        className="flex flex-col gap-8"
                    >
                        {/* Car Image Upload Section */}
                        <div className="w-full">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Car Image
                            </p>

                            <label
                                htmlFor="car-image"
                                className="flex flex-col items-center justify-center w-full h-64 md:h-96 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group overflow-hidden relative"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {image ? (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Car Preview"
                                            className="absolute inset-0 w-full h-full object-contain p-2"
                                        />
                                    ) : (
                                        <>
                                            <div className="p-3 bg-blue-50 text-blue-500 rounded-full mb-3 group-hover:scale-110 transition-transform duration-200">
                                                <img
                                                    src={assets.upload_icon}
                                                    alt=""
                                                    className="w-6 h-6"
                                                />
                                            </div>

                                            <p className="mb-1 text-sm text-gray-700 font-medium">
                                                Click to upload car image
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                SVG, PNG, JPG (MAX. 800x400px)
                                            </p>
                                        </>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    id="car-image"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                            </label>
                        </div>

                        {/* Basic Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. BMW, Audi"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                        value={car.brand}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                brand: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Model
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. X5, E-Class"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                        value={car.model}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                model: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="2024"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                        value={car.year}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                year: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Daily Price ({currency})
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="10000"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                        value={car.pricePerDay}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                pricePerDay: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                                        value={car.category}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                category: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Van">Van</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Specifications Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                                Specifications
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Transmission
                                    </label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                                        value={car.transmission}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                transmission: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Select Transmission</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Semi-Automatic">
                                            Semi-Automatic
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Fuel Type
                                    </label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                                        value={car.fuel_type}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                fuel_type: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Select Fuel Type</option>
                                        <option value="Gas">Gasoline</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Seating Capacity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="4"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                        value={car.seating_capacity}
                                        onChange={(e) =>
                                            setCar({
                                                ...car,
                                                seating_capacity: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location & Details Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                                Location & Details
                            </h3>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Location
                                </label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                                    value={car.location}
                                    onChange={(e) =>
                                        setCar({
                                            ...car,
                                            location: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Location</option>
                                    <option value="Colombo">Colombo</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Galle">Galle</option>
                                    <option value="Jaffna">Jaffna</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="e.g. Luxurious SUV with a spacious interior and advanced features"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                                    value={car.description}
                                    onChange={(e) =>
                                        setCar({
                                            ...car,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end">
                            <button className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:scale-95">
                                <img
                                    src={assets.tick_icon}
                                    alt=""
                                    className="w-5 h-5"
                                />
                                <span>
                                    {isLoading ? 'Listing...' : 'List Your Car'}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCar;
