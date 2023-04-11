import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";


@customElement('ajm-404')
export class Ajm404 extends LitElement {
  render() {
    return html`<span>404</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-404": Ajm404;
  }
}
