require("dotenv").config();

module.exports = {
  mongo_url: process.env.DATABASE_URL,
  BOT_TOKEN: process.env.BOT_TOKEN,
};
