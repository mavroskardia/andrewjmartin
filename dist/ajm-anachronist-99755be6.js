import { s as p, x as c, e as f } from "./query-assigned-elements-94c95e81.js";
var v = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, l = (h, e, s, n) => {
  for (var r = n > 1 ? void 0 : n ? _(e, s) : e, t = h.length - 1, a; t >= 0; t--)
    (a = h[t]) && (r = (n ? a(e, s, r) : a(r)) || r);
  return n && r && v(e, s, r), r;
};
let o = class extends p {
  render() {
    return c`
      <header>
        <h1>Anachronist Andy</h1>
      </header>
    `;
  }
};
o = l([
  f("ajm-anachronist")
], o);
export {
  o as AjmAnachronist
};
