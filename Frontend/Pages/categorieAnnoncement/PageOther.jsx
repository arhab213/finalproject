import { Contexts } from "../../src/context/context";
import Annonce from "../../Component/Annonce/Annonce";
import "../categorieAnnoncement/All.css";
function OtherAnnonce() {
  let { annonceother } = Contexts();
  return (
    <>
      <div id="TitleBig" style={{ fontSize: "1.5rem" }}>
        {" "}
        Other{" "}
      </div>
      {
        <div id="Container">
          {annonceother.map((e) => {
            return <Annonce element={e} />;
          })}
        </div>
      }
    </>
  );
}
export default OtherAnnonce;
