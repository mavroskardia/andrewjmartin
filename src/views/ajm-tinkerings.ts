import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-tinkerings')
export class AjmTinkerings extends LitElement {
  render() {
    return html`
      <header>
        <h1>Tinkerings Andy</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-tinkerings': AjmTinkerings
  }
}