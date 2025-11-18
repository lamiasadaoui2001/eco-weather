import React, { useState, useEffect, useRef } from "react";
import "./Conseils.css";
import { WiDaySunny, WiDayCloudy, WiCloud, WiRain } from "react-icons/wi";

// Chemin de la vidéo depuis le dossier public
const SUNNY_VIDEO_URL = "/2569168-hd_1920_1080_24fps.mp4";

const MeteoConseils = () => {
  // Données statiques de Brest
  const allWeatherData = [
    { day: "Lun", icon: <WiDaySunny size={48} />, tempHigh: "15°C", tempLow: "9°", condition: "Sunny", details: { humidity: "80%", wind: "10 km/h", direction: "Est" } },
    { day: "Mar", icon: <WiDayCloudy size={48} />, tempHigh: "16°C", tempLow: "10°", condition: "Cloudy", details: { humidity: "75%", wind: "8 km/h", direction: "Nord-Ouest" } },
    { day: "Mer", icon: <WiCloud size={48} />, tempHigh: "14°C", tempLow: "9°", condition: "Cloudy", details: { humidity: "85%", wind: "5 km/h", direction: "Sud" } },
    { day: "Jeu", icon: <WiRain size={48} />, tempHigh: "12°C", tempLow: "7°", condition: "Rain", details: { humidity: "90%", wind: "12 km/h", direction: "Est" } },
    { day: "Ven", icon: <WiRain size={48} />, tempHigh: "13°C", tempLow: "8°", condition: "Rain", details: { humidity: "95%", wind: "15 km/h", direction: "Sud-Est" } },
    { day: "Sam", icon: <WiDayCloudy size={48} />, tempHigh: "15°C", tempLow: "9°", condition: "Cloudy", details: { humidity: "88%", wind: "7 km/h", direction: "Ouest" } },
    { day: "Dim", icon: <WiRain size={48} />, tempHigh: "12°C", tempLow: "8°", condition: "Rain", details: { humidity: "82%", wind: "9 km/h", direction: "Nord" } },
  ];

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDayData = allWeatherData[selectedDayIndex];
  const videoRef = useRef(null);

  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
  };

  const isSunny = selectedDayData.condition === "Sunny";
  const widgetClasses = `weather-widget dynamic-widget ${isSunny ? 'is-sunny' : ''}`;

  // Gestion de la lecture de la vidéo
  useEffect(() => {
    if (videoRef.current) {
      if (isSunny) {
        videoRef.current.play().catch(err => {
          console.log("Lecture automatique bloquée :", err);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isSunny]);

  return (
    <section className="weather-widget-wrapper">
      <div className={widgetClasses}>

        {/* Vidéo en arrière-plan */}
        {isSunny && (
          <video
            ref={videoRef}
            className="background-video"
            src={SUNNY_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
          >
            Votre navigateur ne supporte pas la vidéo.
          </video>
        )}

        {/* Section du jour sélectionné */}
        <div className="weather-today">
          <div className="day-header">
            <span className="day-name">{selectedDayData.day}</span>
          </div>

          <div className="location-name">Brest</div>

          <div className="main-temp-block">
            <span className="main-temp">{selectedDayData.tempHigh}</span>
            <div className="main-icon">
              <span style={{ fontSize: '3.5em', color: isSunny ? 'gold' : '#4db6ac', zIndex: 2 }}>
                {selectedDayData.icon}
              </span>
            </div>
          </div>

          <div className="details-row">
            <div className="detail">
              <span className="detail-value">{selectedDayData.details.humidity}</span>
              <span className="detail-label">Humidité</span>
            </div>
            <div className="detail">
              <span className="detail-value">{selectedDayData.details.wind}</span>
              <span className="detail-label">Vent</span>
            </div>
            <div className="detail">
              <span className="detail-value">{selectedDayData.details.direction}</span>
              <span className="detail-label">Direction</span>
            </div>
          </div>
        </div>

        {/* Prévisions cliquables */}
        {allWeatherData.map((dayData, index) => {
          if (index === selectedDayIndex) return null;
          const forecastDayClass = `weather-forecast-day clickable ${index === selectedDayIndex ? 'is-active' : ''}`;
          return (
            <div
              className={forecastDayClass}
              key={index}
              onClick={() => handleDayClick(index)}
              style={{ zIndex: 2 }}
            >
              <div className="day-name">{dayData.day}</div>
              <div className="forecast-icon">{dayData.icon}</div>
              <div className="temp-high">{dayData.tempHigh}</div>
              <div className="temp-low">{dayData.tempLow}</div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default MeteoConseils;
