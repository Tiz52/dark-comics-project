import moongose, {Schema, model, Model} from "mongoose";
import {IPublisher} from "../interfaces";

const publisherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  banner: {type: String, required: true},
  characters: [{type: Schema.Types.ObjectId, ref: "Character", required: true}],
});

const Publisher: Model<IPublisher> =
  moongose.models?.Publisher || model("Publisher", publisherSchema);

export default Publisher;
