import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
	try {
		console.log("connecting to the database");
		await mongoose.connect(process.env.MONGO_URI, {});
		console.log("connected to the database");
	} catch (error) {
		console.log("failed to connect to the database", error.message);
		process.exit(1);
	}
};

export default connect;
