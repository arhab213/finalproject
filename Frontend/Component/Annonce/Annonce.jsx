import { color } from "@mui/system";
import "./Annonce.css";
import { useEffect, useState } from "react";
import { Alert, Button, Checkbox } from "@mui/material";
import { Contexts } from "../../src/context/context";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Annonce(props) {
  let { element, index } = props;
  let {
    _id: idAnnonce,
    title,
    state,
    categorie,
    price,
    description,
    Street,
    picturePrincipale,
    picture,
    city,
    Region,
    phone,
  } = element;

  let {
    PutFavorite,
    getapi,
    FavoriteAnnonce,
    setFavoriteAnnonce,
    removeFavorite,
    removeFromFavoriteArray,
    getFavorite,
  } = Contexts();
  let [desc, setdesc] = useState(false);
  let [checkFavorite, setCheckFavorite] = useState(false);
  const deleteFunc = (ar) => {};

  return (
    <>
      <div id="annonceParent">
        <div id="ImageAndInfo">
          <div id="titleandimage">
            <img
              src={picture ? picture : "/image2.jpeg"}
              alt=""
              style={{ height: "270px", width: "270px", borderRadius: "10px" }}
            />
          </div>
          <div id="informations">
            <h1 id="titleAnnonce">{title}</h1>
            <p id="type">
              <i class="fa-solid fa-dice"></i>&nbsp;&nbsp;&nbsp;
              <span>Type :</span> {categorie}
            </p>
            <p id="etat">
              <i class="fa-solid fa-gears"></i>&nbsp;&nbsp;&nbsp;
              <span>état du produit :</span> {state}
            </p>
            <h4>
              <i class="fa-solid fa-phone"></i> &nbsp;&nbsp;&nbsp;
              <span>Tel : +213</span>
              {phone}
            </h4>
            <p id="localisation">
              <i
                class="fa-solid fa-location-dot"
                style={{ color: "#0000000" }}
              ></i>
              &nbsp;&nbsp;&nbsp; Localisation : {Street},{city},
              {Street && city ? "not defined" : null}
            </p>
            <h4 id="Price">
              <span>Prix : </span> {price} DA
            </h4>
          </div>
        </div>

        <div id="lesIcons">
          {checkFavorite ? (
            <i
              class="fa-solid fa-star star"
              style={{ color: "#F4CE14", cursor: "pointer" }}
              id="IconsNotClicked"
              onClick={() => {
                removeFavorite(idAnnonce);
                removeFromFavoriteArray(FavoriteAnnonce, index);
                setCheckFavorite(!checkFavorite);
              }}
            ></i>
          ) : (
            <i
              class="fa-solid fa-star star"
              style={{ cursor: "pointer" }}
              id="IconsClicked"
              onClick={() => {
                PutFavorite(idAnnonce);
                setCheckFavorite(!checkFavorite);
                getFavorite();
              }}
            ></i>
          )}
          <div id="buttonOfAnnoncement">
            {desc ? (
              <button id="descButton" onClick={() => setdesc(!desc)}>
                hide Description
              </button>
            ) : (
              <button id="descButton" onClick={() => setdesc(!desc)}>
                See Description
              </button>
            )}
            <button id="contactButton">Contact</button>
          </div>
        </div>
        {desc ? (
          <div id="Parentdescription">
            <span id="description">Description:</span>
            <p id="descriptioContenu">{description}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default Annonce;
