import Audio from "../components/Audio";

const Utils = {
  initAudioComponent(stack, isActive = false) {
    stack.forEach(x => {
      Audio.loadFile(x.file, x.title);
    });

    return [stack, isActive];
  },

  createComponentBlock(title, lazy) {
    const html = document.createElement("div");
    html.id = title;
    lazy /* Load background lazy? */
      ? (html.classList.add("u--hidden"),
        setTimeout(() => {
          html.classList.add(title);
        }, 2000))
      : html.classList.add(title);

    return html;
  },

  playComponentSound(component, playFunction, sound, delay, min, max, isStorm) {
    component.isActive && setTimeout(() => {
      (isStorm && sound < 2) && (
        component.sky.classList.add(sound.title ? "fast" : "long"),
        setTimeout(() => component.sky.classList.remove("fast", "long"), 2000)
      );

      component.isActive && (
        Audio.playSound(component.stack[sound].title),
        component[playFunction](
          this.randInteger(0, component.stack.length - 1),
          this.randInteger(min, max)
        )
      );
    }, delay * 1000);
  },

  randInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
};

export default Utils;
