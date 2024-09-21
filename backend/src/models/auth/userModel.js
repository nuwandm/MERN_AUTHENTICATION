import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please provide your name"],
		},
		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: true,
			trim: true,
			match: [
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				"Please provide a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "please add password"],
		},
		photo: {
			type: String,
			default:
				"https://img.freepik.com/free-psd/flat-man-character_23-2151534209.jpg",
		},
		bio: {
			type: String,
			default: "I am a new user",
		},
		role: {
			type: String,
			enum: ["user", "admin", "creator"],
			default: "user",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		minimize: true,
	}
);

const User = mongoose.model("User", UserSchema);
export default User;
