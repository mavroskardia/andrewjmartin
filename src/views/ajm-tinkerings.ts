import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { animationStyles, baseStyles } from "../styles/base";

@customElement("ajm-tinkerings")
export class AjmTinkerings extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>Tinkerings</h1>
        </header>
        <section slot="content">
          <ul>
            <li><a href="/lsystem">L-Systems</a></li>
            <li><a href="/starfield">Starfield</a></li>
            <li><a href="/games">Games</a></li>
            <li><a href="/graphing">Graphing</a></li>
            <li><a href="/cssfun">Fun with CSS & JS</a></li>
          </ul>
        </section>
      </app-shell>
    `;
  }

  static styles = [baseStyles, animationStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-tinkerings": AjmTinkerings;
  }
}
