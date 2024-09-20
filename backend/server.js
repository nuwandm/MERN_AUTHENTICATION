import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT;

const app = express();

// middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);
 
const server = async () => {
	try {
		await connect();
		console.log("server is running on port :", port);
	} catch (error) {
		console.log("Starting Failed", error.message);
		process.exit(1);
	}
};

server();
