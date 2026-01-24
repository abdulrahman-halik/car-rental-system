import React from 'react';
import { assets } from '../assets/assets';
import Title from './Title';

const Testimonial = () => {
    const testimonials = [
        {
            name: "Emma Rodriguez",
            location: "Barcelona, Spain",
            image: assets.testimonial_image_1,
            testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional.",
        },
        {
            name: "Sarah Johnson",
            location: "London, UK",
            image: assets.testimonial_image_2,
            testimonial: "Renting here made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
        },
        {
            name: "Michael Chen",
            location: "San Francisco, USA",
            image: assets.testimonial_image_1, // Using fallback if image_3 not available, assuming re-use or generic placeholder
            testimonial: "They highly recommend this service! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
        },
    ];

    return (
        <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Discover why discerning travelers choose us for their luxury accommodations around the world.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-white py-8 px-12 rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                className="w-14 h-14 rounded-full object-cover"
                                src={testimonial.image}
                                alt={testimonial.name}
                            />
                            <div>
                                <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
                                <p className="text-sm text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <img key={index} src={assets.star_icon} alt="star-icon" className="w-4 h-4" />
                                ))}
                        </div>

                        <p className="text-gray-600 leading-relaxed italic">
                            "{testimonial.testimonial}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
