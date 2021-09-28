fetch("/components/activity/activity.component.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function updateElemIdInnerHtml(dom, id, value) {
  const element = dom.shadowRoot.getElementById(`${id}`);
  element.innerHTML = value;
}

function updateTimeFrames(dom) {
  const selected = dom.selected;
  const timeframes = dom.timeframes;
  const lastText = {
    daily: "Last Day - ",
    weekly: "Last Week - ",
    monthly: "Last Month - ",
  };

  updateElemIdInnerHtml(dom, "current", `${timeframes[selected].current}hrs`);
  updateElemIdInnerHtml(
    dom,
    "last",
    `${lastText[selected]}${timeframes[selected].previous}hrs`
  );
}

function define(html) {
  class ActivityComponent extends HTMLElement {
    constructor() {
      super();

      this._timeframes = {
        daily: {
          current: 0,
          previous: 0,
        },
        weekly: {
          current: 0,
          previous: 0,
        },
        monthly: {
          current: 0,
          previous: 0,
        },
      };
      this._selected = "daily";

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = html;

      const card = this.shadowRoot.getElementById("card");
      card.style.backgroundImage = `url(${this.getAttribute("icon")})`;

      const background = this.getAttribute("background");
      const activityColors = {
        work: "var(--color-work)",
        play: "var(--color-play)",
        study: "var(--color-study)",
        exercise: "var(--color-exercise)",
        social: "var(--color-social)",
        selfcare: "var(--color-selfcare)",
      };

      card.style.backgroundColor = activityColors[background]
        ? activityColors[background]
        : background;

      const title = this.getAttribute("title");
      const titleElement = this.shadowRoot.getElementById("title");
      titleElement.innerHTML = title;
    }

    set selected(type) {
      this._selected = type;
      const shadowRoot = this.shadowRoot;
      updateTimeFrames(this);
    }
    get selected() {
      return this._selected;
    }

    set timeframes(timeframes) {
      console.log("SET");
      this._timeframes = timeframes;
      updateTimeFrames(this);
    }
    get timeframes() {
      return this._timeframes;
    }

    connectedCallback() {
      updateTimeFrames(this);
    }
  }

  customElements.define("custom-activity", ActivityComponent);
}
