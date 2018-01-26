import "./Storm.scss";
import Audio from "../Audio";

import closeLong from "./thunder-close-long.mp3";
import distantQuite from "./thunder-distant-quite.mp3";
import middleFast from "./thunder-middle-fast.mp3";
import slowChill from "./thunder-slow-chill.mp3";

const Storm = {
  init() {
    this.stack = [
      "closeLong",
      "middleFast",
      "distantQuite",
      "slowChill",
    ];
    this.sky = document.querySelector(".sky");
    Audio.loadFile(closeLong, "closeLong");
    Audio.loadFile(distantQuite, "distantQuite");
    Audio.loadFile(middleFast, "middleFast");
    Audio.loadFile(slowChill, "slowChill");
    this.playThunder(this.randInteger(0, 3), this.randInteger(3, 6));
  },

  randInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  playThunder(sound, delay) {
    setTimeout(() => {
      if (sound < 2) {
        this.sky.classList.add(sound ? "fast" : "long");
        setTimeout(() => this.sky.classList.remove("fast", "long"), 2000);
      }

      Audio.playSound(this.stack[sound]);
      this.playThunder(this.randInteger(0, 3), this.randInteger(10, 30));
    }, delay * 1000);
  },
};

export default Storm;
