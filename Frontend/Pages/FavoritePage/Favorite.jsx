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
      <div id="FavoriteTitle">&nbsp;&nbsp;Your favorite list ...</div>
      <div id="traitdufavorite"></div>

      <div id="AnnonceContainer">
        {" "}
        {FavoriteAnnonce.length > 0 ? (
          FavoriteAnnonce.map((e, i) => {
            return <AnnonceInFavorite element={e} index={i} />;
          })
        ) : (
          <div id="EmptyFavorite"> you don't have any favorite annoncement</div>
        )}
      </div>
    </>
  );
}
export default Favorite;
// <div id="EmptyFavorite"> you don't have any favorite annoncement</div>
