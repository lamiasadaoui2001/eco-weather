import React, { useState } from "react";
import MeteoConseils from "./MeteoConseils";
import StarsBackground from "./StarsBackground";
import ListeConseils from "./ListesConseils";
import Inspirations from "./Inspirations";
import Footer from "./Footer"; // 🔹 Import Footer
import "./Conseils.css";

const Conseils = () => {
  const [meteoActuelle, setMeteoActuelle] = useState(null);

  return (
    <>
      <section id="advice" className="advice">
        <StarsBackground />

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

      {/* 🔹 Footer */}
      <Footer />
    </>
  );
};

export default Conseils;
