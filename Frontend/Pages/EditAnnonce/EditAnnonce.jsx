import "./EditAnnonce.css";
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
import axios from "axios";
import { Contexts } from "../../src/context/context";
import { useEffect, useState } from "react";
function EditAnnonce() {
  let { annonceToEdit } = Contexts();
  let {
    _id: idAnnonce,
    title,
    state,
    categorie,
    price,
    description,
    Street,
    picture,
    city,
    Region,
    phone,
  } = annonceToEdit;
  let [annonceinfo, setinfoannonce] = useState({});

  let [image, setimage] = useState();
  let [updated, setupdated] = useState(false);
  let [error, seterror] = useState(false);

  function ConvertToBase64(e) {
    var reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setimage(reader.result);
      return setinfoannonce({ ...annonceinfo, picture: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error :", error);
    };
  }
  function onChange(e) {
    let { value, name } = e.target;
    if (image) {
      return setinfoannonce({ ...annonceinfo, picture: image, [name]: value });
    }
    return setinfoannonce({ ...annonceinfo, picture: picture, [name]: value });
  }

  const datahandler = async (e) => {
    if (!annonceinfo["price"]) {
      setinfoannonce({ ...annonceinfo, price: price });
    }
    if (!annonceinfo["title"]) {
      setinfoannonce({ ...annonceinfo, title: title });
    }
    if (!annonceinfo["phone"]) {
      setinfoannonce({ ...annonceinfo, phone: phone });
    }

    const res = await axios.post(
      `http://localhost:3000/Annonce/update/${idAnnonce}`,
      annonceinfo
    );
    if (!res || res === "probleme") {
      return ErrorAdd();
    }
    return Added();
  };
  const ErrorAdd = () => {
    seterror(true);
    setTimeout(() => {
      seterror(false);
    }, 2000);
  };
  const Added = () => {
    setupdated(true);
    setTimeout(() => {
      setupdated(false);
    }, 2000);
  };

  return (
    <>
      {updated ? (
        <Alert id="alert" severity="success">
          your anoncement is up to date
        </Alert>
      ) : null}
      {error ? (
        <Alert id="alert" severity="error">
          serveur error
        </Alert>
      ) : null}
      <h2 id="theaddannonce">
        <i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Edit your posted
        annonce.
      </h2>
      <div id="Trait"></div>
      <div id="ImagePrincipale">
        <h3>Chose the principal picture for your Annoncement </h3>

        <>
          <img
            className="Images"
            src={image ? image : picture}
            style={{ height: "400px", width: "400px" }}
          />
          <label className="Labelinputs" for="PrincipaleImage">
            change picture
          </label>
        </>

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
            defaultValue={title}
            required
          />
          <TextField
            id="outlined-basic"
            label="Street"
            name="Street"
            variant="outlined"
            onChange={onChange}
            defaultValue={Street}
          />
          <TextField
            id="outlined-basic"
            label="Region"
            name="Region"
            variant="outlined"
            onChange={onChange}
            defaultValue={Region}
          />
          <TextField
            id="outlined-basic"
            label="City"
            name="city"
            variant="outlined"
            onChange={onChange}
            defaultValue={city}
          />
        </div>
        <div id="infoContainer">
          <TextField
            id="outlined-basic"
            label="Categorie"
            name="categorie"
            variant="outlined"
            onChange={onChange}
            defaultValue={categorie}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            name="price"
            type="Number"
            variant="outlined"
            onChange={onChange}
            defaultValue={price}
            required
          />
          <TextField
            id="outlined-basic"
            className="textArea"
            label="Description"
            name="description"
            variant="outlined"
            onChange={onChange}
            defaultValue={description}
          />
          <TextField
            id="outlined-basic"
            label="Phone number"
            type="Number"
            name="phone"
            variant="outlined"
            onChange={onChange}
            defaultValue={phone}
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
            defaultValue={state}
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
          update the addvertisement
        </Button>
      </div>
    </>
  );
}
export default EditAnnonce;
