import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ message: "Not authorized, please login!" });
		}

		// verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// get user details from the token ==> exclude password
		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			return res.status(404).json({ message: "user not found" });
		}

		// set user details in the request object
		req.user = user;

		next();
	} catch (err) {
		return res.status(401).json({
			message: "invalid user",
		});
	}
});
