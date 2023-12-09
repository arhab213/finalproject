import "./AnnonceMyAnnoncement.css";
import { useNavigate } from "react-router-dom";
import { Contexts } from "../../src/context/context";
import { useEffect, useState } from "react";
import { Button, Alert } from "@mui/material";

function AnnonceMyAnnoncement(props) {
  let navigate = useNavigate();
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
    Isfavorite,
  } = element;
  let { getTheAnnonce, deleteAnnonce, myannoncement, setmyannoncement } =
    Contexts();
  useEffect(() => {
    getTheAnnonce(idAnnonce);
  }, []);

  let [question, setquestion] = useState(false);
  let [desc, setdesc] = useState(false);
  const DeleteAnnonce = (arg) => {
    let tmp = [...myannoncement];
    tmp.splice(arg, 1);
    setmyannoncement(tmp);
  };
  return (
    <>
      {question ? (
        <>
          <div id="singoutbox">
            <p>Are you sure to delete your annoncement ?</p>
            <div>
              <Button
                sx={{
                  color: "#D80032",
                }}
                onClick={() => {
                  deleteAnnonce(idAnnonce);
                  DeleteAnnonce(index);
                  setquestion(false);
                }}
              >
                delete
              </Button>
              <Button
                onClick={() => {
                  setquestion(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      ) : null}

      <div id="annoncemineParent">
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
          <div id="buttonOfAnnoncement">
            {desc ? (
              <button id="descmineButton" onClick={() => setdesc(!desc)}>
                hide Description
              </button>
            ) : (
              <button id="descmineButton" onClick={() => setdesc(!desc)}>
                See Description
              </button>
            )}
            <button
              id="descFavButton"
              onClick={() => {
                navigate("/anotherpage");
              }}
            >
              Edit
            </button>
            <button
              id="buttonmineDelete"
              onClick={() => {
                setquestion(true);
              }}
            >
              Delet
            </button>
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
export default AnnonceMyAnnoncement;
{
  /* <button
onClick={() => {
  navigate("/anotherpage");
}}
>
Edit
</button>
<button
onClick={() => {
  setquestion(true);
}}
>
Delet
</button> */
}
