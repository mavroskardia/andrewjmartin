import { css as O, LitElement as p, html as _ } from "lit";
import { customElement as m } from "lit/decorators.js";
(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
    o(n);
  new MutationObserver((n) => {
    for (const i of n)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && o(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(n) {
    const i = {};
    return n.integrity && (i.integrity = n.integrity), n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? i.credentials = "include" : n.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function o(n) {
    if (n.ep)
      return;
    n.ep = !0;
    const i = t(n);
    fetch(n.href, i);
  }
})();
function I(r) {
  return r = r || [], Array.isArray(r) ? r : [r];
}
function b(r) {
  return `[Vaadin.Router] ${r}`;
}
function Ne(r) {
  if (typeof r != "object")
    return String(r);
  const e = Object.prototype.toString.call(r).match(/ (.*)\]$/)[1];
  return e === "Object" || e === "Array" ? `${e} ${JSON.stringify(r)}` : e;
}
const M = "module", F = "nomodule", S = [M, F];
function Y(r) {
  if (!r.match(/.+\.[m]?js$/))
    throw new Error(
      b(`Unsupported type for bundle "${r}": .js or .mjs expected.`)
    );
}
function be(r) {
  if (!r || !v(r.path))
    throw new Error(
      b('Expected route config to be an object with a "path" string property, or an array of such objects')
    );
  const e = r.bundle, t = ["component", "redirect", "bundle"];
  if (!E(r.action) && !Array.isArray(r.children) && !E(r.children) && !U(e) && !t.some((o) => v(r[o])))
    throw new Error(
      b(
        `Expected route config "${r.path}" to include either "${t.join('", "')}" or "action" function but none found.`
      )
    );
  if (e)
    if (v(e))
      Y(e);
    else if (S.some((o) => o in e))
      S.forEach((o) => o in e && Y(e[o]));
    else
      throw new Error(
        b('Expected route bundle to include either "' + F + '" or "' + M + '" keys, or both')
      );
  r.redirect && ["bundle", "component"].forEach((o) => {
    o in r && console.warn(
      b(
        `Route config "${r.path}" has both "redirect" and "${o}" properties, and "redirect" will always override the latter. Did you mean to only use "${o}"?`
      )
    );
  });
}
function Z(r) {
  I(r).forEach((e) => be(e));
}
function k(r, e) {
  let t = document.head.querySelector('script[src="' + r + '"][async]');
  return t || (t = document.createElement("script"), t.setAttribute("src", r), e === M ? t.setAttribute("type", M) : e === F && t.setAttribute(F, ""), t.async = !0), new Promise((o, n) => {
    t.onreadystatechange = t.onload = (i) => {
      t.__dynamicImportLoaded = !0, o(i);
    }, t.onerror = (i) => {
      t.parentNode && t.parentNode.removeChild(t), n(i);
    }, t.parentNode === null ? document.head.appendChild(t) : t.__dynamicImportLoaded && o();
  });
}
function Be(r) {
  return v(r) ? k(r) : Promise.race(
    S.filter((e) => e in r).map((e) => k(r[e], e))
  );
}
function R(r, e) {
  return !window.dispatchEvent(new CustomEvent(
    `vaadin-router-${r}`,
    { cancelable: r === "go", detail: e }
  ));
}
function U(r) {
  return typeof r == "object" && !!r;
}
function E(r) {
  return typeof r == "function";
}
function v(r) {
  return typeof r == "string";
}
function we(r) {
  const e = new Error(b(`Page not found (${r.pathname})`));
  return e.context = r, e.code = 404, e;
}
const P = new class {
}();
function Se(r) {
  const e = r.port, t = r.protocol, i = t === "http:" && e === "80" || t === "https:" && e === "443" ? r.hostname : r.host;
  return `${t}//${i}`;
}
function ee(r) {
  if (r.defaultPrevented || r.button !== 0 || r.shiftKey || r.ctrlKey || r.altKey || r.metaKey)
    return;
  let e = r.target;
  const t = r.composedPath ? r.composedPath() : r.path || [];
  for (let c = 0; c < t.length; c++) {
    const s = t[c];
    if (s.nodeName && s.nodeName.toLowerCase() === "a") {
      e = s;
      break;
    }
  }
  for (; e && e.nodeName.toLowerCase() !== "a"; )
    e = e.parentNode;
  if (!e || e.nodeName.toLowerCase() !== "a" || e.target && e.target.toLowerCase() !== "_self" || e.hasAttribute("download") || e.hasAttribute("router-ignore") || e.pathname === window.location.pathname && e.hash !== "" || (e.origin || Se(e)) !== window.location.origin)
    return;
  const { pathname: n, search: i, hash: a } = e;
  R("go", { pathname: n, search: i, hash: a }) && (r.preventDefault(), r && r.type === "click" && window.scrollTo(0, 0));
}
const He = {
  activate() {
    window.document.addEventListener("click", ee);
  },
  inactivate() {
    window.document.removeEventListener("click", ee);
  }
}, Ve = /Trident/.test(navigator.userAgent);
Ve && !E(window.PopStateEvent) && (window.PopStateEvent = function(r, e) {
  e = e || {};
  var t = document.createEvent("Event");
  return t.initEvent(r, !!e.bubbles, !!e.cancelable), t.state = e.state || null, t;
}, window.PopStateEvent.prototype = window.Event.prototype);
function te(r) {
  if (r.state === "vaadin-router-ignore")
    return;
  const { pathname: e, search: t, hash: o } = window.location;
  R("go", { pathname: e, search: t, hash: o });
}
const xe = {
  activate() {
    window.addEventListener("popstate", te);
  },
  inactivate() {
    window.removeEventListener("popstate", te);
  }
};
var A = Re, We = q, ze = Xe, Ke = Pe, qe = Ae, ye = "/", Ee = "./", Ge = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  "(\\\\.)",
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"
].join("|"), "g");
function q(r, e) {
  for (var t = [], o = 0, n = 0, i = "", a = e && e.delimiter || ye, c = e && e.delimiters || Ee, s = !1, l; (l = Ge.exec(r)) !== null; ) {
    var u = l[0], f = l[1], h = l.index;
    if (i += r.slice(n, h), n = h + u.length, f) {
      i += f[1], s = !0;
      continue;
    }
    var d = "", X = r[n], Te = l[2], De = l[3], Ie = l[4], $ = l[5];
    if (!s && i.length) {
      var N = i.length - 1;
      c.indexOf(i[N]) > -1 && (d = i[N], i = i.slice(0, N));
    }
    i && (t.push(i), i = "", s = !1);
    var Me = d !== "" && X !== void 0 && X !== d, Fe = $ === "+" || $ === "*", Ue = $ === "?" || $ === "*", J = d || a, Q = De || Ie;
    t.push({
      name: Te || o++,
      prefix: d,
      delimiter: J,
      optional: Ue,
      repeat: Fe,
      partial: Me,
      pattern: Q ? Je(Q) : "[^" + w(J) + "]+?"
    });
  }
  return (i || n < r.length) && t.push(i + r.substr(n)), t;
}
function Xe(r, e) {
  return Pe(q(r, e));
}
function Pe(r) {
  for (var e = new Array(r.length), t = 0; t < r.length; t++)
    typeof r[t] == "object" && (e[t] = new RegExp("^(?:" + r[t].pattern + ")$"));
  return function(o, n) {
    for (var i = "", a = n && n.encode || encodeURIComponent, c = 0; c < r.length; c++) {
      var s = r[c];
      if (typeof s == "string") {
        i += s;
        continue;
      }
      var l = o ? o[s.name] : void 0, u;
      if (Array.isArray(l)) {
        if (!s.repeat)
          throw new TypeError('Expected "' + s.name + '" to not repeat, but got array');
        if (l.length === 0) {
          if (s.optional)
            continue;
          throw new TypeError('Expected "' + s.name + '" to not be empty');
        }
        for (var f = 0; f < l.length; f++) {
          if (u = a(l[f], s), !e[c].test(u))
            throw new TypeError('Expected all "' + s.name + '" to match "' + s.pattern + '"');
          i += (f === 0 ? s.prefix : s.delimiter) + u;
        }
        continue;
      }
      if (typeof l == "string" || typeof l == "number" || typeof l == "boolean") {
        if (u = a(String(l), s), !e[c].test(u))
          throw new TypeError('Expected "' + s.name + '" to match "' + s.pattern + '", but got "' + u + '"');
        i += s.prefix + u;
        continue;
      }
      if (s.optional) {
        s.partial && (i += s.prefix);
        continue;
      }
      throw new TypeError('Expected "' + s.name + '" to be ' + (s.repeat ? "an array" : "a string"));
    }
    return i;
  };
}
function w(r) {
  return r.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Je(r) {
  return r.replace(/([=!:$/()])/g, "\\$1");
}
function Oe(r) {
  return r && r.sensitive ? "" : "i";
}
function Qe(r, e) {
  if (!e)
    return r;
  var t = r.source.match(/\((?!\?)/g);
  if (t)
    for (var o = 0; o < t.length; o++)
      e.push({
        name: o,
        prefix: null,
        delimiter: null,
        optional: !1,
        repeat: !1,
        partial: !1,
        pattern: null
      });
  return r;
}
function Ye(r, e, t) {
  for (var o = [], n = 0; n < r.length; n++)
    o.push(Re(r[n], e, t).source);
  return new RegExp("(?:" + o.join("|") + ")", Oe(t));
}
function Ze(r, e, t) {
  return Ae(q(r, t), e, t);
}
function Ae(r, e, t) {
  t = t || {};
  for (var o = t.strict, n = t.start !== !1, i = t.end !== !1, a = w(t.delimiter || ye), c = t.delimiters || Ee, s = [].concat(t.endsWith || []).map(w).concat("$").join("|"), l = n ? "^" : "", u = r.length === 0, f = 0; f < r.length; f++) {
    var h = r[f];
    if (typeof h == "string")
      l += w(h), u = f === r.length - 1 && c.indexOf(h[h.length - 1]) > -1;
    else {
      var d = h.repeat ? "(?:" + h.pattern + ")(?:" + w(h.delimiter) + "(?:" + h.pattern + "))*" : h.pattern;
      e && e.push(h), h.optional ? h.partial ? l += w(h.prefix) + "(" + d + ")?" : l += "(?:" + w(h.prefix) + "(" + d + "))?" : l += w(h.prefix) + "(" + d + ")";
    }
  }
  return i ? (o || (l += "(?:" + a + ")?"), l += s === "$" ? "$" : "(?=" + s + ")") : (o || (l += "(?:" + a + "(?=" + s + "))?"), u || (l += "(?=" + a + "|" + s + ")")), new RegExp(l, Oe(t));
}
function Re(r, e, t) {
  return r instanceof RegExp ? Qe(r, e) : Array.isArray(r) ? Ye(
    /** @type {!Array} */
    r,
    e,
    t
  ) : Ze(
    /** @type {string} */
    r,
    e,
    t
  );
}
A.parse = We;
A.compile = ze;
A.tokensToFunction = Ke;
A.tokensToRegExp = qe;
const { hasOwnProperty: ke } = Object.prototype, H = /* @__PURE__ */ new Map();
H.set("|false", {
  keys: [],
  pattern: /(?:)/
});
function re(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    return r;
  }
}
function et(r, e, t, o, n) {
  t = !!t;
  const i = `${r}|${t}`;
  let a = H.get(i);
  if (!a) {
    const l = [];
    a = {
      keys: l,
      pattern: A(r, l, {
        end: t,
        strict: r === ""
      })
    }, H.set(i, a);
  }
  const c = a.pattern.exec(e);
  if (!c)
    return null;
  const s = Object.assign({}, n);
  for (let l = 1; l < c.length; l++) {
    const u = a.keys[l - 1], f = u.name, h = c[l];
    (h !== void 0 || !ke.call(s, f)) && (u.repeat ? s[f] = h ? h.split(u.delimiter).map(re) : [] : s[f] = h && re(h));
  }
  return {
    path: c[0],
    keys: (o || []).concat(a.keys),
    params: s
  };
}
function je(r, e, t, o, n) {
  let i, a, c = 0, s = r.path || "";
  return s.charAt(0) === "/" && (t && (s = s.substr(1)), t = !0), {
    next(l) {
      if (r === l)
        return { done: !0 };
      const u = r.__children = r.__children || r.children;
      if (!i && (i = et(s, e, !u, o, n), i))
        return {
          done: !1,
          value: {
            route: r,
            keys: i.keys,
            params: i.params,
            path: i.path
          }
        };
      if (i && u)
        for (; c < u.length; ) {
          if (!a) {
            const h = u[c];
            h.parent = r;
            let d = i.path.length;
            d > 0 && e.charAt(d) === "/" && (d += 1), a = je(
              h,
              e.substr(d),
              t,
              i.keys,
              i.params
            );
          }
          const f = a.next(l);
          if (!f.done)
            return {
              done: !1,
              value: f.value
            };
          a = null, c++;
        }
      return { done: !0 };
    }
  };
}
function tt(r) {
  if (E(r.route.action))
    return r.route.action(r);
}
function rt(r, e) {
  let t = e;
  for (; t; )
    if (t = t.parent, t === r)
      return !0;
  return !1;
}
function nt(r) {
  let e = `Path '${r.pathname}' is not properly resolved due to an error.`;
  const t = (r.route || {}).path;
  return t && (e += ` Resolution had failed on route: '${t}'`), e;
}
function it(r, e) {
  const { route: t, path: o } = e;
  if (t && !t.__synthetic) {
    const n = { path: o, route: t };
    if (!r.chain)
      r.chain = [];
    else if (t.parent) {
      let i = r.chain.length;
      for (; i-- && r.chain[i].route && r.chain[i].route !== t.parent; )
        r.chain.pop();
    }
    r.chain.push(n);
  }
}
class j {
  constructor(e, t = {}) {
    if (Object(e) !== e)
      throw new TypeError("Invalid routes");
    this.baseUrl = t.baseUrl || "", this.errorHandler = t.errorHandler, this.resolveRoute = t.resolveRoute || tt, this.context = Object.assign({ resolver: this }, t.context), this.root = Array.isArray(e) ? { path: "", __children: e, parent: null, __synthetic: !0 } : e, this.root.parent = null;
  }
  /**
   * Returns the current list of routes (as a shallow copy). Adding / removing
   * routes to / from the returned array does not affect the routing config,
   * but modifying the route objects does.
   *
   * @return {!Array<!Router.Route>}
   */
  getRoutes() {
    return [...this.root.__children];
  }
  /**
   * Sets the routing config (replacing the existing one).
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   */
  setRoutes(e) {
    Z(e);
    const t = [...I(e)];
    this.root.__children = t;
  }
  /**
   * Appends one or several routes to the routing config and returns the
   * effective routing config after the operation.
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   * @return {!Array<!Router.Route>}
   * @protected
   */
  addRoutes(e) {
    return Z(e), this.root.__children.push(...I(e)), this.getRoutes();
  }
  /**
   * Removes all existing routes from the routing config.
   */
  removeRoutes() {
    this.setRoutes([]);
  }
  /**
   * Asynchronously resolves the given pathname, i.e. finds all routes matching
   * the pathname and tries resolving them one after another in the order they
   * are listed in the routes config until the first non-null result.
   *
   * Returns a promise that is fulfilled with the return value of an object that consists of the first
   * route handler result that returns something other than `null` or `undefined` and context used to get this result.
   *
   * If no route handlers return a non-null result, or if no route matches the
   * given pathname the returned promise is rejected with a 'page not found'
   * `Error`.
   *
   * @param {!string|!{pathname: !string}} pathnameOrContext the pathname to
   *    resolve or a context object with a `pathname` property and other
   *    properties to pass to the route resolver functions.
   * @return {!Promise<any>}
   */
  resolve(e) {
    const t = Object.assign(
      {},
      this.context,
      v(e) ? { pathname: e } : e
    ), o = je(
      this.root,
      this.__normalizePathname(t.pathname),
      this.baseUrl
    ), n = this.resolveRoute;
    let i = null, a = null, c = t;
    function s(l, u = i.value.route, f) {
      const h = f === null && i.value.route;
      return i = a || o.next(h), a = null, !l && (i.done || !rt(u, i.value.route)) ? (a = i, Promise.resolve(P)) : i.done ? Promise.reject(we(t)) : (c = Object.assign(
        c ? { chain: c.chain ? c.chain.slice(0) : [] } : {},
        t,
        i.value
      ), it(c, i.value), Promise.resolve(n(c)).then((d) => d != null && d !== P ? (c.result = d.result || d, c) : s(l, u, d)));
    }
    return t.next = s, Promise.resolve().then(() => s(!0, this.root)).catch((l) => {
      const u = nt(c);
      if (l ? console.warn(u) : l = new Error(u), l.context = l.context || c, l instanceof DOMException || (l.code = l.code || 500), this.errorHandler)
        return c.result = this.errorHandler(l), c;
      throw l;
    });
  }
  /**
   * URL constructor polyfill hook. Creates and returns an URL instance.
   */
  static __createUrl(e, t) {
    return new URL(e, t);
  }
  /**
   * If the baseUrl property is set, transforms the baseUrl and returns the full
   * actual `base` string for using in the `new URL(path, base);` and for
   * prepernding the paths with. The returned base ends with a trailing slash.
   *
   * Otherwise, returns empty string.
   */
  get __effectiveBaseUrl() {
    return this.baseUrl ? this.constructor.__createUrl(
      this.baseUrl,
      document.baseURI || document.URL
    ).href.replace(/[^\/]*$/, "") : "";
  }
  /**
   * If the baseUrl is set, matches the pathname with the router’s baseUrl,
   * and returns the local pathname with the baseUrl stripped out.
   *
   * If the pathname does not match the baseUrl, returns undefined.
   *
   * If the `baseUrl` is not set, returns the unmodified pathname argument.
   */
  __normalizePathname(e) {
    if (!this.baseUrl)
      return e;
    const t = this.__effectiveBaseUrl, o = this.constructor.__createUrl(e, t).href;
    if (o.slice(0, t.length) === t)
      return o.slice(t.length);
  }
}
j.pathToRegexp = A;
const { pathToRegexp: ne } = j, ie = /* @__PURE__ */ new Map();
function $e(r, e, t) {
  const o = e.name || e.component;
  if (o && (r.has(o) ? r.get(o).push(e) : r.set(o, [e])), Array.isArray(t))
    for (let n = 0; n < t.length; n++) {
      const i = t[n];
      i.parent = e, $e(r, i, i.__children || i.children);
    }
}
function oe(r, e) {
  const t = r.get(e);
  if (t && t.length > 1)
    throw new Error(
      `Duplicate route with name "${e}". Try seting unique 'name' route properties.`
    );
  return t && t[0];
}
function ae(r) {
  let e = r.path;
  return e = Array.isArray(e) ? e[0] : e, e !== void 0 ? e : "";
}
function ot(r, e = {}) {
  if (!(r instanceof j))
    throw new TypeError("An instance of Resolver is expected");
  const t = /* @__PURE__ */ new Map();
  return (o, n) => {
    let i = oe(t, o);
    if (!i && (t.clear(), $e(t, r.root, r.root.__children), i = oe(t, o), !i))
      throw new Error(`Route "${o}" not found`);
    let a = ie.get(i.fullPath);
    if (!a) {
      let s = ae(i), l = i.parent;
      for (; l; ) {
        const d = ae(l);
        d && (s = d.replace(/\/$/, "") + "/" + s.replace(/^\//, "")), l = l.parent;
      }
      const u = ne.parse(s), f = ne.tokensToFunction(u), h = /* @__PURE__ */ Object.create(null);
      for (let d = 0; d < u.length; d++)
        v(u[d]) || (h[u[d].name] = !0);
      a = { toPath: f, keys: h }, ie.set(s, a), i.fullPath = s;
    }
    let c = a.toPath(n, e) || "/";
    if (e.stringifyQueryParams && n) {
      const s = {}, l = Object.keys(n);
      for (let f = 0; f < l.length; f++) {
        const h = l[f];
        a.keys[h] || (s[h] = n[h]);
      }
      const u = e.stringifyQueryParams(s);
      u && (c += u.charAt(0) === "?" ? u : `?${u}`);
    }
    return c;
  };
}
let se = [];
function at(r) {
  se.forEach((e) => e.inactivate()), r.forEach((e) => e.activate()), se = r;
}
const st = (r) => {
  const e = getComputedStyle(r).getPropertyValue("animation-name");
  return e && e !== "none";
}, lt = (r, e) => {
  const t = () => {
    r.removeEventListener("animationend", t), e();
  };
  r.addEventListener("animationend", t);
};
function le(r, e) {
  return r.classList.add(e), new Promise((t) => {
    if (st(r)) {
      const o = r.getBoundingClientRect(), n = `height: ${o.bottom - o.top}px; width: ${o.right - o.left}px`;
      r.setAttribute("style", `position: absolute; ${n}`), lt(r, () => {
        r.classList.remove(e), r.removeAttribute("style"), t();
      });
    } else
      r.classList.remove(e), t();
  });
}
const ct = 256;
function B(r) {
  return r != null;
}
function ht(r) {
  const e = Object.assign({}, r);
  return delete e.next, e;
}
function g({ pathname: r = "", search: e = "", hash: t = "", chain: o = [], params: n = {}, redirectFrom: i, resolver: a }, c) {
  const s = o.map((l) => l.route);
  return {
    baseUrl: a && a.baseUrl || "",
    pathname: r,
    search: e,
    hash: t,
    routes: s,
    route: c || s.length && s[s.length - 1] || null,
    params: n,
    redirectFrom: i,
    getUrl: (l = {}) => T(
      y.pathToRegexp.compile(
        Ce(s)
      )(Object.assign({}, n, l)),
      a
    )
  };
}
function ce(r, e) {
  const t = Object.assign({}, r.params);
  return {
    redirect: {
      pathname: e,
      from: r.pathname,
      params: t
    }
  };
}
function ut(r, e) {
  e.location = g(r);
  const t = r.chain.map((o) => o.route).indexOf(r.route);
  return r.chain[t].element = e, e;
}
function L(r, e, t) {
  if (E(r))
    return r.apply(t, e);
}
function he(r, e, t) {
  return (o) => {
    if (o && (o.cancel || o.redirect))
      return o;
    if (t)
      return L(t[r], e, t);
  };
}
function ft(r, e) {
  if (!Array.isArray(r) && !U(r))
    throw new Error(
      b(
        `Incorrect "children" value for the route ${e.path}: expected array or object, but got ${r}`
      )
    );
  e.__children = [];
  const t = I(r);
  for (let o = 0; o < t.length; o++)
    be(t[o]), e.__children.push(t[o]);
}
function C(r) {
  if (r && r.length) {
    const e = r[0].parentNode;
    for (let t = 0; t < r.length; t++)
      e.removeChild(r[t]);
  }
}
function T(r, e) {
  const t = e.__effectiveBaseUrl;
  return t ? e.constructor.__createUrl(r.replace(/^\//, ""), t).pathname : r;
}
function Ce(r) {
  return r.map((e) => e.path).reduce((e, t) => t.length ? e.replace(/\/$/, "") + "/" + t.replace(/^\//, "") : e, "");
}
class y extends j {
  /**
   * Creates a new Router instance with a given outlet, and
   * automatically subscribes it to navigation events on the `window`.
   * Using a constructor argument or a setter for outlet is equivalent:
   *
   * ```
   * const router = new Router();
   * router.setOutlet(outlet);
   * ```
   * @param {?Node=} outlet
   * @param {?RouterOptions=} options
   */
  constructor(e, t) {
    const o = document.head.querySelector("base"), n = o && o.getAttribute("href");
    super([], Object.assign({
      // Default options
      baseUrl: n && j.__createUrl(n, document.URL).pathname.replace(/[^\/]*$/, "")
    }, t)), this.resolveRoute = (a) => this.__resolveRoute(a);
    const i = y.NavigationTrigger;
    y.setTriggers.apply(y, Object.keys(i).map((a) => i[a])), this.baseUrl, this.ready, this.ready = Promise.resolve(e), this.location, this.location = g({ resolver: this }), this.__lastStartedRenderId = 0, this.__navigationEventHandler = this.__onNavigationEvent.bind(this), this.setOutlet(e), this.subscribe(), this.__createdByRouter = /* @__PURE__ */ new WeakMap(), this.__addedByRouter = /* @__PURE__ */ new WeakMap();
  }
  __resolveRoute(e) {
    const t = e.route;
    let o = Promise.resolve();
    E(t.children) && (o = o.then(() => t.children(ht(e))).then((i) => {
      !B(i) && !E(t.children) && (i = t.children), ft(i, t);
    }));
    const n = {
      redirect: (i) => ce(e, i),
      component: (i) => {
        const a = document.createElement(i);
        return this.__createdByRouter.set(a, !0), a;
      }
    };
    return o.then(() => {
      if (this.__isLatestRender(e))
        return L(t.action, [e, n], t);
    }).then((i) => {
      if (B(i) && (i instanceof HTMLElement || i.redirect || i === P))
        return i;
      if (v(t.redirect))
        return n.redirect(t.redirect);
      if (t.bundle)
        return Be(t.bundle).then(() => {
        }, () => {
          throw new Error(b(`Bundle not found: ${t.bundle}. Check if the file name is correct`));
        });
    }).then((i) => {
      if (B(i))
        return i;
      if (v(t.component))
        return n.component(t.component);
    });
  }
  /**
   * Sets the router outlet (the DOM node where the content for the current
   * route is inserted). Any content pre-existing in the router outlet is
   * removed at the end of each render pass.
   *
   * NOTE: this method is automatically invoked first time when creating a new Router instance.
   *
   * @param {?Node} outlet the DOM node where the content for the current route
   *     is inserted.
   */
  setOutlet(e) {
    e && this.__ensureOutlet(e), this.__outlet = e;
  }
  /**
   * Returns the current router outlet. The initial value is `undefined`.
   *
   * @return {?Node} the current router outlet (or `undefined`)
   */
  getOutlet() {
    return this.__outlet;
  }
  /**
   * Sets the routing config (replacing the existing one) and triggers a
   * navigation event so that the router outlet is refreshed according to the
   * current `window.location` and the new routing config.
   *
   * Each route object may have the following properties, listed here in the processing order:
   * * `path` – the route path (relative to the parent route if any) in the
   * [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   *
   * * `children` – an array of nested routes or a function that provides this
   * array at the render time. The function can be synchronous or asynchronous:
   * in the latter case the render is delayed until the returned promise is
   * resolved. The `children` function is executed every time when this route is
   * being rendered. This allows for dynamic route structures (e.g. backend-defined),
   * but it might have a performance impact as well. In order to avoid calling
   * the function on subsequent renders, you can override the `children` property
   * of the route object and save the calculated array there
   * (via `context.route.children = [ route1, route2, ...];`).
   * Parent routes are fully resolved before resolving the children. Children
   * 'path' values are relative to the parent ones.
   *
   * * `action` – the action that is executed before the route is resolved.
   * The value for this property should be a function, accepting `context`
   * and `commands` parameters described below. If present, this function is
   * always invoked first, disregarding of the other properties' presence.
   * The action can return a result directly or within a `Promise`, which
   * resolves to the result. If the action result is an `HTMLElement` instance,
   * a `commands.component(name)` result, a `commands.redirect(path)` result,
   * or a `context.next()` result, the current route resolution is finished,
   * and other route config properties are ignored.
   * See also **Route Actions** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `redirect` – other route's path to redirect to. Passes all route parameters to the redirect target.
   * The target route should also be defined.
   * See also **Redirects** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `bundle` – string containing the path to `.js` or `.mjs` bundle to load before resolving the route,
   * or the object with "module" and "nomodule" keys referring to different bundles.
   * Each bundle is only loaded once. If "module" and "nomodule" are set, only one bundle is loaded,
   * depending on whether the browser supports ES modules or not.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * Any error, e.g. 404 while loading bundle will cause route resolution to throw.
   * See also **Code Splitting** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `component` – the tag name of the Web Component to resolve the route to.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * If route contains the `component` property (or an action that return a component)
   * and its child route also contains the `component` property, child route's component
   * will be rendered as a light dom child of a parent component.
   *
   * * `name` – the string name of the route to use in the
   * [`router.urlForName(name, params)`](#/classes/Router#method-urlForName)
   * navigation helper method.
   *
   * For any route function (`action`, `children`) defined, the corresponding `route` object is available inside the callback
   * through the `this` reference. If you need to access it, make sure you define the callback as a non-arrow function
   * because arrow functions do not have their own `this` reference.
   *
   * `context` object that is passed to `action` function holds the following properties:
   * * `context.pathname` – string with the pathname being resolved
   *
   * * `context.search` – search query string
   *
   * * `context.hash` – hash string
   *
   * * `context.params` – object with route parameters
   *
   * * `context.route` – object that holds the route that is currently being rendered.
   *
   * * `context.next()` – function for asynchronously getting the next route
   * contents from the resolution chain (if any)
   *
   * `commands` object that is passed to `action` function has
   * the following methods:
   *
   * * `commands.redirect(path)` – function that creates a redirect data
   * for the path specified.
   *
   * * `commands.component(component)` – function that creates a new HTMLElement
   * with current context. Note: the component created by this function is reused if visiting the same path twice in row.
   *
   *
   * @param {!Array<!Route>|!Route} routes a single route or an array of those
   * @param {?boolean} skipRender configure the router but skip rendering the
   *     route corresponding to the current `window.location` values
   *
   * @return {!Promise<!Node>}
   */
  setRoutes(e, t = !1) {
    return this.__previousContext = void 0, this.__urlForName = void 0, super.setRoutes(e), t || this.__onNavigationEvent(), this.ready;
  }
  /**
   * Asynchronously resolves the given pathname and renders the resolved route
   * component into the router outlet. If no router outlet is set at the time of
   * calling this method, or at the time when the route resolution is completed,
   * a `TypeError` is thrown.
   *
   * Returns a promise that is fulfilled with the router outlet DOM Node after
   * the route component is created and inserted into the router outlet, or
   * rejected if no route matches the given path.
   *
   * If another render pass is started before the previous one is completed, the
   * result of the previous render pass is ignored.
   *
   * @param {!string|!{pathname: !string, search: ?string, hash: ?string}} pathnameOrContext
   *    the pathname to render or a context object with a `pathname` property,
   *    optional `search` and `hash` properties, and other properties
   *    to pass to the resolver.
   * @param {boolean=} shouldUpdateHistory
   *    update browser history with the rendered location
   * @return {!Promise<!Node>}
   */
  render(e, t) {
    const o = ++this.__lastStartedRenderId, n = Object.assign(
      {
        search: "",
        hash: ""
      },
      v(e) ? { pathname: e } : e,
      {
        __renderId: o
      }
    );
    return this.ready = this.resolve(n).then((i) => this.__fullyResolveChain(i)).then((i) => {
      if (this.__isLatestRender(i)) {
        const a = this.__previousContext;
        if (i === a)
          return this.__updateBrowserHistory(a, !0), this.location;
        if (this.location = g(i), t && this.__updateBrowserHistory(i, o === 1), R("location-changed", { router: this, location: this.location }), i.__skipAttach)
          return this.__copyUnchangedElements(i, a), this.__previousContext = i, this.location;
        this.__addAppearingContent(i, a);
        const c = this.__animateIfNeeded(i);
        return this.__runOnAfterEnterCallbacks(i), this.__runOnAfterLeaveCallbacks(i, a), c.then(() => {
          if (this.__isLatestRender(i))
            return this.__removeDisappearingContent(), this.__previousContext = i, this.location;
        });
      }
    }).catch((i) => {
      if (o === this.__lastStartedRenderId)
        throw t && this.__updateBrowserHistory(n), C(this.__outlet && this.__outlet.children), this.location = g(Object.assign(n, { resolver: this })), R("error", Object.assign({ router: this, error: i }, n)), i;
    }), this.ready;
  }
  // `topOfTheChainContextBeforeRedirects` is a context coming from Resolver.resolve().
  // It would contain a 'redirect' route or the first 'component' route that
  // matched the pathname. There might be more child 'component' routes to be
  // resolved and added into the chain. This method would find and add them.
  // `contextBeforeRedirects` is the context containing such a child component
  // route. It's only necessary when this method is called recursively (otherwise
  // it's the same as the 'top of the chain' context).
  //
  // Apart from building the chain of child components, this method would also
  // handle 'redirect' routes, call 'onBefore' callbacks and handle 'prevent'
  // and 'redirect' callback results.
  __fullyResolveChain(e, t = e) {
    return this.__findComponentContextAfterAllRedirects(t).then((o) => {
      const i = o !== t ? o : e, c = T(
        Ce(o.chain),
        o.resolver
      ) === o.pathname, s = (l, u = l.route, f) => l.next(void 0, u, f).then((h) => h === null || h === P ? c ? l : u.parent !== null ? s(l, u.parent, h) : h : h);
      return s(o).then((l) => {
        if (l === null || l === P)
          throw we(i);
        return l && l !== P && l !== o ? this.__fullyResolveChain(i, l) : this.__amendWithOnBeforeCallbacks(o);
      });
    });
  }
  __findComponentContextAfterAllRedirects(e) {
    const t = e.result;
    return t instanceof HTMLElement ? (ut(e, t), Promise.resolve(e)) : t.redirect ? this.__redirect(t.redirect, e.__redirectCount, e.__renderId).then((o) => this.__findComponentContextAfterAllRedirects(o)) : t instanceof Error ? Promise.reject(t) : Promise.reject(
      new Error(
        b(
          `Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Ne(t)}". Double check the action return value for the route.`
        )
      )
    );
  }
  __amendWithOnBeforeCallbacks(e) {
    return this.__runOnBeforeCallbacks(e).then((t) => t === this.__previousContext || t === e ? t : this.__fullyResolveChain(t));
  }
  __runOnBeforeCallbacks(e) {
    const t = this.__previousContext || {}, o = t.chain || [], n = e.chain;
    let i = Promise.resolve();
    const a = () => ({ cancel: !0 }), c = (s) => ce(e, s);
    if (e.__divergedChainIndex = 0, e.__skipAttach = !1, o.length) {
      for (let s = 0; s < Math.min(o.length, n.length) && !(o[s].route !== n[s].route || o[s].path !== n[s].path && o[s].element !== n[s].element || !this.__isReusableElement(o[s].element, n[s].element)); s = ++e.__divergedChainIndex)
        ;
      if (e.__skipAttach = // Same route chain
      n.length === o.length && e.__divergedChainIndex == n.length && // Same element
      this.__isReusableElement(e.result, t.result), e.__skipAttach) {
        for (let s = n.length - 1; s >= 0; s--)
          i = this.__runOnBeforeLeaveCallbacks(i, e, { prevent: a }, o[s]);
        for (let s = 0; s < n.length; s++)
          i = this.__runOnBeforeEnterCallbacks(i, e, { prevent: a, redirect: c }, n[s]), o[s].element.location = g(e, o[s].route);
      } else
        for (let s = o.length - 1; s >= e.__divergedChainIndex; s--)
          i = this.__runOnBeforeLeaveCallbacks(i, e, { prevent: a }, o[s]);
    }
    if (!e.__skipAttach)
      for (let s = 0; s < n.length; s++)
        s < e.__divergedChainIndex ? s < o.length && o[s].element && (o[s].element.location = g(e, o[s].route)) : (i = this.__runOnBeforeEnterCallbacks(i, e, { prevent: a, redirect: c }, n[s]), n[s].element && (n[s].element.location = g(e, n[s].route)));
    return i.then((s) => {
      if (s) {
        if (s.cancel)
          return this.__previousContext.__renderId = e.__renderId, this.__previousContext;
        if (s.redirect)
          return this.__redirect(s.redirect, e.__redirectCount, e.__renderId);
      }
      return e;
    });
  }
  __runOnBeforeLeaveCallbacks(e, t, o, n) {
    const i = g(t);
    return e.then((a) => {
      if (this.__isLatestRender(t))
        return he("onBeforeLeave", [i, o, this], n.element)(a);
    }).then((a) => {
      if (!(a || {}).redirect)
        return a;
    });
  }
  __runOnBeforeEnterCallbacks(e, t, o, n) {
    const i = g(t, n.route);
    return e.then((a) => {
      if (this.__isLatestRender(t))
        return he("onBeforeEnter", [i, o, this], n.element)(a);
    });
  }
  __isReusableElement(e, t) {
    return e && t ? this.__createdByRouter.get(e) && this.__createdByRouter.get(t) ? e.localName === t.localName : e === t : !1;
  }
  __isLatestRender(e) {
    return e.__renderId === this.__lastStartedRenderId;
  }
  __redirect(e, t, o) {
    if (t > ct)
      throw new Error(b(`Too many redirects when rendering ${e.from}`));
    return this.resolve({
      pathname: this.urlForPath(
        e.pathname,
        e.params
      ),
      redirectFrom: e.from,
      __redirectCount: (t || 0) + 1,
      __renderId: o
    });
  }
  __ensureOutlet(e = this.__outlet) {
    if (!(e instanceof Node))
      throw new TypeError(b(`Expected router outlet to be a valid DOM Node (but got ${e})`));
  }
  __updateBrowserHistory({ pathname: e, search: t = "", hash: o = "" }, n) {
    if (window.location.pathname !== e || window.location.search !== t || window.location.hash !== o) {
      const i = n ? "replaceState" : "pushState";
      window.history[i](null, document.title, e + t + o), window.dispatchEvent(new PopStateEvent("popstate", { state: "vaadin-router-ignore" }));
    }
  }
  __copyUnchangedElements(e, t) {
    let o = this.__outlet;
    for (let n = 0; n < e.__divergedChainIndex; n++) {
      const i = t && t.chain[n].element;
      if (i)
        if (i.parentNode === o)
          e.chain[n].element = i, o = i;
        else
          break;
    }
    return o;
  }
  __addAppearingContent(e, t) {
    this.__ensureOutlet(), this.__removeAppearingContent();
    const o = this.__copyUnchangedElements(e, t);
    this.__appearingContent = [], this.__disappearingContent = Array.from(o.children).filter(
      // Only remove layout content that was added by router
      (i) => this.__addedByRouter.get(i) && // Do not remove the result element to avoid flickering
      i !== e.result
    );
    let n = o;
    for (let i = e.__divergedChainIndex; i < e.chain.length; i++) {
      const a = e.chain[i].element;
      a && (n.appendChild(a), this.__addedByRouter.set(a, !0), n === o && this.__appearingContent.push(a), n = a);
    }
  }
  __removeDisappearingContent() {
    this.__disappearingContent && C(this.__disappearingContent), this.__disappearingContent = null, this.__appearingContent = null;
  }
  __removeAppearingContent() {
    this.__disappearingContent && this.__appearingContent && (C(this.__appearingContent), this.__disappearingContent = null, this.__appearingContent = null);
  }
  __runOnAfterLeaveCallbacks(e, t) {
    if (t)
      for (let o = t.chain.length - 1; o >= e.__divergedChainIndex && this.__isLatestRender(e); o--) {
        const n = t.chain[o].element;
        if (n)
          try {
            const i = g(e);
            L(
              n.onAfterLeave,
              [i, {}, t.resolver],
              n
            );
          } finally {
            this.__disappearingContent.indexOf(n) > -1 && C(n.children);
          }
      }
  }
  __runOnAfterEnterCallbacks(e) {
    for (let t = e.__divergedChainIndex; t < e.chain.length && this.__isLatestRender(e); t++) {
      const o = e.chain[t].element || {}, n = g(e, e.chain[t].route);
      L(
        o.onAfterEnter,
        [n, {}, e.resolver],
        o
      );
    }
  }
  __animateIfNeeded(e) {
    const t = (this.__disappearingContent || [])[0], o = (this.__appearingContent || [])[0], n = [], i = e.chain;
    let a;
    for (let c = i.length; c > 0; c--)
      if (i[c - 1].route.animate) {
        a = i[c - 1].route.animate;
        break;
      }
    if (t && o && a) {
      const c = U(a) && a.leave || "leaving", s = U(a) && a.enter || "entering";
      n.push(le(t, c)), n.push(le(o, s));
    }
    return Promise.all(n).then(() => e);
  }
  /**
   * Subscribes this instance to navigation events on the `window`.
   *
   * NOTE: beware of resource leaks. For as long as a router instance is
   * subscribed to navigation events, it won't be garbage collected.
   */
  subscribe() {
    window.addEventListener("vaadin-router-go", this.__navigationEventHandler);
  }
  /**
   * Removes the subscription to navigation events created in the `subscribe()`
   * method.
   */
  unsubscribe() {
    window.removeEventListener("vaadin-router-go", this.__navigationEventHandler);
  }
  __onNavigationEvent(e) {
    const { pathname: t, search: o, hash: n } = e ? e.detail : window.location;
    v(this.__normalizePathname(t)) && (e && e.preventDefault && e.preventDefault(), this.render({ pathname: t, search: o, hash: n }, !0));
  }
  /**
   * Configures what triggers Router navigation events:
   *  - `POPSTATE`: popstate events on the current `window`
   *  - `CLICK`: click events on `<a>` links leading to the current page
   *
   * This method is invoked with the pre-configured values when creating a new Router instance.
   * By default, both `POPSTATE` and `CLICK` are enabled. This setup is expected to cover most of the use cases.
   *
   * See the `router-config.js` for the default navigation triggers config. Based on it, you can
   * create the own one and only import the triggers you need, instead of pulling in all the code,
   * e.g. if you want to handle `click` differently.
   *
   * See also **Navigation Triggers** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * @param {...NavigationTrigger} triggers
   */
  static setTriggers(...e) {
    at(e);
  }
  /**
   * Generates a URL for the route with the given name, optionally performing
   * substitution of parameters.
   *
   * The route is searched in all the Router instances subscribed to
   * navigation events.
   *
   * **Note:** For child route names, only array children are considered.
   * It is not possible to generate URLs using a name for routes set with
   * a children function.
   *
   * @function urlForName
   * @param {!string} name the route name or the route’s `component` name.
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */
  urlForName(e, t) {
    return this.__urlForName || (this.__urlForName = ot(this)), T(
      this.__urlForName(e, t),
      this
    );
  }
  /**
   * Generates a URL for the given route path, optionally performing
   * substitution of parameters.
   *
   * @param {!string} path string route path declared in [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */
  urlForPath(e, t) {
    return T(
      y.pathToRegexp.compile(e)(t),
      this
    );
  }
  /**
   * Triggers navigation to a new path. Returns a boolean without waiting until
   * the navigation is complete. Returns `true` if at least one `Router`
   * has handled the navigation (was subscribed and had `baseUrl` matching
   * the `path` argument), otherwise returns `false`.
   *
   * @param {!string|!{pathname: !string, search: (string|undefined), hash: (string|undefined)}} path
   *   a new in-app path string, or an URL-like object with `pathname`
   *   string property, and optional `search` and `hash` string properties.
   * @return {boolean}
   */
  static go(e) {
    const { pathname: t, search: o, hash: n } = v(e) ? this.__createUrl(e, "http://a") : e;
    return R("go", { pathname: t, search: o, hash: n });
  }
}
const dt = /\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i, D = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;
function pt() {
  function r() {
    return !0;
  }
  return Le(r);
}
function _t() {
  try {
    return mt() ? !0 : gt() ? D ? !vt() : !pt() : !1;
  } catch {
    return !1;
  }
}
function mt() {
  return localStorage.getItem("vaadin.developmentmode.force");
}
function gt() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}
function vt() {
  return !!(D && Object.keys(D).map((e) => D[e]).filter((e) => e.productionMode).length > 0);
}
function Le(r, e) {
  if (typeof r != "function")
    return;
  const t = dt.exec(r.toString());
  if (t)
    try {
      r = new Function(t[1]);
    } catch (o) {
      console.log("vaadin-development-mode-detector: uncommentAndRun() failed", o);
    }
  return r(e);
}
window.Vaadin = window.Vaadin || {};
const ue = function(r, e) {
  if (window.Vaadin.developmentMode)
    return Le(r, e);
};
window.Vaadin.developmentMode === void 0 && (window.Vaadin.developmentMode = _t());
function bt() {
}
const wt = function() {
  if (typeof ue == "function")
    return ue(bt);
};
window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];
window.Vaadin.registrations.push({
  is: "@vaadin/router",
  version: "1.7.4"
});
wt();
y.NavigationTrigger = { POPSTATE: xe, CLICK: He };
const G = O`
  :root {
    --text-color: rgba(255, 255, 255, 0.7);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    position: relative;
    font-weight: normal;
  }

  * {
    font-family: monospace;
    line-height: 1.5;
    color: var(--text-color);
  }

  body {
    transition: color 0.5s, background-color 0.5s;
    line-height: 1.6;
    font-size: 15px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
var yt = Object.defineProperty, Et = Object.getOwnPropertyDescriptor, Pt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Et(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && yt(e, t, n), n;
};
let V = class extends p {
  render() {
    return _`
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
V.styles = [
  G,
  O`
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
V = Pt([
  m("intro-hero")
], V);
var Ot = Object.defineProperty, At = Object.getOwnPropertyDescriptor, Rt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? At(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && Ot(e, t, n), n;
};
let x = class extends p {
  render() {
    return _`
      <nav>
        <a href="/about">About</a>
        <a href="/work">Work</a>
        <a href="/tinkerings">Tinkerings</a>
        <a href="/other">Other</a>
        <a href="/and">And</a>
      </nav>
    `;
  }
};
x.styles = [
  G,
  O`
      nav {
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        padding: 2rem;
      }
      nav a {
        padding: 1rem 0;
      }

      nav a:hover {
        color: rgba(50, 100, 200, 0.8);
      }
    `
];
x = Rt([
  m("app-nav")
], x);
var jt = Object.defineProperty, $t = Object.getOwnPropertyDescriptor, Ct = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? $t(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && jt(e, t, n), n;
};
let W = class extends p {
  render() {
    return _` <footer>&copy;2023</footer> `;
  }
};
W.styles = [
  G,
  O`
      footer {
        color: #666;
      }
    `
];
W = Ct([
  m("app-footer")
], W);
var Lt = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, Dt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Tt(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && Lt(e, t, n), n;
};
let z = class extends p {
  render() {
    return _`
      <intro-hero></intro-hero>
      <app-nav></app-nav>
      <app-footer></app-footer>
    `;
  }
};
z.styles = O`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    app-footer {
      position: fixed;
      bottom: 0;
      right: 0;
    }
  `;
z = Dt([
  m("ajm-home")
], z);
var It = Object.defineProperty, Mt = Object.getOwnPropertyDescriptor, Ft = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Mt(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && It(e, t, n), n;
};
let K = class extends p {
  render() {
    return _`
      <header>
        <h1>About Andy</h1>
      </header>
      <ol>
        <li>
          <h2>Who</h2>
        </li>
        <li>
          <h2>What</h2>
        </li>
        <li>
          <h2>Where</h2>
        </li>
        <li>
          <h2>When</h2>
        </li>
        <li>
          <h2>Why</h2>
        </li>
      </ol>
    `;
  }
};
K.styles = O`
    ol {
      list-style: upper-roman;
    }
  `;
K = Ft([
  m("ajm-about")
], K);
var Ut = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, Bt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Nt(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && Ut(e, t, n), n;
};
let fe = class extends p {
  render() {
    return _`<span>404</span>`;
  }
};
fe = Bt([
  m("ajm-404")
], fe);
var St = Object.defineProperty, Ht = Object.getOwnPropertyDescriptor, Vt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Ht(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && St(e, t, n), n;
};
let de = class extends p {
  render() {
    return _`
      <header>
        <h1>Work Andy</h1>
      </header>
    `;
  }
};
de = Vt([
  m("ajm-work")
], de);
var xt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, zt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Wt(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && xt(e, t, n), n;
};
let pe = class extends p {
  render() {
    return _`
      <header>
        <h1>Technologist Andy</h1>
      </header>
    `;
  }
};
pe = zt([
  m("ajm-technologist")
], pe);
var Kt = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, Gt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? qt(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && Kt(e, t, n), n;
};
let _e = class extends p {
  render() {
    return _`
      <header>
        <h1>Classicist Andy</h1>
      </header>
    `;
  }
};
_e = Gt([
  m("ajm-classicist")
], _e);
var Xt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, Qt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Jt(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && Xt(e, t, n), n;
};
let me = class extends p {
  render() {
    return _`
      <header>
        <h1>Futurist Andy</h1>
      </header>
    `;
  }
};
me = Qt([
  m("ajm-futurist")
], me);
var Yt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, kt = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Zt(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && Yt(e, t, n), n;
};
let ge = class extends p {
  render() {
    return _`
      <header>
        <h1>Anachronist Andy</h1>
      </header>
    `;
  }
};
ge = kt([
  m("ajm-anachronist")
], ge);
var er = Object.defineProperty, tr = Object.getOwnPropertyDescriptor, rr = (r, e, t, o) => {
  for (var n = o > 1 ? void 0 : o ? tr(e, t) : e, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (n = (o ? a(e, t, n) : a(n)) || n);
  return o && n && er(e, t, n), n;
};
let ve = class extends p {
  render() {
    return _`
      <header>
        <h1>Tinkerings Andy</h1>
      </header>
    `;
  }
};
ve = rr([
  m("ajm-tinkerings")
], ve);
const nr = new y(document.getElementById("app"));
nr.setRoutes([
  { path: "/", component: "ajm-home" },
  { path: "/about", component: "ajm-about" },
  { path: "/work", component: "ajm-work" },
  { path: "/tinkerings", component: "ajm-tinkerings" },
  { path: "/technologist", component: "ajm-technologist" },
  { path: "/classicist", component: "ajm-classicist" },
  { path: "/futurist", component: "ajm-futurist" },
  { path: "/anachronist", component: "ajm-anachronist" },
  { path: "(.*)", component: "ajm-404" }
]);
