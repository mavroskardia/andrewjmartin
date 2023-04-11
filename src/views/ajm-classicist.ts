import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-classicist')
export class AjmClassicist extends LitElement {
  render() {
    return html`
      <header>
        <h1>Classicist Andy</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-classicist': AjmClassicist
  }
}