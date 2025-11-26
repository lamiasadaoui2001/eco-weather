const Generateconseils = ({ condition, temperature, humidity, wind, aqi }) => {
  const conseils = [];

  // ----- CONSEIL DU JOUR FIXE (toujours en premier) -----
  let conseilGlobal = { type: "Conseil du jour", items: [] };

  if (condition === "Pluie") {
    conseilGlobal.items = [
      "Pensez à vérifier la météo avant de sortir.",
      "Avec la pluie, sortez avec votre parapluie si nécessaire sinon profitez-en pour limiter vos déplacements inutiles et économiser énergie et argent."
    ];
  } else if (condition === "Ensoleillé") {
    conseilGlobal.items = [
      "Profitez d’activités extérieures.",
      "Pensez à mettre de la crème solaire si nécessaire."
    ];
  } else if (condition === "Nuageux") {
    conseilGlobal.items = [
      "La lumière est douce — idéal pour la lecture ou promenade.",
      "Vérifiez la météo avant de sortir."
    ];
  } else if (condition === "Neige") {
    conseilGlobal.items = [
      "Marchez avec précaution — surfaces glissantes.",
      "Portez des vêtements très chauds et imperméables."
    ];
  } else if (condition === "Orage") {
    conseilGlobal.items = [
      "Restez à l’abri et évitez les activités extérieures.",
      "Débranchez les appareils électriques pour éviter les surtensions."
    ];
  } else {
    conseilGlobal.items = ["Restez attentif aux conditions météo et profitez de votre journée !"];
  }

  // ✅ Toujours en premier
  conseils.push(conseilGlobal);

  // ----- TEMPÉRATURE -----
  const pushTemperatureConseil = () => {
    if (temperature <= 2) {
      conseils.push({
        type: "Température très froide",
        items: [
          "Temps très froid — habillez-vous chaudement.",
          "Limitez les sorties prolongées pour éviter le froid."
        ]
      });
    } else if (temperature > 2 && temperature < 10) {
      conseils.push({
        type: "Température froide",
        items: [
          "Temps froid — portez plusieurs couches.",
          "Évitez les expositions longues au froid."
        ]
      });
    } else if (temperature >= 10 && temperature < 15) {
      conseils.push({
        type: "Température fraîche",
        items: [
          "Temps frais — privilégiez une veste légère.",
          "Aérez brièvement pour éviter l’humidité."
        ]
      });
    } else {
      conseils.push({
        type: "Température douce",
        items: [
          "Temps doux — profitez-en pour sortir.",
          "Évitez de trop chauffer votre logement."
        ]
      });
    }
  };

  // ----- HUMIDITÉ -----
  const pushHumidityConseil = () => {
    if (humidity > 80) {
      conseils.push({
        type: "Humidité élevée",
        items: [
          "Évitez de faire sécher du linge à l’intérieur.",
          "Privilégiez la ventilation pour limiter l’humidité."
        ]
      });
    } else if (humidity >= 60) {
      conseils.push({
        type: "Humidité modérée",
        items: [
          "Ouvrez légèrement vos fenêtres.",
          "La pluie nettoie naturellement votre terrasse."
        ]
      });
    }
  };

  // ----- VENT -----
  const pushWindConseil = () => {
    if (wind < 10) {
      conseils.push({
        type: "Vent faible",
        items: [
          "Idéal pour activités extérieures.",
          "Utilisez un parapluie durable si besoin."
        ]
      });
    } else if (wind < 30) {
      conseils.push({
        type: "Vent modéré",
        items: [
          "Sécurisez les objets extérieurs.",
          "Évitez les déplacements inutiles."
        ]
      });
    } else {
      conseils.push({
        type: "Vent fort",
        items: [
          "Évitez les activités en extérieur.",
          "Ne collectez pas l’eau de pluie pour les plantes."
        ]
      });
    }
  };

  // ----- QUALITÉ DE L'AIR -----
  const pushAqiConseil = () => {
    if (aqi === "Bonne") {
      conseils.push({
        type: "Qualité de l'air excellente",
        items: ["Profitez-en pour marcher ou faire du vélo.", "Aérez votre maison."]
      });
    } else if (aqi === "Correcte" || aqi === "Modérée") {
      conseils.push({
        type: "Qualité de l'air moyenne",
        items: ["Limitez les longs trajets à pied.", "Évitez la voiture pour les petits déplacements."]
      });
    } else {
      conseils.push({
        type: "Qualité de l'air mauvaise",
        items: ["Privilégiez les activités à l’intérieur.", "Évitez de collecter l’eau pour les plantes comestibles."]
      });
    }
  };

  // ----- AJOUT DES CONSEILS DÉTAILLÉS -----
  pushTemperatureConseil();
  pushHumidityConseil();
  pushWindConseil();
  pushAqiConseil();

  return conseils;
};

export default Generateconseils;
