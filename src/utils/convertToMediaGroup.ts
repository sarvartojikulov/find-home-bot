import Message from "../types/message";
import { InputMediaPhoto } from "typegram";

const generateMarkdown = ({
  title,
  description,
  price,
  rooms,
  size,
  link,
}: Message) => {
  return `
  <b>${title}</b>
  ${description}
  <b>Price</b> : ${price} €
  <b>Rooms</b> : ${rooms}
  <b>Size</b> : ${size} m2
  <a href="${link}">Link to article</a>.
  `;
};

const convertToMediaGroup = ({
  photos,
  ...rest
}: Message): InputMediaPhoto[] => {
  return photos.map((photo, index) => {
    return {
      type: "photo",
      media: photo,
      caption: index === 0 ? generateMarkdown(rest) : "",
      parse_mode: "HTML",
    };
  });
};

export default convertToMediaGroup;
