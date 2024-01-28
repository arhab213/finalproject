import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
userModel.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
});
export default mongoose.model("users", userModel);
