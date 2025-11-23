export const Generateconseils = ({ condition, temperature, humidity, wind, aqi }) => {
  const conseils = [];

  if (condition === "Pluie") {
    // TEMPÉRATURE
    if (temperature < 5) {
      conseils.push({
        type: "Température très froide",
        items: [
          "Temps très froid et pluvieux — portez une veste chaude et imperméable.",
          "Limitez les sorties longues : froid + pluie augmentent les risques de coup de froid."
        ]
      });
    } else if (temperature >= 5 && temperature < 15) {
      conseils.push({
        type: "Température fraîche",
        items: [
          "Temps frais et humide — privilégiez plusieurs couches et un imperméable.",
          "Aérez votre logement brièvement pour éviter l’humidité intérieure."
        ]
      });
    } else {
      conseils.push({
        type: "Température douce",
        items: [
          "Temps doux avec pluie — aérez après l’averse pour rafraîchir l’air.",
          "La pluie peut rendre l’air lourd : évitez de trop chauffer votre logement."
        ]
      });
    }

    // HUMIDITÉ
    if (humidity > 80) {
      conseils.push({
        type: "Humidité élevée",
        items: [
          "Évitez de faire sécher du linge à l’intérieur.",
          "Privilégiez les ventilateurs plutôt que les déshumidificateurs."
        ]
      });
    } else if (humidity >= 60) {
      conseils.push({
        type: "Humidité modérée",
        items: [
          "Ouvrez légèrement vos fenêtres après la pluie.",
          "La pluie nettoie naturellement votre terrasse — moins de produits chimiques."
        ]
      });
    }

    // AQI
if (aqi === "Bonne") {
  conseils.push({ type: "Qualité de l'air excellente", items: ["Profitez-en pour marcher ou faire du vélo.", "Aérez votre maison."] });
} else if (aqi === "Correcte" || aqi === "Modérée") {
  conseils.push({ type: "Qualité de l'air moyenne", items: ["Limitez les longs trajets à pied.", "Évitez la voiture pour les petits déplacements."] });
} else {
  conseils.push({ type: "Qualité de l'air mauvaise", items: ["Évitez de collecter l’eau pour les plantes comestibles.", "Privilégiez les activités à l’intérieur aujourd’hui."] });
}


    // VENT
    if (wind < 10) {
      conseils.push({
        type: "Vent faible",
        items: [
          "Idéal pour récupérer l’eau de pluie.",
          "Utilisez un parapluie durable, pas jetable."
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
          "Évitez d’utiliser un véhicule à grande vitesse.",
          "Ne collectez pas l’eau de pluie (trop de contaminants)."
        ]
      });
    }
  }

  return conseils;
};
