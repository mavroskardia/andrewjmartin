import { LitElement as o, html as f } from "lit";
import { customElement as v } from "lit/decorators.js";
var _ = Object.defineProperty, a = Object.getOwnPropertyDescriptor, c = (n, r, m, t) => {
  for (var e = t > 1 ? void 0 : t ? a(r, m) : r, p = n.length - 1, s; p >= 0; p--)
    (s = n[p]) && (e = (t ? s(r, m, e) : s(e)) || e);
  return t && e && _(r, m, e), e;
};
let l = class extends o {
  render() {
    return f`<span>404</span>`;
  }
};
l = c([
  v("ajm-404")
], l);
export {
  l as Ajm404
};
