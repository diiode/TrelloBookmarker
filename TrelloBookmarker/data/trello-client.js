(function () {
    var opts = { "version": 1, "apiEndpoint": "https://api.trello.com", "authEndpoint": "https://trello.com", "key": "ff77d96d79604cbabcdbd340773c0980" };
    var deferred, isFunction, isReady, ready, waitUntil, wrapper, slice = [].slice;
    wrapper = function (c, g, b) {
        var f, d, k, w, y, l, m, n, r, s, p, z, x, t, e, u, v; n = b.key; e = b.token; d = b.apiEndpoint; k = b.authEndpoint; u = b.version; y = d + "/" + u + "/"; p = c.location; f = {
            version: function () { return u }, key: function () { return n }, setKey: function (a) { n = a }, token: function () { return e }, setToken: function (a) { e = a }, rest: function () {
                var a, c, d, h; c = arguments[0]; a = 2 <= arguments.length?slice.call(arguments, 1):[]; h = z(a); d = h[0]; a = h[1]; b = { url: "" + y + d, type: c, data: {}, dataType: "json", success: h[2], error: h[3] }; g.support.cors || (b.dataType = "jsonp",
"GET" !== c && (b.type = "GET", g.extend(b.data, { _method: c }))); n && (b.data.key = n); e && (b.data.token = e); null != a && g.extend(b.data, a); return g.ajax(b)
            }, authorized: function () { return null != e }, deauthorize: function () { e = null; v("token", e) }, authorize: function (a) {
                var q, d, h, f, k; b = g.extend(!0, { type: "redirect", persist: !0, interactive: !0, scope: { read: !0, write: !1, account: !1 }, expiration: "30days" }, a); a = /[&#]?token=([0-9a-f]{64})/; d = function () { if (b.persist && null != e) return v("token", e) }; b.persist && null == e && (e = x("token")); null ==
e && (e = null != (h = a.exec(p.hash))?h[1]:void 0); if (this.authorized()) return d(), p.hash = p.hash.replace(a, ""), "function" === typeof b.success?b.success():void 0; if (!b.interactive) return "function" === typeof b.error?b.error():void 0; f = function () { var a, c; a = b.scope; c = []; for (q in a) (k = a[q]) && c.push(q); return c }().join(","); switch (b.type) {
                    case "popup": (function () {
                            var a, q, e, h; waitUntil("authorized", function (a) {
                                return function (a) {
                                    return a?(d(), "function" === typeof b.success?b.success():void 0):"function" === typeof b.error?
b.error():void 0
                                }
                            }(this)); a = c.screenX + (c.innerWidth - 420) / 2; h = c.screenY + (c.innerHeight - 470) / 2; q = null != (e = /^[a-z]+:\/\/[^\/]*/.exec(p))?e[0]:void 0; return c.open(w({ return_url: q, callback_method: "postMessage", scope: f, expiration: b.expiration, name: b.name }), "trello", "width=420,height=470,left=" + a + ",top=" + h)
                        })(); break;default: c.location = w({ redirect_uri: p.href, callback_method: "fragment", scope: f, expiration: b.expiration, name: b.name })}
            }
        }; r = ["GET", "PUT", "POST", "DELETE"]; d = function (a) {
            return f[a.toLowerCase()] =
function () { return this.rest.apply(this, [a].concat(slice.call(arguments))) }
        }; l = 0; for (m = r.length; l < m; l++) t = r[l], d(t); f.del = f["delete"]; t = "actions cards checklists boards lists members organizations lists".split(" "); l = function (a) { return f[a] = { get: function (b, c, d, e) { return f.get(a + "/" + b, c, d, e) } } }; m = 0; for (r = t.length; m < r; m++) d = t[m], l(d); c.Trello = f; w = function (a) { return k + "/" + u + "/authorize?" + g.param(g.extend({ response_type: "token", key: n }, a)) }; z = function (a) {
            var b, c, d; c = a[0]; b = a[1]; d = a[2]; a = a[3]; isFunction(b) &&
(a = d, d = b, b = {}); c = c.replace(/^\/*/, ""); return [c, b, d, a]
        }; d = function (a) { var b; a.origin === k && (null != (b = a.source) && b.close(), e = null != a.data && 4 < a.data.length?a.data:null, isReady("authorized", f.authorized())) }; s = c.localStorage; null != s?(x = function (a) { return s["trello_" + a] }, v = function (a, b) { return null === b?delete s["trello_" + a]:s["trello_" + a] = b }):x = v = function () { }; "function" === typeof c.addEventListener && c.addEventListener("message", d, !1)
    }; deferred = {}; ready = {};
    waitUntil = function (c, g) { return null != ready[c]?g(ready[c]):(null != deferred[c]?deferred[c]:deferred[c] = []).push(g) }; isReady = function (c, g) { var b, f, d, k; ready[c] = g; if (deferred[c]) for (f = deferred[c], delete deferred[c], d = 0, k = f.length; d < k; d++) b = f[d], b(g) }; isFunction = function (c) { return "function" === typeof c }; wrapper(window, jQuery, opts);
})()