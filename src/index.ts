import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import AppError from "./utils/app-error.util";
import errorHandler from "./utils/error-handler.util";

const app = express();

/* MIDDLEWARE */
app.use(helmet()); // Set security HTTP headers
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Development logging
}

app.use(express.json({ limit: "10kb" })); // Body parser, reading data from body into req.body

/* ROUTES */
// Add your routes here

// Display this if the url is not found
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Handle all errors
app.use(errorHandler);

export default app;
