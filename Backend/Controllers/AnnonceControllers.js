import AnnonceModel from "../Models/Annonce.js";
import userModel from "../Models/users.js";

import jwt from "jsonwebtoken";

export const getAll = async (req, res) => {
  try {
    const getAnnonce = await AnnonceModel.find();

    if (!getAnnonce || getAnnonce.length == 0) {
      return res.json({ message: "probleme" });
    }
    return res.status(200).json({ message: "sucess", object: getAnnonce });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOne = async (req, res) => {
  let { params } = req;
  let { id } = params;
  let filter = { _id: id };
  try {
    const getOne = await AnnonceModel.findOne(filter);
    if (!getOne) {
      return res.json("there is a probleme with the API");
    }
    return res.json({ message: "element recived", data: getOne });
  } catch (error) {
    console.log(error.message);
  }
};

export const add = async (req, res) => {
  let { body, headers } = req;
  let { token } = headers;

  try {
    const CreateAnnonce = await AnnonceModel.create(body);
    if (!CreateAnnonce) {
      return res.json("probleme");
    }
    const cleartoken = jwt.verify(token, "usertoken");
    let { _id } = cleartoken;
    const FindUser = await userModel.findOne({ _id: _id });
    const Tab = [...FindUser.AnnoncePosted, CreateAnnonce._id];
    const updateUser = await userModel.findOneAndUpdate(
      { _id: _id },
      { $set: { AnnoncePosted: Tab } },
      { new: true }
    );
    return res.json({ message: "Annonce created", data: CreateAnnonce });
  } catch (error) {
    console.log(error.message);
  }
};
export const DeleteAnnonce = async (req, res) => {
  let { params, headers } = req;
  let { token } = headers;

  let { id: idAnnonce } = params;
  try {
    const DeleteAnnonce = await AnnonceModel.findOneAndDelete({
      _id: idAnnonce,
    });
    if (!res) {
      return res.json({ message: "fail" });
    }
    const cleartoken = jwt.verify(token, "usertoken");

    let { _id } = cleartoken;
    const FindUser = await userModel.findOne({ _id: _id });
    const TabFiltred = FindUser.AnnoncePosted.filter((e) => e != idAnnonce);
    const updateUser = await userModel.findOneAndUpdate(
      { _id: _id },
      { $set: { AnnoncePosted: TabFiltred } },
      { new: true }
    );
    return res.json({ message: "Deleted" });
  } catch (error) {
    console.log(error.messsage);
  }
};

export const UpdateAnnonce = async (req, res) => {
  let { params, body } = req;
  let { id } = params;
  let filter = { _id: id };
  try {
    const UpdateAnnonce = await AnnonceModel.findOneAndUpdate(filter, body);
    if (!res) {
      return res.json({ message: "failure" });
    }
    return res.json({ message: "Updated", object: UpdateAnnonce });
  } catch (error) {
    console.log(error.message);
  }
};
export const getMyAnnoncement = async (req, res) => {
  let { headers } = req;
  let { token } = headers;
  try {
    const clearToken = jwt.verify(token, "usertoken");
    let { _id } = clearToken;
    const getUser = await userModel.findOne({ _id: _id });
    const TabToSend = await AnnonceModel.find({ _id: getUser.AnnoncePosted });
    if (!TabToSend) {
      return res.json({
        message: "either the table is empty or there is an error in the api",
      });
    }
    return res.json({ message: "sucess", object: TabToSend });
  } catch (error) {
    console.log(error.message);
  }
};
