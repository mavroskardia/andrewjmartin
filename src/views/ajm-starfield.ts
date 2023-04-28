import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-starfield')
export class AjmStarfield extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>starfield?</h1>
        </header>
        <section slot="content">
          <p>
            starfield
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-starfield': AjmStarfield
  }
}