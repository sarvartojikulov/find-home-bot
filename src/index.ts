import express from "express";
import mongoose from "mongoose";
import BOT from "./bot";
import Filters_Scene from "./bot-scenes/filters-scene";

const { mongo_url, BOT_TOKEN } = require("../config");

const app = express();
const port = 3000;

// Connect to Database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log(">> Connected to MongoDB"));
mongoose.connect(mongo_url);

app.listen(port, () => console.log(`>> Running on port ${port}`));

//________________BOT_________________________

const bot = new BOT(BOT_TOKEN, [Filters_Scene]);
bot.launch();
