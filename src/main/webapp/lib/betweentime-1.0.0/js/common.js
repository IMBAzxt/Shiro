T.i18n.currentLocale = "zh-CN";
T.i18n.number.formatTime = function (d, g) {
    var b, f, h, e, a;
    if (d == "--") {
        return d
    }
    if (g == 2) {
        h = d / 60 | 0;
        e = Math.round(d) - h * 60;
        var c = "";
        if (h) {
            c += h + "&#039;"
        }
        c += e + "&quot;";
        return c
    }
    b = d / (24 * 3600) | 0;
    d = Math.round(d) - b * 24 * 3600;
    f = d / 3600 | 0;
    d = Math.round(d) - f * 3600;
    h = d / 60 | 0;
    e = Math.round(d) - h * 60;
    if (Math.round(b) < 10) {
        b = b > 0 ? "0" + b : ""
    }
    if (Math.round(f) < 10) {
        f = "0" + f
    }
    if (Math.round(h) < 10) {
        h = "0" + h
    }
    if (Math.round(e) < 10) {
        e = "0" + e
    }
    if (b) {
        a = b + " " + f + ":" + h + ":" + e
    } else {
        a = f + ":" + h + ":" + e
    }
    return a
};
T.config = T.config || {};
T.config.holidays = {
    "元旦节": /(^2011\/01\/0[1-3]$)|(^2012\/01\/0[1-3]$)|(^2013\/01\/0[1-3]$)|(^2014\/01\/01$)|(^201[5-6]\/01\/0[1-3]$)/,
    "春节": /(^2011\/02\/0[2-8]$)|(^2012\/01\/2[2-8]$)|(^2013\/02\/(09|1[0-5])$)|(^2014\/((01\/31)|(02\/0[1-6]))$)|(^2015\/(02\/(1[8-9]|2[0-4]))$)|(^2016\/(02\/(0[7-9]|1[0-3]))$)/,
    "情人节": /02\/14$/,
    "愚人节": /04\/01$/,
    "清明节": /(^2011\/04\/0[3-5]$)|(^2012\/04\/0[2-4]$)|(^2013\/04\/0[4-6]$)|(^2014\/04\/0[5-7]$)|(^2015\/04\/0[4-6]$)|(^2016\/04\/0[2-4]$)/,
    "劳动节": /(^2011\/(04\/30|05\/0[12])$)|(^201[2-3]\/(04\/(29|30)|05\/01)$)|(^201[4-5]\/05\/0[1-3]$)|(^2016\/(04\/30|05\/0[1-2])$)/,
    "儿童节": /06\/01$/,
    "端午节": /(^2011\/06\/0[4-6]$)|(^2012\/06\/2[2-4]$)|(^2013\/06\/1[0-2]$)|(^2014\/((05\/31)|(06\/0[1-2]))$)|(^2015\/06\/2[0-2]$)|(^2016\/06\/(09|1[0-1])$)/,
    "建军节": /08\/01$/,
    "中秋节": /(^2011\/09\/1[0-2]$)|(^2012\/09\/30$)|(^2013\/09\/(19|2[0-1])$)|(^2014\/09\/0[6-8]$)|(^2015\/09\/2[6-7]$)|(^2016\/09\/1[5-7]$)/,
    "国庆节": /10\/0[1-7]$/,
    "圣诞节": /12\/25$/
};
T.createClass = function (a) {
    return T.lang.createClass(function (b) {
        this.options = T.extend(T.object.clone(this.options), T.object.clone(b));
        this._init && this._init()
    }).extend(a)
};
T.createUI = function (a) {
    return T.ui.createUI(function (b) {
        this.uiType = this._type;
        this.classPrefix = this._type;
        this.options = T.extend(T.object.clone(this.options), T.object.clone(b));
        this._init && this._init()
    }).extend(a)
};
baidu.event.ons = function (d, b, a, c) {
    baidu.each(d, function (e) {
        baidu.on(e, b, a, c)
    })
};
baidu.event.uns = function (c, b, a) {
    baidu.each(c, function (d) {
        baidu.un(d, b, a)
    })
};
baidu.param = function (b) {
    var a = [];
    baidu.object.each(b, function (d, c) {
        if (d == null) {
            return
        }
        if (baidu.lang.isArray(d)) {
            baidu.each(d, function (e) {
                a.push(encodeURIComponent(c + "[]") + "=" + encodeURIComponent(e))
            })
        } else {
            a.push(encodeURIComponent(c) + "=" + encodeURIComponent(d))
        }
    });
    return a.join("&").replace(/%20/g, "+")
};
var EventRouter = {
    _events: {},
    _owner: null,
    register: function (a, b) {
        if (this._events[a]) {
            this._events[a].push(b)
        } else {
            this._events[a] = [b]
        }
    },
    dispatch: function (a) {
        var d = [].slice.call(arguments, 1);
        var c = this._events[a];
        if (c) {
            for (var b = 0; b < c.length; b++) {
                c[b].apply(this._owner, d)
            }
        }
        if (this._owner && T.lang.isFunction(this._owner[a])) {
            this._owner[a].apply(this._owner, d)
        }
    },
    setOwner: function (a) {
        this._owner = a
    }
};
(function () {
    var b = {};
    this.tmpl = function a(e, d) {
        var c = !/\W/.test(e) ? b[e] = b[e] || a(document.getElementById(e).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return d ? c(d) : c
    }
})();
(function () {
    var a = {};
    getUniqueId = function (c) {
        var d = c || 8;
        var e = "";
        while (d--) {
            e += b()
        }
        if (!a[e]) {
            a[e] = 1;
            return e
        } else {
            return getUniqueId(d)
        }
    };
    var b = function () {
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var c = d.length;
        return d.charAt(Math.floor(Math.random() * c))
    }
})();
T.lang.isUrl = T.lang.isUrl ||
        function (a) {
            return /^((https|http|ftp|rtsp|mms)?:\/\/)?(([\w-]+\.)+[a-z]{2,6}|((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d))(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i.test(a)
        };
T.dom.one = function (c, b) {
    if (T.isString(b)) {
        b = T.g(b)
    }
    var a = T.dom.query(c, b);
    if (a.length > 0) {
        return a[0]
    } else {
        return null
    }
};
T.setDynaValue = function (a) {
    var e = a;
    for (var c = 0; c < e.length; c++) {
        var b = e[c];
        var d = b.type;
        if (d == "text" || d == "hidden" || d == "textarea" || d == "button") {
            T.dom.setAttr(b, "dyna-value", b.value)
        } else {
            if (d == "radio" || d == "checkbox") {
                T.dom.setAttr(b, "dyna-checked", b.checked)
            }
        }
    }
};
(function () {
    var b = null;
    var a = null;
    T.on(document.body, "click", function (e) {
        var g = T.event.get(e).target;
        var f = null;
        var d = null;
        do {
            if (g != document) {
                if (T.dom.hasClass(g, "layer")) {
                    d = g
                }
                if (T.dom.hasAttr(g, "layer")) {
                    f = g
                }
            }
        } while (g = g.parentNode);
        var c = function (j, i) {
            if (i) {
                T.dom.addClass(j, "selected")
            } else {
                T.dom.removeClass(j, "selected")
            }
            T.each(T.q("arrow", j), function (k) {
                if (i) {
                    T.dom.addClass(k, "selected")
                } else {
                    T.dom.removeClass(k, "selected")
                }
            })
        };
        if (f == null) {
            if (a != null && d != a) {
                T.hide(a);
                c(b, false);
                EventRouter.dispatch("onchangeToggleTarget", b);
                a = null;
                b = null
            }
        } else {
            var h = T.dom.one(T.dom.getAttr(f, "layer"));
            if (h != null) {
                if (a != null && h != a) {
                    T.hide(a);
                    c(b, false)
                }
                a = null;
                b = null;
                if (h.style.display == "none" || T.dom.hasClass(h, "shared-layer")) {
                    T.show(h);
                    c(f, true);
                    if (!T.dom.hasClass(h, "non-excludable")) {
                        a = h
                    }
                    b = f
                } else {
                    T.hide(h);
                    c(f, false)
                }
            }
        }
    })
})();
baidu.string.format = function (c, a) {
    c = String(c);
    var b = Array.prototype.slice.call(arguments, 1),
            d = Object.prototype.toString;
    if (b.length) {
        b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a : b) : b;
        return c.replace(/(#|!)\{(.+?)(?:\s*,\s*(\d+?))*?\}/g, function (e, h, g, i) {
            var f = b[g];
            if ("[object Function]" == d.call(f)) {
                f = f(g)
            }
            if (i) {
                f = T.truncat(f, i)
            }
            if (h == "!") {
                f = T.string.encodeHTML(f)
            }
            return ("undefined" == typeof f ? "" : f)
        })
    }
    return c
};
baidu.format = baidu.string.format;
(function (a) {
    a.fn.bgiframe = (a.browser.ie && /msie 6.0/i.test(navigator.userAgent) ?
            function (e, d) {
                d = a.extend({
                    top: "auto",
                    left: "auto",
                    width: "auto",
                    height: "auto",
                    opacity: true,
                    src: "javascript:false;"
                }, d);
                var c = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + d.src + '"style="display:block;position:absolute;z-index:-1;' + (d.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (d.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : b(d.top)) + ";left:" + (d.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : b(d.left)) + ";width:" + (d.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : b(d.width)) + ";height:" + (d.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : b(d.height)) + ';"/>';
                return T.array.each(e, function (f) {
                    if (T.dom.query("iframe.bgiframe", f).length == 0) {
                        f.insertBefore(T.dom.create(c), f.firstChild)
                    }
                })
            } : function () {
        return this
    });
    a.fn.bgIframe = a.fn.bgiframe;

    function b(c) {
        return c && c.constructor === Number ? c + "px" : c
    }
})(T);
T.DataAdapter = T.createClass({
    options: {
        onflashError: function (a) {}
    },
    ConvertTableData: function (I) {
        var u = T.config.indexInfo.indexes;
        var f = T.array.map(u, function (i) {
            return i.id
        });
        var h = [];
        T.each(I.fields, function (j) {
            var i = T.array.indexOf(f, j);
            if (i > -1) {
                h.push(u[i])
            }
        });
        var m = h[0];
        var F = T.config.indexInfo.indicators;
        var x = T.array.map(F, function (i) {
            return i.id
        });
        var a = [];
        var t = [];
        var z = null;
        var v = null;
        T.each(I.fields, function (J, i) {
            if ("ratio_" + z == J) {
                t.push(v - t.length - 1)
            }
            z = J;
            v = i;
            var j = T.array.indexOf(x, J);
            if (j > -1) {
                a.push(F[j])
            }
        });
        var D = [];
        var b = [];
        var w = [];
        var H = false;
        var E = false;
        var q = 1;
        if (I.items[2] && I.items[2].length > 0) {
            H = true;
            q = 3
        }
        if (I.items[3] && I.items[3].length > 0) {
            E = true;
            q = 4
        }
        if (q > 1 && I.mergeIndex) {
            q = q - 1
        }
        T.array.each(h, function (i) {
            var j = {
                id: i.id,
                label: i.label,
                sortable: i.sortable,
                tip: i.tip,
                className: "table-index"
            };
            if (H && I.mergeIndex) {
                j.colspan = 2
            }
            D.push(j)
        });
        for (var B = 0; B < a.length; B++) {
            var s = a[B];
            D.push({
                id: s.id,
                label: s.label,
                sortable: s.sortable,
                tip: s.tip,
                className: s.type
            })
        }
        for (var B in I.items[0]) {
            var e = I.items[0][B];
            var r = I.items[1][B];
            var g = H ? I.items[2][B] : null;
            var l = E ? I.items[3][B] : null;
            if (!H) {
                var k = [];
                T.array.each(h, function (J, K) {
                    if (T.lang.isObject(e[K])) {
                        var j = {
                            id: J.id,
                            label: e[K].label,
                            className: "table-index"
                        };
                        if (e[K].expandable != null) {
                            j.expandable = e[K].expandable
                        }
                        if (e[K].hasOperation != null) {
                            j.hasOperation = e[K].hasOperation
                        }
                        if (e[K].data != null) {
                            j.data = e[K].data
                        }
                        k.push(j)
                    } else {
                        k.push({
                            id: J.id,
                            label: e[K],
                            className: "table-index"
                        })
                    }
                });
                for (var A = 0; A < a.length; A++) {
                    var s = a[A];
                    var p = this._formatTableText(r[A], s.type);
                    var d = T.array.indexOf(t, A);
                    if (d > -1) {
                        p = p + "(" + this._formatTableText(r[A + 1], "ratio") + ")";
                        r.splice(A, 1)
                    }
                    k.push({
                        id: s.id,
                        label: p,
                        className: s.type
                    })
                }
                b.push(k)
            } else {
                var c = [];
                var G = [];
                var n = [];
                var o = {
                    label: e[0],
                    className: "table-index"
                };
                if (T.lang.isObject(e[0])) {
                    o = {
                        id: m.id,
                        label: e[0].label,
                        className: "table-index"
                    };
                    if (e[0].expandable != null) {
                        o.expandable = e[0].expandable
                    }
                    if (e[0].hasOperation != null) {
                        o.hasOperation = e[0].hasOperation
                    }
                    if (e[0].data != null) {
                        o.data = e[0].data
                    }
                }
                if (I.mergeIndex) {
                    o.rowspan = 2;
                    c.push(o)
                } else {
                    b.push([o,
                        {
                            label: "&nbsp;",
                            className: "",
                            colspan: a.length
                        }])
                }
                c.push({
                    id: m.id,
                    label: r[0]
                });
                G.push({
                    id: m.id,
                    label: g[0]
                });
                E && n.push({
                    id: m.id,
                    label: l[0]
                });
                for (var A = 0; A < a.length; A++) {
                    var s = a[A];
                    var y = this._formatTableText(r[A + 1], s.type);
                    var C = this._formatTableText(g[A + 1], s.type);
                    var d = T.array.indexOf(t, A + 1);
                    if (d > -1) {
                        y = y + "(" + this._formatTableText(r[A + 2], "ratio") + ")";
                        C = C + "(" + this._formatTableText(g[A + 2], "ratio") + ")";
                        if (E) {
                            n.push({
                                id: s.id,
                                label: this._formatTableText(l[A + 2], "ratio"),
                                className: s.type
                            });
                            l.splice(A + 1, 1)
                        }
                        r.splice(A + 1, 1);
                        g.splice(A + 1, 1)
                    } else {
                        E && n.push({
                            id: s.id,
                            label: this._formatTableText(l[A + 1], "ratio"),
                            className: s.type
                        })
                    }
                    c.push({
                        id: s.id,
                        label: y,
                        className: s.type
                    });
                    G.push({
                        id: s.id,
                        label: C,
                        className: s.type
                    })
                }
                b.push(c);
                b.push(G);
                E && b.push(n)
            }
        }
        if (I.pageSum && I.pageSum.length > 0) {
            var r = I.pageSum[0];
            var g = H ? I.pageSum[1] : null;
            var l = E ? I.pageSum[2] : null;
            if (!H) {
                var k = [];
                if (m) {
                    k.push({
                        id: m.id,
                        label: "当页汇总"
                    })
                }
                if (a[0]) {
                    for (var B = 0; B < I.fields.length; B++) {
                        if (I.fields[B] == a[0].id) {
                            for (var A = (m ? 1 : 0); A < B; A++) {
                                k.push({
                                    id: I.fields[B],
                                    label: ""
                                })
                            }
                            break
                        }
                    }
                }
                for (var A = 0; A < a.length; A++) {
                    var s = a[A];
                    var p = this._formatTableText(r[A], s.type);
                    var d = T.array.indexOf(t, A);
                    if (d > -1) {
                        p = p + "(" + this._formatTableText(r[A + 1], "ratio") + ")";
                        r.splice(A, 1)
                    }
                    k.push({
                        id: s.id,
                        label: p,
                        className: s.type
                    })
                }
                w.push(k)
            } else {
                var c = [];
                var G = [];
                var n = [];
                if (m) {
                    w.push([{
                            id: m.id,
                            label: "当页汇总",
                            colspan: a.length + 1
                        }])
                }
                c.push({
                    id: m.id,
                    label: r[0]
                });
                G.push({
                    id: m.id,
                    label: g[0]
                });
                E && n.push({
                    id: m.id,
                    label: l[0]
                });
                for (var A = 0; A < a.length; A++) {
                    var s = a[A];
                    var y = this._formatTableText(r[A + 1], s.type);
                    var C = this._formatTableText(g[A + 1], s.type);
                    var d = T.array.indexOf(t, A);
                    if (d > -1) {
                        y = y + "(" + this._formatTableText(r[A + 2], "ratio") + ")";
                        C = C + "(" + this._formatTableText(g[A + 2], "ratio") + ")";
                        if (E) {
                            n.push({
                                id: s.id,
                                label: this._formatTableText(l[A + 2], "ratio"),
                                className: s.type
                            });
                            l.splice(A + 1, 1)
                        }
                        r.splice(A + 1, 1);
                        g.splice(A + 1, 1)
                    } else {
                        E && n.push({
                            id: s.id,
                            label: this._formatTableText(l[A + 1], "ratio"),
                            className: s.type
                        })
                    }
                    c.push({
                        id: s.id,
                        label: y,
                        className: s.type
                    });
                    G.push({
                        id: s.id,
                        label: C,
                        className: s.type
                    })
                }
                w.push(c);
                H && w.push(G);
                E && w.push(n)
            }
        }
        if (I.sum && I.sum.length > 0) {
            for (var A = 0; A < a.length; A++) {
                var s = a[A];
                var d = T.array.indexOf(t, H ? A + 1 : A);
                if (d > -1) {
                    I.sum[0][A] = this._formatTableText(I.sum[0][A], s.type) + "(" + this._formatTableText(I.sum[0][A + 1], "ratio") + ")";
                    I.sum[0].splice(A + 1, 1);
                    if (H) {
                        I.sum[1][A] = this._formatTableText(I.sum[1][A], s.type) + "(" + this._formatTableText(I.sum[1][A + 1], "ratio") + ")";
                        I.sum[1].splice(A + 1, 1)
                    }
                } else {
                    I.sum[0][A] = this._formatTableText(I.sum[0][A], s.type);
                    if (H) {
                        I.sum[1][A] = this._formatTableText(I.sum[1][A], s.type)
                    }
                }
            }
        }
        I.thead = D;
        I.tbody = b;
        I.tfoot = w;
        I.group = q;
        I.isCompare = H;
        I.indicators = a;
        return I
    },
    ConvertSimpleTableData: function (t) {
        var k = T.config.indexInfo.indexes;
        var d = T.array.map(k, function (i) {
            return i.id
        });
        var f = null;
        T.each(t.fields, function (j) {
            var i = T.array.indexOf(d, j);
            if (i > -1) {
                f = k[i]
            }
        });
        var s = T.config.indexInfo.indicators;
        var o = T.array.map(s, function (i) {
            return i.id
        });
        var a = [];
        T.each(t.fields, function (j) {
            var i = T.array.indexOf(o, j);
            if (i > -1) {
                a.push(s[i])
            }
        });
        var r = [];
        var b = [];
        var m = [];
        var g = 1;
        var c = {
            id: f.id,
            label: f.label,
            sortable: f.sortable,
            tip: f.tip,
            className: "table-index"
        };
        r.push(c);
        for (var q = 0; q < a.length; q++) {
            var h = a[q];
            r.push({
                id: h.id,
                label: h.label,
                sortable: h.sortable,
                tip: h.tip,
                className: h.type
            })
        }
        for (var q in t.items) {
            var l = t.items[q];
            var e = [];
            var n = 0;
            if (f) {
                e.push({
                    id: f.id,
                    label: l[0],
                    className: "table-index"
                });
                n = 1
            }
            for (var p = 0; p < a.length; p++) {
                var h = a[p];
                e.push({
                    id: h.id,
                    label: this._formatTableText(l[p + n], h.type),
                    className: h.type
                })
            }
            b.push(e)
        }
        t.thead = r;
        t.tbody = b;
        t.tfoot = m;
        t.group = g;
        t.isCompare = false;
        t.indicators = a;
        return t
    },
    ConvertSubTableData: function (b) {
        var m = T.config.subTableIndicators;
        var g = T.array.map(m, function (i) {
            return i.id
        });
        var h = [];
        T.each(b.fields, function (j) {
            var i = T.array.indexOf(g, j);
            if (i > -1) {
                h.push(m[i])
            }
        });
        var f = [];
        var d = [];
        for (var c = 0; c < h.length; c++) {
            var k = h[c];
            f.push({
                id: k.id,
                label: k.label,
                sortable: k.sortable,
                className: k.type
            })
        }
        for (var c in b.items) {
            var e = b.items[c];
            var l = [];
            for (var a = 0; a < h.length; a++) {
                var k = h[a];
                l.push({
                    id: k.id,
                    label: this._formatTableText(e[a], k.type),
                    className: k.type
                })
            }
            d.push(l)
        }
        b.thead = f;
        b.tbody = d;
        b.indicators = h;
        return b
    },
    _formatTableText: function (b, a) {
        if (b == null) {
            return ""
        }
        if (b == "--") {
            return b
        }
        if (T.lang.isString(a)) {
            switch (a) {
                case "number":
                    return T.i18n.number.formatNumber(b);
                case "ratio":
                    return T.i18n.number.formatRatio(b);
                case "time":
                    return T.i18n.number.formatTime(b);
                case "time2":
                    return T.i18n.number.formatTime(b, 2)
            }
        }
        return b
    },
    ConvertFlowData: function (f) {
        var g = {};
        for (var d in f) {
            var a = f[d].items;
            var b = a[0],
                    e = a[1];
            var c = [];
            T.array.each(b, function (j, h) {
                c.push(j.concat(e[h]))
            });
            g[d] = c
        }
        return g
    },
    convertFlashDataFormat: function (a) {
        if (a.by == null) {
            a.by = "day"
        }
        var c, b = a.type;
        switch (b) {
            case "line":
                if (a.duplicated) {
                    this.hanldeDuplicatedLabels(a)
                }
                c = this.convertFlashLineDataFormat(a);
                break;
            case "linepie":
                c = this.convertFlashLinePieDataFormat(a);
                break;
            case "area":
                c = this.convertFlashAreaDataFormat(a);
                break;
            case "pie":
                c = this.convertFlashPieDataFormat(a);
                break;
            case "areapie":
                c = this.convertFlashAreaPieDataFormat(a);
                break;
            case "circle":
                c = this.convertFlashCircleDataFormat(a);
                break;
            case "circlegraph":
                c = this.convertFlashCircleGraphDataFormat(a);
                break;
            case "bar":
                c = this.convertFlashBarDataFormat(a);
                break;
            default:
                break
        }
        return c
    },
    hanldeDuplicatedLabels: function (f) {
        var d = f.labelSuffixes;
        var b = f.fields;
        for (var g = 1, c = b.length; g < c - 2; g = g + 2) {
            var a = 0;
            for (var e = g + 2; e < c; e = e + 2) {
                var h = d[(e - 1) / 2].split("-")[0];
                if (b[g] === b[e]) {
                    b[e] += "(" + h + ")";
                    b[e + 1] += "(" + h + ")";
                    a++
                }
            }
            if (a) {
                h = d[(g - 1) / 2].split("-")[0];
                b[g] += "(" + h + ")";
                b[g + 1] += "(" + h + ")"
            }
        }
    },
    convertFlashPieDataFormat: function (n) {
        var j = n.flashId,
                f = n.fields,
                h = n.items;
        var a = ["label", "value", "ratio"],
                m = [],
                b = [];
        var d = h[0],
                k = h[1];
        if ((d == null || d.length == 0) || (k == null || k.length == 0)) {
            this._showErrorTip(j);
            return
        }
        for (var e = 1, c = f.length; e < c; e++) {
            if (/^ratio/i.test(f[e])) {
                b.push(e - 1)
            }
        }
        for (var e in b) {
            var g = b[e];
            T.array.each(k, function (i) {
                i[g] = i[g] + "%"
            })
        }
        T.array.each(d, function (o, l) {
            m.push(o.concat(k[l]))
        });
        return {
            flashId: j,
            type: n.type,
            units: this._getUnits([n.indicator]),
            indicator: this._getIndicatorLabel(n.indicator),
            fields: a,
            items: m
        }
    },
    convertFlashLinePieDataFormat: function (c) {
        var s = c.flashId,
                h = c.line,
                f = h.fields,
                t = h.items,
                k = c.pie,
                a = k.fields,
                e = k.items,
                g = [];
        var n = ["label"],
                d = [];
        var m = t[0],
                r = t[1];
        if ((m == null || m.length == 0) || (r == null || r.length == 0)) {
            this._showErrorTip(s);
            return
        }
        for (var p = 1, o = f.length; p < o; p++) {
            n.push(f[p])
        }
        T.array.each(m, function (u, l) {
            d.push(u.concat(r[l]))
        });
        this._addLineTip(c, n, d, "SmallTip", g);
        var b = ["label", "value"],
                q = [];
        var j = e[0],
                r = e[1];
        T.array.each(j, function (u, l) {
            q.push(u.concat(r[l]))
        });
        return {
            flashId: s,
            type: c.type,
            units: this._getUnits([c.indicator]),
            highlightIndexs: g,
            indicator: this._getIndicatorLabel(c.indicator),
            bar: c.bar,
            line: {
                fields: n,
                items: d
            },
            pie: {
                fields: b,
                items: q
            }
        }
    },
    convertFlashCircleGraphDataFormat: function (d) {
        var e = d.flashId,
                a = d.fields,
                b = d.items;
        var f = ["label", "dataB", "dataL", "dataR"],
                h = [];
        var c = b[0],
                g = b[1];
        if ((c == null || c.length == 0) || (g == null || g.length == 0)) {
            this._showErrorTip(e);
            return
        }
        T.array.each(c, function (k, j) {
            h.push(k.concat(g[j]))
        });
        return {
            flashId: e,
            fields: f,
            items: h,
            type: d.type
        }
    },
    convertFlashBarDataFormat: function (a) {
        var b = a.flashId,
                e = [];
        var f = this._convertFlashDataFormat(a);
        var c = f.flashFields,
                d = f.flashItems;
        return {
            flashId: b,
            fields: c,
            units: this._getUnits(a.fields),
            items: d,
            type: a.type,
            highlightIndexs: e,
            indicator: this._getIndicatorLabel(a.indicator)
        }
    },
    convertFlashCircleDataFormat: function (n) {
        var j = n.flashId,
                f = n.fields,
                h = n.items;
        var a = ["label", "value", "ratio"],
                m = [],
                b = [];
        var d = h[0],
                k = h[1];
        if ((d == null || d.length == 0) || (k == null || k.length == 0)) {
            this._showErrorTip(j);
            return
        }
        for (var e = 1, c = f.length; e < c; e++) {
            if (/^ratio/i.test(f[e])) {
                b.push(e - 1)
            }
        }
        for (var e in b) {
            var g = b[e];
            T.array.each(k, function (i) {
                i[g] = i[g] + "%"
            })
        }
        T.array.each(d, function (o, l) {
            m.push(o.concat(k[l]))
        });
        return {
            flashId: j,
            fields: a,
            units: this._getUnits(f),
            items: m,
            type: n.type,
            indicator: this._getIndicatorLabel(n.indicator)
        }
    },
    convertFlashAreaPieDataFormat: function (a) {
        return this.convertFlashAreaDataFormat(a)
    },
    convertFlashWorldMapDataFormat: function (a) {
        return this.convertFlashAreaDataFormat(a)
    },
    convertFlashAreaDataFormat: function (s) {
        var p = s.flashId,
                h = s.fields,
                n = s.items;
        var a = ["label", "value", "ratio", "color"],
                q = [];
        var c = n[0],
                r = n[1],
                o = n[2];
        if ((c == null || c.length == 0) || (r == null || r.length == 0)) {
            this._showErrorTip(p);
            return
        }
        T.array.each(c, function (t, l) {
            q.push(t.concat(r[l]))
        });
        var e = 0,
                j = 1;
        for (var f = 0, b = q.length; f < b; f++) {
            var r = q[f],
                    m = r[r.length - 1];
            e = Math.max(e, m);
            j = Math.min(j, m)
        }
        var k = (e - j) / 5,
                g = [e, e - k, e - k * 2, e - k * 3, e - k * 4, j];
        for (var f = 0, b = q.length; f < b; f++) {
            var r = q[f],
                    m = r[r.length - 1],
                    d;
            r[r.length - 1] = r[r.length - 1] + "%";
            if (m <= g[0] && m > g[1]) {
                d = "0x1556a1"
            } else {
                if (m <= g[1] && m > g[2]) {
                    d = "0x136bd4"
                } else {
                    if (m <= g[2] && m > g[3]) {
                        d = "0x6c98d5"
                    } else {
                        if (m <= g[3] && m > g[4]) {
                            d = "0x9fccff"
                        } else {
                            d = "0xdcecff"
                        }
                    }
                }
            }
            r.push(d)
        }
        return {
            flashId: p,
            fields: a,
            units: this._getUnits(h),
            items: q,
            type: s.type,
            indicator: this._getIndicatorLabel(s.indicator)
        }
    },
    convertFlashLineDataFormat: function (a) {
        var b = a.flashId,
                g = a.timeSpan,
                e = [],
                h = a.tipLabel || "BigTip";
        var f = this._convertFlashDataFormat(a);
        var c = f.flashFields,
                d = f.flashItems;
        this._addLineTip(a, c, d, h, e);
        return {
            flashId: b,
            fields: c,
            units: this._getUnits(a.fields, a.items[2] ? a.items[2].length : 0),
            items: d,
            type: a.type,
            highlightIndexs: e,
            indicator: this._getIndicatorLabel(a.indicator)
        }
    },
    _addLineTip: function (a, b, d, e, c) {
        if (a.by == "hour") {
            b.push(b[0] + e);
            T.array.each(d, function (f) {
                var g = T.config.lineChartDayTimeMap[f[0]];
                if (g) {
                    f.push(g)
                } else {
                    f.push(f[0])
                }
            });
            T.array.each(d, function (g, f) {
                if (f == d.length - 1) {
                    g[0] = f + "/点"
                } else {
                    g[0] = f
                }
            })
        } else {
            if (a.by == "day") {
                b.push(b[0] + e);
                T.array.each(d, function (g, f) {
                    T.array.each(g, function (p, k) {
                        if (k > 0) {
                            return
                        }
                        var n = false,
                                m;
                        for (var i in T.config.holidays) {
                            m = T.config.holidays[i];
                            if (m.test(p)) {
                                this.push(p + " (" + i + ")");
                                c.push(f);
                                n = true;
                                break
                            }
                        }
                        if (!n) {
                            var m = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
                            if (m.test(p)) {
                                var l = new Date(p),
                                        h = l.getDay(),
                                        o;
                                switch (h) {
                                    case 0:
                                        o = p + " (星期日) ";
                                        break;
                                    case 6:
                                        o = p + " (星期六) ";
                                        break;
                                    default:
                                        o = p;
                                        break
                                }
                                this.push(o);
                                if (h == 0 || h == 6) {
                                    c.push(f);
                                    n = true
                                }
                            }
                        }
                    })
                })
            }
        }
    },
    _filterFlashData: function (d) {
        var a = d.fields,
                c = d.items;
        var f = c[1],
                g = c[2];
        var b = new T.Indicator({
            indicators: T.config.indexInfo.flashIndicators
        });
        var e = b.map(a);
        T.array.each(e, function (j, h) {
            if (j) {
                T.array.each(f, function (k, i) {
                    k[h - 1] = j.format(k[h - 1])
                });
                T.array.each(g, function (k, i) {
                    k[h - 1] = j.format(k[h - 1])
                })
            }
        })
    },
    _convertFlashDataFormat: function (c) {
        var t = c.flashId,
                r = c.timeSpan,
                k = c.fields,
                j = c.items,
                g = c.tipLabel || "BigTip";
        var m = j[0],
                s = j[1],
                a = j[2];
        var d = [],
                p = [],
                n = [];
        if ((m == null || m.length == 0) || (s == null || s.length == 0)) {
            this._showErrorTip(t, c);
            return {
                flashFields: [],
                flashItems: []
            }
        }
        d.push("label");
        var e = new T.Indicator({
            indicators: T.config.indexInfo.flashIndicators
        });
        var h = e.map(k);
        if (!a || a.length == 0) {
            for (var q = 1, o = h.length; q < o; q++) {
                if (h[q]) {
                    d.push(h[q].label)
                } else {
                    if (/^ratio/i.test(k[q])) {
                        d.push(d[d.length - 1] + g);
                        n.push(q - 1)
                    } else {
                        d.push(k[q])
                    }
                }
            }
            T.array.each(s, function (i) {
                T.array.each(i, function (v, l) {
                    if (T.array.contains(n, l)) {
                        if (h[l]) {
                            i[l] = h[l].format(i[l - 1]) + " | 占比: " + T.i18n.number.formatRatio(i[l])
                        } else {
                            i[l] = T.i18n.number.formatNumber(i[l - 1]) + " | 占比: " + T.i18n.number.formatRatio(i[l])
                        }
                    } else {
                        var u = h[l + 1];
                        if (u && !T.array.contains(k, "ratio_" + u.id)) {
                            if (!T.array.contains(d, d[l + 1] + g)) {
                                d.push(d[l + 1] + g)
                            }
                            i.push(u.format(i[l]))
                        }
                    }
                })
            });
            T.array.each(m, function (u, l) {
                p.push(u.concat(s[l]))
            })
        } else {
            T.array.each(k, function (u, l) {
                if (/^ratio/i.test(u)) {
                    n.push(l - 1)
                }
            });
            T.array.each(r, function (i) {
                d.push(i);
                d.push(i + g)
            });
            T.array.each(s, function (i) {
                T.array.each(i, function (v, l) {
                    if (l == 0) {
                        return
                    }
                    if (T.array.contains(n, l)) {
                        if (h[l]) {
                            i[l] = h[l].format(i[l - 1]) + " | 占比: " + T.i18n.number.formatRatio(i[l])
                        } else {
                            i[l] = T.i18n.number.formatNumber(i[l - 1]) + " | 占比: " + T.i18n.number.formatRatio(i[l])
                        }
                    } else {
                        var u = h[l + 1];
                        if (u && !T.array.contains(k, "ratio_" + u.id)) {
                            i.push(u.format(i[l]))
                        }
                    }
                })
            });
            T.array.each(a, function (i) {
                T.array.each(i, function (v, l) {
                    if (l == 0) {
                        return
                    }
                    if (T.array.contains(n, l)) {
                        if (h[l]) {
                            i[l] = h[l].format(i[l - 1]) + " | 占比: " + T.i18n.number.formatRatio(i[l])
                        } else {
                            i[l] = T.i18n.number.formatNumber(i[l - 1]) + " | 占比: " + T.i18n.number.formatRatio(i[l])
                        }
                    } else {
                        var u = h[l + 1];
                        if (u && !T.array.contains(k, "ratio_" + u.id)) {
                            i.push(u.format(i[l]))
                        }
                    }
                })
            });
            if (c.by == "hour") {
                var b = T.array.map(T.object.clone(s), function (i) {
                    T.array.removeAt(i, 0);
                    return i
                });
                var f = T.array.map(T.object.clone(a), function (i) {
                    T.array.removeAt(i, 0);
                    return i
                });
                T.array.each(m, function (u, l) {
                    p.push(u.concat(b[l], f[l]))
                })
            } else {
                var f = T.array.map(T.object.clone(a), function (i) {
                    T.array.removeAt(i, 0);
                    return i
                });
                T.array.each(s, function (u, l) {
                    p.push(s[l].concat(f[l]))
                })
            }
        }
        T.each(d, function (l, i) {
            d[i] = this._encodeHTML(l)
        }, this);
        return {
            flashFields: d,
            flashItems: p
        }
    },
    _showErrorTip: function (b, a) {
        var c = T.swf.getMovie(b);
        c.showErrorTip("暂无数据");
        this.options.onflashError(b, a)
    },
    _getIndicatorLabel: function (b) {
        if (!b) {
            return
        }
        var a = b.split(","),
                c = [];
        T.array.each(a, function (e) {
            var d = T.array.find(T.config.indexInfo.flashIndicators, function (f, g) {
                return e == f.id
            });
            if (d) {
                c.push(d.label)
            }
        });
        return c.join()
    },
    _getUnits: function (a, d) {
        var c = T.array.map(a, function (e) {
            return T.array.find(T.config.indexInfo.flashIndicators, function (f) {
                return e == f.id
            })
        });
        var b = [];
        T.array.each(c, function (e) {
            if (e) {
                var f = e.unit;
                if (!T.array.contains(b, f)) {
                    b.push(f)
                }
            }
        });
        if (d && d != 0) {
            b = b.concat(b)
        }
        return b
    },
    _encodeHTML: function (a) {
        return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }
});
T.DateCompare = T.createClass({
    options: {
        containerId: "FlashTimeCompare",
        onchange: function () {},
        isComparable: 0,
        checkedId: null,
        date: null
    },
    _checkedId: null,
    params: {},
    _init: function () {
        this._checkedId = this.options.checkedId;
        var j = T.g(this._checkedId);
        if (j) {
            j.checked = true
        }
        var a = T.g(this.options.containerId);
        if (a) {
            var f = a.getElementsByTagName("input");
            T.event.ons(f, "click", this._onchange())
        }
        var k = T.g("DateSelectBar");
        if (k) {
            var h = k.getElementsByTagName("a");
            for (var d = 0, b = h.length; d < b; d++) {
                var c = h[d];
                if (c.className.indexOf("cur") != -1) {
                    var g = c.href.indexOf("#");
                    if (g != -1) {
                        var e = parseInt(c.href.substring(g + 1, c.href.length));
                        if (e == 0 || e == -1) {
                            this.params.st = this.params.et = parseInt(T.config.systemConfig.now) + e * 3600 * 24 * 1000;
                            this.show(this.params.st)
                        } else {
                            this.hide()
                        }
                        break
                    }
                }
                if (T.config.pageInfo && T.config.pageInfo.st && T.config.pageInfo.st != T.config.pageInfo.et) {
                    this.hide()
                }
            }
        }
    },
    _onchange: function () {
        var a = this;
        return function () {
            var d = this.id,
                    b = a._checkedId;
            if (!b) {
                a._checkedId = d
            } else {
                var c = T.g(b);
                if (b != d) {
                    c.checked = false;
                    a._checkedId = d
                } else {
                    a._checkedId = null
                }
            }
            a._handleParams();
            a.options.onchange(a.params, a.options.isComparable)
        }
    },
    checkComparation: function (a) {
        var c = T.g(this.options.containerId);
        if (c) {
            switch (a) {
                case 0:
                    this._checkedId = "LastDay";
                    break;
                case 1:
                    this._checkedId = "LastWeek";
                    break;
                case 2:
                    this._checkedId = "LastMonth";
                    break;
                default:
                    this._checkedId = null
            }
            var b = c.getElementsByTagName("input");
            for (var d = 0, e = b.length; d < e; d++) {
                b[d].checked = (d == a)
            }
        }
    },
    hide: function () {
        var a = T.g(this.options.containerId);
        if (a) {
            a.style.display = "none";
            this.params.st2 = null;
            this.params.et2 = null;
            this.options.isComparable = 0
        }
    },
    show: function (c, b) {
        var a = T.g(this.options.containerId);
        if (a) {
            var f = T.date.format(new Date(c), "yyyy-MM-dd");
            c = T.date.parse(f);
            this.options.date = c.getTime();
            if (!b) {
                this._handleParams()
            } else {
                var e = baidu.G("DateSelectBar").getElementsByTagName("A");
                if (this.params.st2 + 1000 * 3600 * 24 == this.params.st) {
                    this.checkComparation(0)
                } else {
                    if (this.params.st2 + 1000 * 3600 * 24 * 7 == this.params.st) {
                        this.checkComparation(1)
                    } else {
                        if (this.params.st2 + 1000 * 3600 * 24 * 30 == this.params.st) {
                            this.checkComparation(2)
                        } else {
                            this.checkComparation()
                        }
                    }
                }
            }
            a.style.display = "block"
        }
    },
    _handleParams: function () {
        var a = this.options.date;
        var d = T.g("LastDay");
        var c = T.g("LastWeek");
        var b = T.g("LastMonth");
        if (d && d.checked) {
            this.params.et2 = this.params.st2 = a - 3600 * 24 * 1000;
            this.options.isComparable = 1
        } else {
            if (c && c.checked) {
                this.params.et2 = this.params.st2 = a - 7 * 3600 * 24 * 1000;
                this.options.isComparable = 1
            } else {
                if (b && b.checked) {
                    this.params.et2 = this.params.st2 = a - 30 * 3600 * 24 * 1000;
                    this.options.isComparable = 1
                } else {
                    this.options.isComparable = 0;
                    this.params.st2 = null;
                    this.params.et2 = null
                }
            }
        }
    },
    setDate: function (a) {
        var b = T.date.format;
        this.params.st = new Date(b(new Date(a.st), "yyyy-MM-dd")).getTime();
        this.params.et = new Date(b(new Date(a.et), "yyyy-MM-dd")).getTime();
        if (a.st2) {
            this.params.st2 = new Date(b(new Date(a.st2), "yyyy-MM-dd")).getTime()
        } else {
            this.params.st2 = null
        }
        if (a.et2) {
            this.params.et2 = new Date(b(new Date(a.et2), "yyyy-MM-dd")).getTime()
        } else {
            this.params.et2 = null
        }
    },
    checked: function () {
        return T.g("LastDay").checked || T.g("LastWeek").checked || T.g("LastMonth").checked
    }
});
T.ui.DatePicker = T.createUI({
    _type: "datepicker",
    options: {
        containerId: null,
        calendarContainerId: null,
        defaultText: "自定义时间段",
        singleSelection: false,
        maxSelectDays: null,
        calendarCount: 2,
        toolTipClass: "date-select-tip",
        btnBarClass: "button-bar",
        calendarContainerClass: "calendar-box",
        onchange: T.fn.blank,
        onshow: T.fn.blank,
        onhide: T.fn.blank,
        onselect: T.fn.blank,
        oninit: T.fn.blank,
        setDateText: function (c, b) {
            var a = T.g(this.options.containerId);
            T.dom.one(".text", a).innerHTML = (c == b) ? c : c + " - " + b
        },
        startDate: null,
        endDate: null,
        todayDate: new Date(),
        firstDate: new Date(1970, 1, 1),
        lastDate: new Date()
    },
    calendarContainerId: "calendarContainer",
    tpl: '<iframe src="about:blank" frameborder="0" scrolling="no" id="#{maskIframeId}"></iframe><div class="date-calendar-body"></div><div class="#{toolTipClass}"></div><div class="#{btnBarClass}"><a class="button" href="javascript:void(0)">确定</a><a href="javascript:void(0)">取消</a></div>',
    _init: function () {
        var a = this;
        this.selected = {};
        if (this.options.calendarContainerId) {
            this.dateBox = T.g(this.options.calendarContainerId);
            T.dom.addClass(this.dateBox, this.options.calendarContainerClass)
        }
        if (this.dateBox) {
            this.eventHandle = this.showDateBox2()
        } else {
            this.eventHandle = this.showDateBox()
        }
        this.hideDateBoxFn = this.hideDateBoxHandle();
        this.submitDateSFn = this.submitDateSelect();
        this.initInputDate();
        T.event.on(this.options.containerId, "click", this.eventHandle);
        this.options.oninit.call(this)
    },
    setDate: function (a, b) {
        this.options.startDate = a;
        this.options.endDate = b;
        this.initInputDate();
        this.options.onchange.call(this, "submitDateSelect")
    },
    set: function (a, b) {
        if (!a) {
            return
        }
        if (typeof a == "string") {
            this.options[a] = b
        } else {
            if (typeof a == "object") {
                T.extend(this.options, a)
            }
        }
    },
    _create: function (d) {
        if (!this.options.calendarContainerId) {
            T.event.fire(document.body, "click")
        }
        this._createCalendar(d);
        if (d) {
            this.hideDateBoxFn && this.hideDateBoxFn()
        } else {
            d = T.g(this.calendarContainerId);
            T.on(document, "click", this.hideDateBoxFn)
        }
        var c = T.dom.one("." + this.options.btnBarClass, d);
        if (c) {
            var a = T.dom.one(".button", c);
            var b = T.dom.next(a);
            T.on(a, "click", this.submitDateSFn);
            T.on(b, "click", this.hideDateBoxFn)
        }
    },
    _destroy: function () {
        T.un(document, "click", this.hideDateBoxFn);
        var d = this.dateBox || T.g(this.calendarContainerId);
        if (d) {
            var c = T.dom.one("." + this.options.btnBarClass, d);
            if (c) {
                var a = T.dom.one(".button", c);
                var b = T.dom.next(a);
                T.un(a, "click", this.submitDateSFn);
                T.un(b, "click", this.hideDateBoxFn)
            }
            this.dateBox || T.hide(d)
        }
    },
    _createCalendarContainer: function () {
        var b = this,
                a = b.options;
        var c = document.createElement("DIV");
        c.id = this.calendarContainerId;
        c.className = a.calendarContainerClass;
        c.innerHTML = baidu.format(this.tpl, {
            maskIframeId: "mask-iframe",
            toolTipClass: a.toolTipClass,
            btnBarClass: a.btnBarClass
        });
        document.body.appendChild(c);
        T.event.on(c, "click", function (d) {
            T.event.stopPropagation(d)
        });
        return c
    },
    _createCalendar: function (d) {
        if (!d) {
            d = T.g(this.calendarContainerId) || this._createCalendarContainer()
        }
        var c = T.dom.query(".date-calendar-body", d);
        this.showMessage();
        var g = this,
                b = this.options;
        var h = b.todayDate;
        var e = b.firstDate;
        var j = b.lastDate;
        var f = b.todayDate.getTime();
        var a = 3600 * 24 * 1000;
        var i = baidu.date.format;
        this.dateSelector = new DateSelector({
            calendarCount: b.calendarCount,
            singleSelection: b.singleSelection,
            autoFill: 0,
            onviewchange: function (l) {
                var k = new Date(f + a * 31);
                k.setDate(1);
                if (l.to - k > 0) {
                    return false
                }
            },
            dateStyle: function (k) {
                if ((j && (k - j > 0)) || k - e < 0) {
                    return "color:#999;cursor:default;background:#fff"
                }
                if (i(k, "yyyy-MM-dd") == i(h, "yyyy-MM-dd")) {
                    return "font-weight:bold; border:1px solid #a7aebc"
                }
            },
            byWeekStyle: function (l) {
                var k = new Date(l.getFullYear(), l.getMonth(), l.getDate() - 6);
                if (k - e < 0 || (j && (l - j) > 0)) {
                    return "color:#999;cursor:default;background:#fff"
                }
            },
            byMonthStyle: function (k) {
                if ((k - e < 0) || (j && (k - j) > 0)) {
                    return "color:#bcbcbc;cursor:default;background:#e9e9e9"
                }
            },
            sideButtonClass: function (k) {
                var l = j;
                if (k.type == "nextmonth" && k.to >= new Date(l.getFullYear(), l.getMonth(), 1)) {
                    return "ds-nextmonth-ed"
                }
            }
        });
        this.dateSelector.viewDate = new Date(f - a * 1);
        this.dateSelector.onselect = function (l, k) {
            var o = l.from;
            var n = l.to;
            if (j && (j - n < 0)) {
                g.showMessage("超出时间范围，请重新选择。");
                return false
            }
            if ((n - h) > 0 || (n - e) < 0 || ((o - e) < 0 && k !== 3)) {
                g.showMessage("您所选日期内暂无数据，请重新选择。");
                return false
            }
            var m = (n - o) / a;
            if (m > 365) {
                g.showMessage("查询范围不能超出365天!");
                return false
            } else {
                if (typeof b.maxSelectDays == "number" && m > b.maxSelectDays - 1) {
                    g.showMessage("非常抱歉，时间范围查询不能超出" + b.maxSelectDays + "天!");
                    return false
                }
            }
            g.showMessage();
            g.selected = l;
            g.onSelect()
        };
        T.dom.empty(c[0]);
        this.dateSelector.appendTo(c[0])
    },
    showMessage: function (c) {
        var b = this.dateBox;
        if (!this.dateBox) {
            b = T.g(this.calendarContainerId)
        }
        var a = T.dom.query("." + this.options.toolTipClass, b)[0];
        if (a) {
            a.style.display = "block";
            a.innerHTML = c || ""
        }
    },
    showDateBox: function () {
        var b = this,
                a = b.options;
        return function (h) {
            T.event.stop(h);
            b._create();
            b.msg = "";
            var n = baidu.date.format;
            var g = baidu.date.parse;
            var c = T.g(b.calendarContainerId);
            var o = baidu.dom.getPosition;
            c.style.display = "block";
            b.dateSelector.clickState = "from";
            var l = a.startDate;
            var m = a.endDate;
            b.selected.from = l;
            b.selected.to = m;
            if (l) {
                l = new Date(n(l, "yyyy-MM-dd")).getTime();
                m = new Date(n(m, "yyyy-MM-dd")).getTime();
                b.dateSelector.setSelected({
                    from: l,
                    to: m
                })
            } else {
                b.dateSelector.setSelected({})
            }
            var i = this;
            T.dom.addClass(i, "selected");
            var f = 0;
            var d = 20;
            var k = o(i).left + f;
            var j = o(i).top + d;
            c.style.top = j + "px";
            c.style.left = k + "px";
            a.onshow.call(b, b.dateSelector)
        }
    },
    showDateBox2: function () {
        var b = this,
                a = b.options;
        return function (d) {
            if (T.dom.hasClass(this, "selected")) {
                return
            }
            b._create(b.dateBox);
            b.msg = "";
            var c = baidu.date.format;
            b.dateSelector.clickState = "from";
            var h = a.startDate;
            var g = a.endDate;
            b.selected.from = h;
            b.selected.to = g;
            if (h) {
                b.dateSelector.setSelected({
                    from: h,
                    to: g
                })
            } else {
                b.dateSelector.setSelected({})
            }
            var f = this;
            T.dom.addClass(f, "selected");
            a.onshow.call(b, b.dateSelector)
        }
    },
    hideDateBoxHandle: function () {
        var a = this;
        return function () {
            a._destroy();
            a.initInputDate();
            a.options.onhide.call(a)
        }
    },
    disable: function () {},
    enable: function () {},
    initInputDate: function () {
        var d = this,
                c = d.options;
        var b = T.g(c.containerId);
        var e = baidu.date.format;
        T.dom.removeClass(b, "selected");
        if (c.startDate && c.startDate != "") {
            var a = e(c.startDate, "yyyy-MM-dd");
            var f = e(c.endDate, "yyyy-MM-dd");
            c.setDateText.call(d, a, f)
        } else {
            c.setDateText.call(d, c.defaultText, c.defaultText)
        }
    },
    onSelect: function () {
        var e = this,
                d = e.options;
        var b = baidu.G(d.containerId);
        var c = e.selected;
        var g = baidu.date.format;
        var f = g(c.from, "yyyy-MM-dd");
        var a = g(c.to, "yyyy-MM-dd");
        d.setDateText.call(e, f, a);
        d.onselect.call(e, c)
    },
    submitDateSelect: function () {
        var b = this,
                a = b.options;
        return function () {
            var d = b.selected.from;
            var c = b.selected.to;
            a.startDate = d;
            a.endDate = c;
            b.currentSubmit = true;
            b.hideDateBoxFn();
            b.options.onchange.call(b, "submitDateSelect")
        }
    },
    recentDate: function (a) {
        return this.options.todayDate.getTime() + a * 3600 * 24 * 1000
    },
    setDateFormat: function (a) {
        this.dateSelector.setDateFormat(parseInt(a, 10))
    }
});
function DateSelector(b) {
    this.uniqueId = getUniqueId();
    b = b || {};
    this.onselect = b.onselect || new Function();
    this.singleSelection = b.singleSelection || false;
    this.onviewchange = b.onviewchange;
    this.autoFill = b.autoFill;
    this.byWhat = b.byWhat || 5;
    if (undefined === typeof this.autoFill || this.autoFill === null) {
        this.autoFill = true
    }
    this.dateStyle = b.dateStyle || "";
    this.weekStyle = b.weekStyle || "";
    this.byWeekStyle = b.byWeekStyle || "";
    this.byMonthStyle = b.byMonthStyle || "";
    this.sideButtonStyle = b.sideButtonStyle;
    this.sideButtonClass = b.sideButtonClass;
    this.calendarCount = b.calendarCount || 2;
    this.selected = b.selected || null;
    var a = this.selected ? this.selected.to : (new Date());
    this.viewDate = new Date(a.getFullYear(), a.getMonth(), 1);
    this.clickState = "from";
    this.calWrapIdPrefix = this.uniqueId + "DSCalendarWrap";
    this.wrapClass = "ds-wrap";
    this.prevClass = "ds-prev";
    this.nextClass = "ds-next";
    this.prevYearClass = "ds-prevyear";
    this.prevMonthClass = "ds-prevmonth";
    this.nextYearClass = "ds-nextyear";
    this.nextMonthClass = "ds-nextmonth";
    this.prevYearId = "DSPrevYear";
    this.prevMonthId = "DSPrevMonth";
    this.nextYearId = "DSNextYear";
    this.nextMonthId = "DSNextMonth";
    this.calWrapClass = "ds-cal-wrap";
    this.calBlankClass = "ds-cal-blank";
    this.calHeadClass = "ds-cal-head";
    this.calHeadSelClass = "ds-cal-head-selected";
    this.dateClass = "ds-date-thismonth";
    this.dateSelectedClass = "ds-date-selected";
    this.dateOtherClass = "ds-date-othermonth";
    this.weekClass = "ds-week"
}
DateSelector.getDateCountByMonth = function (a) {
    var b = new Date(a.getFullYear(), a.getMonth() + 1, 0);
    return b.getDate()
};
var inputMaxSelectDays = '';
DateSelector.prototype = {
    setSelected: function (a) {
        this.selected = (a && a.from && a.to) ? a : {};
        this.renderCalendars();
        this.clickState = "from";
        return this
    },
    getSelected: function () {
        return this.selected
    },
    appendTo: function (c) {
        var d = document.createElement("table");
        var a = document.createElement("tbody");
        var e = document.createElement("tr");
        d.className = this.wrapClass;
        a.appendChild(e);
        d.appendChild(a);
        c.appendChild(d);
        d.onclick = this.getClickHandler();
        this.renderSide("prev", e);
        for (var b = 0; b < this.calendarCount; b++) {
            var f = document.createElement("td");
            f.style.verticalAlign = "top";
            f.id = this.calWrapIdPrefix + b;
            f.className = this.calWrapClass;
            e.appendChild(f);
            if (b < this.calendarCount - 1) {
                f = document.createElement("td");
                f.className = this.calBlankClass;
                e.appendChild(f)
            }
        }
        this.renderSide("next", e);
        this.renderCalendars();
        this.appendTo = new Function()
    },
    renderSide: function (l, k) {
        var a = '<div class="#{yearclass}" id="#{yearId}" sign="#{type}year" style="#{yearstyle}"></div><div class="#{monthclass}" id="#{monthId}" sign="#{type}month" style="#{monthstyle}"></div>';
        var p = ["year", "month"],
                b = ["class", "style"];
        var q = {
            styleFn: this.sideButtonStyle || new Function(),
            classFn: this.sideButtonClass || new Function()
        };
        var h = {
            from: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - this.calendarCount + 1, 1),
            to: this.viewDate
        };
        var f = {
            monthstyle: this[l + "MonthStyle"],
            yearstyle: this[l + "YearStyle"],
            monthclass: this[l + "MonthClass"],
            yearclass: this[l + "YearClass"],
            yearId: this[l + "YearId"],
            monthId: this[l + "MonthId"]
        };
        var o, d, n;
        for (var g = 0; g < p.length; g++) {
            o = p[g];
            for (var e = 0; e < b.length; e++) {
                n = q[b[e] + "Fn"];
                switch (typeof n) {
                    case "function":
                        h.type = l + o;
                        d = n(h);
                        if (d) {
                            f[o + b[e]] = d
                        }
                        break;
                    case "string":
                        f[o + b[e]] = n;
                        break
                }
            }
        }
        var m = this.uniqueId + l + "Side";
        var c = baidu.G(m);
        if (!c) {
            if (!k) {
                return
            }
            c = document.createElement("td");
            c.id = m;
            l = l.toLowerCase();
            c.style.verticalAlign = "top";
            c.className = this[l + "Class"];
            k.appendChild(c)
        }
        c.innerHTML = baidu.format(a, {
            type: l,
            yearclass: f.yearclass,
            monthclass: f.monthclass,
            yearstyle: f.yearstyle,
            monthstyle: f.monthstyle,
            yearId: f.yearId,
            monthId: f.monthId
        })
    },
    renderCalendars: function () {
        for (var b = 0; b < this.calendarCount; b++) {
            var a = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - this.calendarCount + 1 + b, 1);
            baidu.G(this.calWrapIdPrefix + b).innerHTML = this.getCalendarHtml(a.getFullYear(), a.getMonth(), b)
        }
    },
    getCalendarHtml: function (k, h, d) {
        var f = '<div id="Calendar#{year}#{month}" class="#{clazz}" sign="month" y="#{year}" m="#{month}">#{year}年#{nextmonth}月</div>';
        var c = '<td sign="date" style="#{4}" class="#{3}" y="#{2}" m="#{1}" d="#{0}">#{0}</td>';
        var l = '<table cellpadding="0" cellspacing="0" border="0" class="#{className}"><thead>#{thead}</thead><tbody>#{tbody}</tbody></table>';
        var e = [];
        var j = this.byWhat;
        var g = this.calHeadClass;
        var b = new Date(k, h, 1);
        var a = new Date(b);
        a.setMonth(a.getMonth() + 1);
        a.setDate(0);
        if (this.selected && b - this.selected.from >= 0 && a - this.selected.to <= 0) {
            g = this.calHeadSelClass
        }
        if (j !== 3) {
            e.push(baidu.format(f, {
                clazz: g,
                year: k,
                month: h,
                nextmonth: (h + 1)
            }), baidu.format(l, {
                thead: j === 5 ? this.getCalHeadHtml() : "",
                className: this.singleSelection ? "single" : "",
                tbody: j === 5 ? this.getCalBodyHtmlByDay(k, h) : this.getCalBodyHtmlByWeek(k, h)
            }))
        } else {
            e.push(this.getCalBodyHtmlByMonth(this.viewDate.getFullYear(), d))
        }
        return e.join("")
    },
    getCalHeadHtml: function () {
        var d = ["日", "一", "二", "三", "四", "五", "六"];
        var c = [baidu.format('<tr><td style="background:#fff;" class="#{0}"></td>', this.weekClass)];
        var a = "<td>#{0}</td>";
        for (var b = 0; b < 7; b++) {
            c.push(baidu.format(a, d[b]))
        }
        c.push("</tr>");
        return c.join("")
    },
    getCalBodyHtmlByDay: function (j, u) {
        var s = '<td sign="#{3}" style="#{5}" class="#{4}" y="#{2}" m="#{1}" d="#{0}">#{6}</td>';
        // 当最大选择天大于3天，可以选择
        if (inputMaxSelectDays > 3)
        {
            var o = '<td class="#{0}" sign="week" style="#{1}"></td>';
        } else
        {
            var o = '<td></td>';
        }
        var h = [];

        function k() {
            var i = Array.apply(i, arguments);
            i.unshift(s);
            h.push(baidu.format.apply(null, i))
        }
        var m = new Date(j, u, 1);
        var x = new Date(j, (u - 1), 1);
        var l = DateSelector.getDateCountByMonth(x);
        var c = DateSelector.getDateCountByMonth(m);
        var d = 0 - new Date(j, u, 1).getDay();
        var e, f, v, w, a, b;
        if (this.dateStyle.constructor == String) {
            a = this.dateStyle
        }
        if ("function" === typeof this.weekStyle) {
            b = this.weekStyle(new Date(x.getFullYear(), x.getMonth(), l + d + 1)) || ""
        }
        var g = T.dom.query(".ds-wrap")[0];
        if (T.dom.hasClass(g, "ds-wrap-month")) {
            T.dom.removeClass(g, "ds-wrap-month")
        }
        h.push("<tr>", baidu.format(o, this.weekClass, b));
        for (var t = 0; d < c; d++, t++) {
            var r = "date";
            if (t > 0 && t % 7 === 0) {
                if ("function" == typeof this.weekStyle) {
                    b = this.weekStyle(new Date(j, u, d + 1)) || ""
                }
                h.push("</tr><tr>", baidu.format(o, this.weekClass, b))
            }
            if (d < 0) {
                e = l + d + 1;
                f = x.getMonth();
                v = x.getFullYear();
                w = this.dateOtherClass;
                if (!this.autoFill) {
                    r = ""
                }
            } else {
                e = d + 1;
                f = u;
                v = j;
                w = this.dateClass;
                if (this.selected) {
                    var n = new Date(v, f, e);
                    if (n - this.selected.from >= 0 && n - this.selected.to <= 0) {
                        w = this.dateSelectedClass
                    }
                }
            }
            if ("function" === typeof this.dateStyle && r) {
                a = this.dateStyle(new Date(v, f, e)) || ""
            }
            k(e, f, v, r, w, (w === this.dateSelectedClass ? "" : a), (r ? e : ""))
        }
        f = u + 1;
        v = j;
        if (f > 11) {
            f = 0;
            v++
        }
        w = this.dateOtherClass;
        a = "";
        for (var p = t % 7, q = p; p > 0 && p < 7; p++) {
            if (this.autoFill) {
                r = "date";
                e = p - q + 1;
                if ("function" === typeof this.dateStyle) {
                    a = this.dateStyle(new Date(v, f, e)) || ""
                }
            } else {
//                e = "&nbsp;";
                e = "";
                r = ""
            }
            k(e, f, v, r, w, a, e)
        }
        h.push("</tr>");
        return h.join("")
    },
    getCalBodyHtmlByWeek: function (n, z) {
        var w = '<td sign="#{3}" style="#{6}" class="#{4}" y="#{2}" d1="#{0}" d2="#{1}">#{5}</td>';
        var u = '<td class="#{0}" sign="week" style="#{1}"></td>';
        var q = "第#{0}周   #{1}.#{2}-#{3}.#{4}";
        var m = [];
        var k = 7;

        function o() {
            var D = Array.apply(D, arguments);
            D.unshift(w);
            m.push(baidu.format.apply(null, D))
        }
        var p = new Date(n, z, 1);
        var a = new Date(n, (z + 1), 1);
        var g = new Date(n, z, 1).getDay();
        var e = DateSelector.getDateCountByMonth(p);
        var l = g === 0 ? g + 2 : (g !== 1 ? k - g + 2 : g);
        var h = g === 0 ? Math.ceil((e - 1) / k) : (g !== 1 ? Math.ceil((e - l + 1) / k) : Math.ceil(e / k));
        var b, c, i, B, C, d;
        var t, y;
        var a;
        var j = T.dom.query(".ds-wrap")[0];
        if (T.dom.hasClass(j, "ds-wrap-month")) {
            T.dom.removeClass(j, "ds-wrap-month")
        }
        m.push("<tr>", baidu.format(u, this.weekClass, d));
        for (var x = 1; x <= h; x++) {
            var v = "byWeek";
            i = z + 1;
            a = i + 1;
            B = n;
            C = "";
            t = x === 1 ? l : y + 1;
            y = t + 6;
            var A = y <= e ? i : a;
            var f = y <= e ? y : y % e;
            b = baidu.format(q, x, i, t, ((A <= 12) ? A : A % 12), f);
            var s = i + "." + t;
            var r = ((A <= 12) ? A : A % 12) + "." + f;
            if (this.selected) {
                if (+(new Date(B, i - 1, t) - this.selected.from) === 0 && +(new Date(B, i - 1, y) - this.selected.to) === 0) {
                    C = this.dateSelectedClass
                }
            }
            C += " byWeek";
            if ("function" === typeof this.byWeekStyle && v) {
                c = this.byWeekStyle(new Date(B, A - 1, f)) || ""
            }
            o(s, r, B, v, C, b, c);
            if (x < h) {
                m.push("</tr><tr>", baidu.format(u, this.weekClass, d))
            }
        }
        m.push("</tr>");
        return m.join("")
    },
    getCalBodyHtmlByMonth: function (j, c) {
        var e = '<div id="Calendar#{year}#{month}" class="#{clazz}" style="#{style}" sign="month" y="#{year}" m="#{month}">#{year}年#{nextmonth}月</div>';
        var d = [];
        var f = this.calHeadClass;
        var g, h;
        T.dom.addClass(T.dom.query(".ds-wrap")[0], "ds-wrap-month");
        for (g = (c * 6); g < (c * 6 + 6); g++) {
            var b = new Date(j, g, 1);
            var a = new Date(b);
            a.setMonth(a.getMonth() + 1);
            a.setDate(0);
            if (this.selected && +(b - this.selected.from) === 0 && +(a - this.selected.to) === 0) {
                f = this.calHeadSelClass
            }
            if ("function" === typeof this.byWeekStyle) {
                h = this.byMonthStyle(a) || ""
            }
            d.push(baidu.format(e, {
                clazz: f,
                style: h,
                year: j,
                month: g,
                nextmonth: g + 1
            }));
            f = this.calHeadClass
        }
        return d.join("")
    },
    getClickHandler: function () {
        var a = this;
        return function (l) {
            l = l || window.event;
            var k = l.srcElement || l.target;
            var c = k.getAttribute("sign");
            var n = new Date(a.viewDate);
            var g, o, m, j;
            switch (c) {
                case "prevmonth":
                    n.setMonth(a.viewDate.getMonth() - 1);
                    break;
                case "prevyear":
                    n.setFullYear(a.viewDate.getFullYear() - 1);
                    break;
                case "nextmonth":
                    n.setMonth(a.viewDate.getMonth() + 1);
                    break;
                case "nextyear":
                    n.setFullYear(a.viewDate.getFullYear() + 1);
                    break;
                case "date":
                    var b = new Date(k.getAttribute("y"), k.getAttribute("m"), k.getAttribute("d"));
                    if (a.clickState + "" === "from") {
                        g = {
                            from: b,
                            to: b
                        }
                    } else {
                        g = {
                            from: a.selected.from,
                            to: b
                        };
                        if (g.to - g.from < 0) {
                            var h = g.to;
                            g.to = g.from;
                            g.from = h
                        }
                    }
                    break;
                case "week":
                    if (a.singleSelection) {
                        return
                    }
                    var f = 0;
                    var d = k.nextSibling;
                    while (d.style.cursor === "default") {
                        d = d.nextSibling;
                        f++
                    }
                    m = new Date(d.getAttribute("y"), d.getAttribute("m"), d.getAttribute("d"));
                    j = new Date(m);
                    j.setDate(j.getDate() + 6 - f);
                    g = {
                        from: m,
                        to: j
                    };
                    break;
                case "month":
                    m = new Date(k.getAttribute("y"), k.getAttribute("m"), 1);
                    j = new Date(m);
                    j.setMonth(j.getMonth() + 1);
                    j.setDate(0);
                    g = {
                        from: m,
                        to: j
                    };
                    break;
                case "byWeek":
                    m = new Date(k.getAttribute("y"), k.getAttribute("d1").split(".")[0] - 1, k.getAttribute("d1").split(".")[1]);
                    j = new Date(m);
                    j.setDate(j.getDate() + 6);
                    g = {
                        from: m,
                        to: j
                    };
                    break;
                default:
                    return
            }
            switch (c) {
                case "prevmonth":
                case "prevyear":
                case "nextmonth":
                case "nextyear":
                    if (a.onviewchange) {
                        var i = new Date(n);
                        i.setMonth(i.getMonth() - a.calendarCount + 1);
                        o = a.onviewchange.call(a, {
                            from: i,
                            to: n
                        });
                        if (o === false) {
                            return
                        }
                    }
                    a.viewDate = n;
                    a.renderSide("prev");
                    a.renderSide("next");
                    break;
                case "date":
                case "week":
                case "byWeek":
                case "month":
                    o = a.onselect.call(a, g, 3);
                    if (o === false) {
                        return
                    }
                    a.selected = g;
                    a.clickState = (c === "date" && a.clickState === "from") ? "to" : "from";
                    if (a.singleSelection) {
                        a.clickState = "from"
                    }
                    break
            }
            a.renderCalendars()
        }
    },
    setDateFormat: function (a) {
        this.byWhat = a;
        this.renderCalendars()
    }
};
T.ui.Dialog = T.createUI({
    options: {
        id: "",
        titleText: "默认标题",
        content: "默认内容",
        position: {
            left: 360,
            top: 100
        },
        isSingle: false,
        isModal: false,
        hasClose: true,
        className: "dialog",
        zIndex: 99999,
        bgiframe: true,
        needCloseConfirm: false
    },
    _type: "dialog",
    _init: function () {
        var a = this;
        a.options.id = a.id = a.getId();
        a.render()
    },
    _getInnerString: function () {
        var b = document;
        var a = this;
        var c = ['<div class="dialog-title">'];
        c.push('<div class="dialog-title-text">');
        c.push(a.options.titleText);
        c.push("</div>");
        if (this.options.hasClose) {
            c.push('<a href="javascript:void(0);" class="dialog-close">×');
            c.push("</a>")
        }
        c.push("</div>");
        c.push('<div class="dialog-content">');
        c.push(a._getContentHTML());
        c.push("</div>");
        return c.join("")
    },
    _update: function () {
        var e = this;
        var a = e.getContainer();
        if (a) {
            var f = "#" + e.id + " .dialog-title-text";
            var d = T.dom.query(f)[0];
            if (d) {
                d.innerHTML = e.options.titleText
            }
            var c = "#" + e.id + " .dialog-content";
            var b = T.dom.query(c)[0];
            if (b) {
                b.innerHTML = e._getContentHTML()
            }
            T.dom.setPosition(a, e.options.position)
        } else {
            return
        }
    },
    _setIFrame: function (d, c, a) {
        var b = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="javascript:false;"style="display:block;position:absolute;z-index:-1;background-color:transparent;filter:Alpha(Opacity=\'0\');top:' + (0) + "px;left:" + (0) + "px;width:" + (c) + "px;height:" + (a) + 'px;"/>';
        if (T.q("bgiframe", d).length === 0) {
            T.dom.insertHTML(d, "beforeBegin", b)
        }
    },
    _getContentHTML: function () {
        var b = this;
        var c = document;
        if (T.lang.isString(b.options.content)) {
            return b.options.content
        } else {
            if (T.lang.isElement(b.options.content)) {
                T.show(b.options.content);
                var a = c.createElement("div");
                a.appendChild(b.options.content);
                return a.innerHTML
            } else {
                return ""
            }
        }
    },
    setTitleText: function (b) {
        var a = this;
        if (T.lang.isString(b)) {
            a.options.titleText = b
        }
        a._update()
    },
    setContent: function (c) {
        var b = this;
        var a = c;
        if (T.lang.isString(a) || T.lang.isElement(a)) {
            b.options.content = a
        }
        b._update()
    },
    render: function () {
        var h = document;
        var e = this;
        var a = h.createElement("div");
        a.id = e.id;
        a.className = "dialog-container " + e.options.className;
        var d = "";
        if (e.options.isModal) {
            var c = e.options.zIndex - 1;
            var g = h.createElement("div");
            g.className = e.options.className + " modal";
            g.id = e.id + "modal";
            T.dom.setStyles(g, {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": "black",
                width: T.page.getWidth(),
                height: T.page.getHeight(),
                opacity: 0.6,
                "z-index": c
            });
            h.body.appendChild(g);
            if (T.browser.ie > 9) {
                g.style.cssText += "opacity: 0.6;"
            }
            if (e.options.bgiframe && T.browser.ie && (T.browser.ie < 7)) {
                var b = h.createElement("div");
                g.appendChild(b);
                e._setIFrame(g.firstChild, T.page.getWidth(), T.page.getHeight())
            }
            T.un(window, "resize", e._modalResizeHandler);
            T.on(window, "resize", e._modalResizeHandler)
        }
        a.innerHTML = e._getInnerString();
        h.body.appendChild(a);
        if (e.options.bgiframe && T.browser.ie && (T.browser.ie < 7)) {
            e._setIFrame(a.firstChild, a.offsetWidth, a.offsetHeight)
        }
        T.dom.setStyles(e.getContainer(), {
            position: "absolute",
            "z-index": e.options.zIndex
        });
        if (e.options.width) {
            T.dom.setStyle(e.getContainer(), "width", e.options.width);
            e.options.position.left = T.page.getScrollLeft() + (T.page.getViewWidth() - e.options.width) / 2;
            e.options.position.top = Math.max(T.page.getScrollTop() + (T.page.getViewHeight() - e.getContainer().offsetHeight) / 2, 0)
        }
        T.dom.setPosition(e.getContainer(), {
            left: e.options.position.left,
            top: e.options.position.top
        });
        if (this.options.hasClose) {
            var f = "#" + e.id + " .dialog-close";
            T.dom.query(f)[0].onclick = function () {
                if (!e.needCloseConfirm) {
                    e.close()
                } else {
                    e.dispatchEvent("onclose")
                }
            }
        }
        e.hide()
    },
    getContainer: function () {
        return T.g(this.id)
    },
    setPosition: function (a) {
        var b = this;
        b.options.position.left = a.left;
        b.options.position.top = a.top;
        b._update()
    },
    show: function () {
        var a = this;
        T.dom.show(a.getContainer());
        if (a.options.width) {
            T.dom.setStyle(a.getContainer(), "width", a.options.width);
            a.options.position.left = T.page.getScrollLeft() + (T.page.getViewWidth() - a.options.width) / 2;
            a.options.position.top = Math.max(T.page.getScrollTop() + (T.page.getViewHeight() - a.getContainer().offsetHeight) / 2, 0)
        }
        T.dom.setPosition(a.getContainer(), {
            left: a.options.position.left,
            top: a.options.position.top
        });
        if (a.getModalContainer()) {
            T.dom.show(a.getModalContainer());
            a._modalResizeHandler()
        }
    },
    hide: function () {
        var a = this;
        T.dom.hide(a.getContainer());
        if (a.getModalContainer()) {
            T.dom.hide(a.getModalContainer())
        }
    },
    close: function () {
        if (!this.options.isSingle) {
            if (this.getContainer()) {
                T.dom.remove(this.getContainer())
            }
            if (this.getModalContainer()) {
                T.dom.remove(this.getModalContainer())
            }
            T.un(window, "resize", this._modalResizeHandler)
        } else {
            this.hide()
        }
        if (!this.needCloseConfirm) {
            this.dispatchEvent("onclose")
        }
    },
    getModalContainer: function () {
        return T.g(this.id + "modal")
    },
    _modalResizeHandler: function () {
        var b = T.q("modal");
        for (var a = 0; a < b.length; a++) {
            T.dom.setStyles(b[a], {
                width: T.page.getWidth(),
                height: T.page.getHeight()
            })
        }
    }
});
T.ui.Dialog.close = function () {
    T.element(".dialog-container, .modal").each(function (a) {
        T.dom.remove(a)
    })
};
var SelectTimeGroup = function (k, j, i) {
    var h = this;
    h.st = k;
    h.et = j;
    var i = i || 6;
    var e = T.g("Hour");
    var b = T.g("Day");
    var d = T.g("FlashMonth");
    var c = T.g("FlashWeek");
    var a = T.g("FlashDay");
    var g = function () {
        if (b.checked) {
            a.disabled = false;
            if ((h.et - h.st) > (1000 * 3600 * 24 * 7)) {
                c.disabled = false;
                if ((h.et - h.st) > (1000 * 3600 * 24 * 31)) {
                    d.disabled = false
                } else {
                    d.disabled = true
                }
            } else {
                c.disabled = true;
                d.disabled = true
            }
        } else {
            c.disabled = true;
            d.disabled = true;
            a.disabled = true
        }
    };
    h.onchange = function () {};
    h.setGran = function (l, n, m) {
        h.st = l;
        h.et = n;
        switch (m) {
            case 6:
                e.checked = true;
                break;
            case 5:
                b.checked = true;
                a.checked = true;
                break;
            case 4:
                b.checked = true;
                c.checked = true;
                break;
            case 3:
                b.checked = true;
                d.checked = true;
                break;
            default:
                e.checked = true
        }
        g();
        h.onchange(m)
    };
    var f = function () {
        h.setGran(h.st, h.et, i)
    };
    f();
    T.each(T.dom.query(".time-select input"), function (l) {
        T.on(l, "click", function (o) {
            g();
            var n = T.dom.query(".first-gran input:checked")[0];
            if (n == T.g("Hour")) {
                h.onchange(6)
            } else {
                var m = T.dom.query(".second-gran input:checked")[0];
                if (m == T.g("FlashMonth")) {
                    h.onchange(3)
                } else {
                    if (m == T.g("FlashWeek")) {
                        h.onchange(4)
                    } else {
                        if (m == T.g("FlashDay")) {
                            h.onchange(5)
                        }
                    }
                }
            }
        })
    })
};
T.ui.Selectable = T.createUI({
    _type: "selectable",
    options: {
        containerId: null,
        elementClazz: "select-element",
        selectedClazz: "selected",
        disableClazz: "disabled",
        single: true,
        limit: 4,
        disable: false,
        onchange: function (a) {},
        onselect: function () {}
    },
    selected: null,
    _trigger: true,
    _init: function () {
        var c = this;
        var b = c.options;
        var a = T.g(b.containerId);
        c.selected = [];
        T.event.on(a, "click", function (m) {
            if (b.disable) {
                return
            }
            var d, n = T.event.getTarget(m);
            if (T.dom.hasClass(n, b.elementClazz)) {
                d = n
            } else {
                d = T.dom.getAncestorBy(n, function (e) {
                    return (e == a) || T.dom.hasClass(e, b.elementClazz)
                })
            }
            if (d == a || !d) {
                return
            }
            var h = T.dom.query("." + b.elementClazz, a);
            var l = T.array.indexOf(h, d);
            if (b.onselect.call(c, d, l) === false) {
                return
            }
            if (T.dom.hasClass(d, b.disableClazz)) {
                return
            }
            if (T.dom.hasClass(d, b.selectedClazz)) {
                return
            }
            if (b.single) {
                T.array.each(h, function (e) {
                    T.dom.removeClass(e, b.selectedClazz)
                });
                T.dom.addClass(d, b.selectedClazz);
                c.selected = [d]
            } else {
                if (T.dom.hasClass(d, b.selectedClazz)) {
                    T.dom.removeClass(d, b.selectedClazz);
                    c.selected = T.array.filter(c.selected, function (e) {
                        return e != d
                    })
                } else {
                    T.dom.addClass(d, b.selectedClazz);
                    if (T.dom.getAttr(d, "data") === "0") {
                        var g = c.selected;
                        for (var k = 0, f = g.length; k < f; k++) {
                            c.unselect(T.dom.getAttr(g[0], "data"))
                        }
                    } else {
                        if (c.selected.length < 2) {
                            if (c.selected[0] && T.dom.getAttr(c.selected[0], "data") === "0") {
                                c.unselect(0)
                            }
                        }
                    }
                    c.selected.push(d);
                    var j;
                    while (c.selected.length > b.limit) {
                        j = c.selected.shift();
                        T.dom.removeClass(j, b.selectedClazz)
                    }
                }
            }
            c._trigger && b.onchange.call(c, c.selected)
        });
        this.initSelected()
    },
    initSelected: function () {
        var a = T.g(this.options.containerId);
        this.selected = [];
        var c = T.dom.query("." + this.options.elementClazz, a);
        for (var b = 0; b < c.length; b++) {
            var d = c[b];
            if (T.dom.hasClass(d, this.options.selectedClazz)) {
                this.selected.push(d)
            }
        }
    },
    select: function (e, d) {
        var g = this,
                c = g.options;
        var a = T.g(c.containerId);
        var h = this.splat(e);
        var f = T.dom.query("." + c.elementClazz, a);
        var b = g._trigger;
        g._trigger = d || d == null;
        T.array.each(h, function (i) {
            if (!c.single && g.selected.length >= c.limit) {
                return false
            }
            if (i == "first") {
                i = 0
            } else {
                if (i == "last") {
                    i = f.length - 1
                }
            }
            if (i != null && !isNaN(i)) {
                i = f[i]
            }
            if (!i) {
                return
            }
            T.event.fire(i, "click");
            if (c.single) {
                return false
            }
        });
        g._trigger = b
    },
    reset: function (c, b) {
        var e = this,
                a = e.options;
        var d = e.selected || [];
        T.array.each(d, function (f) {
            T.dom.removeClass(f, a.selectedClazz)
        });
        e.selected.length = 0;
        this.select(c, b)
    },
    get: function (c) {
        var e = this,
                b = e.options;
        var a = T.g(b.containerId);
        var d = T.dom.query("." + b.elementClazz, a);
        if (c == "all") {
            return d
        } else {
            if (c == "first") {
                c = 0
            } else {
                if (c == "last") {
                    c = d.length - 1
                }
            }
        }
        return d[c]
    },
    disable: function () {
        this.options.disable = true
    },
    enable: function () {
        this.options.disable = false
    },
    splat: function (a) {
        if (a == null) {
            return []
        }
        if (Object.prototype.toString.call(a) == "[object Array]") {
            return a
        }
        return [a]
    },
    unselect: function (a) {
        if (!isNaN(a)) {
            a = a.toString()
        }
        var c = T.array.find(this.selected, function (d) {
            if (T.getAttr(d, "data") === a) {
                return true
            } else {
                return false
            }
        });
        if (c) {
            T.dom.removeClass(c, this.options.selectedClazz);
            T.array.remove(this.selected, c)
        }
        var b = [];
        T.array.forEach(this.selected, function (d) {
            b.push(T.dom.getAttr(d, "data"))
        });
        return b
    }
});
T.ShortDate = T.createClass({
    options: {
        containerId: "DateSelectBar",
        onchange: function () {}
    },
    _init: function () {
        var a = T.g(this.options.containerId).getElementsByTagName("A");
        for (var b = 0, c = a.length; b < c; b++) {
            T.on(a[b], "click", this._selectHandler())
        }
    },
    _selectHandler: function () {
        var a = this;
        return function (d) {
            T.event.preventDefault(d);
            var g = this.href.lastIndexOf("#") + 1;
            var b = parseInt(this.href.substring(g), 10);
            if (b != 0) {
                var c = (b == -1) ? -1 : b;
                var f = (b == -1) ? -1 : 0;
                var b = b - 1;
                a.options.onchange([a._recentDate(c), a._recentDate(f)])
            } else {
                a.options.onchange([T.config.systemConfig.now, +T.config.systemConfig.now])
            }
            a.removeClass();
            this.className = "cur"
        }
    },
    removeClass: function () {
        var a = T.g(this.options.containerId).getElementsByTagName("A");
        for (var b = 0, c = a.length; b < c; b++) {
            T.removeClass(a[b], "cur")
        }
    },
    _dateDiff: function (b, a) {
        return parseInt(Math.abs(b - a) / 1000 / 60 / 60 / 24)
    },
    _recentDate: function (a) {
        return parseInt(T.config.systemConfig.now, 10) + a * 3600 * 24 * 1000
    },
    showDateTip: function (c, g) {
        var b = baidu.G("Date");
        var f = baidu.date.format;
        var a = f(new Date(c), "yyyy-MM-dd");
        var e = f(new Date(g), "yyyy-MM-dd");
        var d = (a == e) ? a : (a + "~" + e);
        if (b) {
            b.innerHTML = "(" + d + ")"
        }
        T.dom.one(".report-help") && (T.dom.setStyle(T.dom.one(".tip-arrow"), "left", (T.dom.one(".report-help").offsetLeft + 2) + "px"))
    }
});
(function () {
    T.SlideTrans = T.createClass({
        initialize: function (d, h, g, e, f) {
            this._slider = baidu.g(h);
            this._container = baidu.g(d);
            this._timer = null;
            this._count = Math.abs(g);
            this._target = 0;
            this._t = this._b = this._c = 0;
            this._size = f || 8;
            this.Index = 0;
            this.SetOptions(e);
            this.Auto = !!this.options.Auto;
            this.Duration = Math.abs(this.options.Duration);
            this.Time = Math.abs(this.options.Time);
            this.Pause = Math.abs(this.options.Pause);
            this.Tween = this.options.Tween;
            this.onStart = this.options.onStart;
            this.onFinish = this.options.onFinish;
            var c = !!this.options.Vertical;
            this._css = c ? "top" : "left";
            var i = a(this._container).position;
            i == "relative" || i == "absolute" || (this._container.style.position = "relative");
            this._container.style.overflow = "hidden";
            this._slider.style.position = "absolute";
            this.Change = this.options.Change ? this.options.Change : this._slider[c ? "offsetHeight" : "offsetWidth"] / this._count
        },
        SetOptions: function (c) {
            this.options = {
                Vertical: true,
                Auto: true,
                Change: 0,
                Duration: 50,
                Time: 10,
                Pause: 4000,
                onStart: function () {},
                onFinish: function () {},
                Tween: b.Quart.easeOut
            };
            T.extend(this.options, c || {})
        },
        Run: function (c) {
            if (c == this._count) {
                if (this._css == "left") {
                    var g = baidu.g("SliderTable").rows[0];
                    g.appendChild(g.children[0].cloneNode(true))
                } else {
                    var f = baidu.g("users_logos");
                    for (var e = 0; e < this._size; e++) {
                        var d = f.children[e].cloneNode(true);
                        f.appendChild(d)
                    }
                }
            }
            c == undefined && (c = this.Index);
            c < 0 && (c = this._count - 1) || c > this._count && (c = 0);
            this._target = -Math.abs(this.Change) * (this.Index = c);
            this._t = 0;
            this._b = parseInt(a(this._slider)[this.options.Vertical ? "top" : "left"]);
            this._c = this._target - this._b;
            this.onStart();
            this.Move()
        },
        Move: function () {
            clearTimeout(this._timer);
            if (this._c && this._t < this.Duration) {
                this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
                this._timer = setTimeout(baidu.fn.bind(this.Move, this), this.Time)
            } else {
                if (this.Index == this._count) {
                    this.MoveTo(0);
                    if (this._css == "left") {
                        var e = baidu.g("SliderTable").rows[0];
                        e.removeChild(e.children[e.cells.length - 1])
                    } else {
                        var d = baidu.g("users_logos");
                        for (var c = 0; c < this._size; c++) {
                            var f = d.children[d.children.length - 1];
                            d.removeChild(f)
                        }
                    }
                } else {
                    this.MoveTo(this._target)
                }
                this.Auto && (this._timer = setTimeout(baidu.fn.bind(this.Next, this), this.Pause))
            }
        },
        MoveTo: function (c) {
            baidu.setStyle(this._slider, this._css, c + "px")
        },
        Next: function () {
            this.Run(++this.Index)
        },
        Previous: function () {
            this.Run(--this.Index)
        },
        Stop: function () {
            clearTimeout(this._timer);
            this.MoveTo(this._target)
        }
    });
    var b = {
        Quart: {
            easeOut: function (f, e, h, g) {
                return -h * ((f = f / g - 1) * f * f * f - 1) + e
            }
        }
    };
    var a = function (c) {
        return c.currentStyle || document.defaultView.getComputedStyle(c, null)
    }
})();
T.ui.TimePicker = T.createUI({
    _type: "timepicker",
    options: {
        containerId: null,
        triggerId: null,
        oninit: T.fn.blank,
        ontabselect: T.fn.blank,
        ontabchange: T.fn.blank,
        ondateselect: T.fn.blank,
        onchange: T.fn.blank,
        oncancel: T.fn.blank,
        onshortdatechange: T.fn.blank,
        dateOptions: [],
        shortDate: null,
        byWhat: null
    },
    _datePickers: null,
    _selected: null,
    _init: function () {
        var f = this,
                d = f.options;
        var a = T.g(d.containerId);
        this.initDatePickers();
        if (f.shortDate) {
            this.shortcutFn = this.shortcutHandle();
            var c = T.dom.query("a", T.dom.one(".date-select-bar", a));
            T.event.ons(c, "click", this.shortcutFn)
        }
        if (f.byWhat) {
            this.byWhatFn = this.byWhatHandle();
            var b = T.dom.query("a", T.dom.one(".date-select-bar", a));
            T.event.ons(b, "click", this.byWhatFn)
        }
        this.submitDateFn = this.submitDateHandle();
        this.hideDateBoxFn = this.hideDateBoxHandle();
        var h = T.dom.one(".button-bar", a);
        var e = T.dom.one(".button", h);
        var g = T.dom.next(e);
        T.event.on(e, "click", this.submitDateFn);
        T.event.on(g, "click", this.hideDateBoxFn);
        T.event.on(d.triggerId, "click", function (i) {
            T.event.stopPropagation(i);
            T.dom.addClass(this, "selected");
            f.initInputDate();
            if (f.shortDate) {
                f.initShortcutDate()
            }
            if (f.byWhat) {
                f.initByWhat()
            }
            T.dom.show(a)
        });
        T.event.on(a, "click", function (i) {
            T.event.stopPropagation(i)
        });
        T.event.on(document.body, "click", function (i) {
            T.dom.hide(a);
            T.dom.removeClass(d.triggerId, "selected")
        });
        T.event.on(window, "resize", function (i) {
            T.dom.hide(a);
            T.dom.removeClass(d.triggerId, "selected")
        });
        T.event.on(window, "scroll", function (i) {
            T.dom.hide(a);
            T.dom.removeClass(d.triggerId, "selected")
        });
        this.initSelected();
        this.initInputDate();
        if (f.shortDate) {
            this.initShortcutDate()
        }
        if (f.byWhat) {
            this.initByWhat()
        }
    },
    initDatePickers: function () {
        var e = this,
                b = e.options;
        var a = T.g(b.containerId);
        this._datePickers = [];
        this._selected = [];
        var d = T.dom.one(".date-input", a);
        var c = T.dom.query(".date-input-tab", a);
        this.selectable = new T.ui.Selectable({
            containerId: d,
            elementClazz: "date-input-tab",
            selectedClazz: "cur",
            onchange: function (f) {
                if (!f[0]) {
                    return
                }
                T.array.each(c, function (g, h) {
                    var i = e._datePickers[h];
                    if (g != f[0]) {
                        i.hideDateBoxFn && i.hideDateBoxFn()
                    }
                });
                b.ontabchange.call(e)
            },
            onselect: function (g, f) {
                b.ontabselect.call(e, f)
            }
        });
        T.array.each(c, function (f, h) {
            var j = e._datePickers[h] = new T.ui.DatePicker(T.extend({
                containerId: f,
                calendarContainerId: a,
                btnBarClass: "no-btnbar-here",
                defaultText: "",
                setDateText: function (l, k) {
                    var i = T.g(this.options.containerId);
                    T.dom.one(".date-from", i).value = l;
                    T.dom.one(".date-to", i).value = k
                },
                onselect: function (i) {
                    this.options.startDate = i.from;
                    this.options.endDate = i.to;
                    this.options.onchange("submitDateSelect")
                },
                onchange: function () {
                    b.ondateselect.call(e, h)
                }
            }, b.dateOptions[h] || {}));
            var g = T.dom.query(".date-input-short", f);
            j.inputs = g;
            T.event.ons(g, "keyup", function (n) {
                var m = T.event.getKeyCode(n);
                if (m == 8 || m == 9 || m == 17 || m == 16 || m == 229 || m == 35 || m == 36 || m == 37 || m == 38 || m == 39 || m == 40) {
                    return
                }
                this.value = this.value.replace(/[^0-9|[^\/]/g, "");
                var o = T.string.trim(g[0].value),
                        k = T.string.trim(g[1].value),
                        i = new Date(o),
                        l = new Date(k);
                if (this.value.length == 10) {
                    e.validateDateInputs(j);
                    j.dateSelector.setSelected(j.selected)
                }
            });
            T.event.ons(g, "blur", function (i) {
                e.validateDateInputs(j)
            })
        })
    },
    submitDateHandle: function () {
        var b = this,
                a = b.options;
        return function () {
            b.initSelected();
            b.initInputDate();
            if (b.shortDate) {
                b.initShortcutDate()
            }
            a.onchange.call(b, b._selected)
        }
    },
    initSelected: function () {
        var a = this;
        this._selected = [];
        T.array.each(a._datePickers, function (b) {
            a._selected.push({
                from: b.options.startDate,
                to: b.options.endDate
            })
        });
        a.options.oninit.call(a, a._selected)
    },
    hideDateBoxHandle: function () {
        var b = this,
                a = b.options;
        return function () {
            b.initInputDate();
            a.oncancel.call(b)
        }
    },
    initInputDate: function () {
        var a = this;
        T.array.each(a._datePickers, function (d, b) {
            var c = a._selected[b];
            d.setDate(c.from, c.to)
        });
        a.selectable.select("first");
        T.event.fire(document.body, "click")
    },
    shortcutHandle: function () {
        var b = this,
                a = b.options;
        return function (i) {
            T.event.preventDefault(i);
            var h = T.dom.getAttr(this, "roleIndex") || 0;
            var f = b._datePickers[h];
            if (!f) {
                return
            }
            var j = this.href.lastIndexOf("#") + 1;
            var d = this.href.substring(j).split(",");
            var c = new Date(f.recentDate(d[0] | 0)),
                    g = new Date(f.recentDate(d[1] | 0));
            f.setDate(c, g);
            b.removeShortcutClass(h);
            T.dom.addClass(this, "cur");
            b.options.onshortdatechange.call(b, {
                from: c,
                to: g
            }, h);
            b.selectable.select(h)
        }
    },
    initShortcutDate: function () {
        if (!this.shortDate) {
            return
        }
        var a = T.g(this.options.containerId);
        var j = T.dom.one(".date-select-bar", a);
        var l = j.getElementsByTagName("A");
        var k = [],
                c, h = this.dateDiff;
        for (var e = 0, c = l.length; e < c; e++) {
            var r = l[e];
            var g = T.dom.getAttr(r, "roleIndex") || 0;
            var q = k[g];
            if (!q) {
                this.removeShortcutClass(g);
                q = k[g] = {};
                var p = this._datePickers[g];
                var b = p.options.startDate;
                var d = p.options.endDate;
                if (!b || b.constructor != Date) {
                    continue
                }
                var m = p.options.todayDate;
                q.et = h(d, m);
                q.st = h(b, m)
            }
            var o = r.href.indexOf("#");
            var f = r.href.substr(o + 1).split(",");
            if ((f[0] | 0) == q.st && (f[1] | 0) == q.et) {
                T.dom.addClass(r, "cur")
            }
        }
    },
    initByWhat: function () {
        if (!this.byWhat) {
            return
        }
        var b = T.g(this.options.containerId);
        var d = T.dom.one(".date-select-bar", b);
        var c = d.getElementsByTagName("a");
        var e = this._datePickers[0];
        var g = e.options.startDate;
        var a = e.options.endDate;
        var f = (a - g) / (24 * 60 * 60 * 1000);
        this.removeShortcutClass();
        if (f === 0) {
            e.setDateFormat(5);
            T.dom.addClass(T.dom.query(".byday", d)[0], "cur")
        } else {
            if (f === 6) {
                e.setDateFormat(4);
                T.dom.addClass(T.dom.query(".byweek", d)[0], "cur")
            } else {
                e.setDateFormat(3);
                T.dom.addClass(T.dom.query(".bymonth", d)[0], "cur")
            }
        }
    },
    removeShortcutClass: function (f) {
        var a = T.g(this.options.containerId);
        var e = T.dom.one(".date-select-bar", a);
        var d = e.getElementsByTagName("A");
        f = f || 0;
        for (var c = 0, g = d.length; c < g; c++) {
            var b = T.dom.getAttr(d[c], "roleIndex") || 0;
            if (f == b) {
                T.dom.removeClass(d[c], "cur")
            }
        }
    },
    _destroy: function () {},
    setDate: function (a, f, e, b) {
        var d = this,
                c = this._selected[e || 0];
        c.from = a;
        c.to = f;
        this.initInputDate();
        if (d.shortDate) {
            this.initShortcutDate()
        }
        if (d.byWhat) {
            this.initByWhat()
        }
        this.options.onchange.call(this, this._selected, b)
    },
    validateDateInputs: function (h) {
        var g = h.inputs,
                e = /^[\d]{4,4}[-]([0][1-9]|[1][0-2])[-]([0][1-9]|[1-2][\d]|[3][0-1])$/;
        var a = T.string.trim(g[0].value),
                c = T.string.trim(g[1].value),
                b = new Date(a),
                f = new Date(c),
                d;
        if (!e.test(a)) {
            T.dom.addClass(g[0], "date-invalid");
            h.showMessage("开始日期输入有误，日期格式yyyy-MM-dd。")
        } else {
            if (!e.test(c)) {
                T.dom.addClass(g[1], "date-invalid");
                h.showMessage("结束日期输入有误，日期格式yyyy-MM-dd。")
            } else {
                if (a != "" && c != "" && f < b) {
                    T.dom.addClass(g[1], "date-invalid");
                    h.showMessage("结束日期不能小于开始日期！")
                } else {
                    T.dom.removeClass(g[0], "date-invalid");
                    T.dom.removeClass(g[1], "date-invalid");
                    d = {
                        from: b,
                        to: f
                    };
                    var i = h.dateSelector.onselect(d);
                    if (i === false) {
                        return
                    }
                    h.selected = d
                }
            }
        }
    },
    dateDiff: function (b, a) {
        b.setHours(0);
        b.setMinutes(0);
        b.setSeconds(0);
        b.setMilliseconds(0);
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0);
        return parseInt((b - a) / 1000 / 60 / 60 / 24, 10)
    },
    showInput: function (d) {
        var b = this.selectable.get(d || 0);
        var c = T.dom.one(".date-input-picker", b);
        var a = T.dom.one(".date-picker-check", b);
        c && T.dom.setStyle(c, "visibility", "visible");
        a && (a.checked = true)
    },
    hideInput: function (d) {
        var b = this.selectable.get(d || 0);
        var c = T.dom.one(".date-input-picker", b);
        var a = T.dom.one(".date-picker-check", b);
        a && (a.checked = false);
        c && T.dom.setStyle(c, "visibility", "hidden")
    },
    disableInput: function (c) {
        var b = this.selectable.get(c || 0);
        var a = T.dom.one(".date-picker-check", b);
        a && (a.checked = false);
        if (b) {
            T.dom.setStyle(b, "visibility", "hidden");
            T.dom.addClass(b, "disabled")
        }
    },
    enableInput: function (b) {
        var a = this.selectable.get(b || 0);
        if (a) {
            T.dom.setStyle(a, "visibility", "visible");
            T.dom.removeClass(a, "disabled")
        }
    },
    hideCompareDate: function () {
        this.setDate(null, null, 1, false)
    },
    disableCompareDate: function () {
        this.disableInput(1);
        this._datePickers[1].setDate(null, null)
    },
    enableCompareDate: function () {
        this.enableInput(1)
    },
    setCompareDate: function (a, b) {
        this.setDate(new Date(a), new Date(b), 1, false)
    },
    byWhatHandle: function () {
        var a = this;
        return function (c) {
            T.event.preventDefault(c);
            var b = T.getAttr(this, "data");
            a.removeShortcutClass();
            T.dom.addClass(this, "cur");
            T.array.each(a._datePickers, function (e, d) {
                e.setDateFormat(b)
            })
        }
    }
});
T.TimeSpan = T.createClass({
    options: {
        byHourId: "ByHour",
        byDayId: "ByDay",
        ByWeekId: "ByWeek",
        ByMonthId: "ByMonth",
        containerId: "TimeSpan",
        gran: 6,
        day: 1000 * 3600 * 24,
        onchange: function (a) {}
    },
    _granLinks: null,
    _init: function () {
        var c = {
            "3": this.options.ByMonthId,
            "4": this.options.ByWeekId,
            "5": this.options.byDayId,
            "6": this.options.byHourId
        },
        b = c[this.options.gran];
        var a = T.g(this.options.containerId);
        this._granLinks = T.dom.query("a", a);
        this._addActiveClass(b !== undefined ? b : this.options.byHourId);
        this.reset(T.config.pageInfo.st, T.config.pageInfo.et);
        this.bind()
    },
    reset: function (a, e) {
        var c = T.g(this.options.ByMonthId),
                f = T.g(this.options.ByWeekId),
                d = T.g(this.options.byDayId),
                b = T.g(this.options.byHourId);
        f && T.dom.addClass(f, "disable");
        c && T.dom.addClass(c, "disable");
        if ((e - a) > (this.options.day * 7)) {
            f && T.dom.removeClass(f, "disable");
            if ((e - a) > (this.options.day * 31)) {
                c && T.dom.removeClass(c, "disable")
            }
        }
    },
    _addActiveClass: function (a) {
        T.element(this._granLinks).each(function (b) {
            T.removeClass(b, "selected")
        });
        T.addClass(a, "selected")
    },
    bind: function () {
        var a = this;
        T.event.on(this.options.containerId, "click", function (b) {
            var c = T.event.getTarget(b);
            a.select(c)
        })
    },
    select: function (a) {
        a = T.g(a);
        if (!T.dom.hasClass(a, "disable")) {
            this._addActiveClass(a);
            this.options.onchange(T.dom.getAttr(a, "data"))
        }
    }
});
T.Webpage = function (a) {
    T.extend(this, {
        components: [],
        on: function (c, b) {
            EventRouter.register(c, b)
        },
        fire: function (b) {
            EventRouter.dispatch.apply(EventRouter, arguments)
        },
        _init: function () {
            T.extend(this, this.options);
            EventRouter.setOwner(this);
            T.extend(this, T.config);
            this.fire("onbeforeInit");
            this.initComponents(this.components);
            this.fire("oninit")
        },
        initComponents: function (f) {
            for (var d in f) {
                var c = f[d];
                var e = null;
                var b = null;
                var h = null;
                if (T.lang.isString(c)) {
                    e = c;
                    h = e
                } else {
                    e = c.type;
                    b = c.options;
                    if (c.id) {
                        h = c.id
                    } else {
                        h = e
                    }
                }
                var g = "_init" + e;
                if (g !== "_init" && T.lang.isFunction(this[g])) {
                    this[g]({
                        id: h,
                        type: e,
                        options: b
                    })
                }
            }
        },
        _getEventName: function (c, b) {
            return b ? b + c : "onchange" + c
        },
        _filterFlag: {},
        _initDate: function (e) {
            var i = this;
            var l = e.options && e.options.singleSelection;
            var j = e.options && e.options.alwaysCompare;
            var f = e.options && e.options.maxSelectDays;
            inputMaxSelectDays = e.options.maxSelectDays;
            var d = e.options && e.options.defaultSelectDays;
            var n = e.options && e.options.shortDate || true;
            var k = e.options && e.options.byWhat;
            var h = e.options && e.options.prefix || "";
            var c = l ? new Date(+T.config.pageInfo.st) : ((d != null) ? new Date(+T.config.pageInfo.ed - (d - 1) * 24 * 3600 * 1000) : new Date(+T.config.pageInfo.st));
            var g = l ? new Date(+T.config.pageInfo.et) : ((d != null) ? new Date(+T.config.pageInfo.ed) : new Date(+T.config.pageInfo.et));
            var b = (l || (j === false)) ? "" : (T.config.pageInfo.st2 ? new Date(+T.config.pageInfo.st2) : "");
            var m = (l || (j === false)) ? "" : (T.config.pageInfo.et2 ? new Date(+T.config.pageInfo.et2) : "");
            this[e.id] = new T.ui.TimePicker(T.extend({
                triggerId: h + "timePicker",
                containerId: h + "timePickerBox",
                shortDate: n,
                byWhat: k,
                oninit: function (p) {
                    if (!p || p.length < 2) {
                        return
                    }
                    var q = this;
                    var o = T.dom.one(".date-picker-check", this.selectable.get(1));
                    if (j) {
                        o && T.dom.hide(o);
                        q.showInput(1)
                    } else {
                        o && T.event.on(o, "click", function (t) {
                            T.event.stopPropagation(t);
                            if (this.checked) {
                                q.showInput(1);
                                q.selectable.select(1);
                                T.event.stop(t)
                            } else {
                                q.hideInput(1);
                                q._datePickers[1].setDate(null, null);
                                q.msg = "";
                                q.selectable.select(0)
                            }
                        })
                    }
                    if (p[1].from == null) {
                        return
                    }
                    if (p[1].from.constructor != Date) {
                        return
                    }
                    var s = Math.abs(this.dateDiff(p[0].from, p[0].to));
                    var r = Math.abs(this.dateDiff(p[1].from, p[1].to));
                    if (r != s) {
                        p[1].to = new Date(p[1].from.getTime() + s * 3600 * 24 * 1000)
                    }
                },
                onshortdatechange: function (o, q) {
                    var p = this._datePickers[1];
                    if (!j && p) {
                        p.setDate(null, null)
                    }
                },
                ondateselect: function (q) {
                    var p = this._datePickers[1];
                    if (p) {
                        var o = p.options.startDate;
                        if (o && o.constructor == Date) {
                            this.showInput(1)
                        } else {
                            if (q != 1) {
                                this.hideInput(1)
                            }
                        }
                    }
                    this.initShortcutDate()
                },
                ontabselect: function (q) {
                    var p = this._datePickers[1];
                    if (p) {
                        var o = p.options.startDate;
                        if (o && o.constructor == Date) {
                            this.showInput(1)
                        } else {
                            if (q != 1) {
                                this.hideInput(1)
                            }
                        }
                    }
                },
                onchange: function (p, o) {
                    i.showDateTip(p, e, o)
                },
                dateOptions: [{
                        singleSelection: l,
                        maxSelectDays: f,
                        todayDate: T.config.pageInfo.ed ? new Date(+T.config.pageInfo.ed) : "",
                        firstDate: T.config.pageInfo.sd ? new Date(+T.config.pageInfo.sd) : "",
                        startDate: c,
                        endDate: g,
                        lastDate: T.config.pageInfo.ed ? new Date(+T.config.pageInfo.ed) : new Date()
                    }, {
                        singleSelection: l,
                        maxSelectDays: f,
                        todayDate: T.config.pageInfo.ed ? new Date(+T.config.pageInfo.ed) : "",
                        firstDate: T.config.pageInfo.sd ? new Date(+T.config.pageInfo.sd) : "",
                        startDate: b,
                        endDate: m,
                        lastDate: T.config.pageInfo.ed ? new Date(+T.config.pageInfo.ed) : new Date()
                    }]
            }, e.options));
            this.showDateTip([{
                    from: c,
                    to: g
                }, {
                    from: b,
                    to: m
                }], e, false)
        },
        isDate: function (b) {
            return b && b.constructor == Date ? true : false
        },
        getDateStr: function (f, e) {
            var d = baidu.date.format;
            var b = d(f, "yyyy-MM-dd");
            var c = d(e, "yyyy-MM-dd");
            return (b == c) ? b : (b + "~" + c)
        },
        showDateTip: function (h, g, d) {
            var l = h[0].from;
            var m = h[0].to;
            var i = h[1] && h[1].from;
            var j = h[1] && h[1].to;
            var k = g.options && g.options.prefix || "";
            var f = T.g(k + "Date");
            var b = T.g(k + "timePickerText");
            var c = this.isDate(i);
            var e = this.getDateStr(l, m);
            if (c) {
                var n = this.getDateStr(i, j);
                f && (f.innerHTML = "(" + e + "与" + n + ")");
                b.innerHTML = e + "<br>" + n;
                T.dom.addClass(b.parentNode.parentNode, "multi-time")
            } else {
                f && (f.innerHTML = "(" + e + ")");
                b.innerHTML = e;
                $("#timePickerInput").val(e);
                $("#timePickerInput").change();
                T.dom.removeClass(b.parentNode.parentNode, "multi-time")
            }
            T.dom.one(".report-help") && (T.dom.setStyle(T.dom.one(".tip-arrow"), "left", (T.dom.one(".report-help").offsetLeft + 2) + "px"));
            (d !== false) && this.fire(this._getEventName(g.id), {
                id: "submitDateSelect",
                st: l && l.getTime(),
                et: m && m.getTime(),
                st2: i && i.getTime(),
                et2: j && j.getTime()
            })
        }
    });
    T.extend(this, a);
    this._init()
};
