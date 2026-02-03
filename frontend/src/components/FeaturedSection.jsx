import CarCard from "./CarCard";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
    const { cars } = useAppContext();

    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 relative">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
                        Featured Cars
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Choose from our wide range of premium luxury cars for
                        your next ride.
                    </p>
                </div>

                <Link
                    to="/cars"
                    className="
                        hidden md:inline-flex items-center justify-center
                        bg-gray-100/80 hover:bg-gray-200
                        text-gray-900 font-medium
                        px-6 py-2.5 rounded-full
                        transition-all duration-300
                        absolute right-0 top-1/2 -translate-y-1/2
                    "
                >
                    View All Cars
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {cars.slice(0, 4).map((item, index) => (
                    <CarCard key={index} car={item} />
                ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-10 flex md:hidden justify-center">
                <Link
                    to="/cars"
                    className="
                        bg-gray-100 hover:bg-gray-200
                        text-gray-900 font-medium
                        px-8 py-3 rounded-full
                        transition-all duration-300
                        w-full text-center
                    "
                >
                    View All Cars
                </Link>
            </div>
        </div>
    );
};

export default FeaturedSection;
