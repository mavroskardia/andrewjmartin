import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-futurist')
export class AjmFuturist extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>Futurist</h1>
        </header>
        <section slot="content">
          <p>
            Futurist
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-futurist': AjmFuturist
  }
}