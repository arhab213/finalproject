import { useState } from "react";
import Home from "../Pages/Home/Home";
import "./App.css";
import Navbar from "../Component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Log in/LogIn";
import AddAnnonce from "../Pages/AddAnnonce/AddAnnonce";
import Register from "../Pages/Register/Register";
import Favorite from "../Pages/FavoritePage/Favorite";
import MyAnnoncement from "../Pages/MyAnnoncement/MyAnnoncement";
import EditAnnonce from "../Pages/EditAnnonce/EditAnnonce";
import VoitureAnnonce from "../Pages/categorieAnnoncement/PageVoitures";
import OtherAnnonce from "../Pages/categorieAnnoncement/PageOther";
import ImobillierAnnonce from "../Pages/categorieAnnoncement/PageImmobillier";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<EditAnnonce />} path="/anotherpage" />
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/Login" />
        <Route element={<Register />} path="/Register" />
        <Route element={<AddAnnonce />} path="/addannonce" />
        <Route element={<Favorite />} path="/Favorite" />
        <Route element={<MyAnnoncement />} path="/MyAnnoncement" />
        <Route element={<VoitureAnnonce />} path="/voiture" />
        <Route element={<OtherAnnonce />} path="/other" />
        <Route element={<ImobillierAnnonce />} path="/immobilier" />
      </Routes>
    </>
  );
}

export default App;
