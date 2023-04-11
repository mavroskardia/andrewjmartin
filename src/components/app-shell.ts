import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { animationStyles, baseStyles } from "../styles/base";
import "./app-nav";

@customElement("app-shell")
export class AppShell extends LitElement {
  render() {
    return html`
      <slot name="header"></slot>
      <div>
        <slot name="content"></slot>
        <app-nav class="fade-in-right"></app-nav>
      </div>
      <app-footer slot="footer"></app-footer>
    `;
  }

  static styles = [
    baseStyles,
    animationStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      slot[name="header"] {
        color: var(--text-color);
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      app-footer {
        position: fixed;
        bottom: 0;
        right: 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "app-shell": AppShell;
  }
}
