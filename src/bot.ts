import { Scenes, session, Telegraf } from "telegraf";
import UserService from "./services/UserSevice";
import MyContext from "./types/context";
import Message from "./types/message";
import convertToMediaGroup from "./utils/convertToMediaGroup";

class BOT {
  public bot: Telegraf<MyContext>;

  constructor(key: string, scenes: Scenes.BaseScene<MyContext>[]) {
    this.init(key, scenes);
  }

  private async init(key: string, scenes: Scenes.BaseScene<MyContext>[]) {
    this.bot = new Telegraf<MyContext>(key);
    const stage = new Scenes.Stage<MyContext>(scenes);
    this.bot.use(session());
    this.bot.use((ctx, next) => {
      const now = new Date();
      ctx.myContextProp = now.toString();
      return next();
    });
    this.bot.use(stage.middleware());
    this.onStart();
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
    this.bot.start(async (ctx: MyContext) => {
      const user = await UserService.getUser(ctx.chat.id);
      if (user) return;
      await ctx.reply("Welcome to the bot!");
      return ctx.scene.enter("FILTERS_SCENE");
    });
  }
  public sendMessage(chatId: number, message: string) {
    this.bot.telegram.sendMessage(chatId, message);
  }
  public sendMediaGroup(message: Message) {
    const mediaGroup = convertToMediaGroup(message);
    this.bot.telegram.sendMediaGroup(message.chatId, mediaGroup);
  }
}

export default BOT;
