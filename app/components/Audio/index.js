const Audio = {
  init() {
    this.sounds = {};
    this.context = null;
    this.bufferLoader = null;
    this.bufferList = [];

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    this.sounds.mainGainNode = this.context.createGain();
    this.sounds.mainGainNode.connect(this.context.destination);
  },

  loadFile(url, title, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      // Asynchronously decode the audio file data in request.response
      this.context.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            console.error(`error decoding file data: ${url}`);

            return;
          }
          this.bufferList[title] = buffer;
          callback && callback.call(this);
        },
        error => {
          console.error(`decodeAudioData error: ${error}`);
        }
      );
    };

    request.onerror = () => {
      console.error("BufferLoader: XHR error");
    };

    request.send();
  },

  createAudioInfinite(title, isPlaying) {
    this.sounds[title] = this.context.createBufferSource();
    this.sounds[`${title}GainNode`] = this.context.createGain();
    this.sounds[title].buffer = this.bufferList[title];
    this.sounds[title].loop = true;
    this.sounds[`${title}GainNode`].gain.setValueAtTime(0.01, this.context.currentTime);
    this.sounds[title].connect(this.sounds[`${title}GainNode`]);
    this.sounds[`${title}GainNode`].connect(this.sounds.mainGainNode);
    this.sounds[title].start();

    isPlaying && this.sounds[`${title}GainNode`].gain.exponentialRampToValueAtTime(1.0, this.context.currentTime + 3.0);

  },

  setSoundVolume(title, volume) {
    this.sounds[`${title}GainNode`].gain.setValueAtTime(volume, this.context.currentTime);
  },

  expChangeVolume(title = "main", volume = 1, delay = 3) {
    this.sounds[`${title}GainNode`].gain.exponentialRampToValueAtTime(volume, this.context.currentTime + delay);
  },

  playSound(title) {
    const source = this.context.createBufferSource();
    source.buffer = this.bufferList[title];
    source.connect(this.sounds.mainGainNode);
    source.start();
  },

  muteSound(isMuted) {
    this.sounds.mainGainNode.gain.setValueAtTime(isMuted ? 0 : 1, this.context.currentTime);
  },

  // return {
  //   // swapMusic(from, to) {
  //   //   music[`gainNode${capitalize(from)}`].gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 3.0);
  //   //   music[from].stop(context.currentTime + 3.0);
  //   //   createAudio();
  //   //   music[`gainNode${capitalize(to)}`].gain.setValueAtTime(0.07, context.currentTime);
  //   //   music[to].start();
  //   // },
};

export default Audio;
