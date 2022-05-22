import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import BOT from "./bot";
import Filters_Scene from "./bot-scenes/filters-scene";
import UserController from "./controllers/UserController";

const { mongo_url, BOT_TOKEN } = require("../config");

const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.json());

// Connect to Database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log(">> Connected to MongoDB"));
mongoose.connect(mongo_url);

app.use("/api/users", UserController);

app.listen(port, () => console.log(`>> Running on port ${port}`));

//________________BOT_________________________

const bot = new BOT(BOT_TOKEN, [Filters_Scene]);
bot.launch();

export { bot };
