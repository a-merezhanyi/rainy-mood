import "./Street.scss";
import Utils from "../../actions/Utils";

import steps from "./steps.mp3";
import scooter from "./scooter.mp3";
import running from "./running.mp3";
import bicycle from "./bicycle.mp3";
import bicycles from "./bicycles.mp3";

const Street = {
  init() {
    [this.stack, this.isActive] = Utils.initAudioComponent(
      [
        { file: steps, title: "steps" },
        { file: scooter, title: "scooter" },
        { file: running, title: "running" },
        { file: bicycle, title: "bicycle" },
        { file: bicycles, title: "bicycles" },
      ]
    );
  },

  createBlock() {
    return Utils.createComponentBlock("street", true);
  },

  playStreet(sound, delay) {
    Utils.playComponentSound(this, "playStreet", sound, delay, 20, 30);
  },

  startPlaying() {
    this.isActive = true;
    this.playStreet(Utils.randInteger(0, 4), Utils.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default Street;
