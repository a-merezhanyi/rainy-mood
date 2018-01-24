// import "./Rain.scss";

import rainSoft from "./rain-soft.mp3";
import rainHeavy from "./rain-heavy.mp3";

import Audio from "../Audio";

const finishedLoading = () => {
  Audio.createAudioInfinite("rainSoft", true);
};

const finishedLoading1 = () => {
  Audio.createAudioInfinite("rainHeavy", false);
};

Audio.loadFile(rainSoft, "rainSoft", finishedLoading);
Audio.loadFile(rainHeavy, "rainHeavy", finishedLoading1);

// setTimeout(() => {
//   Audio.setSoundVolume("rainHeavy", 1);
// }, 5000);
