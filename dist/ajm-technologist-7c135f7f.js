import { LitElement as h, html as p } from "lit";
import { customElement as c } from "lit/decorators.js";
var f = Object.defineProperty, i = Object.getOwnPropertyDescriptor, v = (s, r, o, t) => {
  for (var e = t > 1 ? void 0 : t ? i(r, o) : r, l = s.length - 1, n; l >= 0; l--)
    (n = s[l]) && (e = (t ? n(r, o, e) : n(e)) || e);
  return t && e && f(r, o, e), e;
};
let m = class extends h {
  render() {
    return p`
      <header>
        <h1>Technologist Andy</h1>
      </header>
    `;
  }
};
m = v([
  c("ajm-technologist")
], m);
export {
  m as AjmTechnologist
};
