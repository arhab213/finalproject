import { useEffect, useRef, useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Alert } from "@mui/material";

import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import data from "./lottieRegister.json";
import Lottie from "lottie-web";
function Register() {
  let [info, setInfo] = useState({});
  let [registerdone, setregisterdone] = useState(false);

  const container = useRef(null);
  const navigate = useNavigate();
  let [profilePicture, setprofilePicture] = useState();

  function ConvertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setprofilePicture(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error :", error);
    };
  }

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
    return setInfo({ ...info, [name]: value, userImage: profilePicture });
  };

  const datahandler = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/User/add", info);
    let { message } = res.data;
    if (message == "problemeUser") {
      return alert("user didn't been Registred");
    }

    return Registred();
  };
  const Registred = () => {
    setregisterdone(true);
    setTimeout(() => {
      setregisterdone(false);
      navigate("/Login");
    }, 1000);
  };
  return (
    <>
      {registerdone ? (
        <Alert severity="success" id="passwordAlert">
          you've been registred{" "}
        </Alert>
      ) : null}
      <h3 id="Register">Register and get started...</h3>
      <div id="registerContainer">
        <form id="Regelem" onSubmit={datahandler}>
          <div id="Uploadfeature">
            <h5 id="uploadtitle">Add profile image for your account</h5>
            {profilePicture ? (
              <>
                <img
                  className="Images"
                  src={profilePicture}
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                />
                <label className="Labelinputs" for="inputpdp">
                  change picture
                </label>
              </>
            ) : (
              <label for="inputpdp">
                <img
                  src="/addimage.png"
                  style={{ height: "200px", width: "200px", cursor: "pointer" }}
                  alt=""
                />
              </label>
            )}
            <input
              id="inputpdp"
              type="file"
              accept="image/*"
              onChange={ConvertToBase64}
            />
            <label For="inputpdp" style={{ cursor: "pointer" }}></label>
          </div>
          <TextField
            required
            className="textfield"
            label="Username"
            variant="outlined"
            id="username"
            name="username"
            onChange={onChange}
          />
          <TextField
            required
            className="textfield"
            label="e-mail"
            type="e-mail"
            variant="outlined"
            id="username"
            name="email"
            onChange={onChange}
          />
          <TextField
            required
            className="textfield"
            label="Password"
            variant="outlined"
            id="username"
            name="password"
            type="password"
            onChange={onChange}
          />
          <TextField
            className="textfield"
            label="Age"
            variant="outlined"
            id="username"
            type="number"
            name="age"
            onChange={onChange}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                name="gender"
                onChange={onChange}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                name="gender"
                onChange={onChange}
              />

              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Do not specify"
                name="gender"
                onChange={onChange}
              />
            </RadioGroup>
          </FormControl>

          <Button variant="contained" id="registerButton" onClick={datahandler}>
            Register
          </Button>

          <a href="/Login">you have an account?</a>
        </form>
        <div id="Lottie" ref={container}></div>
      </div>
    </>
  );
}
export default Register;
