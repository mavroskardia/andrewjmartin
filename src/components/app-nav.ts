import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { baseStyles } from "../styles/base";

@customElement("app-nav")
export class AppNav extends LitElement {
  render() {
    return html`
      <nav>
        <a href="/about">About</a>
        <a href="/work">Work</a>
        <a href="/tinkerings">Tinkerings</a>
        <a href="/other">Other</a>
        <a href="/and">And</a>
      </nav>
    `;
  }

  static styles = [
    baseStyles,
    css`
      nav {
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        padding: 2rem;
      }
    `,
  ];
}
