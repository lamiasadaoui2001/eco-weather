// src/utils/cities.js

// Importe toutes les images
import rennes from '../assets/Rennes_fr.jpg';
import brest from '../assets/Brest_fr.jpg';
import quimper from '../assets/Quimper_fr.jpg';
import lorient from '../assets/Lorient_fr.jpg';
import vannes from '../assets/Vannes_fr.jpg';
import saintmalo from '../assets/Saintmalo_fr.jpg';
import saintbrieuc from '../assets/Saintbrieuc_fr.jpg';
import morlaix from '../assets/Morlaix_fr.jpg';
import dinard from '../assets/Dinard_fr.jpg';
import concarneau from '../assets/Concarneau_fr.jpg';

export const BRETON_CITIES = [
  { name: "Rennes",     lat: 48.1173,  lon: -1.6778,  country: "FR" },
  { name: "Brest",      lat: 48.3904,  lon: -4.4861,  country: "FR" },
  { name: "Quimper",    lat: 47.9973,  lon: -4.1029,  country: "FR" },
  { name: "Lorient",    lat: 47.7484,  lon: -3.3689,  country: "FR" },
  { name: "Vannes",     lat: 47.6570,  lon: -2.7605,  country: "FR" },
  { name: "Saint-Malo", lat: 48.6493,  lon: -2.0259,  country: "FR" },
  { name: "Saint-Brieuc", lat: 48.5161, lon: -2.7670, country: "FR" },
  { name: "Morlaix",    lat: 48.5722,  lon: -3.8281,  country: "FR" },
  { name: "Dinard",     lat: 48.6297,  lon: -2.0554,  country: "FR" },
  { name: "Concarneau", lat: 47.8747,  lon: -3.9256,  country: "FR" }
];

// Pour CitySelector : liste des noms
export const CITY_NAMES = BRETON_CITIES.map(city => city.name);
export const CITY_BACKGROUNDS = {
  "Rennes": rennes,
  "Brest": brest,
  "Quimper": quimper,
  "Lorient": lorient,
  "Vannes": vannes,
  "Saint-Malo": saintmalo,
  "Saint-Brieuc": saintbrieuc,
  "Morlaix": morlaix,
  "Dinard": dinard,
  "Concarneau": concarneau
};