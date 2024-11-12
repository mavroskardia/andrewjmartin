import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-technologist')
export class AjmTechnologist extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>Technologist</h1>
        </header>
        <section slot="content">
          <p>
            Technologist
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-technologist': AjmTechnologist
  }
}