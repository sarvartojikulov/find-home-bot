import { Document } from "mongoose";
import UserModel from "../schemas/UserSchema";
import Options from "../types/options";
import User from "../types/User";

class UserService {
  static async getUser(chatId: number): Promise<User | null> {
    const user = await UserModel.findOne({ chatId });
    return user;
  }
  static async getUsers(): Promise<User[]> {
    try {
      const users = await UserModel.find({}, (err: any, docs: Document[]) => {
        return docs;
      }).clone();

      return users;
    } catch (error) {
      console.error(error);
    }
  }
  static async createUser({
    chatId,
    options,
    city,
    lastId,
  }: User): Promise<User> {
    try {
      const user = new UserModel({ chatId, options, city, lastId });
      const response = await user.save();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateUserOptions(chatId: number, options: Options) {
    try {
      const user = await this.getUser(chatId);
      user.options = options;
      const response = await UserModel.updateOne(user);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateUserLastId(chatId: number, lastId: string) {
    try {
      const user = await this.getUser(chatId);
      user.lastId = lastId;
      const response = await UserModel.updateOne(user);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserService;
