import express from "express";
import mongoose from "mongoose";
import { Scenes, session, Telegraf } from "telegraf";
import Filters_Scene from "./bot-scenes/filters-scene";
import MyContext from "./types/context";

const { mongo_url, BOT_TOKEN } = require("../config");

const app = express();
const port = 3000;

// Connect to Database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("Connected to MongoDB"));
mongoose.connect(mongo_url);

app.listen(port, () => console.log(`Running on port ${port}`));

//________________BOT_________________________

const bot = new Telegraf<MyContext>(BOT_TOKEN);
const stage = new Scenes.Stage<MyContext>([Filters_Scene]);
bot.use(session());
bot.use((ctx, next) => {
  const now = new Date();
  ctx.myContextProp = now.toString();
  return next();
});
bot.use(stage.middleware());

bot.start((ctx) => {
  return ctx.scene.enter("FILTERS_SCENE");
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
