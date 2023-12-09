import express from "express";
import bodyparser from "body-parser";
import http from "http";
import cors from "cors";
const PORT = 3000;
import mongoose from "mongoose";
import AnnonceRoute from "./Routes/AnnonceRouter.js";
import UserRoute from "./Routes/userRouter.js";
const app = express();
http.createServer(app);
app.use(cors({ origine: "*" }));
app.use(bodyparser.json({ limit: "50mb" }));
mongoose.connect("mongodb://127.0.0.1:27017/TheGodFather").then(() => {
  console.log("the data base is connected");
});
app.use("/Annonce", AnnonceRoute);
app.use("/User", UserRoute);

app.listen(PORT, () => {
  console.log(`connected at the port ${PORT}`);
});
