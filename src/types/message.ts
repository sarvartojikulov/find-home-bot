type Message = {
  chatId: number;
  photos?: string[];
  title: string;
  description: string;
  price: number;
  rooms: number;
  size: number;
  link: string;
};

export default Message;
