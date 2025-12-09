// src/hooks/useWeatherParticles.js
import { useEffect, useRef } from 'react';

const useWeatherParticles = (weatherMain, canvasRef) => {
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const lightningTimeout = useRef(null);

  // Détecte si l'utilisateur préfère moins d'animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !weatherMain) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (lightningTimeout.current) clearTimeout(lightningTimeout.current);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Réinitialise les particules au changement de météo
    particlesRef.current = [];

    // Générateur de particules selon la météo
    const createParticles = () => {
      if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
        for (let i = 0; i < 100; i++) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: 10 + Math.random() * 10,
            speed: 3 + Math.random() * 3,
            opacity: 0.4 + Math.random() * 0.4,
          });
        }
      } else if (weatherMain === 'Snow') {
        for (let i = 0; i < 80; i++) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1 + Math.random() * 2,
            speedY: 0.5 + Math.random() * 1,
            speedX: -0.2 + Math.random() * 0.4,
            opacity: 0.6 + Math.random() * 0.4,
          });
        }
      }
    };

    createParticles();

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
        ctx.strokeStyle = 'rgba(100, 150, 255, 0.6)';
        ctx.lineWidth = 1;
        particlesRef.current.forEach(p => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + p.length);
          ctx.globalAlpha = p.opacity;
          ctx.stroke();
          p.y += p.speed;
          if (p.y > height) {
            p.y = -p.length;
            p.x = Math.random() * width;
          }
        });
      } else if (weatherMain === 'Snow') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        particlesRef.current.forEach(p => {
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y > height) p.y = -5;
          if (p.x > width) p.x = 0;
          if (p.x < 0) p.x = width;
        });
      } else if (weatherMain === 'Thunderstorm') {
        // Éclair aléatoire (1x toutes les 5-10s)
        if (!lightningTimeout.current) {
          lightningTimeout.current = setTimeout(() => {
            ctx.fillStyle = 'rgba(255, 255, 200, 0.2)';
            ctx.fillRect(0, 0, width, height);
            setTimeout(() => {
              ctx.clearRect(0, 0, width, height);
            }, 80);
            lightningTimeout.current = null;
          }, 5000 + Math.random() * 5000);
        }
      } else if (['Mist', 'Fog', 'Haze'].includes(weatherMain)) {
        // Brume douce
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (lightningTimeout.current) clearTimeout(lightningTimeout.current);
    };
  }, [weatherMain, prefersReducedMotion]);
};

export default useWeatherParticles;