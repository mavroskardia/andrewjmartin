import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-technologist')
export class AjmTechnologist extends LitElement {
  render() {
    return html`
      <header>
        <h1>Technologist Andy</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-technologist': AjmTechnologist
  }
}