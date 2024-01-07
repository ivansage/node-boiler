import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./index";

// Stop the server if someting goes wrong
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Connect to the DB and set port
mongoose
  .connect(process.env.DB_NAME!)
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Stop the server if something goes wrong
process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
