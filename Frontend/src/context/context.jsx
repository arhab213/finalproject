import { useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
let Context = createContext(null);
export const Contexts = () => useContext(Context);

function ContextProvider(props) {
  let { children } = props;
  let [search, setsearch] = useState("");
  let [annonce, setannonce] = useState([]);
  let [menue, setmenue] = useState(false);
  let [FavoriteAnnonce, setFavoriteAnnonce] = useState([]);
  let [IsFavoriteEmpty, setFavoriteIsEmpty] = useState(false);
  let [DeletedFavorite, setDeletedFavorite] = useState(false);
  let [userinfo, setuserinfo] = useState({});
  let [IsFavorite, setIsFavorite] = useState(false);
  let [annonceToEdit, setannonceToEdit] = useState({});
  let navigate = useNavigate();
  let [myannoncement, setmyannoncement] = useState([]);
  let [userchange, setuserchange] = useState(false);
  let [annoncedeleted, setannoncedeleted] = useState(false);

  const getapi = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Annonce/");
      if (!res || res.data.message == "probleme") {
        console.log(res);
        return alert("Error 404 : Resource not found");
      }
      let { data } = res;
      let { object } = data;

      return setannonce(object);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getuserinfo = async () => {
    const res = await axios.get("http://localhost:3000/User/One", {
      headers: { token: window.localStorage.token },
    });
    if (!res) {
      return console.log(res.data.message);
    }
    setuserinfo(res.data.object);

    return setuserchange(true);
  };
  const removeFromFavoriteArray = (array, index) => {
    let tmp = [...array];
    tmp.splice(index, 1);
    return setFavoriteAnnonce([...tmp]);
  };

  const PutFavorite = async (AnnonceId) => {
    const res = await axios.post(
      `http://localhost:3000/User/putfavorite/${AnnonceId}`,
      " ",
      { headers: { token: window.localStorage.token } }
    );
    let { message } = res.data;
    if (message != "positive") {
      return alert("api problem");
    }
    getapi();
    return addedFavoriteAlert();
  };

  const deleteAnnonce = async (idAnnonce) => {
    const token = window.localStorage.token;

    const res = await axios.get(
      `http://localhost:3000/Annonce/delete/${idAnnonce}`,
      { headers: { token: token } }
    );
    if (!res) {
      return alert("there is a probleme 55");
    }
    return AnnonceDeleted();
  };

  const getFavorite = async () => {
    const token = window.localStorage.token;
    const tmp = [];
    try {
      const res = await axios.get("http://localhost:3000/User/Favorite", {
        headers: { token: token },
      });
      if (!res) {
        return alert("API probleme");
      }
      if (res.data.message == "empty") {
        return setFavoriteIsEmpty(true);
      }
      let { object } = res.data;

      for (let i = 0; i < object.length; i++) {
        for (let j = 0; j < annonce.length; j++) {
          if (object[i] == annonce[j]._id) {
            tmp.push(annonce[j]);
          }
        }
        setFavoriteAnnonce([...tmp]);
      }

      return setFavoriteIsEmpty(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFavorite = async (AnnonceId) => {
    const res = await axios.get(
      `http://localhost:3000/User/removeFavorite/${AnnonceId}`,
      { headers: { token: window.localStorage.token } }
    );
    if (!res || res.data.message !== "Deleted") {
      return alert("the element haven't been deleted");
    }
    getapi();
    getFavorite();
    return DeleteAlert();
  };

  const addedFavoriteAlert = () => {
    setIsFavorite(true);
    setTimeout(() => {
      setIsFavorite(false);
    }, 2000);
  };
  const DeleteAlert = () => {
    setDeletedFavorite(true);
    setTimeout(() => {
      setDeletedFavorite(false);
    }, 2000);
  };
  const AnnonceDeleted = () => {
    setannoncedeleted(true);
    setTimeout(() => {
      setannoncedeleted(false);
    }, 2000);
  };
  const getTheAnnonce = async (idAnnonce) => {
    const res = await axios.get(
      `http://localhost:3000/Annonce/One/${idAnnonce}`
    );

    if (!res | (res.data == "there is a probleme with the API")) {
      return alert("there is probleme");
    }
    return setannonceToEdit(res.data.data);
  };

  let state = {
    annonce,
    setannonce,
    search,
    setsearch,
    FavoriteAnnonce,
    setFavoriteAnnonce,
    IsFavoriteEmpty,
    DeletedFavorite,
    userinfo,
    setuserinfo,
    IsFavorite,
    annonceToEdit,
    myannoncement,
    setmyannoncement,
    menue,
    setmenue,
    userchange,
    setuserchange,
    annoncedeleted,
    setannoncedeleted,
  };
  let func = {
    getapi,
    PutFavorite,
    removeFromFavoriteArray,
    getFavorite,
    removeFavorite,
    DeleteAlert,
    getuserinfo,
    getTheAnnonce,
    deleteAnnonce,
  };
  let NormalFunc = {};

  let val = { ...state, ...func, ...NormalFunc };

  return <Context.Provider value={val}>{children}</Context.Provider>;
}
export default ContextProvider;
