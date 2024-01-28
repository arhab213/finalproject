import userModel from "../Models/users.js";
import AnnonceModel from "../Models/Annonce.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const getAll = async (req, res) => {
  const GetAllUsers = await userModel.find();
  return res.json({ object: GetAllUsers });
};
export const getOne = async (req, res) => {
  try {
    let { headers } = req;
    let { token } = headers;
    const clearToken = jwt.verify(token, "usertoken");
    let { _id } = clearToken;
    const getuser = await userModel.findOne({ _id: _id });
    if (!getuser) {
      return res.json({ message: "problem" });
    }
    return res.json({
      message: "sucess",
      object: {
        username: getuser.username,
        image: getuser.userImage,
        Date: getuser.created_at.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const addUser = async (req, res) => {
  let { body } = req;
  try {
    const CreateUser = await userModel.create(body);
    if (!CreateUser) {
      return res.json({ message: "problemeUser" });
    }
    return res.json({ message: "created", object: CreateUser });
  } catch (error) {
    return res.json(error.message);
  }
};
export const Login = async (req, res) => {
  let { body } = req;

  let { username, password } = body;
  try {
    const LoginUser = await userModel.findOne({ username: username });
    if (!LoginUser) {
      return res.json({ message: "UserPrblm" });
    }
    const IsPasswordCorrect = await bcrypt.compare(
      password,
      LoginUser.password
    );
    if (!IsPasswordCorrect) {
      return res.json({ message: "passwordPrbl" });
    }
    let { _id: id } = LoginUser;
    let token = jwt.sign({ _id: id }, "usertoken");

    return res.json({ message: "created", token: token });
  } catch (error) {
    return res.json(error.message);
  }
};
export const putFavorite = async (req, res) => {
  try {
    let { headers, params } = req;
    let { id: AnnonceId } = params;
    if (!headers.token) {
      return res.json({ message: "error token" });
    }
    const cleartoken = jwt.verify(headers.token, "usertoken");
    let { _id: id } = cleartoken;
    const FindUser = await userModel.findOne({ _id: id });
    if (!FindUser.favorite.includes(AnnonceId)) {
      FindUser.favorite.push(AnnonceId);
    }
    const userUpdate = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { favorite: FindUser.favorite } },
      { new: true }
    );

    return res.json({ message: "positive", object: FindUser.favorite });
  } catch (error) {
    console.log(error.message);
  }
};
export const removeFavorite = async (req, res) => {
  try {
    let { headers, params } = req;
    let { id: AnnonceId } = params;
    const cleartoken = jwt.verify(headers.token, "usertoken");
    let { _id: id } = cleartoken;
    const FindUser = await userModel.findOne({ _id: id });
    let { favorite } = FindUser;
    let NewFavorite = favorite.filter((e) => e != AnnonceId);
    const userUpdate = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { favorite: NewFavorite } },
      { new: true }
    );
    const setIsfavorite = await AnnonceModel.findOneAndUpdate(
      { _id: AnnonceId },
      { $set: { Isfavorite: false } },
      { new: true }
    );

    return res.json({ message: "Deleted", Object: userUpdate.favorite });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFavoriteAnnonce = async (req, res) => {
  let { headers } = req;
  const clearToken = jwt.verify(headers.token, "usertoken");
  let { _id: id } = clearToken;
  try {
    const user = await userModel.findOne({ _id: id });
    if (user.favorite.length == 0 || !user.favorite) {
      return res.json({ message: "empty" });
    }
    return res.json({ message: "succes", object: user.favorite });
  } catch (error) {
    console.log(error.message);
  }
};
