import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../components/app-shell";
import "../components/intro-hero";
import { animationStyles, baseStyles } from "../styles/base";

@customElement("ajm-home")
export class AjmHome extends LitElement {
  render() {
    return html`
      <app-shell>
        <intro-hero class="fade-in-left" slot="content"></intro-hero>
      </app-shell>
    `;
  }

  static styles = [baseStyles, animationStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-home": AjmHome;
  }
}
