import mongoose, {Schema, model, Model} from "mongoose";
import {IComic} from "../interfaces";

const comicSchema = new Schema(
  {
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    images: [{type: String, required: true}],
    inStock: {type: Number, required: true, default: 0},
    art_by: {type: String, required: true},
    written_by: {type: String, required: true},
    series: {type: String, required: true},
    publisher: {type: String, required: true},
    type: {type: String, required: true},
    on_sale_date: {type: String, required: true},
    page_count: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    character: {type: String, required: true},
  },
  {
    timestamps: true,
  },
);

comicSchema.index({
  title: "text",
  description: "text",
  slug: "text",
  type: "text",
  art_by: "text",
  written_by: "text",
  series: "text",
  publisher: "text",
  character: "text",
});

const Comic: Model<IComic> =
  mongoose.models?.Comic || model("Comic", comicSchema);

export default Comic;
