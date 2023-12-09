import mongoose from "mongoose";
const AnnonceModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  Street: { type: String },
  Region: { type: String },
  city: { type: String },
  picture: { type: String },
  price: {
    type: Number,
    required: true,
  },
  categorie: {
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
  },
  phone: {
    type: Number,
  },
});
export default mongoose.model("Annonce", AnnonceModel);
