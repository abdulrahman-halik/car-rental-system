import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = await User.findById(userId.id).select("-password");
    next();
  } catch (err) {
    return res.json({
      success: false,
      message: "Unauthorized",
    });
  }
};
