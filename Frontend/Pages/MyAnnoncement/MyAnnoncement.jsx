import "./MyAnnoncement.css";
import axios from "axios";
import AnnonceMyAnnoncement from "../../Component/AnnonceMyAnnoncement/AnnonceMyAnnoncement";
import { useEffect, useState } from "react";
import { Contexts } from "../../src/context/context";
import { Alert } from "@mui/material";
function MyAnnoncement(props) {
  let { myannoncement, setmyannoncement, annoncedeleted } = Contexts();

  const getmyannoncement = async (req, res) => {
    const token = window.localStorage.token;
    try {
      const res = await axios.get(
        "http://localhost:3000/Annonce/myannoncement",
        { headers: { token: token } }
      );
      if (!res) {
        return alert(res.data.message);
      }
      return setmyannoncement(res.data.object);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getmyannoncement();
  }, []);

  return (
    <>
      {annoncedeleted ? (
        <Alert id="passwordAlert" severity="error">
          Element deleted from the site
        </Alert>
      ) : null}
      <h2 id="title">
        <i class="fa-solid fa-bullhorn"></i>&nbsp;&nbsp;My Annoncements....
      </h2>
      <div id="traitMyAnnoncement"></div>

      {myannoncement.length > 0 ? (
        <>
          {myannoncement.map((e, i) => {
            return <AnnonceMyAnnoncement element={e} index={i} />;
          })}
        </>
      ) : (
        <div id="thelegend">you didn't post annoncement yet</div>
      )}
    </>
  );
}
export default MyAnnoncement;
