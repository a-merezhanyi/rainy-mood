import Audio from "./Audio";

const Utils = {
  initAudioComponent(stack, isActive = false) {
    stack.forEach(x => {
      Audio.loadFile(x.file, x.title);
    });

    return [stack, isActive];
  },

  createComponentBlock(title, hidden) {
    const html = document.createElement("div");
    html.id = title;
    html.classList.add(title);

    const preloadBg = document.createElement("div");
    preloadBg.id = `${title}-preload`;
    preloadBg.classList.add(`${title}-preload`, title, "img-small");
    html.appendChild(preloadBg);

    hidden && (html.classList.add("u--hidden"));

    return html;
  },

  loadBackground(title) {
    const html = document.querySelector(`#${title}`);
    const lazyBg = document.createElement("div");
    lazyBg.id = `${title}-img`;
    lazyBg.classList.add(`${title}-img`, title, "u--hidden");
    html.appendChild(lazyBg);

    const img = new Image();
    const wideScreenSufix = (window.innerWidth > window.innerHeight) ? "-w" : "";
    const pixelRation = `@x${~~window.devicePixelRatio > 3 ? 3 : ~~window.devicePixelRatio}`;

    img.src = `${title}-bg${wideScreenSufix + pixelRation}.jpg`;

    img.onload = () => {
      const el = document.querySelector(`#${title}-preload`);
      const bg = document.querySelector(`#${title}-img`);

      el && (
        el.classList.add("u--hidden"),
        setTimeout(() => {
          el.parentNode.removeChild(el);
        }, 1200)
      );
      bg && (
        bg.classList.add(`${title}-img`),
        bg.classList.remove("u--hidden")
      );
    };
  },

  randInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
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
};

export default Utils;
