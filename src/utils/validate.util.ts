import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

// Validate incoming request body
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "fail", errors: errors.array() });
  }
  next();
};

export default validate;
