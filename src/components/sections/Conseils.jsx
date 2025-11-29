import React, { useState } from "react";
import MeteoConseils from "./MeteoConseils";
import StarsBackground from "./StarsBackground";
import ListeConseils from "./ListesConseils";
import EarthSimple from "./EarthSimple";
import Inspirations from "./Inspirations";
import "./Conseils.css";

const Conseils = () => {
  const [meteoActuelle, setMeteoActuelle] = useState(null);

  return (
    <section id="advice" className="advice">
      <StarsBackground />
      <div className="earth-wrapper">
        <EarthSimple />
      </div>

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
