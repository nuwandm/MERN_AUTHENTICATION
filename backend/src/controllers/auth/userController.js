import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
import generateToken from "../../helpers/generateToken.js";
import bcrypt from "bcrypt";

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

	// generate token with user id
	const token = generateToken(user._id);

	// send back the user and token in the response to the client
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60 * 1000,
		sameSite: true,
		secure: true,
	});

	if (user) {
		const { _id, name, email, role, photo, bio, isVerified } = user;

		return res.status(200).json({
			_id,
			name,
			email,
			role,
			photo,
			bio,
			isVerified,
			token,
		});
	} else {
		return res.status(400).json({
			message: "Invalid user data",
		});
	}
});

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "all fields are required" });
	}

	const userExists = await User.findOne({ email });
	if (!userExists) {
		return res.status(400).json({ message: "User not found, Sign Up!" });
	}

	// check password matching with hashed password in the database
	const isMatch = await bcrypt.compare(password, userExists.password);

	if (!isMatch) {
		return res.status(400).json({
			message: "invalid credentials",
		});
	}
	// generate token with userID
	const token = generateToken(userExists._id);

	if (userExists && isMatch) {
		const { _id, name, email, role, photo, bio, isVerified } = userExists;
		// set the token in a cookie
		res.cookie("token", token, {
			path: "/",
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
			sameSite: true,
			secure: true,
		});

		return res.status(200).json({
			_id,
			name,
			email,
			role,
			photo,
			bio,
			isVerified,
			token,
		});
	} else {
		return res.status(400).json({ message: "invalid user data" });
	}
});

export const logOutUser = asyncHandler(async (req, res) => {
	res.clearCookie("token");
	rea.status(200).json({
		message: "User Logged Out",
	});
});

export const getUser = asyncHandler(async (req, res) => {
	if (req.user) {
		return res.status(200).json(req.user);
	} else {
		return req.status(404).json({
			message: "user not found",
		});
	}
});
