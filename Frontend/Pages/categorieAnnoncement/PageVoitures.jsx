import { Contexts } from "../../src/context/context";
import Annonce from "../../Component/Annonce/Annonce";
import "../categorieAnnoncement/All.css";
function VoitureAnnonce() {
  let { annoncevoiture } = Contexts();
  return (
    <>
      <div id="TitleBig" style={{ fontSize: "1.5rem" }}>
        {" "}
        Voiture{" "}
      </div>
      {
        <div id="Container">
          {annoncevoiture.map((e) => {
            return <Annonce element={e} />;
          })}
        </div>
      }
    </>
  );
}
export default VoitureAnnonce;
