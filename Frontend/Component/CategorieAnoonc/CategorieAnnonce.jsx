import zIndex from "@mui/material/styles/zIndex";
import "../CategorieAnoonc/CategorieAnnonce.css";
function CategorieAnnonce(props) {
  let { element } = props;
  let { categorie, picture } = element;
  return (
    <>
      <div
        id="ImgAnnonceCategorie"
        style={{
          height: "300px",
          width: "300px",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <img
          src={picture}
          style={{
            height: "300px",
            width: "300px",
            borderRadius: "20px",
          }}
        />
        <p id="TitleAnnonceCategorie">{categorie}</p>
      </div>
    </>
  );
}
export default CategorieAnnonce;
