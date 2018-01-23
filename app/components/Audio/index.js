// import BufferLoader from "./buffer-loader";
import rainSoft from "./rain-soft.mp3";

const Audio = {
  loadFile(url, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      // Asynchronously decode the audio file data in request.response
      this.context.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            console.log(`error decoding file data: ${url}`);

            return;
          }
          this.bufferList.push(buffer);
          callback.call(this, this.bufferList);
        },
        error => {
          console.error(`decodeAudioData error: ${error}`);
        }
      );
    },

    request.onerror = () => {
      console.log("BufferLoader: XHR error");
    };

    request.send();
  },

  createAudio() {
    this.music.rainSoft = this.context.createBufferSource();
    this.music.gainNodeRainSoft = this.context.createGain();
    this.music.rainSoft.buffer = this.bufferList[0];
    this.music.rainSoft.loop = true;
    this.music.gainNodeRainSoft.gain.setValueAtTime(0.01, this.context.currentTime);
    this.music.rainSoft.connect(this.music.gainNodeRainSoft);
    this.music.gainNodeRainSoft.connect(this.context.destination);
    this.music.gainNodeRainSoft.gain.exponentialRampToValueAtTime(1.0, this.context.currentTime + 3.0);

    // music.game = context.createBufferSource();
    // music.gainNodeGame = context.createGain();
    // music.game.buffer = bufferList[0];
    // music.game.connect(music.gainNodeGame);
    // music.gainNodeGame.connect(context.destination);
    // music.gainNodeGame.gain.exponentialRampToValueAtTime(1.0, context.currentTime + 3.0);
  },

  finishedLoading(bufferedList) {
    this.bufferList = bufferedList;
    this.createAudio();
    this.music.rainSoft.start();
  },

  init() {
    this.music = {
      "rainSoft": null,
      "gainNodeRainSoft": null,
      "rainHeavy": null,
      "gainNodeRainHeavy": null,
    };
    this.sounds = {
      "clickSound": 2,
      "gameOver": 3,
      "selectChip": 4,
      "deselectChip": 5,
    };
    this.context = null;
    this.bufferLoader = null;
    this.bufferList = [];

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    this.loadFile(rainSoft, this.finishedLoading);

    // const sound = new Uint8Array(rainSoft);
    // this.context.decodeAudioData(sound.buffer).then(decodedData => {
    //   this.music.rainSoft = this.context.createBufferSource();
    //   this.music.gainNodeRainSoft = this.context.createGain();
    //   this.music.rainSoft.buffer = decodedData;
    //   this.music.rainSoft.loop = true;
    //   this.music.gainNodeRainSoft.gain.setValueAtTime(0.01, this.context.currentTime);
    //   this.music.rainSoft.connect(this.music.gainNodeRainSoft);
    //   this.music.gainNodeRainSoft.connect(this.context.destination);
    //   this.music.gainNodeRainSoft.gain.exponentialRampToValueAtTime(1.0, this.context.currentTime + 3.0);

    //   this.music.rainSoft.start();
    // });

    // this.bufferLoader = new BufferLoader(
    //       this.context,
    //   [
    //     rainSoft,
    //     // "../components/Rain/rain-soft.mp3",
    //     // "../components/Sky/thunder-close-long.mp3",
    //     // "planetjazzbass-the-death-of-gagarin.ogg",
    //     // "finger-snap.ogg",
    //     // "failure-sound-effect.ogg",
    //     // "button-sound.ogg",
    //     // "button-sound-effect.ogg",
    //   ],
    //       this.finishedLoading
    //   );

    // this.bufferLoader.load();
  },

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  playSound(sound) {
    const source = this.context.createBufferSource();
    source.buffer = this.bufferList[this.sounds[sound]];
    source.connect(this.context.destination);
    source.start();
  },

  // window.onload = init;

  // return {
  //   // swapMusic(from, to) {
  //   //   music[`gainNode${capitalize(from)}`].gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 3.0);
  //   //   music[from].stop(context.currentTime + 3.0);
  //   //   createAudio();
  //   //   music[`gainNode${capitalize(to)}`].gain.setValueAtTime(0.07, context.currentTime);
  //   //   music[to].start();
  //   // },

  //   playSound(sound) {
  //     const source = context.createBufferSource();
  //     source.buffer = bufferList[sounds[sound]];
  //     source.connect(context.destination);
  //     source.start();
  //   },
  // };
};

export default Audio;
