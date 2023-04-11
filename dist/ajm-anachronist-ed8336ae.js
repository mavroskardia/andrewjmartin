import { LitElement as h, html as l } from "lit";
import { customElement as p } from "lit/decorators.js";
var c = Object.defineProperty, f = Object.getOwnPropertyDescriptor, i = (m, r, n, t) => {
  for (var e = t > 1 ? void 0 : t ? f(r, n) : r, o = m.length - 1, s; o >= 0; o--)
    (s = m[o]) && (e = (t ? s(r, n, e) : s(e)) || e);
  return t && e && c(r, n, e), e;
};
let a = class extends h {
  render() {
    return l`
      <header>
        <h1>Anachronist Andy</h1>
      </header>
    `;
  }
};
a = i([
  p("ajm-anachronist")
], a);
export {
  a as AjmAnachronist
};
