import "./Rain.scss";
import rainSoft from "./rain-soft.mp3";
import rainHeavy from "./rain-heavy.mp3";
import Audio from "../../actions/Audio";
import Navigation from "../Navigation";
import Ticker from "./ticker";

class Drip {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  init() {
    this.y = Math.random() * -100;
    this.z = Math.random() * 0.5 + 0.5;
    this.speed = 10 + 19 * this.z;
  }

  recycle(stack) {
    stack.push(this);
  }
}

const Rain = {
  // handle interaction
  mouseHandler(e) {
    this.updateVolume(e.clientX, e.clientY);
  },

  touchHandler(e) {
    this.updateVolume(e.touches[0].clientX, e.touches[0].clientY);
  },

  updateVolume(x, y) {
    if ((x < 55 && y < 55) || Navigation.isSideNavVisible()) {
      return;
    }
    x = x / this.width;
    y = y / this.height;
    const yInverse = (1 - y);

    Audio.setSoundVolume("rainHeavy", y);
    this.dropDelay = yInverse * yInverse * yInverse * 100 + 2;
    this.wind = (x - 0.5) * 10;
  },

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
  },

  draw() {
    // start fresh
    this.ctx.clearRect(0, 0, this.width * this.dpr, this.height * this.dpr);

    // draw rain (trace all paths first, then stroke once)
    this.ctx.beginPath();
    const rainHeight = 40 * this.dpr;
    for (let i = this.rain.length - 1; i >= 0; i = i - 1) {
      const r = this.rain[i];
      const realX = r.x * this.dpr;
      const realY = r.y * this.dpr;
      this.ctx.moveTo(realX, realY);
      // magic number 1.5 compensates for lack of trig in drawing angled rain
      this.ctx.lineTo(realX - this.wind * r.z * this.dpr * 1.5, realY - rainHeight * r.z);
    }
    this.ctx.lineWidth = 2 * this.dpr;
    this.ctx.strokeStyle = this.rainColor;
    this.ctx.stroke();
  },

  step(time, lag) {
    const multiplier = this.speed * lag; // multiplier for physics

    // spawn drops
    this.dropTime = this.dropTime + time * this.speed;
    while (this.dropTime > this.dropDelay) {
      this.dropTime = this.dropTime - this.dropDelay;
      const newRain = this.rainPool.pop() || new Drip();
      newRain.init();
      const windExpand = Math.abs(this.height / newRain.speed * this.wind); // expand spawn width as wind increases
      let spawnX = Math.random() * (this.width + windExpand);
      if (this.wind > 0) {
        spawnX = spawnX - windExpand;
      }
      newRain.x = spawnX;
      this.rain.push(newRain);
    }

    // rain physics
    for (let i = this.rain.length - 1; i >= 0; i = i - 1) {
      const r = this.rain[i];
      r.y = r.y + r.speed * r.z * multiplier;
      r.x = r.x + r.z * this.wind * multiplier;
      // recycle rain
      if (r.y > this.height + Drip.height * r.z
        || (this.wind < 0 && r.x < this.wind)
        || (this.wind > 0 && r.x > this.width + this.wind)) {
        r.recycle(this.rainPool);
        this.rain.splice(i, 1);
      }
    }

    this.draw();
  },

  init() {
    if (this.started) {
      return; // don't initialize twice
    }

    this.speed = 1;
    this.started = true;
    this.width = 0;
    this.height = 0;
    this.dropTime = 0; // time since last drop
    this.dropDelay = 25; // ideal time between drops
    this.wind = 4; // wind applied to rain
    this.rainColor = "rgba(180, 275, 255, 0.3)";
    this.rainColorClear = "rgba(180, 275, 255, 0)";
    this.rain = []; // rain particles
    this.rainPool = [];

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
    document.addEventListener("touchstart", this.touchHandler.bind(this), { passive: false });
    document.addEventListener("touchmove", this.touchHandler.bind(this), { passive: false });
    window.addEventListener("resize", this.resize.bind(this));

    Ticker.addListener.call(this, this.step);
  },
};

export default Rain;
