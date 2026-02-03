import { toast } from "react-hot-toast";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, setUser, axios, fetchUser } = useAppContext(); // Ensure setUser is available
  const location = useLocation();
  const [image, setImage] = useState("");
  const isOnline = true;

  const updateImage = async () => {
    if (!image) {
      return toast.error("Please select an image");
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);

        // New Strategy: Use the response from the upload to update the UI directly.
        // This assumes the backend returns the new image URL in `data.imageUrl`.
        if (data.imageUrl) {
          // Check if imageUrl already has query params
          const separator = data.imageUrl.includes("?") ? "&" : "?";
          const newImageUrl = `${data.imageUrl}${separator}v=${Date.now()}`;
          console.log("Setting user image to:", newImageUrl);

          // Optimistically update local user state for immediate feedback
          setUser((prev) => ({ ...prev, image: newImageUrl }));

          // Also fetch fresh data to ensure consistency across the app
          await fetchUser();
        } else {
          console.log("No imageUrl in response, refetching user...");
          await fetchUser();
        }

        setImage(null); // Clear the preview
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update image");
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 
                transform transition-transform duration-300 ease-in-out
                md:static md:translate-x-0 
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                flex flex-col h-full
            `}
      >
        {/* Profile Image Section */}
        <div className="flex flex-col items-center py-5 border-b border-gray-100">
          <div className="group relative">
            <label htmlFor="image" className="cursor-pointer block relative">
              <img
                key={user?.image} // Force re-render when image URL changes
                src={
                  image
                    ? URL.createObjectURL(image)
                    : user?.image ||
                    "https://avatars.githubusercontent.com/u/5399488?s=400&v=4"
                }
                alt="Profile"
                className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-blue-50 transition-all duration-300"
              />

              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />

              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <img
                  src={assets.edit_icon}
                  alt="Edit"
                  className="w-8 h-8 invert opacity-80"
                />
              </div>
              <div
                className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white ${isOnline ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
            </label>
          </div>

          {image && (
            <button
              onClick={updateImage}
              className="mt-4 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-blue-700 transition hover:-translate-y-0.5"
            >
              Save Photo
              <img src={assets.check_icon} alt="" className="w-3 h-3 invert" />
            </button>
          )}

          <h3 className="mt-5 text-xl font-bold text-gray-900">{user?.name}</h3>
          <p className="text-sm text-gray-500 font-medium">{user?.email}</p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-8 px-5 flex flex-col gap-2 overflow-y-auto">
          {ownerMenuLinks.map((link, index) => {
            const isActive = link.path === location.pathname;
            return (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                                    relative flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group
                                    ${isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 translate-x-1"
                    : "text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                  }
                                `}
              >
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt={link.name}
                  className={`w-5 h-5 transition-all duration-300 ${isActive ? "invert brightness-0 bg-transparent scale-110" : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"}`}
                  style={isActive ? { filter: "brightness(0) invert(1)" } : {}}
                />

                <span
                  className={`font-semibold tracking-wide ${isActive ? "" : "group-hover:tracking-wider transition-all"}`}
                >
                  {link.name}
                </span>

                {isActive && (
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white/40"></div>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
