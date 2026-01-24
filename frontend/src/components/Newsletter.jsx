import React from "react";

const Newsletter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 px-4 my-24 relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                Never Miss a Deal!
            </h1>

            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts sent directly to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row items-center w-full max-w-xl mx-auto bg-white p-2 sm:p-1.5 rounded-2xl sm:rounded-full border border-gray-200 shadow-sm focus-within:shadow-md focus-within:border-primary transition-all duration-300 gap-2 sm:gap-0">
                <input
                    className="flex-grow bg-transparent outline-none px-6 py-3 text-gray-700 placeholder-gray-400 w-full"
                    type="email"
                    placeholder="Enter your email address"
                    required
                />

                <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-xl sm:rounded-full transition-colors duration-300 shrink-0"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
