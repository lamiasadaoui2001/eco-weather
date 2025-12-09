// src/utils/weatherService.js
const API_KEY = "cfae21a8572037dc5bd6ca03ec679372";

// Récupère les coordonnées exactes
export const getCityCoordinates = (cityName) => {
  const cities = [
    { name: "Rennes",     lat: 48.1173,  lon: -1.6778 },
    { name: "Brest",      lat: 48.3904,  lon: -4.4861 },
    { name: "Quimper",    lat: 47.9973,  lon: -4.1029 },
    { name: "Lorient",    lat: 47.7484,  lon: -3.3689 },
    { name: "Vannes",     lat: 47.6570,  lon: -2.7605 },
    { name: "Saint-Malo", lat: 48.6493,  lon: -2.0259 },
    { name: "Saint-Brieuc", lat: 48.5161, lon: -2.7670 },
    { name: "Morlaix",    lat: 48.5722,  lon: -3.8281 },
    { name: "Dinard",     lat: 48.6297,  lon: -2.0554 },
    { name: "Concarneau", lat: 47.8747,  lon: -3.9256 }
  ];
  return cities.find(c => c.name === cityName);
};

export const fetchWeather = async (cityName) => {
  const coords = getCityCoordinates(cityName);
  if (!coords) throw new Error("Ville non trouvée");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=fr`
  );
  if (!res.ok) throw new Error("Données météo indisponibles");
  return res.json();
};

export const fetchForecast = async (cityName) => {
  const coords = getCityCoordinates(cityName);
  if (!coords) throw new Error("Ville non trouvée");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=fr`
  );
  if (!res.ok) throw new Error("Prévisions indisponibles");
  return res.json();
};

// ✅ Nouvelle fonction : récupère les alertes via One Call
export const fetchOneCall = async (cityName) => {
  const coords = getCityCoordinates(cityName);
  if (!coords) throw new Error("Ville non trouvée");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=fr&exclude=minutely,hourly,daily`
  );
  if (!res.ok) throw new Error("Données One Call indisponibles");
  return res.json();
};