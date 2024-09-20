import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
const routFiles = fs.readdirSync("./src/routes");

routFiles.forEach((file) => {
	import(`./src/routes/${file}`)
		.then((route) => {
			app.use("/api/v1", route.default);
		})
		.catch((err) => {
			console.log("failed to load route file", err);
		});
});

const server = async () => {
	try {
		await connect();
		app.listen(port, () => {
			console.log("server is running on port :", port);
		});
	} catch (error) {
		console.log("Starting Failed", error.message);
		process.exit(1);
	}
};

server();
