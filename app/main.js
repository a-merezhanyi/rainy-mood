/**
 * @file Rainy Mood
 * @copyright Anatol Marezhanyi 2018
 * @version 0.0.1
 */
import "./styles/styles.scss";

// import Storage from "browser-lsc-storage";
// const storage = Storage.local;
// storage.prefix = "LWdb";

// import Words from "./actions/Words";

/* Create Main container for all components */
const Main = document.createElement("div");
Main.className = "container--main";

/* Import all components and inject into Main container */
import Navigation from "./components/Navigation";
Main.appendChild(Navigation.createBlock());

// import Summary from "./components/Summary";
// Main.appendChild(Summary.createBlock());

// import Learn from "./components/Learn";
// Main.appendChild(Learn.createBlock());

// import Repeat from "./components/Repeat";
// Main.appendChild(Repeat.createBlock());

// import Vocabulary from "./components/Vocabulary";
// Main.appendChild(Vocabulary.createBlock());

// import Settings from "./components/Settings";
// Main.appendChild(Settings.createBlock());

// import Memorystore from "./actions/Memorystore";
// // load the default words set if needed
// if (null === storage.key("words")) {
//   console.log("memorystore: start loading words");
//   Words.loadWords(Memorystore);
//   console.log("memorystore: words have been loaded");
// }

// /* Generate the Page */
// import locale from "./actions/Locale";

// import Footer from "./components/Footer";
// Main.appendChild(Footer);

/* Create a document after all */
document.querySelector("body").appendChild(Main);

// // Init, add event listeners
// locale.init();

Navigation.init();

// Learn.init();
// Learn.recountIndexLearn();

// Repeat.init();
// Repeat.recountIndexRepeat();

// Vocabulary.init();

// Settings.init();

import Audio from "./components/Audio";
Audio.init();

import Sky from "./components/Sky";

import Rain from "./components/Rain";
