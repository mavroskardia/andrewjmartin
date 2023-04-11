import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ajm-about")
export class AjmAbout extends LitElement {
  render() {
    return html`
      <header>
        <h1>About Andy</h1>
      </header>
      <ol>
        <li>
          <h2>Who</h2>
        </li>
        <li>
          <h2>What</h2>
        </li>
        <li>
          <h2>Where</h2>
        </li>
        <li>
          <h2>When</h2>
        </li>
        <li>
          <h2>Why</h2>
        </li>
      </ol>
    `;
  }

  static styles = css`
    ol {
      list-style: upper-roman;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-about": AjmAbout;
  }
}
