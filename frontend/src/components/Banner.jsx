import { assets } from "../assets/assets";

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between px-8 md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] rounded-2xl overflow-hidden">

                <div>
                    <h2 className="text-2xl md:text-3xl font-medium text-white">
                        DO You Own a Luxury Car?
                    </h2>

                    <p className="mt-2 text-sm md:text-base text-white">
                        Turn your premium vehicle into a source of income by listing it on CarRental.
                    </p>

                    <p className="max-w-lg mt-2 text-sm md:text-base text-white">
                        We handle insurance, driver verification, and secure payments—so you can earn effortlessly without the hassle.
                    </p>

                    <button className="px-6 py-2 bg-white hover:bg-slate-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg text-primary rounded-lg text-sm mt-4 cursor-pointer">
                        List Your Car
                    </button>
                </div>

                <img
                    src={assets.banner_car_image}
                    alt="car"
                    className="max-h-48 mt-10 w-auto self-end md:self-auto"
                />
            </div>
        </div>
    );
};

export default Banner;