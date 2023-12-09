import { useRef, useState } from "react";
import "./AddAnnonce.css";
import axios from "axios";
import {
  Alert,
  TextField,
  Button,
  InputLabel,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
function AddAnnonce(props) {
  let [Images, setImages] = useState({});

  let [adsinfo, setadsinfo] = useState({});

  let [AddError, setAddError] = useState(false);
  let [Add, setAdd] = useState(false);

  function ConvertToBase64(e) {
    var reader = new FileReader();
    console.log(e);
    console.log(e.target.files);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImages({ ...Images, [e.target.name]: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error :", error);
    };
  }
  function onChange(e) {
    let { name, value } = e.target;

    return setadsinfo({
      ...adsinfo,
      picture: Images.PrincipaleImage,
      [name]: value,
    });
  }

  function Added() {
    setAdd(true);
    setTimeout(() => {
      setAdd(false);
    }, 2000);
  }
  function ErrorAdd() {
    setAddError(true);
    setTimeout(() => {
      setAddError(false);
    }, 2000);
  }

  const datahandler = async (e) => {
    if (!adsinfo["price"] || !adsinfo["title"] || !adsinfo["phone"]) {
      return ErrorAdd();
    }

    const res = await axios.post("http://localhost:3000/Annonce/add", adsinfo, {
      headers: { token: window.localStorage.token },
    });
    if (!res || res === "probleme") {
      return ErrorAdd();
    }
    return Added();
  };
  return (
    <>
      {Add ? (
        <Alert id="adsadded" severity="success">
          sucess: annoncement added
        </Alert>
      ) : null}
      {AddError ? (
        <Alert id="adserror" severity="error">
          failure: Please fill the riquired fileds
        </Alert>
      ) : null}
      <h2 id="theaddannonce">
        <i class="fa-solid fa-file-circle-plus"></i>&nbsp;&nbsp;Create your
        annoncement and post it ...
      </h2>
      <div id="Trait"></div>
      <div id="ImagePrincipale">
        <h3>Chose the principal picture for your Annoncement </h3>
        {Images.PrincipaleImage ? (
          <>
            <img
              className="Images"
              src={Images.PrincipaleImage}
              alt=""
              style={{ height: "400px", width: "400px" }}
            />
            <label className="Labelinputs" for="PrincipaleImage">
              change picture
            </label>
          </>
        ) : (
          <label for="PrincipaleImage">
            <img
              src="/addimage.png"
              style={{ height: "400px", width: "400px", cursor: "pointer" }}
              alt=""
            />
          </label>
        )}

        <input
          className="imagesInput"
          id="PrincipaleImage"
          type="file"
          accept="image/*"
          name="PrincipaleImage"
          onChange={ConvertToBase64}
        />

        {/* Select the Principale image for your ads */}
      </div>
      <div id="Trait"></div>

      <h3>Add the information bellow </h3>
      <div id="fields">
        <div id="infoContainer">
          <TextField
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            onChange={onChange}
            required
          />
          <TextField
            id="outlined-basic"
            label="Street"
            name="Street"
            variant="outlined"
            onChange={onChange}
          />
          <TextField
            id="outlined-basic"
            label="Region"
            name="Region"
            variant="outlined"
            onChange={onChange}
          />
          <TextField
            id="outlined-basic"
            label="City"
            name="city"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div id="infoContainer">
          <TextField
            id="outlined-basic"
            label="Categorie"
            name="categorie"
            variant="outlined"
            onChange={onChange}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            name="price"
            type="Number"
            variant="outlined"
            onChange={onChange}
            required
          />
          <TextField
            id="outlined-basic"
            className="textArea"
            label="Description"
            name="description"
            variant="outlined"
            onChange={onChange}
          />
          <TextField
            id="outlined-basic"
            label="Phone number"
            type="Number"
            name="phone"
            variant="outlined"
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div id="parttwo">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Condition</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            name="state"
            onChange={onChange}
          >
            <MenuItem value="new" onChange={onChange}>
              New
            </MenuItem>
            <MenuItem value="good" name="state" onChange={onChange}>
              Good
            </MenuItem>
            <MenuItem value="old" name="state">
              Old
            </MenuItem>
          </Select>
        </FormControl>

        <Button id="button" variant="contained" onClick={datahandler}>
          Add the Advertisement
        </Button>
      </div>
    </>
  );
}
export default AddAnnonce;
