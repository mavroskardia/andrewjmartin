import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ajm-games')
export class AjmGames extends LitElement {
  render() {
    return html`
      <app-shell>
        <header slot="header">
          <h1>games?</h1>
        </header>
        <section slot="content">
          <p>
            games (an-ah-krahn-ist)
          </p>
        </section>
      </app-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ajm-games': AjmGames
  }
}