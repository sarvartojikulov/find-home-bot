import { Scenes, session } from "telegraf";
import { Telegraf } from "telegraf";
import UserService from "./services/UserSevice";
import MyContext from "./types/context";

class BOT {
  private bot: Telegraf<MyContext>;

  constructor(key?: string, scenes?: Scenes.BaseScene<MyContext>[]) {
    if (!key) return;
    this.init(key, scenes);
  }

  private init(key: string, scenes: Scenes.BaseScene<MyContext>[]) {
    this.bot = new Telegraf<MyContext>(key);
    const stage = new Scenes.Stage<MyContext>(scenes);
    this.bot.use(session());
    this.bot.use((ctx, next) => {
      const now = new Date();
      ctx.myContextProp = now.toString();
      return next();
    });
    this.onStart();
    this.bot.use(stage.middleware());
    this.bot.hears("hi", (ctx) => ctx.reply("Hey there"));
  }

  public async launch() {
    this.bot.hears("hi", (ctx) => ctx.reply("Hey there"));
    await this.bot.launch();
    console.log(">> Bot Started");

    // Enable graceful stop
    process.once("SIGINT", () => this.bot.stop("SIGINT"));
    process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
  }

  private onStart() {
    return this.bot.start(async (ctx) => {
      const user = await UserService.getUser(ctx.chat.id);
      if (user) return;
      ctx.reply("Welcome to the bot!");
      return ctx.scene.enter("FILTERS_SCENE");
    });
  }
}

export default BOT;
