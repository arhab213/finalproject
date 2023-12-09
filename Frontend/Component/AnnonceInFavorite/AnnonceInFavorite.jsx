import { color } from "@mui/system";
import "./AnnonceInFavorite.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { Contexts } from "../../src/context/context";
import axios from "axios";

function AnnonceInFavorite(props) {
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
    DeletedFavorite,
  } = Contexts();
  let [desc, setdesc] = useState(false);

  return (
    <>
      <div id="favParent">
        <div id="ImageAndInfo">
          <div id="titleandimage">
            <h1 id="titleAnnonce">{title}</h1>
            <img
              src={picture ? picture : "/image2.jpeg"}
              alt=""
              style={{ height: "200px", width: "300px" }}
            />
          </div>
          <div id="informations">
            <p id="type">
              <i class="fa-solid fa-dice"></i>&nbsp;&nbsp;&nbsp;
              <span>Type :</span> {categorie}
            </p>
            <p id="">
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
              &nbsp;&nbsp;&nbsp; Localisation :{" "}
              {Street ? Street : "(no street added)"},
              {city ? city : "(no city added)"}
            </p>
            <h4 id="Price">
              <i class="fa-solid fa-money-bill"></i>&nbsp;&nbsp;&nbsp;
              <span>Prix : </span> {price} DA
            </h4>
          </div>
        </div>

        <div id="lesIcons">
          <button
            id="buttonDelete"
            onClick={() => {
              removeFavorite(idAnnonce);
              removeFromFavoriteArray(FavoriteAnnonce, index);
            }}
          >
            Delete from Favorite
          </button>
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
export default AnnonceInFavorite;
{
  /* <i
className="fa-solid fa-xmark"
style={{ color: "#FE0000", cursor: "pointer" }}
id="IconsNotClicked"
onClick={() => {
  removeFavorite(idAnnonce);
  removeFromFavoriteArray(FavoriteAnnonce, index);
}}
></i> */
}
