import React, { useState } from "react";
import MeteoConseils from "./MeteoConseils";
import StarsBackground from "./StarsBackground";
import ListeConseils from "./ListesConseils";
<<<<<<< HEAD
import EarthSimple from "./EarthSimple";
=======
>>>>>>> 413199e (ajout modf insp)
import Inspirations from "./Inspirations";
import "./Conseils.css";

const Conseils = () => {
  const [meteoActuelle, setMeteoActuelle] = useState(null);

  return (
    <section id="advice" className="advice">
      <StarsBackground />
<<<<<<< HEAD
      <div className="earth-wrapper">
        <EarthSimple />
      </div>
=======
>>>>>>> 413199e (ajout modf insp)

      <div className="advice-main">
        <div className="advice-container">
          <MeteoConseils setMeteoActuelle={setMeteoActuelle} />
        </div>
        <div className="advice-card">
          <ListeConseils />
        </div>
      </div>

      <Inspirations meteo={meteoActuelle} />
    </section>
  );
};

export default Conseils;
