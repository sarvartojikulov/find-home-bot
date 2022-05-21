import { Scenes } from "telegraf";
import UserService from "../services/UserSevice";
import Cities from "../types/cities";
import MyContext from "../types/context";

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
    const cities_keyboard = cities.map((city) => [
      { text: city, callback_data: city },
    ]);
    await ctx.reply("Step 3: Choose your city", {
      reply_markup: {
        inline_keyboard: cities_keyboard,
      },
    });
    return ctx.wizard.next();
  }
);

cities.forEach((city) => {
  Filters_Scene.action(city, async (ctx: MyContext) => {
    const { id } = ctx.chat;
    console.log(ctx.scene.session.sessionState);
    await UserService.createUser({
      chatId: id,
      options: ctx.scene.session.sessionState,
      city,
      lastId: "asdsad",
    });
    await ctx.reply("Thank you!");
    return ctx.scene.leave();
  });
});

export default Filters_Scene;
