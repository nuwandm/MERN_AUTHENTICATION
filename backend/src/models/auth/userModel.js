import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

UserSchema.pre("save", async function (next) {
	// checking the password is not modified
	if (!this.isModified("password")) {
		return next();
	}

	// Generating salt
	const salt = await bcrypt.genSalt(10);

	// Hashing the password with the salt
	const hashedPassword = await bcrypt.hash(this.password, salt);
	this.password = hashedPassword;

	// Calling the next middleware
	next();
});

const User = mongoose.model("User", UserSchema);
export default User;
