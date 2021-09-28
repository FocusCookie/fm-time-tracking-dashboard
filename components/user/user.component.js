fetch("./components/user/user.component.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class UserComponent extends HTMLElement {
    static get observedAttributes() {
      return ["active"];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = html;

      this.shadowRoot.querySelectorAll(".btn--text").forEach((btn) => {
        btn.onclick = (event) => {
          this.dispatchEvent(new CustomEvent("button", { detail: btn.id }));
        };
      });
    }

    attributeChangedCallback(name, old, current) {
      if (name === "active") {
        setBtnActive(this, current);
      }
    }
  }

  customElements.define("custom-user", UserComponent);
}

function setBtnActive(elem, activateBtn) {
  if (!elem) throw new Error("User Component - setBtnActive elm is missing");

  const buttons = elem.shadowRoot.querySelectorAll(".btn--text");

  buttons.forEach((btn) => {
    if (btn.id === activateBtn) {
      btn.classList.add("btn-active");
    } else {
      btn.classList.remove("btn-active");
    }
  });
}
