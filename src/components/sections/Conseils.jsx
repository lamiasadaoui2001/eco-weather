import React from "react";
import MeteoConseils from "./MeteoConseils";
import StarsBackground from "./StarsBackground";

const Conseils = () => {
  return (
     <section  id="advice" className="advice">
      <StarsBackground /> {/* Étoiles en arrière-plan */}
        <div className="advice-container">
        
          <MeteoConseils /> 

      </div>
     </section>
   );
}

export default Conseils;
