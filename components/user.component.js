class UserComponent extends HTMLElement {
  static get observedAttributes() {
    return ["active"];
  }

  constructor() {
    super();

    const style = document.createElement("style");
    const template = document.createElement("template");

    style.innerHTML = `
    :root {
      --color-white: #fff;
    
      --color-work: hsl(15, 100%, 70%);
      --color-play: hsl(195, 74%, 62%);
      --color-study: hsl(348, 100%, 68%);
      --color-exercise: hsl(145, 58%, 55%);
      --color-social: hsl(264, 64%, 52%);
      --color-selfcare: hsl(43, 84%, 65%);
    
      --color-blue--verydark: hsl(226, 43%, 10%);
      --color-blue--dark: hsl(235, 46%, 20%);
      --color-blue: hsl(246, 80%, 60%);
      --color-blue--desaturated: hsl(235, 45%, 61%);
      --color-blue--pale: hsl(236, 100%, 87%);
    
      --radius: 0.9375rem;
    
      --avatar-diameter: 4.375rem;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Rubik, serif;
      color: var(--color-white);
    }

    .user {
      display: grid;
      grid-template-rows: auto auto;
    }
    .user-info {
      background: var(--color-blue);
      border-radius: var(--radius);
      display: flex;
      padding: 2.125rem 2rem;
      gap: 1em;
      align-items: center;
      grid-row: 1/2;
      grid-column: 1 / 2;
      z-index: 10;
    }
    
    .user-info-avatar {
      height: var(--avatar-diameter);
      width: var(--avatar-diameter);
    }
    .user-timeframes {
      background: var(--color-blue--dark);
      border-radius: var(--radius);
      display: flex;
      justify-content: space-evenly;
      grid-row: 1/3;
      grid-column: 1 / 2;
      padding-bottom: 1.5rem;
      padding-top: calc(8.3125rem + 1.5rem);
    }

    .btn--text {
      background: none;
      border-radius:var(--radius);
      color: var(--color-blue--desaturated);
      cursor:pointer;
      padding:.5rem 1rem;
      transition:all 300ms ease;
    }
    .btn--text:hover {
      background: var(--color-blue);
      color: var(--color-blue-pale);
    }

    .text--title {
      color: var(--color-white);
      font-size: 1.5rem;
      font-weight: 300;
    }
    .text--legend {
      color: var(--color-blue--pale);
      font-size: 0.9375rem;
      font-weight: 300;
    }

    .active {
      color: var(--color-white);
    }
    `;

    template.innerHTML = `
      <div class="user">
        <div class="user-info">
          <img
            class="user-info-avatar"
            src="./images/image-jeremy.png"
            alt="Jeremy"
          />
          <div>
            <p class="text--legend">Report for</p>
            <h1 class="text--title">Jeremy Robson</h1>
          </div>
        </div>
        <div class="user-timeframes">
          <div id="daily" class="btn--text">Daily</div>
          <div id="weekly" class="btn--text">Weekly</div>
          <div id="monthly" class="btn--text">Monthly</div>
        </div>
      </div>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelectorAll(".btn--text").forEach((btn) => {
      btn.onclick = (event) => {
        this.dispatchEvent(new CustomEvent("button", { detail: btn.id }));
      };
    });
  }

  attributeChangedCallback(name, old, current) {
    old;

    if (name === "active") {
      setBtnActive(this, current);
    }
  }

  connectedCallback() {
    console.log("User Element created and to page.");
    // api stuff if necessary
  }
}

function setBtnActive(elem, activateBtn) {
  const buttons = elem.shadowRoot.querySelectorAll(".btn--text");

  buttons.forEach((btn) => {
    if (btn.id === activateBtn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

customElements.define("custom-user", UserComponent);
