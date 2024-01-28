import "./AnnonceMyAnnoncement.css";
import { useNavigate } from "react-router-dom";
import { Contexts } from "../../src/context/context";
import { useEffect, useState } from "react";
import { Button, Alert } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

      <div id="annonceParentMyAnnonce">
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
          <div className="buttonOfAnnoncement">
            <button
              className="ButtonOfAnnonceInMyAnnonce Delete"
              onClick={() => {
                setquestion(true);
              }}
            >
              Delete
            </button>
            <button
              className="ButtonOfAnnonceInMyAnnonce Edite"
              onClick={() => {
                navigate("/anotherpage");
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AnnonceMyAnnoncement;
