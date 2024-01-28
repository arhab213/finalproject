import { color } from "@mui/system";
import "./Annonce.css";
import { useEffect, useState } from "react";
import { Alert, Button, Checkbox } from "@mui/material";
import { Contexts } from "../../src/context/context";
import axios from "axios";
import { Navigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
        <div className="ItemWrapper">
          <div className="AnnonceTop">
            <span className="AnnonceTitle " style={{ fontSize: "25px" }}>
              {title}
            </span>
          </div>
          <div className="AnnonceCenter">
            <img
              className="AnnonceImage"
              src={picture ? picture : "/ImageNotFound.png"}
              alt=""
            />
            <div className="AnnonceInformations ">
              <span className="AnnonceInformation CategorieSpan">
                <span className="LeMotAvantCategorie">Categorie : </span>
                {categorie}
              </span>
              <span className="AnnonceInformation StateSpan">
                <span className="LeMotAvantCategorie">State : </span>
                {state}
              </span>
              <span className="AnnonceInformation PriceSpan">
                <span className="LeMotAvantCategorie Prix">Price : </span>
                {price + " Da"}
              </span>
              <span className="AnnonceInformation LoclisationSpan">
                <span className="LeMotAvantCategorie ">Localisation : </span>
                {Street + " " + Region + " " + city + " "}
              </span>
              <span className="AnnonceInformation PhoneSpan">
                <span className="LeMotAvantCategorie">Phone : </span>
                {"+213" + phone}
              </span>
            </div>
            <div className="AnnonceDescriptionArrow">
              {desc ? (
                <>
                  <KeyboardArrowUpIcon onClick={() => setdesc(!desc)} />
                </>
              ) : (
                <>
                  <KeyboardArrowDownIcon onClick={() => setdesc(!desc)} />
                </>
              )}
            </div>

            {desc ? (
              <div id="Parentdescription">
                <p id="descriptioContenu">{description}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="AnnonceBottom">
          <div id="lesIcons">
            <div className="StarIcon">
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
            </div>

            <div className="LeftPartOfIcons">
              <button id="contactButton">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Annonce;
