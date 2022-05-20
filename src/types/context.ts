import { Context, Scenes } from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";

interface MyWizardSession extends Scenes.WizardSessionData {
  // will be available under `ctx.scene.session.myWizardSessionProp`
  sessionState: any;
}

interface MyContext extends Context {
  myContextProp: string;
  scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<MyContext>;
  message: Update.New & Update.NonChannel & Message & { text?: string };
}

export default MyContext;
