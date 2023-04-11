(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
    i(o);
  new MutationObserver((o) => {
    for (const n of o)
      if (n.type === "childList")
        for (const s of n.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && i(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(o) {
    const n = {};
    return o.integrity && (n.integrity = o.integrity), o.referrerPolicy && (n.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? n.credentials = "include" : o.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
  }
  function i(o) {
    if (o.ep)
      return;
    o.ep = !0;
    const n = t(o);
    fetch(o.href, n);
  }
})();
function $(r) {
  return r = r || [], Array.isArray(r) ? r : [r];
}
function m(r) {
  return `[Vaadin.Router] ${r}`;
}
function we(r) {
  if (typeof r != "object")
    return String(r);
  const e = Object.prototype.toString.call(r).match(/ (.*)\]$/)[1];
  return e === "Object" || e === "Array" ? `${e} ${JSON.stringify(r)}` : e;
}
const I = "module", C = "nomodule", N = [I, C];
function V(r) {
  if (!r.match(/.+\.[m]?js$/))
    throw new Error(
      m(`Unsupported type for bundle "${r}": .js or .mjs expected.`)
    );
}
function re(r) {
  if (!r || !_(r.path))
    throw new Error(
      m('Expected route config to be an object with a "path" string property, or an array of such objects')
    );
  const e = r.bundle, t = ["component", "redirect", "bundle"];
  if (!y(r.action) && !Array.isArray(r.children) && !y(r.children) && !j(e) && !t.some((i) => _(r[i])))
    throw new Error(
      m(
        `Expected route config "${r.path}" to include either "${t.join('", "')}" or "action" function but none found.`
      )
    );
  if (e)
    if (_(e))
      V(e);
    else if (N.some((i) => i in e))
      N.forEach((i) => i in e && V(e[i]));
    else
      throw new Error(
        m('Expected route bundle to include either "' + C + '" or "' + I + '" keys, or both')
      );
  r.redirect && ["bundle", "component"].forEach((i) => {
    i in r && console.warn(
      m(
        `Route config "${r.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`
      )
    );
  });
}
function K(r) {
  $(r).forEach((e) => re(e));
}
function k(r, e) {
  let t = document.head.querySelector('script[src="' + r + '"][async]');
  return t || (t = document.createElement("script"), t.setAttribute("src", r), e === I ? t.setAttribute("type", I) : e === C && t.setAttribute(C, ""), t.async = !0), new Promise((i, o) => {
    t.onreadystatechange = t.onload = (n) => {
      t.__dynamicImportLoaded = !0, i(n);
    }, t.onerror = (n) => {
      t.parentNode && t.parentNode.removeChild(t), o(n);
    }, t.parentNode === null ? document.head.appendChild(t) : t.__dynamicImportLoaded && i();
  });
}
function be(r) {
  return _(r) ? k(r) : Promise.race(
    N.filter((e) => e in r).map((e) => k(r[e], e))
  );
}
function E(r, e) {
  return !window.dispatchEvent(new CustomEvent(
    `vaadin-router-${r}`,
    { cancelable: r === "go", detail: e }
  ));
}
function j(r) {
  return typeof r == "object" && !!r;
}
function y(r) {
  return typeof r == "function";
}
function _(r) {
  return typeof r == "string";
}
function ne(r) {
  const e = new Error(m(`Page not found (${r.pathname})`));
  return e.context = r, e.code = 404, e;
}
const w = new class {
}();
function Ee(r) {
  const e = r.port, t = r.protocol, n = t === "http:" && e === "80" || t === "https:" && e === "443" ? r.hostname : r.host;
  return `${t}//${n}`;
}
function q(r) {
  if (r.defaultPrevented || r.button !== 0 || r.shiftKey || r.ctrlKey || r.altKey || r.metaKey)
    return;
  let e = r.target;
  const t = r.composedPath ? r.composedPath() : r.path || [];
  for (let l = 0; l < t.length; l++) {
    const a = t[l];
    if (a.nodeName && a.nodeName.toLowerCase() === "a") {
      e = a;
      break;
    }
  }
  for (; e && e.nodeName.toLowerCase() !== "a"; )
    e = e.parentNode;
  if (!e || e.nodeName.toLowerCase() !== "a" || e.target && e.target.toLowerCase() !== "_self" || e.hasAttribute("download") || e.hasAttribute("router-ignore") || e.pathname === window.location.pathname && e.hash !== "" || (e.origin || Ee(e)) !== window.location.origin)
    return;
  const { pathname: o, search: n, hash: s } = e;
  E("go", { pathname: o, search: n, hash: s }) && (r.preventDefault(), r && r.type === "click" && window.scrollTo(0, 0));
}
const Re = {
  activate() {
    window.document.addEventListener("click", q);
  },
  inactivate() {
    window.document.removeEventListener("click", q);
  }
}, Ae = /Trident/.test(navigator.userAgent);
Ae && !y(window.PopStateEvent) && (window.PopStateEvent = function(r, e) {
  e = e || {};
  var t = document.createEvent("Event");
  return t.initEvent(r, !!e.bubbles, !!e.cancelable), t.state = e.state || null, t;
}, window.PopStateEvent.prototype = window.Event.prototype);
function G(r) {
  if (r.state === "vaadin-router-ignore")
    return;
  const { pathname: e, search: t, hash: i } = window.location;
  E("go", { pathname: e, search: t, hash: i });
}
const Pe = {
  activate() {
    window.addEventListener("popstate", G);
  },
  inactivate() {
    window.removeEventListener("popstate", G);
  }
};
var b = le, Oe = B, Le = Ce, Te = ae, $e = ce, ie = "/", oe = "./", Ie = new RegExp([
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
function B(r, e) {
  for (var t = [], i = 0, o = 0, n = "", s = e && e.delimiter || ie, l = e && e.delimiters || oe, a = !1, c; (c = Ie.exec(r)) !== null; ) {
    var h = c[0], d = c[1], u = c.index;
    if (n += r.slice(o, u), o = u + h.length, d) {
      n += d[1], a = !0;
      continue;
    }
    var f = "", S = r[o], pe = c[2], _e = c[3], me = c[4], A = c[5];
    if (!a && n.length) {
      var M = n.length - 1;
      l.indexOf(n[M]) > -1 && (f = n[M], n = n.slice(0, M));
    }
    n && (t.push(n), n = "", a = !1);
    var ge = f !== "" && S !== void 0 && S !== f, ve = A === "+" || A === "*", ye = A === "?" || A === "*", D = f || s, H = _e || me;
    t.push({
      name: pe || i++,
      prefix: f,
      delimiter: D,
      optional: ye,
      repeat: ve,
      partial: ge,
      pattern: H ? je(H) : "[^" + g(D) + "]+?"
    });
  }
  return (n || o < r.length) && t.push(n + r.substr(o)), t;
}
function Ce(r, e) {
  return ae(B(r, e));
}
function ae(r) {
  for (var e = new Array(r.length), t = 0; t < r.length; t++)
    typeof r[t] == "object" && (e[t] = new RegExp("^(?:" + r[t].pattern + ")$"));
  return function(i, o) {
    for (var n = "", s = o && o.encode || encodeURIComponent, l = 0; l < r.length; l++) {
      var a = r[l];
      if (typeof a == "string") {
        n += a;
        continue;
      }
      var c = i ? i[a.name] : void 0, h;
      if (Array.isArray(c)) {
        if (!a.repeat)
          throw new TypeError('Expected "' + a.name + '" to not repeat, but got array');
        if (c.length === 0) {
          if (a.optional)
            continue;
          throw new TypeError('Expected "' + a.name + '" to not be empty');
        }
        for (var d = 0; d < c.length; d++) {
          if (h = s(c[d], a), !e[l].test(h))
            throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '"');
          n += (d === 0 ? a.prefix : a.delimiter) + h;
        }
        continue;
      }
      if (typeof c == "string" || typeof c == "number" || typeof c == "boolean") {
        if (h = s(String(c), a), !e[l].test(h))
          throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but got "' + h + '"');
        n += a.prefix + h;
        continue;
      }
      if (a.optional) {
        a.partial && (n += a.prefix);
        continue;
      }
      throw new TypeError('Expected "' + a.name + '" to be ' + (a.repeat ? "an array" : "a string"));
    }
    return n;
  };
}
function g(r) {
  return r.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function je(r) {
  return r.replace(/([=!:$/()])/g, "\\$1");
}
function se(r) {
  return r && r.sensitive ? "" : "i";
}
function Me(r, e) {
  if (!e)
    return r;
  var t = r.source.match(/\((?!\?)/g);
  if (t)
    for (var i = 0; i < t.length; i++)
      e.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: !1,
        repeat: !1,
        partial: !1,
        pattern: null
      });
  return r;
}
function Ue(r, e, t) {
  for (var i = [], o = 0; o < r.length; o++)
    i.push(le(r[o], e, t).source);
  return new RegExp("(?:" + i.join("|") + ")", se(t));
}
function Ne(r, e, t) {
  return ce(B(r, t), e, t);
}
function ce(r, e, t) {
  t = t || {};
  for (var i = t.strict, o = t.start !== !1, n = t.end !== !1, s = g(t.delimiter || ie), l = t.delimiters || oe, a = [].concat(t.endsWith || []).map(g).concat("$").join("|"), c = o ? "^" : "", h = r.length === 0, d = 0; d < r.length; d++) {
    var u = r[d];
    if (typeof u == "string")
      c += g(u), h = d === r.length - 1 && l.indexOf(u[u.length - 1]) > -1;
    else {
      var f = u.repeat ? "(?:" + u.pattern + ")(?:" + g(u.delimiter) + "(?:" + u.pattern + "))*" : u.pattern;
      e && e.push(u), u.optional ? u.partial ? c += g(u.prefix) + "(" + f + ")?" : c += "(?:" + g(u.prefix) + "(" + f + "))?" : c += g(u.prefix) + "(" + f + ")";
    }
  }
  return n ? (i || (c += "(?:" + s + ")?"), c += a === "$" ? "$" : "(?=" + a + ")") : (i || (c += "(?:" + s + "(?=" + a + "))?"), h || (c += "(?=" + s + "|" + a + ")")), new RegExp(c, se(t));
}
function le(r, e, t) {
  return r instanceof RegExp ? Me(r, e) : Array.isArray(r) ? Ue(
    /** @type {!Array} */
    r,
    e,
    t
  ) : Ne(
    /** @type {string} */
    r,
    e,
    t
  );
}
b.parse = Oe;
b.compile = Le;
b.tokensToFunction = Te;
b.tokensToRegExp = $e;
const { hasOwnProperty: Fe } = Object.prototype, F = /* @__PURE__ */ new Map();
F.set("|false", {
  keys: [],
  pattern: /(?:)/
});
function W(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    return r;
  }
}
function Be(r, e, t, i, o) {
  t = !!t;
  const n = `${r}|${t}`;
  let s = F.get(n);
  if (!s) {
    const c = [];
    s = {
      keys: c,
      pattern: b(r, c, {
        end: t,
        strict: r === ""
      })
    }, F.set(n, s);
  }
  const l = s.pattern.exec(e);
  if (!l)
    return null;
  const a = Object.assign({}, o);
  for (let c = 1; c < l.length; c++) {
    const h = s.keys[c - 1], d = h.name, u = l[c];
    (u !== void 0 || !Fe.call(a, d)) && (h.repeat ? a[d] = u ? u.split(h.delimiter).map(W) : [] : a[d] = u && W(u));
  }
  return {
    path: l[0],
    keys: (i || []).concat(s.keys),
    params: a
  };
}
function ue(r, e, t, i, o) {
  let n, s, l = 0, a = r.path || "";
  return a.charAt(0) === "/" && (t && (a = a.substr(1)), t = !0), {
    next(c) {
      if (r === c)
        return { done: !0 };
      const h = r.__children = r.__children || r.children;
      if (!n && (n = Be(a, e, !h, i, o), n))
        return {
          done: !1,
          value: {
            route: r,
            keys: n.keys,
            params: n.params,
            path: n.path
          }
        };
      if (n && h)
        for (; l < h.length; ) {
          if (!s) {
            const u = h[l];
            u.parent = r;
            let f = n.path.length;
            f > 0 && e.charAt(f) === "/" && (f += 1), s = ue(
              u,
              e.substr(f),
              t,
              n.keys,
              n.params
            );
          }
          const d = s.next(c);
          if (!d.done)
            return {
              done: !1,
              value: d.value
            };
          s = null, l++;
        }
      return { done: !0 };
    }
  };
}
function Se(r) {
  if (y(r.route.action))
    return r.route.action(r);
}
function De(r, e) {
  let t = e;
  for (; t; )
    if (t = t.parent, t === r)
      return !0;
  return !1;
}
function He(r) {
  let e = `Path '${r.pathname}' is not properly resolved due to an error.`;
  const t = (r.route || {}).path;
  return t && (e += ` Resolution had failed on route: '${t}'`), e;
}
function Ve(r, e) {
  const { route: t, path: i } = e;
  if (t && !t.__synthetic) {
    const o = { path: i, route: t };
    if (!r.chain)
      r.chain = [];
    else if (t.parent) {
      let n = r.chain.length;
      for (; n-- && r.chain[n].route && r.chain[n].route !== t.parent; )
        r.chain.pop();
    }
    r.chain.push(o);
  }
}
class R {
  constructor(e, t = {}) {
    if (Object(e) !== e)
      throw new TypeError("Invalid routes");
    this.baseUrl = t.baseUrl || "", this.errorHandler = t.errorHandler, this.resolveRoute = t.resolveRoute || Se, this.context = Object.assign({ resolver: this }, t.context), this.root = Array.isArray(e) ? { path: "", __children: e, parent: null, __synthetic: !0 } : e, this.root.parent = null;
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
    K(e);
    const t = [...$(e)];
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
    return K(e), this.root.__children.push(...$(e)), this.getRoutes();
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
      _(e) ? { pathname: e } : e
    ), i = ue(
      this.root,
      this.__normalizePathname(t.pathname),
      this.baseUrl
    ), o = this.resolveRoute;
    let n = null, s = null, l = t;
    function a(c, h = n.value.route, d) {
      const u = d === null && n.value.route;
      return n = s || i.next(u), s = null, !c && (n.done || !De(h, n.value.route)) ? (s = n, Promise.resolve(w)) : n.done ? Promise.reject(ne(t)) : (l = Object.assign(
        l ? { chain: l.chain ? l.chain.slice(0) : [] } : {},
        t,
        n.value
      ), Ve(l, n.value), Promise.resolve(o(l)).then((f) => f != null && f !== w ? (l.result = f.result || f, l) : a(c, h, f)));
    }
    return t.next = a, Promise.resolve().then(() => a(!0, this.root)).catch((c) => {
      const h = He(l);
      if (c ? console.warn(h) : c = new Error(h), c.context = c.context || l, c instanceof DOMException || (c.code = c.code || 500), this.errorHandler)
        return l.result = this.errorHandler(c), l;
      throw c;
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
    const t = this.__effectiveBaseUrl, i = this.constructor.__createUrl(e, t).href;
    if (i.slice(0, t.length) === t)
      return i.slice(t.length);
  }
}
R.pathToRegexp = b;
const { pathToRegexp: z } = R, X = /* @__PURE__ */ new Map();
function he(r, e, t) {
  const i = e.name || e.component;
  if (i && (r.has(i) ? r.get(i).push(e) : r.set(i, [e])), Array.isArray(t))
    for (let o = 0; o < t.length; o++) {
      const n = t[o];
      n.parent = e, he(r, n, n.__children || n.children);
    }
}
function Q(r, e) {
  const t = r.get(e);
  if (t && t.length > 1)
    throw new Error(
      `Duplicate route with name "${e}". Try seting unique 'name' route properties.`
    );
  return t && t[0];
}
function J(r) {
  let e = r.path;
  return e = Array.isArray(e) ? e[0] : e, e !== void 0 ? e : "";
}
function Ke(r, e = {}) {
  if (!(r instanceof R))
    throw new TypeError("An instance of Resolver is expected");
  const t = /* @__PURE__ */ new Map();
  return (i, o) => {
    let n = Q(t, i);
    if (!n && (t.clear(), he(t, r.root, r.root.__children), n = Q(t, i), !n))
      throw new Error(`Route "${i}" not found`);
    let s = X.get(n.fullPath);
    if (!s) {
      let a = J(n), c = n.parent;
      for (; c; ) {
        const f = J(c);
        f && (a = f.replace(/\/$/, "") + "/" + a.replace(/^\//, "")), c = c.parent;
      }
      const h = z.parse(a), d = z.tokensToFunction(h), u = /* @__PURE__ */ Object.create(null);
      for (let f = 0; f < h.length; f++)
        _(h[f]) || (u[h[f].name] = !0);
      s = { toPath: d, keys: u }, X.set(a, s), n.fullPath = a;
    }
    let l = s.toPath(o, e) || "/";
    if (e.stringifyQueryParams && o) {
      const a = {}, c = Object.keys(o);
      for (let d = 0; d < c.length; d++) {
        const u = c[d];
        s.keys[u] || (a[u] = o[u]);
      }
      const h = e.stringifyQueryParams(a);
      h && (l += h.charAt(0) === "?" ? h : `?${h}`);
    }
    return l;
  };
}
let Y = [];
function ke(r) {
  Y.forEach((e) => e.inactivate()), r.forEach((e) => e.activate()), Y = r;
}
const qe = (r) => {
  const e = getComputedStyle(r).getPropertyValue("animation-name");
  return e && e !== "none";
}, Ge = (r, e) => {
  const t = () => {
    r.removeEventListener("animationend", t), e();
  };
  r.addEventListener("animationend", t);
};
function Z(r, e) {
  return r.classList.add(e), new Promise((t) => {
    if (qe(r)) {
      const i = r.getBoundingClientRect(), o = `height: ${i.bottom - i.top}px; width: ${i.right - i.left}px`;
      r.setAttribute("style", `position: absolute; ${o}`), Ge(r, () => {
        r.classList.remove(e), r.removeAttribute("style"), t();
      });
    } else
      r.classList.remove(e), t();
  });
}
const We = 256;
function U(r) {
  return r != null;
}
function ze(r) {
  const e = Object.assign({}, r);
  return delete e.next, e;
}
function p({ pathname: r = "", search: e = "", hash: t = "", chain: i = [], params: o = {}, redirectFrom: n, resolver: s }, l) {
  const a = i.map((c) => c.route);
  return {
    baseUrl: s && s.baseUrl || "",
    pathname: r,
    search: e,
    hash: t,
    routes: a,
    route: l || a.length && a[a.length - 1] || null,
    params: o,
    redirectFrom: n,
    getUrl: (c = {}) => L(
      v.pathToRegexp.compile(
        de(a)
      )(Object.assign({}, o, c)),
      s
    )
  };
}
function x(r, e) {
  const t = Object.assign({}, r.params);
  return {
    redirect: {
      pathname: e,
      from: r.pathname,
      params: t
    }
  };
}
function Xe(r, e) {
  e.location = p(r);
  const t = r.chain.map((i) => i.route).indexOf(r.route);
  return r.chain[t].element = e, e;
}
function O(r, e, t) {
  if (y(r))
    return r.apply(t, e);
}
function ee(r, e, t) {
  return (i) => {
    if (i && (i.cancel || i.redirect))
      return i;
    if (t)
      return O(t[r], e, t);
  };
}
function Qe(r, e) {
  if (!Array.isArray(r) && !j(r))
    throw new Error(
      m(
        `Incorrect "children" value for the route ${e.path}: expected array or object, but got ${r}`
      )
    );
  e.__children = [];
  const t = $(r);
  for (let i = 0; i < t.length; i++)
    re(t[i]), e.__children.push(t[i]);
}
function P(r) {
  if (r && r.length) {
    const e = r[0].parentNode;
    for (let t = 0; t < r.length; t++)
      e.removeChild(r[t]);
  }
}
function L(r, e) {
  const t = e.__effectiveBaseUrl;
  return t ? e.constructor.__createUrl(r.replace(/^\//, ""), t).pathname : r;
}
function de(r) {
  return r.map((e) => e.path).reduce((e, t) => t.length ? e.replace(/\/$/, "") + "/" + t.replace(/^\//, "") : e, "");
}
class v extends R {
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
    const i = document.head.querySelector("base"), o = i && i.getAttribute("href");
    super([], Object.assign({
      // Default options
      baseUrl: o && R.__createUrl(o, document.URL).pathname.replace(/[^\/]*$/, "")
    }, t)), this.resolveRoute = (s) => this.__resolveRoute(s);
    const n = v.NavigationTrigger;
    v.setTriggers.apply(v, Object.keys(n).map((s) => n[s])), this.baseUrl, this.ready, this.ready = Promise.resolve(e), this.location, this.location = p({ resolver: this }), this.__lastStartedRenderId = 0, this.__navigationEventHandler = this.__onNavigationEvent.bind(this), this.setOutlet(e), this.subscribe(), this.__createdByRouter = /* @__PURE__ */ new WeakMap(), this.__addedByRouter = /* @__PURE__ */ new WeakMap();
  }
  __resolveRoute(e) {
    const t = e.route;
    let i = Promise.resolve();
    y(t.children) && (i = i.then(() => t.children(ze(e))).then((n) => {
      !U(n) && !y(t.children) && (n = t.children), Qe(n, t);
    }));
    const o = {
      redirect: (n) => x(e, n),
      component: (n) => {
        const s = document.createElement(n);
        return this.__createdByRouter.set(s, !0), s;
      }
    };
    return i.then(() => {
      if (this.__isLatestRender(e))
        return O(t.action, [e, o], t);
    }).then((n) => {
      if (U(n) && (n instanceof HTMLElement || n.redirect || n === w))
        return n;
      if (_(t.redirect))
        return o.redirect(t.redirect);
      if (t.bundle)
        return be(t.bundle).then(() => {
        }, () => {
          throw new Error(m(`Bundle not found: ${t.bundle}. Check if the file name is correct`));
        });
    }).then((n) => {
      if (U(n))
        return n;
      if (_(t.component))
        return o.component(t.component);
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
    const i = ++this.__lastStartedRenderId, o = Object.assign(
      {
        search: "",
        hash: ""
      },
      _(e) ? { pathname: e } : e,
      {
        __renderId: i
      }
    );
    return this.ready = this.resolve(o).then((n) => this.__fullyResolveChain(n)).then((n) => {
      if (this.__isLatestRender(n)) {
        const s = this.__previousContext;
        if (n === s)
          return this.__updateBrowserHistory(s, !0), this.location;
        if (this.location = p(n), t && this.__updateBrowserHistory(n, i === 1), E("location-changed", { router: this, location: this.location }), n.__skipAttach)
          return this.__copyUnchangedElements(n, s), this.__previousContext = n, this.location;
        this.__addAppearingContent(n, s);
        const l = this.__animateIfNeeded(n);
        return this.__runOnAfterEnterCallbacks(n), this.__runOnAfterLeaveCallbacks(n, s), l.then(() => {
          if (this.__isLatestRender(n))
            return this.__removeDisappearingContent(), this.__previousContext = n, this.location;
        });
      }
    }).catch((n) => {
      if (i === this.__lastStartedRenderId)
        throw t && this.__updateBrowserHistory(o), P(this.__outlet && this.__outlet.children), this.location = p(Object.assign(o, { resolver: this })), E("error", Object.assign({ router: this, error: n }, o)), n;
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
    return this.__findComponentContextAfterAllRedirects(t).then((i) => {
      const n = i !== t ? i : e, l = L(
        de(i.chain),
        i.resolver
      ) === i.pathname, a = (c, h = c.route, d) => c.next(void 0, h, d).then((u) => u === null || u === w ? l ? c : h.parent !== null ? a(c, h.parent, u) : u : u);
      return a(i).then((c) => {
        if (c === null || c === w)
          throw ne(n);
        return c && c !== w && c !== i ? this.__fullyResolveChain(n, c) : this.__amendWithOnBeforeCallbacks(i);
      });
    });
  }
  __findComponentContextAfterAllRedirects(e) {
    const t = e.result;
    return t instanceof HTMLElement ? (Xe(e, t), Promise.resolve(e)) : t.redirect ? this.__redirect(t.redirect, e.__redirectCount, e.__renderId).then((i) => this.__findComponentContextAfterAllRedirects(i)) : t instanceof Error ? Promise.reject(t) : Promise.reject(
      new Error(
        m(
          `Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${we(t)}". Double check the action return value for the route.`
        )
      )
    );
  }
  __amendWithOnBeforeCallbacks(e) {
    return this.__runOnBeforeCallbacks(e).then((t) => t === this.__previousContext || t === e ? t : this.__fullyResolveChain(t));
  }
  __runOnBeforeCallbacks(e) {
    const t = this.__previousContext || {}, i = t.chain || [], o = e.chain;
    let n = Promise.resolve();
    const s = () => ({ cancel: !0 }), l = (a) => x(e, a);
    if (e.__divergedChainIndex = 0, e.__skipAttach = !1, i.length) {
      for (let a = 0; a < Math.min(i.length, o.length) && !(i[a].route !== o[a].route || i[a].path !== o[a].path && i[a].element !== o[a].element || !this.__isReusableElement(i[a].element, o[a].element)); a = ++e.__divergedChainIndex)
        ;
      if (e.__skipAttach = // Same route chain
      o.length === i.length && e.__divergedChainIndex == o.length && // Same element
      this.__isReusableElement(e.result, t.result), e.__skipAttach) {
        for (let a = o.length - 1; a >= 0; a--)
          n = this.__runOnBeforeLeaveCallbacks(n, e, { prevent: s }, i[a]);
        for (let a = 0; a < o.length; a++)
          n = this.__runOnBeforeEnterCallbacks(n, e, { prevent: s, redirect: l }, o[a]), i[a].element.location = p(e, i[a].route);
      } else
        for (let a = i.length - 1; a >= e.__divergedChainIndex; a--)
          n = this.__runOnBeforeLeaveCallbacks(n, e, { prevent: s }, i[a]);
    }
    if (!e.__skipAttach)
      for (let a = 0; a < o.length; a++)
        a < e.__divergedChainIndex ? a < i.length && i[a].element && (i[a].element.location = p(e, i[a].route)) : (n = this.__runOnBeforeEnterCallbacks(n, e, { prevent: s, redirect: l }, o[a]), o[a].element && (o[a].element.location = p(e, o[a].route)));
    return n.then((a) => {
      if (a) {
        if (a.cancel)
          return this.__previousContext.__renderId = e.__renderId, this.__previousContext;
        if (a.redirect)
          return this.__redirect(a.redirect, e.__redirectCount, e.__renderId);
      }
      return e;
    });
  }
  __runOnBeforeLeaveCallbacks(e, t, i, o) {
    const n = p(t);
    return e.then((s) => {
      if (this.__isLatestRender(t))
        return ee("onBeforeLeave", [n, i, this], o.element)(s);
    }).then((s) => {
      if (!(s || {}).redirect)
        return s;
    });
  }
  __runOnBeforeEnterCallbacks(e, t, i, o) {
    const n = p(t, o.route);
    return e.then((s) => {
      if (this.__isLatestRender(t))
        return ee("onBeforeEnter", [n, i, this], o.element)(s);
    });
  }
  __isReusableElement(e, t) {
    return e && t ? this.__createdByRouter.get(e) && this.__createdByRouter.get(t) ? e.localName === t.localName : e === t : !1;
  }
  __isLatestRender(e) {
    return e.__renderId === this.__lastStartedRenderId;
  }
  __redirect(e, t, i) {
    if (t > We)
      throw new Error(m(`Too many redirects when rendering ${e.from}`));
    return this.resolve({
      pathname: this.urlForPath(
        e.pathname,
        e.params
      ),
      redirectFrom: e.from,
      __redirectCount: (t || 0) + 1,
      __renderId: i
    });
  }
  __ensureOutlet(e = this.__outlet) {
    if (!(e instanceof Node))
      throw new TypeError(m(`Expected router outlet to be a valid DOM Node (but got ${e})`));
  }
  __updateBrowserHistory({ pathname: e, search: t = "", hash: i = "" }, o) {
    if (window.location.pathname !== e || window.location.search !== t || window.location.hash !== i) {
      const n = o ? "replaceState" : "pushState";
      window.history[n](null, document.title, e + t + i), window.dispatchEvent(new PopStateEvent("popstate", { state: "vaadin-router-ignore" }));
    }
  }
  __copyUnchangedElements(e, t) {
    let i = this.__outlet;
    for (let o = 0; o < e.__divergedChainIndex; o++) {
      const n = t && t.chain[o].element;
      if (n)
        if (n.parentNode === i)
          e.chain[o].element = n, i = n;
        else
          break;
    }
    return i;
  }
  __addAppearingContent(e, t) {
    this.__ensureOutlet(), this.__removeAppearingContent();
    const i = this.__copyUnchangedElements(e, t);
    this.__appearingContent = [], this.__disappearingContent = Array.from(i.children).filter(
      // Only remove layout content that was added by router
      (n) => this.__addedByRouter.get(n) && // Do not remove the result element to avoid flickering
      n !== e.result
    );
    let o = i;
    for (let n = e.__divergedChainIndex; n < e.chain.length; n++) {
      const s = e.chain[n].element;
      s && (o.appendChild(s), this.__addedByRouter.set(s, !0), o === i && this.__appearingContent.push(s), o = s);
    }
  }
  __removeDisappearingContent() {
    this.__disappearingContent && P(this.__disappearingContent), this.__disappearingContent = null, this.__appearingContent = null;
  }
  __removeAppearingContent() {
    this.__disappearingContent && this.__appearingContent && (P(this.__appearingContent), this.__disappearingContent = null, this.__appearingContent = null);
  }
  __runOnAfterLeaveCallbacks(e, t) {
    if (t)
      for (let i = t.chain.length - 1; i >= e.__divergedChainIndex && this.__isLatestRender(e); i--) {
        const o = t.chain[i].element;
        if (o)
          try {
            const n = p(e);
            O(
              o.onAfterLeave,
              [n, {}, t.resolver],
              o
            );
          } finally {
            this.__disappearingContent.indexOf(o) > -1 && P(o.children);
          }
      }
  }
  __runOnAfterEnterCallbacks(e) {
    for (let t = e.__divergedChainIndex; t < e.chain.length && this.__isLatestRender(e); t++) {
      const i = e.chain[t].element || {}, o = p(e, e.chain[t].route);
      O(
        i.onAfterEnter,
        [o, {}, e.resolver],
        i
      );
    }
  }
  __animateIfNeeded(e) {
    const t = (this.__disappearingContent || [])[0], i = (this.__appearingContent || [])[0], o = [], n = e.chain;
    let s;
    for (let l = n.length; l > 0; l--)
      if (n[l - 1].route.animate) {
        s = n[l - 1].route.animate;
        break;
      }
    if (t && i && s) {
      const l = j(s) && s.leave || "leaving", a = j(s) && s.enter || "entering";
      o.push(Z(t, l)), o.push(Z(i, a));
    }
    return Promise.all(o).then(() => e);
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
    const { pathname: t, search: i, hash: o } = e ? e.detail : window.location;
    _(this.__normalizePathname(t)) && (e && e.preventDefault && e.preventDefault(), this.render({ pathname: t, search: i, hash: o }, !0));
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
    ke(e);
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
    return this.__urlForName || (this.__urlForName = Ke(this)), L(
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
    return L(
      v.pathToRegexp.compile(e)(t),
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
    const { pathname: t, search: i, hash: o } = _(e) ? this.__createUrl(e, "http://a") : e;
    return E("go", { pathname: t, search: i, hash: o });
  }
}
const Je = /\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i, T = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;
function Ye() {
  function r() {
    return !0;
  }
  return fe(r);
}
function Ze() {
  try {
    return xe() ? !0 : et() ? T ? !tt() : !Ye() : !1;
  } catch {
    return !1;
  }
}
function xe() {
  return localStorage.getItem("vaadin.developmentmode.force");
}
function et() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}
function tt() {
  return !!(T && Object.keys(T).map((e) => T[e]).filter((e) => e.productionMode).length > 0);
}
function fe(r, e) {
  if (typeof r != "function")
    return;
  const t = Je.exec(r.toString());
  if (t)
    try {
      r = new Function(t[1]);
    } catch (i) {
      console.log("vaadin-development-mode-detector: uncommentAndRun() failed", i);
    }
  return r(e);
}
window.Vaadin = window.Vaadin || {};
const te = function(r, e) {
  if (window.Vaadin.developmentMode)
    return fe(r, e);
};
window.Vaadin.developmentMode === void 0 && (window.Vaadin.developmentMode = Ze());
function rt() {
}
const nt = function() {
  if (typeof te == "function")
    return te(rt);
};
window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];
window.Vaadin.registrations.push({
  is: "@vaadin/router",
  version: "1.7.4"
});
nt();
v.NavigationTrigger = { POPSTATE: Pe, CLICK: Re };
const it = new v(document.getElementById("app"));
it.setRoutes([
  {
    path: "/",
    component: "ajm-home",
    // @ts-ignore
    action: () => import("./ajm-home-c8519295.js")
  },
  {
    path: "/about",
    component: "ajm-about",
    // @ts-ignore
    action: () => import("./ajm-about-4fcbbc6a.js")
  },
  {
    path: "/work",
    component: "ajm-work",
    // @ts-ignore
    action: () => import("./ajm-work-625eba48.js")
  },
  {
    path: "/tinkerings",
    component: "ajm-tinkerings",
    // @ts-ignore
    action: () => import("./ajm-tinkerings-5face212.js")
  },
  {
    path: "/technologist",
    component: "ajm-technologist",
    // @ts-ignore
    action: () => import("./ajm-technologist-7c135f7f.js")
  },
  {
    path: "/classicist",
    component: "ajm-classicist",
    // @ts-ignore
    action: () => import("./ajm-classicist-2e92cf23.js")
  },
  {
    path: "/futurist",
    component: "ajm-futurist",
    // @ts-ignore
    action: () => import("./ajm-futurist-474edae5.js")
  },
  {
    path: "/anachronist",
    component: "ajm-anachronist",
    // @ts-ignore
    action: () => import("./ajm-anachronist-ed8336ae.js")
  },
  {
    path: "(.*)",
    component: "ajm-404",
    // @ts-ignore
    action: () => import("./ajm-404-07fc385e.js")
  }
]);
