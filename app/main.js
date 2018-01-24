/**
 * @file Rainy Mood
 * @copyright Anatol Marezhanyi 2018
 * @version 0.0.1
 */
import "./styles/styles.scss";

/* Create Main container for all components */
const Main = document.createElement("div");
Main.className = "container--main";

/* Import all components and inject into Main container */
import Navigation from "./components/Navigation";
Main.appendChild(Navigation.createBlock());

/* Create a document after all */
document.querySelector("body").appendChild(Main);

Navigation.init();

import Audio from "./components/Audio";
Audio.init();

import Sky from "./components/Sky";
Sky.init();

import Rain from "./components/Rain";
Rain.init();
