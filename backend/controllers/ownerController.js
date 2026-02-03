import fs from "fs";
import imagekit from "../config/imageKit.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

// ================= CHANGE ROLE =================
export const changeRoleToOwner = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= ADD CAR =================
export const addCar = async (req, res) => {

  try {
    if (!req.user) {

      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Car image is required",
      });
    }

    // Parse JSON
    let car;
    try {
      car = JSON.parse(req.body.carData);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: "Invalid car data format",
      });
    }

    const requiredFields = [
      "brand",
      "model",
      "year",
      "pricePerDay",
      "category",
      "transmission",
      "fuel_type",
      "seating_capacity",
      "location",
      "description",
    ];

    const missing = requiredFields.filter((f) => !car[f]);
    if (missing.length) {

      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missing.join(", ")}`,
      });
    }

    // Upload image
    // Upload image
    const uploadRes = await imagekit.files.upload({
      file: fs.createReadStream(req.file.path),
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/cars",
    });


    const imageUrl = imagekit.helper.buildSrc({
      src: uploadRes.filePath,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    // Safely delete local file
    try {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }


    await Car.create({
      ...car,
      owner: req.user._id,
      image: imageUrl,
    });


    res.json({ success: true, message: "Car added successfully" });
  } catch (err) {
    console.error("Add Car Error:", err);
    // Log detailed ImageKit error if available
    if (err.$ResponseMetadata) {
      console.error("ImageKit Response Headers:", err.$ResponseMetadata.headers);
      console.error("ImageKit Response Status:", err.$ResponseMetadata.statusCode);
    }

    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error("Failed to cleanup file on error:", e);
      }
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= GET OWNER CARS =================
export const getOwnerCars = async (req, res) => {
  const cars = await Car.find({ owner: req.user._id });
  res.json({ success: true, cars });
};

// ================= TOGGLE AVAILABILITY =================
export const toggleCarAvailability = async (req, res) => {
  const car = await Car.findById(req.body.carId);
  if (!car || car.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  car.isAvailable = !car.isAvailable;
  await car.save();
  res.json({ success: true });
};

// ================= DELETE CAR =================
export const deleteCar = async (req, res) => {
  const car = await Car.findById(req.body.carId);
  if (!car || car.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false });
  }
  car.owner = null;
  car.isAvailable = false;
  await car.save();
  res.json({ success: true });
};

// ================= DASHBOARD =================
export const getDashboardData = async (req, res) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({ success: false });
  }

  const cars = await Car.find({ owner: req.user._id });
  const bookings = await Booking.find({ owner: req.user._id }).populate("car");

  const confirmed = bookings.filter(b => b.status === "confirmed");
  const revenue = confirmed.reduce((a, b) => a + b.price, 0);

  res.json({
    success: true,
    dashboardData: {
      totalCars: cars.length,
      totalBookings: bookings.length,
      monthlyRevenue: revenue,
      availableCars: cars.filter(c => c.isAvailable).length,
      rentedCars: cars.filter(c => !c.isAvailable).length,
      recentBookings: bookings.slice(0, 3),
    },
  });
};

// ================= UPDATE USER IMAGE =================
export const updateUserImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image" });
  }

  const uploadRes = await imagekit.files.upload({
    file: fs.createReadStream(req.file.path),
    fileName: `${Date.now()}-${req.file.originalname}`,
    folder: "/users",
  });

  fs.unlinkSync(req.file.path);

  const imageUrl = imagekit.helper.buildSrc({
    src: uploadRes.filePath,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    transformation: [{ width: "400" }, { quality: "auto" }, { format: "webp" }],
  });

  await User.findByIdAndUpdate(req.user._id, { image: imageUrl });
  res.json({ success: true, imageUrl });
};
