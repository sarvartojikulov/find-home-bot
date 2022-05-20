import { Schema } from "mongoose";
import Options from "../types/Options";

const MinMaxSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false }
);

const OptionsSchema = new Schema<Options>(
  {
    price: MinMaxSchema,
    size: MinMaxSchema,
    rooms: MinMaxSchema,
  },
  { _id: false }
);

export default OptionsSchema;
