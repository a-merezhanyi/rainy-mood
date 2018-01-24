// import "./Rain.scss";

import rainSoft from "./rain-soft.mp3";
import rainHeavy from "./rain-heavy.mp3";

import Audio from "../Audio";
import Navigation from "../Navigation";

const Rain = {
  // handle interaction
  mouseHandler(e) {
    this.updateVolume(e.clientX, e.clientY);
  },

  touchHandler(e) {
    this.updateVolume(e.touches[0].clientX, e.touches[0].clientY);
  },

  updateVolume(x, y) {
    x = x / this.width;
    y = y / this.height;
    // const yInverse = (1 - y);

    Audio.setSoundVolume("rainHeavy", y);
    // this.dropDelay = yInverse * yInverse * yInverse * 100 + 2;
    // this.wind = (x - 0.5) * 50;
  },

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
  },

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio || 1;
    this.resize();

    Audio.loadFile(rainSoft, "rainSoft", () => {
      Audio.createAudioInfinite("rainSoft", true);
    });
    Audio.loadFile(rainHeavy, "rainHeavy", () => {
      Audio.createAudioInfinite("rainHeavy", false);
    });

    document.addEventListener("mousemove", this.mouseHandler.bind(this));
    document.addEventListener("touchstart", this.touchHandler.bind(this), Navigation.applyPassive());
    document.addEventListener("touchmove", this.touchHandler.bind(this), Navigation.applyPassive());
    window.addEventListener("resize", this.resize.bind(this));
  },
};

export default Rain;
