import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-work')
export class AjmWork extends LitElement {
  render() {
    return html`
      <header>
        <h1>Work Andy</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-work': AjmWork
  }
}