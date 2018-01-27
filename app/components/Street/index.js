import "./Street.scss";
import Audio from "../Audio";

import steps from "./steps.mp3";
import scooter from "./scooter.mp3";
import running from "./running.mp3";
import bicycle from "./bicycle.mp3";
import bicycles from "./bicycles.mp3";

const Street = {
  init() {
    this.stack = [
      "steps",
      "scooter",
      "running",
      "bicycle",
      "nightingale2",
    ];
    Audio.loadFile(steps, "steps");
    Audio.loadFile(scooter, "scooter");
    Audio.loadFile(running, "running");
    Audio.loadFile(bicycle, "bicycle");
    Audio.loadFile(bicycles, "bicycles");
    this.isActive = false;
  },

  createBlock() {
    const html = document.createElement("div");
    html.id = "street";
    html.classList.add("u--hidden");
    /* Load background lazy */
    setTimeout(() => {
      html.classList.add("street");
    }, 2000);

    return html;
  },

  randInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  playStreet(sound, delay) {
    this.isActive && setTimeout(() => {
      this.isActive && (
        Audio.playSound(this.stack[sound]),
        this.playStreet(this.randInteger(0, 4), this.randInteger(20, 30))
      );
    }, delay * 1000);
  },

  startPlaying() {
    this.isActive = true;
    this.playStreet(this.randInteger(0, 4), this.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default Street;
