import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";

export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: "Password must be at least 6 characters" });
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.status(400).json({ message: "User Exists" });
	}
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		const { _id, name, email, role, photo, bio, isVerified } = user;

		return res.status(201).json({
			_id,
			name,
			email,
			role,
			photo,
			bio,
			isVerified,
		});
	} else {
		return res.status(400).json({
			message: "Invalid user data",
		});
	}
});
