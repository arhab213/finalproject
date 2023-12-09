import express from "express";
import {
  addUser,
  Login,
  putFavorite,
  getAll,
  removeFavorite,
  getFavoriteAnnonce,
  getOne,
} from "../Controllers/UserControllers.js";
const UserRoute = express.Router();
UserRoute.get("/", getAll);
UserRoute.get("/one", getOne);
UserRoute.post("/add", addUser);
UserRoute.post("/Login", Login);
UserRoute.post("/putfavorite/:id", putFavorite);
UserRoute.get("/removeFavorite/:id", removeFavorite);
UserRoute.get("/Favorite", getFavoriteAnnonce);

export default UserRoute;
