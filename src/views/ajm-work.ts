import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ajm-work")
export class AjmWork extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>Work</h1>
        </header>
        <section slot="content">
          <p>Work</p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-work": AjmWork;
  }
}
