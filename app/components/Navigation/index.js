import navigationTmp from "./Navigation.html";
import "./Navigation.scss";

import Detabinator from "./detabinator";
import Audio from "../Audio";
import Storm from "../Storm";
import City from "../City";

const Navigation = {
  init() {
    this.storm = Storm;
    this.city = City;

    this.selected = "storm";
    document
      .querySelectorAll("[data-type=nav-select]")
      .forEach((node) => {
        node.addEventListener("click", this.navSelect.bind(this));
      });

    this.navTitle = document.querySelector("#sideNavTitle");
    this.coverTitle = document.querySelector("#coverTitle");
    this.showButtonEl = document.querySelector("#menuShow");
    this.hideButtonEl = document.querySelector("#menuHide");
    this.sideNavEl = document.querySelector("#sideNav");
    this.sideNavContainerEl = document.querySelector("#sideNavContainer");

    this.muteSound = document.querySelector("#muteSound");
    // Control whether the container"s children can be focused
    // Set initial state to inert since the drawer is offscreen
    this.detabinator = new Detabinator(this.sideNavContainerEl);
    this.detabinator.inert = true;

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.update = this.update.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.touchingSideNav = false;

    this.supportsPassive = null;
    this.addEventListeners();

    // Lazy load the background image
    setTimeout(() => {
      document.querySelector(".side-nav__header").classList.add("side-nav__header--lazy-bg");
    }, 600);
  },

  createBlock() {
    const html = document.createElement("div");
    html.classList.add("navigation");
    html.innerHTML = navigationTmp;

    return html;
  },

  navSelect(e) {
    // Hide previous tab and stop playing
    this[this.selected].stopPlaying();
    document
      .querySelector(`#${this.selected}Nav`)
      .classList.remove("active");
    document
      .querySelector(`#${this.selected}`)
      .classList.add("u--hidden");
    // Store current Tab and show it
    this.selected = e.currentTarget.dataset.target;
    document
      .querySelector(`#${this.selected}Nav`)
      .classList.add("active");
    document
      .querySelector(`#${this.selected}`)
      .classList.remove("u--hidden");
    // Change Title and hide Nav
    this.coverTitle.innerText = e.currentTarget.dataset.title;
    this.hideSideNav();
    this[this.selected].startPlaying();
  },

  muteSounds() {
    if ("false" === this.dataset.muted) {
      this.dataset.muted = "true";
      this.innerText = "Unmute";
      Audio.muteSound(true);
    } else {
      this.dataset.muted = "false";
      this.innerText = "Mute";
      Audio.muteSound();
    }
  },

  // apply passive event listening if it"s supported
  applyPassive() {
    if (null !== this.supportsPassive) {
      return this.supportsPassive ? { passive: true } : false;
    }
    // feature detect
    let isSupported = false;
    try {
      document.addEventListener("test", null, { get passive() {
        isSupported = true;
      } });
    } catch (e) {
      console.log(e);
    }
    this.supportsPassive = isSupported;
    return this.applyPassive();
  },

  addEventListeners() {
    this.muteSound.addEventListener("click", this.muteSounds);

    this.showButtonEl.addEventListener("click", this.showSideNav);
    this.hideButtonEl.addEventListener("click", this.hideSideNav);
    this.sideNavEl.addEventListener("click", this.hideSideNav);
    this.sideNavContainerEl.addEventListener("click", this.blockClicks);

    this.sideNavEl.addEventListener("touchstart", this.onTouchStart, this.applyPassive());
    this.sideNavEl.addEventListener("touchmove", this.onTouchMove, this.applyPassive());
    this.sideNavEl.addEventListener("touchend", this.onTouchEnd);
  },

  onTouchStart(evt) {
    if (!this.sideNavEl.classList.contains("side-nav--visible")) {
      return;
    }

    this.startX = evt.touches[0].pageX;
    this.currentX = this.startX;

    this.touchingSideNav = true;
    requestAnimationFrame(this.update);
  },

  onTouchMove(evt) {
    if (!this.touchingSideNav) {
      return;
    }

    this.currentX = evt.touches[0].pageX;
  },

  onTouchEnd() {
    if (!this.touchingSideNav) {
      return;
    }

    this.touchingSideNav = false;

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = "";

    if (translateX < 0) {
      this.hideSideNav();
    }
  },

  update() {
    if (!this.touchingSideNav) {
      return;
    }

    requestAnimationFrame(this.update);

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`;
  },

  blockClicks(evt) {
    evt.stopPropagation();
  },

  onTransitionEnd(e) {
    if ("transform" === e.propertyName) {
      this.sideNavEl.classList.remove("side-nav--animatable");
      this.sideNavEl.removeEventListener("transitionend", this.onTransitionEnd);
    }
  },

  showSideNav() {
    Audio.expChangeVolume("main", 0.5, 0.33);
    this.sideNavEl.classList.add("side-nav--animatable");
    this.sideNavEl.classList.add("side-nav--visible");
    this.detabinator.inert = false;
    this.sideNavEl.addEventListener("transitionend", this.onTransitionEnd);
  },

  hideSideNav() {
    Audio.expChangeVolume("main", 1, 0.13);
    this.sideNavEl.classList.add("side-nav--animatable");
    this.sideNavEl.classList.remove("side-nav--visible");
    this.detabinator.inert = true;
    this.sideNavEl.addEventListener("transitionend", this.onTransitionEnd);
  },

  isSideNavVisible() {
    return this.sideNavEl.classList.contains("side-nav--visible");
  },
};

export default Navigation;
