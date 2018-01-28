import "./Storm.scss";
import Audio from "../Audio";
import Utils from "../../actions";

import closeLong from "./thunder-close-long.mp3";
import distantQuite from "./thunder-distant-quite.mp3";
import middleFast from "./thunder-middle-fast.mp3";
import slowChill from "./thunder-slow-chill.mp3";

const Storm = {
  init() {
    [this.stack, this.isActive] = Utils.initAudioComponent(
      [
        { file: closeLong, title: "closeLong" },
        { file: middleFast, title: "middleFast" },
        { file: distantQuite, title: "distantQuite" },
        { file: slowChill, title: "slowChill" },
      ],
      true
    );
    this.playThunder(Utils.randInteger(0, 3), Utils.randInteger(3, 6));
    this.sky = document.querySelector(".storm");
  },

  createBlock() {
    return Utils.createComponentBlock("storm");
  },

  playThunder(sound, delay) {
    Utils.playComponentSound(this, "playThunder", sound, delay, 15, 30, true);
  },

  startPlaying() {
    this.isActive = true;
    this.playThunder(Utils.randInteger(0, 3), Utils.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default Storm;
