import express from "express";
import {
  add,
  getAll,
  getOne,
  DeleteAnnonce,
  UpdateAnnonce,
  getMyAnnoncement,
} from "../Controllers/AnnonceControllers.js";
const AnnonceRoute = express.Router();

AnnonceRoute.get("/", getAll);
AnnonceRoute.get("/One/:id", getOne);
AnnonceRoute.post("/add", add);
AnnonceRoute.get("/delete/:id", DeleteAnnonce);
AnnonceRoute.post("/update/:id", UpdateAnnonce);
AnnonceRoute.get("/myannoncement", getMyAnnoncement);
export default AnnonceRoute;
