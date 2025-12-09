// src/hooks/useWeatherAudio.js
import { useEffect, useRef } from 'react';

// ✅ Importe les sons directement → Webpack les inclut dans le bundle
import rainSound from '../assets/rain.mp3';
import snowSound from '../assets/snow.mp3';
import thunderSound from '../assets/thunder.mp3';
import clearSound from '../assets/clear.mp3';

const useWeatherAudio = (weatherMain, isEnabled) => {
  const audioRef = useRef(null);

  const loadSound = (soundUrl) => {
    // Stop l'audio précédent
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (!isEnabled || !soundUrl) return;

    try {
      const audio = new Audio(soundUrl);
      audio.volume = 0.2; // volume subtil mais audible
      audio.loop = true;
      audioRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("🔊 Son démarré :", soundUrl);
          })
          .catch((err) => {
            console.warn("🔇 Audio bloqué (politique navigateur)", err);
          });
      }
    } catch (err) {
      console.error("Erreur de chargement audio", err);
    }
  };

  // ✅ Retourne l'URL du son correspondant
  const getSoundForWeather = (main) => {
    if (["Rain", "Drizzle"].includes(main)) return rainSound;
    if (main === "Snow") return snowSound;
    if (main === "Thunderstorm") return thunderSound;
    if (main === "Clear") return clearSound;
    return null;
  };

  useEffect(() => {
    const soundUrl = getSoundForWeather(weatherMain);
    loadSound(soundUrl);
  }, [weatherMain, isEnabled]);

  // Nettoyage
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
};

export default useWeatherAudio;