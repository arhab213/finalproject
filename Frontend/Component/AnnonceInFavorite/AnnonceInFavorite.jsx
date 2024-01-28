import { color } from "@mui/system";
import "./AnnonceInFavorite.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { Contexts } from "../../src/context/context";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
      <div id="annonceParent">
        <div className="ItemWrapper">
          <div className="AnnonceTop">
            <span className="AnnonceTitle ">{title}</span>
          </div>
          <div className="AnnonceCenter">
            <img
              className="AnnonceImage"
              src={picture ? picture : "/ImageNotFound.png"}
              alt=""
            />
            <div className="AnnonceInformations ">
              <span className="AnnonceInformation CategorieSpan">
                {"categorie : " + categorie}
              </span>
              <span className="AnnonceInformation StateSpan">
                {"State : " + state}
              </span>
              <span className="AnnonceInformation PriceSpan">
                {"Price : " + price + " Da"}
              </span>
              <span className="AnnonceInformation LoclisationSpan">
                {Street + " " + Region + " " + city + " "}
              </span>
              <span className="AnnonceInformation PhoneSpan">
                {"+213" + phone}
              </span>
              <span className="AnnonceInformation"></span>
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

        <div id="lesIcons">
          <button
            id="buttonDelete"
            onClick={() => {
              removeFavorite(idAnnonce);
              removeFromFavoriteArray(FavoriteAnnonce, index);
            }}
          >
            Delete
          </button>
          <div id="buttonOfAnnoncement">
            <button id="contactButton">Contact</button>
          </div>
        </div>
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
