import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-classicist')
export class AjmClassicist extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>Classicist</h1>
        </header>
        <section slot="content">
          <p>
            Classicist (an-ah-krahn-ist)
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-classicist': AjmClassicist
  }
}