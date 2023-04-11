import { css as c, LitElement as h, html as m } from "lit";
import { customElement as p } from "lit/decorators.js";
import { b as f, a as d } from "./app-shell-1c34f911.js";
var g = Object.defineProperty, u = Object.getOwnPropertyDescriptor, v = (n, r, s, t) => {
  for (var e = t > 1 ? void 0 : t ? u(r, s) : r, a = n.length - 1, o; a >= 0; a--)
    (o = n[a]) && (e = (t ? o(r, s, e) : o(e)) || e);
  return t && e && g(r, s, e), e;
};
let l = class extends h {
  render() {
    return m`
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
};
l.styles = [
  f,
  c`
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
        display: block;
        margin-top: -1rem;
        margin-left: 2rem;
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.5);
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `
];
l = v([
  p("intro-hero")
], l);
var x = Object.defineProperty, b = Object.getOwnPropertyDescriptor, _ = (n, r, s, t) => {
  for (var e = t > 1 ? void 0 : t ? b(r, s) : r, a = n.length - 1, o; a >= 0; a--)
    (o = n[a]) && (e = (t ? o(r, s, e) : o(e)) || e);
  return t && e && x(r, s, e), e;
};
let i = class extends h {
  render() {
    return m`
      <app-shell>
        <intro-hero class="fade-in-left" slot="content"></intro-hero>
      </app-shell>
    `;
  }
};
i.styles = [f, d];
i = _([
  p("ajm-home")
], i);
export {
  i as AjmHome
};
