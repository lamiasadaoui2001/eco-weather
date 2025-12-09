// src/components/sections/WeatherAlerts.jsx
import React from 'react';
import './WeatherAlerts.css';
import { FiAlertTriangle, FiWind, FiCloudRain, FiSun, FiThermometer } from 'react-icons/fi';

const WeatherAlerts = ({ current, forecastList = [] }) => {
  if (!current || forecastList.length === 0) return null;

  const alerts = [];

  // 🔥 Canicule (> 30°C)
  if (current.main.temp > 3) {
    alerts.push({
      type: 'heat',
      title: 'Canicule',
      message: 'Température supérieure à 30°C. Restez hydraté et évitez les efforts.',
      severity: 'danger',
      icon: <FiThermometer />
    });
  }

  // ❄️ Grand froid (< -5°C)
  if (current.main.temp < -5) {
    alerts.push({
      type: 'cold',
      title: 'Grand froid',
      message: 'Température inférieure à -5°C. Protégez-vous des engelures.',
      severity: 'danger',
      icon: <FiThermometer />
    });
  }

  // 🌧️ Forte pluie (> 5 mm/h dans les 3h)
  const next3h = forecastList.slice(0, 3);
  const heavyRain = next3h.some(item => (item.rain?.['1h'] || 0) > 5);
  if (heavyRain) {
    alerts.push({
      type: 'rain',
      title: 'Forte pluie',
      message: 'Précipitations intenses attendues (> 5 mm/h). Risque d’accumulation rapide.',
      severity: 'warning',
      icon: <FiCloudRain />
    });
  }

  // 💨 Vent violent (> 70 km/h dans les 6h)
  const next6h = forecastList.slice(0, 6);
  const strongWind = next6h.some(item => (item.wind?.speed * 3.6) > 70);
  if (strongWind) {
    alerts.push({
      type: 'wind',
      title: 'Vent violent',
      message: 'Rafales supérieures à 70 km/h attendues. Sécurisez les objets extérieurs.',
      severity: 'danger',
      icon: <FiWind />
    });
  }

  // ☀️ UV élevé (> 7 dans les 3h)
  const highUV = next3h.some(item => item.uvi > 7);
  if (highUV) {
    alerts.push({
      type: 'uv',
      title: 'UV élevé',
      message: 'Indice UV supérieur à 7. Portez un chapeau, des lunettes et de la crème solaire.',
      severity: 'warning',
      icon: <FiSun />
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="weather-alerts-container">
      <h4>
        <FiAlertTriangle style={{ marginRight: '0.5rem' }} /> {/* ✅ Pas de style ici — hérite du CSS */}
        Alertes météo
      </h4>
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert-item alert-${alert.severity}`}>
            <div className="alert-icon">{alert.icon}</div>
            <div className="alert-content">
              <h5>{alert.title}</h5>
              <p>{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;