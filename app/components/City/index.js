import "./City.scss";
import Audio from "../Audio";

import car1 from "./car1.mp3";
import car2 from "./car2.mp3";
import car3 from "./car3.mp3";
import car4 from "./car4.mp3";

const City = {
  init() {
    this.stack = [
      "car1",
      "car2",
      "car3",
      "car4",
    ];
    Audio.loadFile(car1, "car1");
    Audio.loadFile(car2, "car2");
    Audio.loadFile(car3, "car3");
    Audio.loadFile(car4, "car4");
    this.isActive = false;
  },

  createBlock() {
    const html = document.createElement("div");
    html.id = "city";
    html.classList.add("u--hidden");
    /* Load background lazy */
    setTimeout(() => {
      html.classList.add("city");
    }, 1000);

    return html;
  },

  randInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  playCar(sound, delay) {
    this.isActive && setTimeout(() => {
      this.isActive && (
        Audio.playSound(this.stack[sound]),
        this.playCar(this.randInteger(0, 3), this.randInteger(20, 40))
      );
    }, delay * 1000);
  },

  startPlaying() {
    this.isActive = true;
    this.playCar(this.randInteger(0, 3), this.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default City;
