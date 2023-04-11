import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-about')
export class AjmAbout extends LitElement {
  render() {
    return html`
      <header>
        <h1>About Andy</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-about': AjmAbout
  }
}