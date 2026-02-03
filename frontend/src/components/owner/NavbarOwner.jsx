import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext.jsx";

const NavbarOwner = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-white border-b border-gray-200 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="hidden sm:block text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
            Admin
          </span>
        </Link>
        <p>Welcome, {user?.name || "Owner"} </p>
      </div>

      {/* <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                    <div className="text-right hidden sm:block leading-tight">
                        <p className="text-sm font-bold text-gray-900">{user.name || 'Abdul'}</p>
                        <p className="text-xs text-gray-500 font-medium capitalize">Owner</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg overflow-hidden border border-blue-50 ring-2 ring-transparent transition-all hover:ring-blue-100 cursor-pointer">
                        {user.image ? (
                            <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-blue-600 font-bold">A</span>
                        )}
                    </div>
                </div>
            </div> */}
    </div>
  );
};
export default NavbarOwner;
