import "./Home.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import Annonce from "../../Component/Annonce/Annonce";
import data from "./data.json";
import { Alert } from "@mui/material";
import { Contexts } from "../../src/context/context";
function Home() {
  let { annonce, search, setsearch } = Contexts();
  let { getapi, IsFavorite } = Contexts();
  useEffect(() => {
    getapi();
  }, []);

  return (
    <>
      {IsFavorite ? (
        <Alert id="alertAdded" severity="info">
          the element was added to your favorit list
        </Alert>
      ) : null}

      <div id="HomeTitle"> Let's find what makes your happiness... </div>
      <div id="traitDuhome"></div>
      <div id="HomePageContainer">
        {annonce
          ? annonce.map((e) => {
              return <div className="Items">{<Annonce element={e} />}</div>;
            })
          : null}
      </div>
    </>
  );
}
export default Home;
