import { LitElement as c, html as n } from "lit";
import { customElement as o } from "lit/decorators.js";
var p = Object.defineProperty, f = Object.getOwnPropertyDescriptor, h = (i, r, t, s) => {
  for (var e = s > 1 ? void 0 : s ? f(r, t) : r, l = i.length - 1, m; l >= 0; l--)
    (m = i[l]) && (e = (s ? m(r, t, e) : m(e)) || e);
  return s && e && p(r, t, e), e;
};
let a = class extends c {
  render() {
    return n`
      <header>
        <h1>Classicist Andy</h1>
      </header>
    `;
  }
};
a = h([
  o("ajm-classicist")
], a);
export {
  a as AjmClassicist
};
