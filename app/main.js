/**
 * @file Rainy Mood
 * @copyright Anatol Marezhanyi 2018
 * @version 1.0.0
 */
import "./styles/styles.scss";
import Utils from "./actions/Utils";

const Body = document.querySelector("body");
/* Create Main container for all components */
const Main = document.createElement("div");
Main.className = "container--main";

/* Import all components and inject into Main container */
import Navigation from "./components/Navigation";
Main.appendChild(Navigation.createBlock());

import Audio from "./actions/Audio";
Audio.init();

import Storm from "./components/Storm";
Body.appendChild(Storm.createBlock());

import City from "./components/City";
Body.appendChild(City.createBlock());

import Forest from "./components/Forest";
Body.appendChild(Forest.createBlock());

import Street from "./components/Street";
Body.appendChild(Street.createBlock());

import Rain from "./components/Rain";
Rain.init();

/* Create a document after all */
Body.appendChild(Main);

Navigation.init();
Storm.init();
window.addEventListener("load", () => Utils.loadBackground("storm"));
