import React, { useRef } from 'react';
import useWeatherParticles from '../../utils/useWeatherParticles';
import './WeatherCanvas.css';

const WeatherCanvas = ({ weatherMain }) => {
  const canvasRef = useRef(null);
  useWeatherParticles(weatherMain, canvasRef);
  return <canvas ref={canvasRef} className="weather-canvas" />;
};

export default WeatherCanvas;