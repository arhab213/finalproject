import { useState, useEffect, useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Alert, AlertTitle } from "@mui/material";
import Lottie from "lottie-web";
import data from "./lottieRegister.json";
import { Contexts } from "../../src/context/context";

function Login() {
  let [userinf, setuserinf] = useState({});
  let [IsWrong, setIsWrong] = useState(false);
  let [IsGood, setIsGood] = useState(false);
  let navigate = useNavigate();
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: data,
    });
  }, []);
  const onChange = (e) => {
    let { name, value } = e.target;

    return setuserinf({ ...userinf, [name]: value });
  };
  const datahandler = async () => {
    try {
      const res = await axios.post("http://localhost:3000/User/Login", userinf);
      if (!res) {
        return alert(`the server don't respond`);
      }
      if (
        res.data.message == "UserPrblm" ||
        res.data.message == "passwordPrbl"
      ) {
        return setIsWrong(true);
      }

      let { message, token } = res.data;
      setIsGood(true);
      window.localStorage.setItem("token", token);
      setTimeout(() => {
        return navigate("/");
      }, 700);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {IsWrong ? (
        <Alert id="passwordAlert" severity="error">
          the username or password is inncorect
        </Alert>
      ) : null}
      {IsGood ? (
        <Alert id="passwordAlert" severity="success">
          Welcome back you've been identified
        </Alert>
      ) : null}
      <h3 id="Login">Login and get started...</h3>
      <div id="Logelem">
        <form id="inputs">
          <TextField
            id="username"
            name="username"
            label="username"
            variant="outlined"
            required
            onChange={onChange}
          />
          <TextField
            id="passwordLogin"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            required
            onChange={onChange}
          />
          <Button id="LoginBtn" variant="contained" onClick={datahandler}>
            Log in
          </Button>
          <a href="/Register">Create an account</a>
        </form>
        <div
          id="LottieDeux"
          ref={container}
          style={{ width: "400px", height: "400px" }}
        ></div>
      </div>
    </>
  );
}
export default Login;
