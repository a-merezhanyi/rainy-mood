import "./City.scss";
import Utils from "../../actions/Utils";

import car1 from "./car1.mp3";
import car2 from "./car2.mp3";
import car3 from "./car3.mp3";
import car4 from "./car4.mp3";

const City = {
  init() {
    [this.stack, this.isActive] = Utils.initAudioComponent(
      [
        { file: car1, title: "car1" },
        { file: car2, title: "car2" },
        { file: car3, title: "car3" },
        { file: car4, title: "car4" },
      ]
    );
  },

  createBlock() {
    return Utils.createComponentBlock("city", true);
  },

  playCar(sound, delay) {
    Utils.playComponentSound(this, "playCar", sound, delay, 20, 40);
  },

  startPlaying() {
    this.isActive = true;
    this.playCar(Utils.randInteger(0, 3), Utils.randInteger(2, 4));
  },

  stopPlaying() {
    this.isActive = false;
  },
};

export default City;
