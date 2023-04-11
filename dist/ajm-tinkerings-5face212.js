import { LitElement as o, html as p } from "lit";
import { customElement as f } from "lit/decorators.js";
var h = Object.defineProperty, v = Object.getOwnPropertyDescriptor, _ = (i, r, t, n) => {
  for (var e = n > 1 ? void 0 : n ? v(r, t) : r, s = i.length - 1, m; s >= 0; s--)
    (m = i[s]) && (e = (n ? m(r, t, e) : m(e)) || e);
  return n && e && h(r, t, e), e;
};
let l = class extends o {
  render() {
    return p`
      <header>
        <h1>Tinkerings Andy</h1>
      </header>
    `;
  }
};
l = _([
  f("ajm-tinkerings")
], l);
export {
  l as AjmTinkerings
};
