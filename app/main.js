/**
 * @file Rainy Mood
 * @copyright Anatol Marezhanyi 2018
 * @version 0.0.1
 */
import "./styles/styles.scss";

const Body = document.querySelector("body");
/* Create Main container for all components */
const Main = document.createElement("div");
Main.className = "container--main";

/* Import all components and inject into Main container */
import Navigation from "./components/Navigation";
Main.appendChild(Navigation.createBlock());

import Audio from "./components/Audio";
Audio.init();

import Storm from "./components/Storm";
Body.appendChild(Storm.createBlock());

import City from "./components/City";
Body.appendChild(City.createBlock());

import Forest from "./components/Forest";
Body.appendChild(Forest.createBlock());

import Rain from "./components/Rain";
Rain.init();

/* Create a document after all */
Body.appendChild(Main);

Navigation.init();
Storm.init();

/* Load other enviroment lazy */
setTimeout(() => {
  City.init();
  Forest.init();
}, 3000);
