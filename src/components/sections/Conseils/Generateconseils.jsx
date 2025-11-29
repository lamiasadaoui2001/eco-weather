const Generateconseils = ({ condition, temperature, humidity, wind, aqi }) => {
  const conseils = [];

  // ----- CONSEIL DU JOUR ----- 
  let conseilGlobal = { type: "Conseil du jour", items: [] };

  if (condition === "Pluie") {
    conseilGlobal.items = [
      "Pensez à consulter la météo avant de sortir afin d’anticiper vos déplacements et éviter les imprévus liés aux averses.",
      "En cas de pluie, prenez un parapluie ou limitez vos trajets non essentiels pour économiser votre énergie et réduire vos dépenses."
    ];
  } else if (condition === "Ensoleillé") {
    conseilGlobal.items = [
      "Le soleil est au rendez-vous — profitez-en pour faire des activités en plein air et passer du temps dans un environnement agréable.",
      "Si vous restez longtemps dehors, pensez à appliquer de la crème solaire pour protéger votre peau contre les rayons UV."
    ];
  } else if (condition === "Nuageux") {
    conseilGlobal.items = [
      "Le ciel est couvert et la lumière est douce, ce qui en fait une excellente journée pour une promenade tranquille ou un moment de lecture.",
      "Gardez un œil sur l’évolution du ciel avant de sortir, car le temps nuageux peut rapidement changer."
    ];
  } else if (condition === "Neige") {
    conseilGlobal.items = [
      "La neige rend les surfaces glissantes, alors marchez prudemment et adaptez votre rythme pour éviter tout risque de chute.",
      "Assurez-vous de porter des vêtements chauds, imperméables et bien isolés pour rester confortable malgré le froid."
    ];
  } else if (condition === "Orage") {
    conseilGlobal.items = [
      "Des orages sont prévus — restez à l'intérieur dès que possible et évitez toute activité en extérieur pour garantir votre sécurité.",
      "Pensez à débrancher les appareils électriques sensibles afin de les protéger d’éventuelles surtensions."
    ];
  } else {
    conseilGlobal.items = [
      "Restez attentif aux conditions météo au cours de la journée et prenez le temps de profiter d’un moment agréable, quelle que soit la météo."
    ];
  }

  conseils.push(conseilGlobal);

  // ----- TEMPÉRATURE -----
  const pushTemperatureConseil = () => {
    if (temperature <= 2) {
      conseils.push({
        type: "Température très froide",
        items: [
          "Les températures sont extrêmement basses — portez des vêtements chauds et bien isolants pour rester protégé du froid mordant.",
          "Évitez de rester longtemps dehors pour limiter les risques liés au froid intense et préserver votre confort."
        ]
      });
    } else if (temperature > 2 && temperature < 12) {
      conseils.push({
        type: "Température froide",
        items: [
          "Il fait froid, pensez à mettre plusieurs couches de vêtements afin de conserver la chaleur tout au long de la journée.",
          "Essayez de ne pas vous exposer trop longtemps au froid pour éviter l’inconfort ou un refroidissement."
        ]
      });
    } else if (temperature >= 12 && temperature < 15) {
      conseils.push({
        type: "Température fraîche",
        items: [
          "Le temps est légèrement frais — une veste légère ou un pull devrait suffire pour rester à l’aise.",
          "Aérez brièvement votre logement pour renouveler l’air sans trop refroidir l’intérieur."
        ]
      });
    } else {
      conseils.push({
        type: "Température douce",
        items: [
          "Le temps est agréable et doux, c’est le moment idéal pour profiter de vos activités extérieures ou vous promener.",
          "Pensez à réduire légèrement le chauffage chez vous pour économiser de l’énergie et maintenir un environnement confortable."
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
          "L’humidité est très élevée — évitez de faire sécher du linge à l’intérieur pour ne pas augmenter encore plus le taux d’humidité.",
          "Pensez à bien ventiler votre logement pour limiter la condensation et maintenir une atmosphère saine."
        ]
      });
    } else if (humidity >= 60) {
      conseils.push({
        type: "Humidité modérée",
        items: [
          "L’air est légèrement humide — ouvrez vos fenêtres quelques minutes pour renouveler l’air sans refroidir l’intérieur.",
          "La pluie peut contribuer à nettoyer naturellement votre terrasse ou votre balcon, ce qui facilite l’entretien."
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
          "Il y a très peu de vent, ce qui rend les conditions idéales pour sortir, marcher ou pratiquer des activités en extérieur.",
          "Si un risque de pluie existe, utilisez un parapluie solide afin d’éviter qu’il ne se retourne facilement."
        ]
      });
    } else if (wind < 30) {
      conseils.push({
        type: "Vent modéré",
        items: [
          "Le vent est modéré — pensez à sécuriser les objets légers à l’extérieur pour éviter qu’ils ne s’envolent.",
          "Essayez de limiter les déplacements inutiles, car le vent peut rendre certaines zones inconfortables."
        ]
      });
    } else {
      conseils.push({
        type: "Vent fort",
        items: [
          "Le vent est très fort, il est préférable d’éviter les activités extérieures pour rester en sécurité.",
          "Évitez également de collecter l’eau de pluie, car elle peut être contaminée par les particules transportées par le vent."
        ]
      });
    }
  };

  // ----- QUALITÉ DE L'AIR -----
  const pushAqiConseil = () => {
    if (aqi === "Bonne") {
      conseils.push({
        type: "Qualité de l'air excellente",
        items: [
          "La qualité de l’air est très bonne — profitez-en pour marcher, faire du vélo ou passer du temps dehors en toute tranquillité.",
          "Pensez aussi à aérer votre logement pour faire entrer de l’air frais et améliorer l’atmosphère intérieure."
        ]
      });
    } else if (aqi === "Correcte" || aqi === "Modérée") {
      conseils.push({
        type: "Qualité de l'air moyenne",
        items: [
          "La qualité de l’air est moyenne — évitez les efforts prolongés à l’extérieur si vous êtes sensible.",
          "Essayez de favoriser les petits déplacements à pied ou à vélo afin de réduire votre impact sur l’environnement."
        ]
      });
    } else {
      conseils.push({
        type: "Qualité de l'air mauvaise",
        items: [
          "La qualité de l’air est mauvaise — privilégiez les activités en intérieur pour éviter de respirer un air trop pollué.",
          "Évitez de collecter l’eau de pluie pour vos plantes, surtout si elles sont destinées à la consommation."
        ]
      });
    }
  };

  // ----- AJOUT DES BLOCS -----
  pushTemperatureConseil();
  pushHumidityConseil();
  pushWindConseil();
  pushAqiConseil();

  return conseils;
};

export default Generateconseils;
