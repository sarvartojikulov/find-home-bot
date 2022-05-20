import Cities from "./cities";
import Options from "./options";

type User = {
  chatId: number;
  options: Options;
  city: Cities;
  lastId: string;
};

export default User;
