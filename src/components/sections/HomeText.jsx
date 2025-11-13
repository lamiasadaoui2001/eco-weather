import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

// J'assume que vous avez toujours un conteneur externe avec la classe "home"
// dans votre structure parente pour le centrage vertical/horizontal.

const HomeText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: ["My Eco.Weather", "Ton assistant météo", "Toujours précis !"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
      // SOLUTION POUR LE CURSEUR : Désactiver le curseur par défaut de Typed.js
      // Votre CSS (.home-title span) gère maintenant l'affichage du curseur unique.
      showCursor: false, 
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    // J'ai inclus le div 'home-content' pour correspondre à vos sélecteurs CSS
    <div className="home-content"> 
      <h1 className="home-title">
        {/* Le span est la cible de Typed.js et du curseur CSS */}
        <span ref={textRef}></span>
      </h1>
      
      <p className="home-description">
        Dans un monde en pleine transition écologique, <strong>EcoWeather</strong> vous permet de visualiser et de comprendre les données environnementales locales de manière simple et interactive. 
        {/* L'espace irrégulier a été supprimé ici et remplacé par un espace standard */}
        Suivez la <strong>météo</strong>, la <strong>qualité de l’air</strong> et l’<strong>humidité</strong> dans les principales villes de Bretagne, et recevez des <strong>conseils écologiques personnalisés</strong> selon les conditions du jour.
      </p>
      
      <p className="home-description">
        Découvrez comment chaque donnée peut contribuer à une meilleure compréhension de notre environnement et à des actions plus durables au quotidien.
      </p>
    </div>
  );
};

export default HomeText;