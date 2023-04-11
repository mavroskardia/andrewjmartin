import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { baseStyles } from "../styles/base";

@customElement("intro-hero")
export class IntroHero extends LitElement {
  render() {
    return html`
      <header>
        <h1>Andy Martin</h1>
        <small>
          <a href="/technologist">Technologist</a>,
          <a href="/classicist">Classicist</a>,
          <a href="/futurist">Futurist</a>,
          <a href="/anachronist">Anachronist?</a>
        </small>
      </header>
      <img src="/rocks.jpg" height="800" alt="Andy with daughter in Joshua Tree on rock formation" />
    `;
  }

  static styles = [
    baseStyles,
    css`
      img {
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.25),
          0 0 20px 5px rgba(0, 0, 0, 0.25);
      }

      header {
        font-weight: 900;
        font-size: 2rem;
        text-shadow: 0 5px 10px rgba(0, 0, 0, 0.75);
      }

      header small {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.5);
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "intro-hero": IntroHero;
  }
}
