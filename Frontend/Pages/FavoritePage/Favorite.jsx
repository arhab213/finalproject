import "./Favorite.css";
import AnnonceInFavorite from "../../Component/AnnonceInFavorite/AnnonceInFavorite";
import { useEffect, useState } from "react";
import { Contexts } from "../../src/context/context";
import { Alert } from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Favorite(props) {
  let {
    annonce,
    getapi,
    FavoriteAnnonce,
    setFavoriteAnnonce,
    getFavorite,
    IsFavoriteEmpty,
    DeletedFavorite,
    userchange,
  } = Contexts();
  let navigate = useNavigate();
  useEffect(() => {
    getapi();
    navigate("/Favorite");
  }, []);
  useEffect(() => {
    getFavorite();
  }, [userchange]);

  return (
    <>
      {DeletedFavorite ? (
        <Alert id="FavoriteEmptyAlert" severity="error">
          Element deleted from favorite
        </Alert>
      ) : null}
      <div id="FavoriteTitle">
        <i class="fa-regular fa-star"></i>&nbsp;&nbsp;Your favorite list ...
      </div>
      <div id="traitdufavorite"></div>
      {IsFavoriteEmpty ? (
        <div id="EmptyFavorite"> you don't have any favorite advertisement</div>
      ) : null}
      <div id="AnnonceContainer">
        {" "}
        {FavoriteAnnonce
          ? FavoriteAnnonce.map((e, i) => {
              return <AnnonceInFavorite element={e} index={i} />;
            })
          : null}
      </div>
    </>
  );
}
export default Favorite;
