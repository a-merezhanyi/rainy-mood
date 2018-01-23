const Audio = {
  init() {
    this.sounds = {};
    this.context = null;
    this.bufferLoader = null;
    this.bufferList = [];

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  },

  loadFile(url, title, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      console.log(request.response);
      // Asynchronously decode the audio file data in request.response
      this.context.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            console.log(`error decoding file data: ${url}`);

            return;
          }
          this.bufferList[title] = buffer;
          console.log(this.bufferList);
          callback.call(this);
        },
        error => {
          console.error(`decodeAudioData error: ${error}`);
        }
      );
    };

    request.onerror = () => {
      console.log("BufferLoader: XHR error");
    };

    request.send();
  },

  createAudioInfinite(title, isPlaying) {
    console.log(title, this.bufferList);
    this.sounds[title] = this.context.createBufferSource();
    this.sounds[`${title}GainNode`] = this.context.createGain();
    this.sounds[title].buffer = this.bufferList[title];
    this.sounds[title].loop = true;
    this.sounds[`${title}GainNode`].gain.setValueAtTime(0.01, this.context.currentTime);
    this.sounds[title].connect(this.sounds[`${title}GainNode`]);
    this.sounds[`${title}GainNode`].connect(this.context.destination);
    this.sounds[`${title}GainNode`].gain.exponentialRampToValueAtTime(1.0, this.context.currentTime + 3.0);
    isPlaying && this.sounds[title].start();
  },

  setSoundVolume(title, x) {
    this.sounds[`${title}GainNode`].gain.setValueAtTime(x, this.context.currentTime);
    this.sounds[title].start();
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
