import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-lsystems')
export class AjmLSystems extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>lsystems?</h1>
        </header>
        <section slot="content">
          <p>
            lsystems (an-ah-krahn-ist)
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-lsystems': AjmLSystems
  }
}