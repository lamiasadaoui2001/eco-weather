import React, { useState, useEffect, useRef } from "react";
import "./Conseils.css";
import { WiDaySunny, WiDayCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

// Vidéos
const SUNNY_VIDEO_URL = "/2569168-hd_1920_1080_24fps.mp4";
const RAINY_VIDEO_URL = "/151744-801455851_small.mp4";
const CLOUDY_VIDEO_URL = "/49523-459436933_small.mp4";   // ⭐ nouvelle vidéo nuage
// ---------------- ICONES -------------------
const getWeatherIcon = (description) => {
  const d = description.toLowerCase();

  if (d.includes("orage")) return <WiThunderstorm size={48} />;
  if (d.includes("neige")) return <WiSnow size={48} />;
  if (d.includes("pluie")) return <WiRain size={48} />;
  if (d.includes("ensoleillé")) return <WiDaySunny size={48} />;
  if (d.includes("nuage")) return <WiDayCloudy size={48} />;

  return <WiDaySunny size={48} />;
};

const MeteoConseils = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const API_KEY = "2d54716efb869467c2de72a6860fbb89";
  const LAT = 48.3904;
  const LON = -4.4869;

  // ---------------- RÉCUPÉRATION MÉTÉO -------------------
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&lang=fr&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();

        const dailyMap = {};

        data.list.forEach(item => {
          const date = new Date(item.dt_txt);
          const day = date.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "numeric"
          });

          if (!dailyMap[day]) {
            dailyMap[day] = {
              temps: [],
              humidite: [],
              vent: [],
              direction: [],
              descriptions: [],
              rains: []
            };
          }

          dailyMap[day].temps.push(item.main.temp);
          dailyMap[day].humidite.push(item.main.humidity);
          dailyMap[day].vent.push(item.wind.speed);
          dailyMap[day].direction.push(item.wind.deg);

          dailyMap[day].descriptions.push(item.weather[0].description);

          dailyMap[day].rains.push(item.rain?.["3h"] || 0);
        });

        const degToDir = deg => {
          if (deg >= 337.5 || deg < 22.5) return "Nord";
  if (deg < 67.5) return "Nord-Est";
  if (deg < 112.5) return "Est";
  if (deg < 157.5) return "Sud-Est";
  if (deg < 202.5) return "Sud";
  if (deg < 247.5) return "Sud-Ouest";
  if (deg < 292.5) return "Ouest";
  return "Nord-Ouest";
        };

        const dailyData = Object.keys(dailyMap).map(day => {
          const avg = arr => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

          const descriptions = dailyMap[day].descriptions;
          const rains = dailyMap[day].rains;

          const hasRealRain = rains.some(r => r > 0.5);

          // ⭐ Description météo EN FRANÇAIS
          let finalCondition = "Nuageux";

          if (descriptions.some(d => d.includes("orage"))) finalCondition = "Orage";
          else if (hasRealRain) finalCondition = "Pluie";
          else if (descriptions.some(d => d.includes("neige"))) finalCondition = "Neige";
          else if (descriptions.some(d => d.includes("ciel dégagé"))) finalCondition = "Ensoleillé";

          return {
            day,
            tempHigh: Math.round(Math.max(...dailyMap[day].temps)) + "°C",
            tempLow: Math.round(Math.min(...dailyMap[day].temps)) + "°C",
            details: {
              humidity: avg(dailyMap[day].humidite) + "%",
              wind: avg(dailyMap[day].vent) + " km/h",
              direction: degToDir(avg(dailyMap[day].direction))
            },
            description: finalCondition,
            icon: getWeatherIcon(finalCondition)
          };
        });

        setWeatherData(dailyData);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [LON]);

  // ---------------- VIDEO DYNAMIQUE -------------------
  useEffect(() => {
    if (!weatherData.length) return;

    const desc = weatherData[selectedDayIndex].description.toLowerCase();

    const isRainy = desc.includes("pluie");
    const isSunny = desc.includes("ensoleillé");
    const isCloudy = desc.includes("nuage");

  if (videoRef.current) {
    if (isRainy) {
      videoRef.current.src = RAINY_VIDEO_URL;
    } else if (isSunny) {
      videoRef.current.src = SUNNY_VIDEO_URL;
    } else if (isCloudy) {
      videoRef.current.src = CLOUDY_VIDEO_URL;
    } else {
      videoRef.current.pause();
      videoRef.current.src = "";
      return;
    }

    videoRef.current.load();
    videoRef.current.play().catch(() => {});
  }
}, [weatherData, selectedDayIndex]);

  if (error) return <div>Erreur météo: {error}</div>;
  if (!weatherData.length) return <div>Chargement...</div>;

  const selectedDayData = weatherData[selectedDayIndex];

  return (
    <section className="weather-widget-wrapper">
      <div className="weather-widget dynamic-widget">

        <div className="weather-today">

{["Pluie", "Ensoleillé", "Nuageux"].includes(selectedDayData.description) ? (
  <video
    ref={videoRef}
    className="background-video"
    autoPlay
    loop
    muted
    playsInline
  />
) : null}


          <div className="day-header">
            <span className="day-name">{selectedDayData.day}</span>
          </div>

          <div className="location-name">Brest</div>

          <div className="main-temp-block">
            <span className="main-temp">{selectedDayData.tempHigh}</span>
            <div className="main-icon">{selectedDayData.icon}</div>
          </div>

          <div className="main-desc">{selectedDayData.description}</div>

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

        {weatherData.map((dayData, i) =>
          i === selectedDayIndex ? null : (
            <div
              key={i}
              className="weather-forecast-day clickable"
              onClick={() => setSelectedDayIndex(i)}
            >
              <div className="day-name">{dayData.day}</div>
              <div className="forecast-icon">{dayData.icon}</div>
              <div className="forecast-desc">{dayData.description}</div>
              <div className="temp-high">{dayData.tempHigh}</div>
              <div className="temp-low">{dayData.tempLow}</div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default MeteoConseils;
