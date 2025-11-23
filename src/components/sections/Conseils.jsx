import React from "react";
import MeteoConseils from "./MeteoConseils";
import StarsBackground from "./StarsBackground";
import ListeConseils from "./ListesConseils";

const Conseils = () => {
  return (
     <section  id="advice" className="advice">
      <StarsBackground /> {/* Étoiles en arrière-plan */}
        <div className="advice-container">
        
          <MeteoConseils /> 
          
      </div>
      <div className="advice-card">
        
          <ListeConseils/>
      </div>
     </section>
   );
}

export default Conseils;
