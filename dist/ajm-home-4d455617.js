import { i as m, s as h, x as p, e as f } from "./query-assigned-elements-94c95e81.js";
import { b as c, a as d } from "./app-shell-b8870c3f.js";
var g = Object.defineProperty, x = Object.getOwnPropertyDescriptor, u = (n, r, a, t) => {
  for (var e = t > 1 ? void 0 : t ? x(r, a) : r, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (e = (t ? o(r, a, e) : o(e)) || e);
  return t && e && g(r, a, e), e;
};
let l = class extends h {
  render() {
    return p`
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
  c,
  m`
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
l = u([
  f("intro-hero")
], l);
var v = Object.defineProperty, b = Object.getOwnPropertyDescriptor, _ = (n, r, a, t) => {
  for (var e = t > 1 ? void 0 : t ? b(r, a) : r, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (e = (t ? o(r, a, e) : o(e)) || e);
  return t && e && v(r, a, e), e;
};
let i = class extends h {
  render() {
    return p`
      <app-shell>
        <intro-hero class="fade-in-left" slot="content"></intro-hero>
      </app-shell>
    `;
  }
};
i.styles = [c, d];
i = _([
  f("ajm-home")
], i);
export {
  i as AjmHome
};
