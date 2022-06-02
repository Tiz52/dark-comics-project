import moongose, {Schema, model, Model} from "mongoose";
import {ICharacter} from "../interfaces";

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {type: String, required: true, unique: true},
  publisher: {type: String, required: true},
  image: {type: String, required: true},
  comics: [{type: Schema.Types.ObjectId, ref: "Comic"}],
});

const Character: Model<ICharacter> =
  moongose.models?.Character || model("Character", characterSchema);

export default Character;
