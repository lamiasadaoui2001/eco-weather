import React, { useEffect, useRef } from "react";
import "./Conseils.css";

import EarthSimple from "./EarthSimple";

// Fonction pour déterminer la citation en fonction de la météo
const getDailyQuote = (condition) => {
  switch (condition) {
    case "Pluie":
      return "« La vie n'est pas d'attendre que les orages passent, c'est d'apprendre à danser sous la pluie. » – Vivian Greene";
    case "Ensoleillé":
      return "« Chaque jour est une nouvelle chance. Le soleil se lève, le monde est nouveau. » – Oprah Winfrey";
    case "Nuageux":
      return "« Même les nuages les plus sombres ont toujours une doublure argentée. » – Proverbe Anglais";
    case "Neige":
      return "« La neige et les tempêtes peuvent parfois nous faire craindre l'hiver, mais elles nous rappellent la puissance de la nature. » – Proverbe";
    case "Orage":
      return "« Quand le tonnerre gronde, le sage se met à l'abri, mais l'enfant y voit un spectacle. » – Proverbe";
    default:
      return "« La nature a horreur du vide. Profitez du calme pour vous ressourcer. »";
  }
};

// Fonction pour suggérer une chanson selon la météo + lien YouTube
const getDailySong = (condition) => {
  switch (condition) {
    case "Pluie":
      return {
        text: "‘Here Comes the Rain Again’ – Eurythmics – Pour se détendre au son des gouttes.",
        url: "https://www.youtube.com/watch?v=TzFnYcIqj6I",
      };
    case "Ensoleillé":
      return {
        text: "‘Walking on Sunshine’ – Katrina & The Waves – Parfait pour une journée lumineuse !",
        url: "https://www.youtube.com/watch?v=iPUmE-tne5U",
      };
    default:
      return {
        text: "‘Three Little Birds’ – Bob Marley  – Un peu de positive attitude, quelle que soit la météo.",
        url: "https://www.youtube.com/watch?v=LanCLS_hIoY",
      };
  }
};

const Inspirations = ({ meteo }) => {
  
  const condition = meteo?.condition || "Autre";
  
  const dailyQuote = getDailyQuote(condition);
  const dailySong = getDailySong(condition);

  const leftRef = useRef();
  const rightRef = useRef();

  useEffect(() => {
    const leftCards = leftRef.current?.children;
    const rightCard = rightRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (leftCards) Array.from(leftCards).forEach((el) => observer.observe(el));
    if (rightCard) observer.observe(rightCard);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="inspirations-section">
      <div className="inspirations-container">
        {/* Gauche : Citation & Chanson */}
        <div className="inspirations-left" ref={leftRef}>
          <div
            className="citation-card slide-left"
            style={{ animationDelay: "0.2s" }}
          >
            <h3>Citation du jour</h3>
            <p>{dailyQuote}</p>
          </div>

          <div
            className="chanson-card slide-left"
            style={{ animationDelay: "0.5s" }}
          >
            <h3>Chanson du jour</h3>
            <p>{dailySong.text}</p>

            {/* Bouton YouTube */}
            <a
              href={dailySong.url}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-button"
            >
              🎧 Écouter sur YouTube
            </a>
          </div>
        </div>

        {/* Droite : Carte de Brest */}
        <div
          className="inspirations-right slide-right"
          ref={rightRef}
          style={{ animationDelay: "0.7s" }}
        >
          <div className="earth-wrapper">
            <EarthSimple />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;
