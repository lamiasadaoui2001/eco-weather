// src/utils/vigilanceService.js
export const CITY_TO_DEPARTMENT = {
  "Rennes": "35",
  "Brest": "29",
  "Quimper": "29",
  "Lorient": "56",
  "Vannes": "56",
  "Saint-Malo": "35",
  "Saint-Brieuc": "22",
  "Morlaix": "29",
  "Dinard": "35",
  "Concarneau": "29"
};

export const PHENOMENES = {
  "1": "Vent violent",
  "2": "Pluie-inondation",
  "3": "Orages",
  "4": "Crues",
  "5": "Neige-verglas",
  "6": "Canicule",
  "7": "Grand froid",
  "8": "Avalanches",
  "9": "Vagues-submersion"
};

export const VIGILANCE_COLORS = {
  "0": "#5cb85c",
  "1": "#f0ad4e",
  "2": "#d9534f",
  "3": "#d9534f"
};

export const fetchVigilance = async () => {
  const res = await fetch("https://vigilance2019.meteofrance.fr/data/vigilance_controle.json");
  if (!res.ok) throw new Error("Données Vigilance indisponibles");
  return res.json();
};