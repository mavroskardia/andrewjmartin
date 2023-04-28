import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-cssjsfun')
export class AjmCssJsFun extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>cssjsfun?</h1>
        </header>
        <section slot="content">
          <p>
            cssjsfun
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-cssjsfun': AjmCssJsFun
  }
}