import React, { useEffect, useRef } from "react";
import "./Conseils.css";

const ListesConseils = ({ conseilsDuJour = [] }) => {
  const containerRef = useRef(null);

  // Déclaration de la fonction avant usage
  const getBlinkClass = (conseil) => {
    if (
      (conseil.type.includes("Température") &&
        (conseil.type === "Température très froide" ||
          conseil.type === "Température froide")) ||
      (conseil.type.includes("Humidité") && conseil.type === "Humidité élevée") ||
      (conseil.type.includes("Vent") && conseil.type === "Vent fort") ||
      (conseil.type.includes("Qualité de l'air") &&
        conseil.type === "Qualité de l'air mauvaise")
    ) {
      return "blink-red";
    }
    return "blink-green";
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".conseil-card");
    cards.forEach((card, i) => (card.dataset.index = i));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = Number(entry.target.dataset.index);

          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("slide-in");

              if (i !== 0) {

              // ajout du clignotement après que slide-in est visible
              setTimeout(() => {
                const type = entry.target.dataset.type;
                entry.target.classList.add(getBlinkClass({ type }));
              }, 600); // correspond à la durée de transition CSS
            }
            }, i * 150);
          } else {
            entry.target.classList.remove("slide-in");
            entry.target.classList.remove("blink-red", "blink-green");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  
  if (!conseilsDuJour.length) return null;

  return (
    <section className="conseils-section">
      <h2>Conseils écologiques du jour</h2>
      <div className="conseils-list" ref={containerRef}>
        {conseilsDuJour.map((conseil, i) => (
          <div
            key={i}
            className={`conseil-card ${i % 2 === 0 ? "slide-left" : "slide-right"}`}
            data-type={conseil.type}
          >
            <h3>{conseil.type}</h3>
            <ul>
              {conseil.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListesConseils;
