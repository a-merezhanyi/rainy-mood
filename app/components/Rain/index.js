// import "./Rain.scss";

import rainSoft from "./rain-soft.mp3";
import rainHeavy from "./rain-heavy.mp3";

import Audio from "../Audio";

const Rain = {
  init() {
    Audio.loadFile(rainSoft, "rainSoft", () => {
      Audio.createAudioInfinite("rainSoft", true);
    });
    Audio.loadFile(rainHeavy, "rainHeavy", () => {
      Audio.createAudioInfinite("rainHeavy", false);
    });
  },
};

export default Rain;

// setTimeout(() => {
//   Audio.setSoundVolume("rainHeavy", 1);
// }, 5000);
