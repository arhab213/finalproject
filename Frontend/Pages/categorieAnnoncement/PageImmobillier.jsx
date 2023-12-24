import { Contexts } from "../../src/context/context";
import Annonce from "../../Component/Annonce/Annonce";
import "../categorieAnnoncement/All.css";
function ImobillierAnnonce() {
  let { annonceimmobilier } = Contexts();
  return (
    <>
      <div id="TitleBig" style={{ fontSize: "1.5rem" }}>
        {" "}
        immobilier{" "}
      </div>
      {
        <div id="Container">
          {annonceimmobilier.map((e) => {
            return <Annonce element={e} />;
          })}
        </div>
      }
    </>
  );
}
export default ImobillierAnnonce;
