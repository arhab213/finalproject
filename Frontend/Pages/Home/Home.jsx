import "./Home.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategorieAnnonce from "../../Component/CategorieAnoonc/CategorieAnnonce";
import Annonce from "../../Component/Annonce/Annonce";
import data from "./data.json";
import { Alert } from "@mui/material";
import { Contexts } from "../../src/context/context";
function Home() {
  let navigate = useNavigate();

  let {
    annonce,
    search,
    setsearch,
    annonceother,
    annonceimmobilier,
    annoncevoiture,
    filtringAnnonce,
    TokenUndifined,
    SearchContainer,
    searchIndicator,
    setSearchIndicator,
    ArrayFiltred,
    setArrayFiltred,
  } = Contexts();

  let { getapi, IsFavorite } = Contexts();
  useEffect(() => {
    getapi();
  }, []);
  useEffect(() => {
    filtringAnnonce();
  }, [annonce]);

  return (
    <>
      <a href="#" id="ToTheTop">
        UP
      </a>
      {TokenUndifined ? (
        <Alert id="alertAdded" severity="error">
          you must have an account to do this action
        </Alert>
      ) : null}
      {IsFavorite ? (
        <Alert id="alertAdded" severity="info">
          the annoncement was added to your favorit list
        </Alert>
      ) : null}

      {searchIndicator ? (
        <div id="HomePageContainerTwo">
          {ArrayFiltred.length > 0 ? (
            ArrayFiltred.map((e) => {
              return <div className="Items">{<Annonce element={e} />}</div>;
            })
          ) : (
            <div className="SearchNotFoundPrevention">
              nothing found about what you want :(
            </div>
          )}
          {console.log(ArrayFiltred)}
        </div>
      ) : (
        <>
          <div id="HomeTitle"> Let's find what makes your happiness... </div>
          <div id="traitDuhome"></div>
          <div id="CategorieAnnonce">
            {annoncevoiture[0] ? (
              <div
                className="LesCategories"
                onClick={() => navigate("/voiture")}
              >
                <CategorieAnnonce element={annoncevoiture[0]} />
              </div>
            ) : null}
            {annonceimmobilier[0] ? (
              <div
                className="LesCategories"
                onClick={() => navigate("/immobilier")}
              >
                {" "}
                <CategorieAnnonce element={annonceimmobilier[1]} />
              </div>
            ) : null}
            {annonceother[0] ? (
              <div className="LesCategories" onClick={() => navigate("/other")}>
                {" "}
                <CategorieAnnonce element={annonceother[1]} />
              </div>
            ) : null}
          </div>
          <div id="HomePageContainer">
            {annonce
              ? annonce.map((e) => {
                  return <div className="Items">{<Annonce element={e} />}</div>;
                })
              : null}
          </div>
        </>
      )}
    </>
  );
}
export default Home;
