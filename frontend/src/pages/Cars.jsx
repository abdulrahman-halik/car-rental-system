import React, { useState } from 'react';
import Title from '../components/Title';
import CarCard from '../components/CarCard';
import { assets, dummyCarData } from '../assets/assets';

const Cars = () => {

    const [input, setInput] = useState('');
    const [sortType, setSortType] = useState('relevant');

    const getSortedCars = () => {
        let sorted = [...dummyCarData];
        if (sortType === 'low-high') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortType === 'high-low') {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted;
    };

    return (
        <div>

            <div className="flex flex-col items-center py-20 bg-light px-4 sm:px-6 lg:px-8">
                <Title
                    title="Available Cars"
                    subtitle="Browse our selection of premium vehicles available for your next adventure"
                />

                <div className="flex items-center bg-white px-4 mt-6 max-w-lg w-full h-12 rounded-full shadow-sm border border-gray-100">
                    <img
                        src={assets.search_icon}
                        alt=""
                        className="w-5 h-5 mr-3 opacity-50"
                    />

                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder="Search by make, model or features"
                        aria-label="Search cars"
                        className="w-full h-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                    />

                    <img
                        src={assets.filter_icon}
                        alt=""
                        className="w-5 h-5 ml-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header Section: Count & Sort */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <p className="text-gray-500 font-medium tracking-wide uppercase text-xs sm:text-sm">
                        Showing {dummyCarData.length} cars
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Sort by:</span>
                        <select
                            onChange={(e) => setSortType(e.target.value)}
                            className="border-none outline-none text-sm font-semibold text-gray-900 bg-transparent cursor-pointer hover:text-primary transition-colors"
                        >
                            <option value="relevant">Recommended</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {getSortedCars().map((car, index) => (
                        <div key={index}>
                            <CarCard car={car} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Cars;
