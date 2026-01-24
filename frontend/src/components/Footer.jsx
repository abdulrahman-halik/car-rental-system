import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div className="bg-white pt-6 pb-2">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500">
                <div className="flex flex-wrap justify-between items-start gap-6 pb-6 border-b border-gray-100">

                    {/* Logo & Description */}
                    <div className="md:w-1/3">
                        <div className="mb-4">
                            <img
                                src={assets.logo}
                                alt="logo"
                                className="w-12 h-14 block -ml-3 md:-ml-3 lg:-ml-3"
                            />
                        </div>
                        <p className="max-w-xs leading-relaxed">
                            A premium car rental service offering both luxury and everyday vehicles to suit all your travel needs. Experience the difference today.
                        </p>

                        <div className="flex items-center gap-4 mt-6">
                            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><img src={assets.instagram_logo} className="w-5 h-5" alt="" /></a>
                            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><img src={assets.facebook_logo} className="w-5 h-5" alt="" /></a>
                            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><img src={assets.twitter_logo} className="w-5 h-5" alt="" /></a>
                            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><img src={assets.gmail_logo} className="w-5 h-5" alt="" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-base font-bold text-gray-900 uppercase mb-4 tracking-wider">
                            Quick Links
                        </h2>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Browse Cars</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">List Your Car</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h2 className="text-base font-bold text-gray-900 uppercase mb-4 tracking-wider">
                            Resources
                        </h2>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Insurance</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-base font-bold text-gray-900 uppercase mb-4 tracking-wider">
                            Contact
                        </h2>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-2">
                                <span className="opacity-70">No 123, Galle Road, Colombo</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="opacity-70">+94 11 234 5678</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="opacity-70">ar.car@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-8">
                    <p>
                        © {new Date().getFullYear()} Rent A Car. All rights reserved.
                    </p>
                    <ul className="flex items-center gap-6">
                        <li>
                            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
