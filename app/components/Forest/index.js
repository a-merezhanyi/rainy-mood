import "./City.scss";
import Audio from "../Audio";

import crow from "./crow.mp3";
import whistling from "./whistling.mp3";
import bird from "./bird.mp3";
import nightingale1 from "./nightingale1.mp3";
import nightingale2 from "./nightingale2.mp3";

const Forest = {
  init() {
    this.stack = [
      "crow",
      "whistling",
      "bird",
      "nightingale1",
      "nightingale2",
    ];
    Audio.loadFile(crow, "crow");
    Audio.loadFile(whistling, "whistling");
    Audio.loadFile(bird, "bird");
    Audio.loadFile(nightingale1, "nightingale1");
    Audio.loadFile(nightingale2, "nightingale2");
    this.isActive = false;
  },

  createBlock() {
    const html = document.createElement("div");
    html.id = "forest";
    html.classList.add("u--hidden");
    /* Load background lazy */
    setTimeout(() => {
      html.classList.add("forest");
    }, 2000);

    return html;
  },

  randInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  playBird(sound, delay) {
    this.isActive && setTimeout(() => {
      this.isActive && (
        Audio.playSound(this.stack[sound]),
        this.playBird(this.randInteger(0, 3), this.randInteger(15, 50))
      );
    }, delay * 1000);
  },

  startPlaying() {
    this.isActive = true;
    this.playBird(this.randInteger(0, 3), this.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default Forest;
