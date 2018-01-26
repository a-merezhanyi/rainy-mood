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
    this.sky = document.querySelector(".storm");
    Audio.loadFile(closeLong, "closeLong");
    Audio.loadFile(distantQuite, "distantQuite");
    Audio.loadFile(middleFast, "middleFast");
    Audio.loadFile(slowChill, "slowChill");
    this.isActive = true;
    this.playThunder(this.randInteger(0, 3), this.randInteger(3, 6));
    document.querySelector("body");
  },

  createBlock() {
    const html = document.createElement("div");
    html.id = "storm";
    html.classList.add("storm");

    return html;
  },

  randInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  playThunder(sound, delay) {
    this.isActive && setTimeout(() => {
      if (sound < 2) {
        this.sky.classList.add(sound ? "fast" : "long");
        setTimeout(() => this.sky.classList.remove("fast", "long"), 2000);
      }

      this.isActive && (
        Audio.playSound(this.stack[sound]),
        this.playThunder(this.randInteger(0, 3), this.randInteger(15, 30))
      );
    }, delay * 1000);
  },

  startPlaying() {
    this.isActive = true;
    this.playThunder(this.randInteger(0, 3), this.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default Storm;
