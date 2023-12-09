import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Contexts } from "../../src/context/context";

function Navbar(props) {
  let {
    userinfo,
    setuserinfo,
    getuserinfo,
    menue,
    setmenue,
    userchange,
    setuserchange,
  } = Contexts();
  let [Balise, setBalise] = useState(false);
  let Navigate = useNavigate(null);

  function signout() {
    localStorage.removeItem("token");
    Navigate("/Login");
  }

  return (
    <>
      {Balise ? (
        <>
          <div id="singoutbox">
            <p>Are you sure to sign Out ?</p>
            <div>
              <Button
                sx={{
                  color: "#D80032",
                }}
                onClick={() => {
                  signout();
                  setBalise(false);
                }}
              >
                Sing out
              </Button>
              <Button
                onClick={() => {
                  setBalise(!Balise);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      ) : null}

      <div id="navbar">
        <div id="Navelem">
          <div id="Logo" className="elemNavbarTa3Tarf">
            AnnonceEase.
          </div>
          <div id="secondElm">
            <div className="elemNavbarTa3Tarf ziada">More</div>
            <div className="elemNavbarTa3Tarf ziada">Contact</div>
            <i
              style={{ cursor: "pointer" }}
              id="BarsIcon"
              onClick={() => {
                setmenue(!menue);
                getuserinfo();
              }}
              class="fa-solid fa-bars elemNavbarTa3Tarf menuButton"
            ></i>
          </div>
        </div>
      </div>

      <div
        id="sidebarspace"
        className={
          menue ? "nav-transition-active" : ".nav-transition-no-active"
        }
      >
        {menue ? (
          <>
            <>
              <div id="Profile-data" style={{ hover: "none" }}>
                <div id="innerProfile">
                  <img
                    src={userchange ? userinfo.image : "./Profile.png"}
                    style={{
                      height: "50px",
                      width: "50px",
                      marginLeft: "20%",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10%",
                      marginLeft: "10%",
                      marginBottom: "10%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      {userchange ? (
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            marginTop: "-2px",
                            marginBottom: "-4px",
                          }}
                        >
                          {" "}
                          {userinfo.username}
                        </p>
                      ) : (
                        <p
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            marginLeft: "-25px",
                          }}
                        >
                          Sing up and become member
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: "0.7rem",
                        marginTop: "0px",
                      }}
                    >
                      {userchange ? <p>Joined in {userinfo.Date}</p> : null}
                    </div>
                  </div>
                </div>
                {userchange ? (
                  <div style={{ width: "120%" }} id="trait"></div>
                ) : (
                  <div style={{ width: "100%" }} id="trait"></div>
                )}
              </div>
            </>

            <div className="SideBarElement" onClick={() => Navigate("/")}>
              <i class="fa-solid fa-house"></i>
              &nbsp; &nbsp; &nbsp; Home &nbsp; &nbsp; &nbsp;
            </div>
            {window.localStorage.token ? (
              <div
                className="SideBarElement"
                onClick={() => {
                  setmenue(!menue);
                  Navigate("/MyAnnoncement");
                }}
              >
                <i class="fa-solid fa-bullhorn"></i>
                &nbsp; &nbsp; &nbsp;My Annoncements &nbsp; &nbsp; &nbsp;
              </div>
            ) : null}
            {window.localStorage.token ? (
              <div
                className="SideBarElement"
                onClick={() => {
                  Navigate("/Favorite");
                  setmenue(!menue);
                }}
              >
                <i class="fa-regular fa-star"></i>
                &nbsp; &nbsp; &nbsp; Favorite &nbsp;&nbsp; &nbsp;
              </div>
            ) : null}
            {window.localStorage.token ? (
              <div
                className="SideBarElement"
                onClick={() => {
                  Navigate("/addannonce");
                  setmenue(!menue);
                }}
              >
                <i class="fa-solid fa-plus"></i>
                &nbsp; &nbsp; &nbsp;Add Annoncement
              </div>
            ) : null}
            {window.localStorage.token ? null : (
              <div
                className="SideBarElement"
                onClick={() => {
                  Navigate("/Login");
                  setmenue(false);
                }}
              >
                <i class="fa-solid fa-user"></i>
                &nbsp; &nbsp; &nbsp;Sign in &nbsp; &nbsp; &nbsp;
              </div>
            )}
            {window.localStorage.token ? null : (
              <div
                className="SideBarElement"
                onClick={() => {
                  Navigate("/Register");
                  setmenue(false);
                }}
              >
                <i class="fa-solid fa-user-plus"></i>
                &nbsp; &nbsp; &nbsp;Sign up
              </div>
            )}
            {window.localStorage.token ? (
              <div
                className="SideBarElement"
                onClick={() => {
                  setBalise(true);
                  setuserchange(false);
                  setmenue(false);
                }}
              >
                <i
                  class="fa-solid fa-arrow-right-from-bracket"
                  style={{ color: "#FE0000", cursor: "pointer" }}
                ></i>
                &nbsp; &nbsp; &nbsp;Sign Out
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      {/*les element de la sideBar sont dans le componenent sidebar */}
    </>
  );
}
export default Navbar;
