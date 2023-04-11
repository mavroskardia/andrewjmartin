import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-futurist')
export class AjmFuturist extends LitElement {
  render() {
    return html`
      <header>
        <h1>Futurist Andy</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-futurist': AjmFuturist
  }
}