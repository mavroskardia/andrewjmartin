import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-graphing')
export class AjmGraphing extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>graphing?</h1>
        </header>
        <section slot="content">
          <p>
            graphing (an-ah-krahn-ist)
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-graphing': AjmGraphing
  }
}