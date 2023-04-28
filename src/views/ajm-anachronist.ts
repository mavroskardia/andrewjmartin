import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-anachronist')
export class AjmAnachronist extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>Anachronist?</h1>
        </header>
        <section slot="content">
          <p>
            Anachronist (an-ah-krahn-ist)
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-anachronist': AjmAnachronist
  }
}