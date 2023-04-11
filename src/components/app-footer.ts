import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { baseStyles } from "../styles/base";

@customElement("app-footer")
export class AppFooter extends LitElement {
  render() {
    return html` <footer>&copy;2023</footer> `;
  }

  static styles = [
    baseStyles,
    css`
      footer {
        color: #666;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "app-footer": AppFooter;
  }
}
