import "./Forest.scss";
import Utils from "../../actions/Utils";

import crow from "./crow.mp3";
import whistling from "./whistling.mp3";
import bird from "./bird.mp3";
import nightingale1 from "./nightingale1.mp3";
import nightingale2 from "./nightingale2.mp3";

const Forest = {
  init() {
    [this.stack, this.isActive] = Utils.initAudioComponent(
      [
        { file: crow, title: "crow" },
        { file: whistling, title: "whistling" },
        { file: bird, title: "bird" },
        { file: nightingale1, title: "nightingale1" },
        { file: nightingale2, title: "nightingale2" },
      ]
    );
  },

  createBlock() {
    return Utils.createComponentBlock("forest", true);
  },

  playBird(sound, delay) {
    Utils.playComponentSound(this, "playBird", sound, delay, 15, 50);
  },

  startPlaying() {
    this.isActive = true;
    this.playBird(Utils.randInteger(0, 4), Utils.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default Forest;
