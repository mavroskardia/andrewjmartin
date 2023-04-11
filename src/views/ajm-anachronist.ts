import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-anachronist')
export class AjmAnachronist extends LitElement {
  render() {
    return html`
      <header>
        <h1>Anachronist Andy</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-anachronist': AjmAnachronist
  }
}