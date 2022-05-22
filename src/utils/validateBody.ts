import { NextFunction, Request, Response } from "express";
import Message from "../types/message";

const validateBody = (req: Request, res: Response, next: NextFunction) => {
  const {
    chatId,
    photos,
    title,
    description,
    price,
    rooms,
    size,
    link,
  }: Message = req.body;
  if (!chatId) {
    res.status(400).send("chatId is required");
    return;
  }
  if (!photos || !title || !description || !price || !rooms || !size || !link) {
    res.status(400).send("All fields are required");
    return;
  }
  next();
};

export default validateBody;
