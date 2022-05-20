import { model, Schema } from "mongoose";
import User from "../types/User";
import OptionsSchema from "./OptionsSchema";

const userSchema = new Schema<User>({
  chatId: { type: Number, required: true },
  options: [OptionsSchema],
  city: { type: String, required: true },
  lastId: { type: String, required: true },
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
