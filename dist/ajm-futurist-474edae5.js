import { LitElement as n, html as o } from "lit";
import { customElement as p } from "lit/decorators.js";
var h = Object.defineProperty, i = Object.getOwnPropertyDescriptor, v = (f, r, s, t) => {
  for (var e = t > 1 ? void 0 : t ? i(r, s) : r, m = f.length - 1, u; m >= 0; m--)
    (u = f[m]) && (e = (t ? u(r, s, e) : u(e)) || e);
  return t && e && h(r, s, e), e;
};
let l = class extends n {
  render() {
    return o`
      <header>
        <h1>Futurist Andy</h1>
      </header>
    `;
  }
};
l = v([
  p("ajm-futurist")
], l);
export {
  l as AjmFuturist
};
