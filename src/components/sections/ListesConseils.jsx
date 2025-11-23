import React, { useEffect, useRef } from "react";
import "./Conseils.css";

const ListesConseils = ({ conseilsDuJour = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".conseil-card");

    // On ajoute l'index à chaque carte pour la cascade
    cards.forEach((card, i) => {
      card.dataset.index = i;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = Number(entry.target.dataset.index);

          if (entry.isIntersecting) {
            // ajout avec délai pour effet cascade
            setTimeout(() => {
              entry.target.classList.add("slide-in");
            }, i * 150); // 150ms entre chaque carte
          } else {
            // enlève la classe pour que l'effet se répète au scroll
            entry.target.classList.remove("slide-in");
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
