// src/components/sections/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";
import { FaRegSnowflake } from "react-icons/fa";
import EarthLoader from "./EarthLoader";
import { IoThunderstormOutline } from "react-icons/io5";
import { fetchWeather, fetchForecast } from "../../utils/weatherService";
import { BRETON_CITIES, CITY_BACKGROUNDS } from "../../utils/cities";
import WeatherAlerts from "./WeatherAlerts";
import WeatherCanvas from './WeatherCanvas';
import useWeatherAudio from '../../utils/useWeatherAudio'; 
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer"
import { BsCloudHaze2 } from "react-icons/bs";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import {
  FiMapPin,
  FiWind,
  FiDroplet,
  FiBarChart2,
  FiSun,
  FiMoon,
  FiThermometer,
  FiList,
  FiTrendingUp,
  FiCloud,
  FiSunrise,
  FiSunset,
  FiCloudRain,
  FiHeadphones, // ✅ Icône audio
} from 'react-icons/fi';
import { LuCloudRain } from "react-icons/lu";
import { CiCloudOn } from "react-icons/ci";

const CenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 9);
  }, [position, map]);
  return null;
};

const Dashboard = () => {
  const savedPreferences = JSON.parse(localStorage.getItem('weatherPrefs')) || {};
  const [selectedCity, setSelectedCity] = useState(savedPreferences.city || "Rennes");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hourlyOffset, setHourlyOffset] = useState(0);
  const [allCitiesWeather, setAllCitiesWeather] = useState([]);
  const [theme, setTheme] = useState(savedPreferences.theme || "dark");
  const [mapLayer, setMapLayer] = useState(savedPreferences.layer || "temp");
  const [currentBackground, setCurrentBackground] = useState(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  // ✅ État audio
  const [audioEnabled, setAudioEnabled] = useState(() => {
    return localStorage.getItem('weatherAudioEnabled') === 'true';
  });

  // Sauvegarde préférences + audio
  useEffect(() => {
    localStorage.setItem('weatherPrefs', JSON.stringify({
      city: selectedCity,
      theme,
      layer: mapLayer,
    }));
    localStorage.setItem('weatherAudioEnabled', audioEnabled);
  }, [selectedCity, theme, mapLayer, audioEnabled]);

  // Chargement fond
  useEffect(() => {
    setBackgroundLoaded(false);
    if (selectedCity && CITY_BACKGROUNDS[selectedCity]) {
      const imageUrl = CITY_BACKGROUNDS[selectedCity];
      const img = new Image();
      img.onload = () => {
        setCurrentBackground(imageUrl);
        setBackgroundLoaded(true);
      };
      img.onerror = () => {
        setCurrentBackground(imageUrl);
        setBackgroundLoaded(true);
      };
      img.src = imageUrl;
    } else {
      setCurrentBackground(null);
    }
  }, [selectedCity]);

  // Chargement météo
  useEffect(() => {
    const loadWeatherAndForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const weather = await fetchWeather(selectedCity);
        const forecast = await fetchForecast(selectedCity);
        setWeatherData(weather);
        setForecastData(forecast);
        setHourlyOffset(0);
        const promises = BRETON_CITIES.map(city => fetchWeather(city.name));
        const results = await Promise.all(promises);
        setAllCitiesWeather(results);
      } catch (err) {
        setError("Ville non trouvée ou erreur de connexion.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadWeatherAndForecast();
  }, [selectedCity]);

  useWeatherAudio(weatherData?.weather[0].main, audioEnabled);

  // ... (le reste de tes useMemo et fonctions reste identique)

  const hourlyData = useMemo(() => {
    if (!forecastData?.list) return [];
    return forecastData.list.slice(0, 24).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit' }),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      wind: (item.wind.speed * 3.6).toFixed(1),
      pressure: item.main.pressure,
      uvi: item.uvi || (item.main.temp > 25 ? 8 : 3),
      precipitation: item.rain?.['1h'] || 0,
      icon: item.weather[0].icon,
      main: item.weather[0].main,
    }));
  }, [forecastData]);

  const visibleHourlyData = useMemo(() => {
    return hourlyData.slice(hourlyOffset, hourlyOffset + 8);
  }, [hourlyData, hourlyOffset]);

  const canGoPrev = hourlyOffset > 0;
  const canGoNext = hourlyOffset + 8 < hourlyData.length;

  const handlePrev = () => canGoPrev && setHourlyOffset(Math.max(0, hourlyOffset - 4));
  const handleNext = () => canGoNext && setHourlyOffset(Math.min(hourlyData.length - 8, hourlyOffset + 4));

  const chartData = hourlyData.map(item => ({
    name: item.time,
    temp: item.temp,
    humidity: item.humidity,
    wind: item.wind,
    pressure: item.pressure,
    precipitation: item.precipitation,
    uvi: item.uvi,
  }));

  const getWeatherTileLayer = () => {
    const apiKey = "cfae21a8572037dc5bd6ca03ec679372";
    const layers = {
      temp: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      precipitation: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      pressure: `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      wind: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      clouds: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    };
    return layers[mapLayer] || layers.temp;
  };

  const tileUrl = getWeatherTileLayer();
  const position = [weatherData?.coord.lat, weatherData?.coord.lon];

  const getLegendColors = () => {
    const palettes = {
      temp: ["#0B3D91", "#3CB371", "#f9f871", "#FF6B6B"],
      precipitation: ["#C19A6B", "#3CB371", "#0B3D91", "#FF6B6B"],
      pressure: ["#0B3D91", "#3CB371", "#f9f871", "#FF6B6B"],
      wind: ["#C19A6B", "#3CB371", "#0B3D91", "#FF6B6B"],
      clouds: ["#C19A6B", "#3CB371", "#0B3D91", "#FF6B6B"],
    };
    return palettes[mapLayer] || palettes.temp;
  };

  const legendColors = getLegendColors();

  const getTempClass = (temp) => temp < 0 ? 'cold' : temp > 25 ? 'hot' : 'normal';
  const getWeatherClass = (main) => {
    if (["Rain", "Drizzle"].includes(main)) return 'rainy';
    if (main === "Snow") return 'snowy';
    if (main === "Thunderstorm") return 'thunder';
    if (["Fog", "Haze", "Mist"].includes(main)) return 'foggy';
    if (main === "Clear") return 'sunny';
    return 'normal';
  };

  const citiesWithWeather = useMemo(() => {
    return BRETON_CITIES.map((city, index) => ({
      ...city,
      weather: allCitiesWeather[index],
    })).filter(item => item.weather);
  }, [allCitiesWeather]);

  if (loading) {
    return (
      <div className="dashboard-loader-wrapper">
        <EarthLoader />
      </div>
    );
  }

  if (error) {
    return <div className="dashboard-error" style={{ color: 'red', padding: '2rem' }}>{error}</div>;
  }

  if (!weatherData) {
    return <div className="dashboard-loader-wrapper" style={{ color: 'white' }}>Chargement...</div>;
  }

  return (
    <div className="app-container">
            <Navbar/>
    <div className="dashboard-wrapper">
    <div className={`dashboard ${theme} animate-fade-in`}>
      <header className="dashboard-header animate-slide-down">
        <div className="location">
          <FiMapPin style={{ marginRight: '0.4rem' }} />
          {weatherData.name}, {weatherData.sys.country} •{" "}
          <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="header-controls">
          <div className="city-navigation">
            {BRETON_CITIES.map(city => (
              <button
                key={city.name}
                className={`city-tab ${selectedCity === city.name ? "active" : ""}`}
                onClick={() => setSelectedCity(city.name)}
                aria-label={`Afficher la météo pour ${city.name}`}
              >
                {city.name}
              </button>
            ))}
          </div>
          {/* ✅ Bouton audio */}
          <button
            className={`audio-toggle ${audioEnabled ? 'active' : ''}`}
            onClick={() => setAudioEnabled(!audioEnabled)}
            aria-label={audioEnabled ? "Désactiver l'ambiance sonore" : "Activer l'ambiance sonore"}
          >
            {audioEnabled ? (
              <FiHeadphones size={18} />
            ) : (
              <FiHeadphones size={18} style={{ opacity: 0.6 }} />
            )}
          </button>
          <div
            className="theme-switch"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Passer en mode ${theme === "dark" ? "clair" : "sombre"}`}
          >
            <div className="theme-switch-track">
              <div className={`theme-switch-thumb ${theme === "dark" ? "dark" : "light"}`}>
                {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-grid animate-slide-up">
        <div className={`main-weather-left ${getTempClass(weatherData.main.temp)} ${getWeatherClass(weatherData.weather[0].main)}`}>
          {currentBackground && (
            <div className="background-overlay">
              <div
                key={selectedCity}
                className={`bg-image ${backgroundLoaded ? 'bg-loaded' : ''}`}
                style={{ backgroundImage: `url(${currentBackground})` }}
              />
            </div>
          )}

          <WeatherCanvas weatherMain={weatherData.weather[0].main} />

          <div className="temperature animate-pulse-once">
            <div className="temp-icon">
              {/* ... (icone température inchangé) ... */}
              {(() => {
                const main = weatherData.weather[0].main;
                const temp = weatherData.main.temp;
                const windSpeed = (weatherData.wind?.speed || 0) * 3.6;
                if (main === "Thunderstorm") return <IoThunderstormOutline size={52} style={{ color: '#00ffec' }} />;
                if (["Drizzle", "Rain"].includes(main)) return <FiCloudRain size={52} style={{ color: '#00ffec' }} />;
                if (main === "Snow") return <FaRegSnowflake size={52} style={{ color: '#00ffec' }} />;
                if (main === "Clear") return <FiSun size={52} />;
                if (main === "Clouds") return <FiCloud size={52} />;
                if (["Mist", "Fog", "Haze"].includes(main)) return <BsCloudHaze2 size={52} style={{ color: '#00ffec' }} />;
                if (windSpeed > 70) return <FiWind size={52} />;
                if (temp < 0) return <FiCloud size={52} style={{ color: '#00ffec' }} />;
                if (temp > 25) return <FiSun size={52} style={{ color: '#00ffec' }} />;
                return <FiThermometer size={52} />;
              })()}
            </div>
            <span className="temp-value">{Math.round(weatherData.main.temp)}°C</span>
            <span className="condition">{weatherData.weather[0].description}</span>
          </div>

          <div className="details">
            {/* ... (détails inchangés) ... */}
            <div className="detail-item">
              <FiWind style={{ marginRight: '0.4rem' }} />
              <span>Vent</span>
              <span>{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</span>
            </div>
            <div className="detail-item">
              <FiDroplet style={{ marginRight: '0.4rem' }} />
              <span>Humidité</span>
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <FiBarChart2 style={{ marginRight: '0.4rem' }} />
              <span>Pression</span>
              <span>{weatherData.main.pressure} hPa</span>
            </div>
            <div className="detail-item">
              <FiCloud style={{ marginRight: '0.4rem' }} />
              <span>Précipitation</span>
              <span>{weatherData.rain?.['1h'] || 0} mm</span>
            </div>
          </div>
        </div>

        {/* ... (le reste de la carte, prévisions, etc. reste identique) ... */}

        <div className="central-area">
          <div className="map-navigation">
            {[
              { key: "temp", icon: <FiThermometer />, label: "Température" },
              { key: "precipitation", icon: <LuCloudRain />, label: "Précipitation" },
              { key: "pressure", icon: <FiBarChart2 />, label: "Pression" },
              { key: "wind", icon: <FiWind />, label: "Vent" },
              { key: "clouds", icon: <CiCloudOn />, label: "Nuages" },
            ].map((item) => (
              <div
                key={item.key}
                className={`nav-tab ${mapLayer === item.key ? "active" : ""}`}
                onClick={() => setMapLayer(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="leaflet-map">
            <MapContainer center={position} zoom={9} style={{ height: '100%', width: '100%' }}>
              <TileLayer url={tileUrl} opacity={0.7} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                opacity={0.3}
              />
              {citiesWithWeather.map((item) => {
                const { name, lat, lon, weather } = item;
                if (!weather) return null;
                let value = 0;
                let color = "#C19A6B";
                switch (mapLayer) {
                  case "temp":
                    value = Math.round(weather.main.temp);
                    color = value > 20 ? "#FF6B6B" : value > 10 ? "#f9f871" : value > 0 ? "#3CB371" : "#0B3D91";
                    break;
                  case "precipitation":
                    value = Math.round(weather.rain?.['1h'] || 0);
                    color = value > 5 ? "#FF6B6B" : value > 2 ? "#3CB371" : value > 0 ? "#C19A6B" : "#0B3D91";
                    break;
                  case "pressure":
                    value = Math.round(weather.main.pressure);
                    color = value > 1020 ? "#FF6B6B" : value > 1010 ? "#f9f871" : value > 1000 ? "#3CB371" : "#0B3D91";
                    break;
                  case "wind":
                    value = Math.round(weather.wind.speed * 3.6);
                    color = value > 30 ? "#FF6B6B" : value > 20 ? "#3CB371" : value > 10 ? "#C19A6B" : "#0B3D91";
                    break;
                  case "clouds":
                    value = Math.round(weather.clouds.all);
                    color = value > 80 ? "#FF6B6B" : value > 50 ? "#3CB371" : value > 20 ? "#C19A6B" : "#0B3D91";
                    break;
                  default:
                    value = Math.round(weather.main.temp);
                    color = "#0B3D91";
                }
                return (
                  <Marker
                    key={name}
                    position={[lat, lon]}
                    icon={L.divIcon({
                      className: 'custom-city-marker',
                      html: `<div class="city-label" style="background:${color}"><span>${value}</span><span>${name}</span></div>`,
                      iconSize: [100, 40],
                      iconAnchor: [50, 40],
                    })}
                  >
                    <Popup>
                      <strong>{name}</strong><br />
                      {mapLayer === "temp" && `${Math.round(weather.main.temp)}°C`}
                      {mapLayer === "precipitation" && `${weather.rain?.['1h'] || 0} mm`}
                      {mapLayer === "pressure" && `${weather.main.pressure} hPa`}
                      {mapLayer === "wind" && `${(weather.wind.speed * 3.6).toFixed(1)} km/h`}
                      {mapLayer === "clouds" && `${weather.clouds.all}%`}
                    </Popup>
                  </Marker>
                );
              })}
              <CenterMap position={position} />
            </MapContainer>
          </div>

          <div className="legend">
            <h4>Légende</h4>
            <div className="legend-scale">
              {legendColors.map((color, index) => (
                <div key={index} className="legend-item" style={{ background: color }} />
              ))}
            </div>
            <div className="legend-labels">
              <span>Bas</span>
              <span>Moyen</span>
              <span>Élevé</span>
              <span>Très élevé</span>
            </div>
          </div>
        </div>

        <div className="five-day-forecast animate-fade-in">
          <h3><FiList style={{ marginRight: '0.5rem' }} />Prévisions sur 5 jours</h3>
          <div className="forecast-list">
            {forecastData?.list?.slice(0, 5).map((day, index) => {
              const date = new Date(day.dt * 1000);
              const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
              const tempMax = Math.round(day.main.temp_max);
              const tempMin = Math.round(day.main.temp_min);
              const icon = day.weather[0].icon;
              return (
                <div key={index} className="forecast-item">
                  <span className="forecast-icon">
                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} width="24" />
                  </span>
                  <span className="forecast-day">{dayName}</span>
                  <span className="forecast-temp">{tempMax}° / {tempMin}°</span>
                </div>
              );
            })}
          </div>
          <WeatherAlerts current={weatherData} forecastList={forecastData?.list || []} />
        </div>
      </div>

      {/* === Graphiques (inchangés) === */}
      <div className="weather-chart animate-slide-up">
        <h3><FiBarChart2 style={{ marginRight: '0.5rem' }} />Données horaires</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke={theme === "dark" ? "rgba(56, 163, 165, 0.15)" : "rgba(34, 87, 122, 0.1)"} 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: theme === "dark" ? "#80ED99" : "#22577A", 
                fontSize: 11,
                fontWeight: 500
              }} 
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: theme === "dark" ? "rgba(128, 237, 153, 0.7)" : "rgba(34, 87, 122, 0.7)", 
                fontSize: 10 
              }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: theme === "dark" ? "rgba(128, 237, 153, 0.7)" : "rgba(34, 87, 122, 0.7)", 
                fontSize: 10 
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? 'rgba(10, 26, 37, 0.85)' : 'rgba(240, 249, 248, 0.95)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                padding: '12px',
              }}
              itemStyle={{
                color: theme === "dark" ? '#e0f7f8' : '#22577A',
                fontWeight: 500
              }}
              labelStyle={{
                color: theme === "dark" ? '#38A3A5' : '#22577A',
                fontWeight: 600,
                marginBottom: '4px'
              }}
              formatter={(value, name) => {
                if (name === 'temp') return [`${value}°C`, 'Température'];
                if (name === 'humidity') return [`${value}%`, 'Humidité'];
                if (name === 'wind') return [`${value} km/h`, 'Vent'];
                if (name === 'pressure') return [`${value} hPa`, 'Pression'];
                return [value, name];
              }}
            />
            <Bar 
              yAxisId="left" 
              dataKey="temp" 
              name="Température" 
              radius={[4, 4, 0, 0]}
              fill="url(#tempGradient)" 
            />
            <Bar 
              yAxisId="left" 
              dataKey="humidity" 
              name="Humidité" 
              radius={[4, 4, 0, 0]}
              fill="url(#humidityGradient)" 
            />
            <Bar 
              yAxisId="right" 
              dataKey="wind" 
              name="Vent" 
              radius={[4, 4, 0, 0]}
              fill="url(#windGradient)" 
            />
            <Bar 
              yAxisId="right" 
              dataKey="pressure" 
              name="Pression" 
              radius={[4, 4, 0, 0]}
              fill="url(#pressureGradient)" 
            />
      
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22577A" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#22577A" stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38A3A5" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#38A3A5" stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#57CC99" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#57CC99" stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#80ED99" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#80ED99" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="hourly-forecast animate-slide-up">
        <h3><FiTrendingUp style={{ marginRight: '0.5rem' }} />Température horaire</h3>
        <div className="hourly-controls">
          <button
            className="hourly-arrow"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Heures précédentes"
          >
            ‹
          </button>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={visibleHourlyData}>
                <defs>
                  <linearGradient id="hourlyTempArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22577A" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#22577A" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="none"
                  fill="url(#hourlyTempArea)"
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#22577A"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#22577A",
                    stroke: theme === "dark" ? "#38A3A5" : "#80ED99",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 7,
                    fill: "#FFFFFF",
                    stroke: "#22577A",
                    strokeWidth: 3,
                  }}
                />
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke={theme === "dark" ? "rgba(56, 163, 165, 0.1)" : "rgba(34, 87, 122, 0.1)"}
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: theme === "dark" ? "#80ED99" : "#22577A",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                />
                <YAxis
                  domain={['dataMin - 2', 'dataMax + 2']}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: theme === "dark" ? "rgba(128, 237, 153, 0.7)" : "rgba(34, 87, 122, 0.7)",
                    fontSize: 11,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? 'rgba(10, 26, 37, 0.85)' : 'rgba(240, 249, 248, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                    padding: '12px',
                  }}
                  labelStyle={{
                    color: theme === "dark" ? '#38A3A5' : '#22577A',
                    fontWeight: 600,
                  }}
                  formatter={(value) => [`${value}°C`, 'Température']}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button
            className="hourly-arrow"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Heures suivantes"
          >
            ›
          </button>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </div>
  );
};

export default Dashboard;