import mongoose from "mongoose";
const userModel = mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  userImage: { type: String },
  email: { type: String, unique: true },
  password: { type: String, unique: true, required: true },
  age: { type: Number },
  gender: { type: String },
  favorite: [{ type: mongoose.Schema.ObjectId, ref: "Annonce" }],
  AnnoncePosted: [{ type: mongoose.Schema.ObjectId, ref: "Annonce" }],
  created_at: { type: Date, required: true, default: Date.now },
});
export default mongoose.model("users", userModel);
