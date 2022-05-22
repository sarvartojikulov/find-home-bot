import express, { Request, Response } from "express";
import { bot } from "../index";
import UserService from "../services/UserSevice";
import validateBody from "../utils/validateBody";

const router = express.Router();

router.post("/sendMessage", validateBody, async (req, res) => {
  try {
    bot.sendMediaGroup(req.body);
    console.log(">> Message sent");
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  const users = await UserService.getUsers();
  res.status(200).send(JSON.stringify(users));
});

router.post("/:id/lastId/:lastId", async (req: Request, res: Response) => {
  const { id, lastId } = req.params;
  try {
    await UserService.updateUserLastId(Number(id), lastId);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
