import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./components/intro-hero";
import "./components/app-nav";
import "./components/app-footer";

@customElement("ajm-app")
export class AjmApp extends LitElement {
  render() {
    return html`
      <intro-hero></intro-hero>
      <app-nav></app-nav>
      <app-footer></app-footer>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    app-footer {
      position: fixed;
      bottom: 0;
      right: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-app": AjmApp;
  }
}
