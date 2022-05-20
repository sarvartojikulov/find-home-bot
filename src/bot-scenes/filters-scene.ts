import UserModel from "../schemas/UserSchema";
import { Scenes } from "telegraf";
import MyContext from "../types/context";
import Cities from "../types/cities";
import UserService from "../services/UserSevice";

const cities: Cities[] = ["Berlin"];

function generateMinMax(str: string): Record<string, number | undefined> {
  const [min, max] = str
    .split("-")
    .map((num) => (Number(num) ? Number(num) : undefined));
  return { min, max };
}

const Filters_Scene = new Scenes.WizardScene(
  "FILTERS_SCENE",
  async (ctx: MyContext) => {
    const user = await UserService.getUser(ctx.chat.id);
    if (user) return ctx.scene.leave();
    ctx.scene.session.sessionState = {};
    ctx.reply("Setup your filters. (only 4 steps)");
    ctx.reply("Step 1: Enter your price range. Example: 300-1000");
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    ctx.scene.session.sessionState.price = generateMinMax(ctx.message.text);
    await ctx.reply("Step 2: Enter your size range. Example: 20-40");
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    ctx.scene.session.sessionState.size = generateMinMax(ctx.message.text);
    await ctx.reply("Step 3: Enter your rooms range. Example: 1-5");
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    ctx.scene.session.sessionState.rooms = generateMinMax(ctx.message.text);
    const cities_keyboard = cities.map((city) => [{ text: city }]);
    await ctx.reply("Step 3: Choose your city", {
      reply_markup: {
        keyboard: cities_keyboard,
        one_time_keyboard: true,
      },
    });
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    const { message, chat } = ctx;
    console.log(ctx.scene.session.sessionState);
    const city = message.text as Cities;
    await UserService.createUser({
      chatId: chat.id,
      options: ctx.scene.session.sessionState,
      city,
      lastId: "asdsad",
    });
    await ctx.reply("Thank you!");
    return ctx.scene.leave();
  }
);

export default Filters_Scene;
