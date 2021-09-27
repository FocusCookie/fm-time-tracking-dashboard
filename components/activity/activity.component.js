fetch("/components/activity/activity.component.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class ActivityComponent extends HTMLElement {
    constructor() {
      super();

      this._timeframes;

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

    set timeframes(timeframes) {
      this._timeframes = timeframes;

      //TODO: refactor this . function which takes and element by id and updates innerHtml

      const current = this.shadowRoot.getElementById("current");
      const last = this.shadowRoot.getElementById("last");

      current.innerHTML = `${timeframes.current}hrs`;
      last.innerHTML = `Last Week - ${timeframes.previous}hrs`;
    }
    get timeframes() {
      return this._timeframes;
    }
  }

  customElements.define("custom-activity", ActivityComponent);
}
