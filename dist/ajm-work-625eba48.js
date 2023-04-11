import { LitElement as s, html as f } from "lit";
import { customElement as h } from "lit/decorators.js";
var v = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, a = (n, r, o, t) => {
  for (var e = t > 1 ? void 0 : t ? _(r, o) : r, m = n.length - 1, l; m >= 0; m--)
    (l = n[m]) && (e = (t ? l(r, o, e) : l(e)) || e);
  return t && e && v(r, o, e), e;
};
let p = class extends s {
  render() {
    return f`
      <header>
        <h1>Work Andy</h1>
      </header>
    `;
  }
};
p = a([
  h("ajm-work")
], p);
export {
  p as AjmWork
};
