var e = require("@babel/runtime/helpers/createForOfIteratorHelper.js"), t = require("@babel/runtime/helpers/typeof.js"), n = require("4F97F14255C842DF29F19945DB418C74.js"), r = require("8473358655C842DFE2155D813E918C74.js"), o = [ "ffffffffffff", "000000000000", "a0a1a2a3a4a5", "d3f7d3f7d3f7", "b0b1b2b3b4b5", "c0c1c2c3c4c5", "d0d1d2d3d4d5", "aabbccddeeff", "1a2b3c4d5e6f", "123456789abc", "010203040506", "123456abcdef", "abcdef123456" ], a = null, c = null, l = null, s = {}, i = [];

function u() {
    var e = r.getTagInformation().tag_type;
    return e == r.TAG_TYPE_MF1_STDHD || e == r.TAG_TYPE_MF1_STDST ? 50 : 30;
}

function f(e, t) {
    return 2 * t * e * u() + 18888;
}

function y(e, t, n, r) {
    i.forEach(function(o) {
        if ("function" == typeof o) {
            var a = 0, c = n;
            switch (e) {
              case "fchk":
                a = t * n * u(), c = D(r), console.log("fchk需要的毫秒数是: " + a);
                break;

              case "darkside":
                a = 4e3, k(r);
                break;

              case "nested":
                a = 5e3 * (t - n), k(r);
                break;

              case "staticnested":
                a = 1500 * (t - n), k(r);
                break;

              default:
                throw "无法识别的解密任务，请开发者做好此异常的处理: " + e;
            }
            o(e, t, c, r, a / 1e3);
        }
    });
}

function k(e) {
    var t = [];
    Object.keys(e).forEach(function(n) {
        var r = e[n];
        null != r.keya && t.push(r.keya), null != r.keyb && t.push(r.keyb);
    });
    var n = r.getTagInformation().uid_hex, o = "keys_".concat(n).toLowerCase();
    wx.setStorageSync(o, t);
}

function d(e) {
    var t = "keys_".concat(e).toLowerCase();
    return n.getStorageSyncHasDefault(t, []);
}

function h(e) {
    try {
        var t = JSON.parse(e);
        switch (t.code) {
          case 0:
            var n = t.result;
            if (n.task_uid in s) {
                var o = s[n.task_uid];
                switch (delete s[n.task_uid], n.status) {
                  case "SUCCESS":
                  case "NESTED_NO_VALID_NONCES":
                    "function" == typeof o && o(n.keys);
                    break;

                  case "ERROR":
                    r.throwTagErrorEvent(48);
                    break;

                  case "REQUEST_CPU_MAX_EXCEED":
                    r.throwTagErrorEvent(49);
                    break;

                  default:
                    throw "解密计算机返回了不认识的状态: " + n.status;
                }
            } else console.log("没有找到可以处理解密结果的回调函数映射，该任务详情是: " + e);
            break;

          case 1:
          case 7:
          case 8:
            for (var a in s) delete s[a];
            var c;
            1 == t.code && (c = "开发者调用AI制卡接口时传输的参数有误！"), 7 == t.code && (c = "AI制卡计算机离线，请联系管理员处理此异常情况！"), 
            8 == t.code && (c = "MP服务器出现错误，请联系管理员处理此异常情况！"), function(e) {
                wx.showModal({
                    title: "无法自动解决的硬性错误！",
                    showCancel: !1,
                    content: e
                });
            }(c);
        }
    } catch (e) {
        console.log("无法将解密服务器应答的消息转换为对象: " + JSON.stringify(e));
    }
}

function g() {
    for (var e in s) delete s[e];
    clearInterval(c), c = null;
}

function b() {
    var e = Object.keys(s).length;
    e > 0 ? null != a ? (console.log("WS自动释放定时器检测到当前存在 ".concat(e, " 个解密任务，短时间内将不会关闭链接！")), 
    null == l && (console.log("开始ping服务器， 在".concat(2e3, " 毫秒后不pong就认为服务器死了。")), a.send({
        data: "ping"
    }), l = setTimeout(function() {
        l = null, a.close({
            code: 4044,
            reason: "<tag-attack.js>模块检测到ping服务器长时间不pong，默认服务器宕机。"
        });
    }, 2e3))) : g() : (null != a && a.close({
        reason: "<tag-attack.js>模块检测到长时间不需要解密，为了缓解服务器压力自动释放了WS链接。"
    }), g());
}

function v(e) {
    if (null == a) {
        var t = n.getDeviceFactroyOTPInfo(), o = "".concat("wss://rcopy.nikola-lab.cn/server1/websocket/decrypt", "?serial=").concat(t.serial);
        (a = wx.connectSocket({
            url: o,
            timeout: 2e3,
            success: function(e) {
                console.log("打开WS成功" + JSON.stringify(e));
            },
            fail: function(e) {
                console.error("打开WS失败" + JSON.stringify(e)), a = null;
            }
        })).onOpen(function(t) {
            console.log("链接WS完成：" + JSON.stringify(t)), "function" == typeof e && e();
        }), a.onClose(function(e) {
            console.log("WS链接关闭：" + JSON.stringify(e)), g(), a = null, 1e3 != e.code && r.throwTagErrorEvent(47);
        }), a.onError(function(e) {
            console.error("WS链接异常：" + JSON.stringify(e)), a = null, g();
            var t = function(e) {
                if ("errMsg" in e) try {
                    var t = e.errMsg;
                    return {
                        code: parseInt(t.match(/code:\s*(\d+),/)[1]),
                        msg: t.match(/msg:\s*(.*)/)
                    };
                } catch (e) {
                    console.error("解析解密时WS交互错误应答体失败: " + e);
                }
                return null;
            }(e);
            null != t && 20 == t.code ? r.throwTagErrorEvent(104) : r.throwTagErrorEvent(47);
        }), a.onMessage(function(e) {
            var t = e.data;
            switch (t) {
              case "pong":
                console.log("服务器pong了。"), clearTimeout(l), l = null;
                break;

              default:
                h(t);
            }
        });
    } else e();
}

function _(e, t, r) {
    null != c && (clearInterval(c), c = null), v(function() {
        switch (e) {
          case "darkside":
            e = "darkside_task";
            break;

          case "nested":
            e = "nested_task";
            break;

          case "staticnested":
            e = "static_nested_task";
            break;

          default:
            throw "不支持的解密任务类型: " + e;
        }
        var o = n.generateUUID(), l = {
            task_name: e,
            task_uid: o,
            params: t
        };
        null != a ? (s[o] = r, a.send({
            data: JSON.stringify(l)
        }), c = setInterval(b, 5e3)) : console.log("与解密服务器的WS链接不存在，无法发起解密任务！");
    });
}

function S(e, t, n) {
    return {
        block: e,
        type: t,
        key: n
    };
}

function p(e, t, o, a) {
    var c = new Array(), l = 0, s = [], i = function(n) {
        n.data[0] < s.length ? a(S(e, t, s[n.data[0]])) : a(null);
    }, u = function(c) {
        if (c.length > 0) {
            var u = [];
            c.forEach(function(e) {
                u.push(n.hex2bytes(e, 0, e.length));
            });
            var k = f((s = u).length, 1);
            r.requestFCheckMf1SecKeys(e, t, s, k, i);
        } else l <= 255 ? r.requestDarksideRecovery(e, t, 0, o, 3e3, y) : a(null);
    }, y = function(r) {
        var o = n.bytes2DarksideObj(r.data);
        c.push(o), l += 1, _("darkside", function(e, t, n) {
            var r = {}, o = [];
            return r.uid = n[0].uid, r.type = "" + t, r.block = "" + e, n.forEach(function(e, t) {
                o.push({
                    nt1: e.nt1,
                    par: e.par,
                    ks1: e.ks1,
                    nr: e.nr,
                    ar: e.ar
                });
            }), r.cores = o, r;
        }(e, t, c), u);
    };
    r.requestDarksideRecovery(e, t, 1, o, 1e3 * o, y);
}

function E(e, t, o, a, c, l, s) {
    var i = [], u = 0, y = 0;
    function k() {
        r.requestNested2NtCollect(e, t, o, a, c, 3e3, g);
    }
    var d = function(e) {
        e.data[0] < i.length ? s(S(a, c, i[e.data[0]])) : (u += 1, k());
    }, h = function(h) {
        if (h.length > 0) {
            y = 0;
            var g = [];
            h.forEach(function(e) {
                g.push(n.hex2bytes(e, 0, e.length));
            });
            var b = f((i = g).length, 1);
            r.requestFCheckMf1SecKeys(a, c, i, b, d);
        } else u <= 30 ? y >= 3 ? (y = 0, r.requestNestedDistDetect(e, t, o, 3e3, function(e) {
            l = n.bytes2NestedDistObj(e.data), console.log("检测到之前的Distance无法解密出密钥，重新采集Distance，解析结果是: " + JSON.stringify(l)), 
            k();
        })) : (y += 1, k()) : s(null);
    }, g = function(e) {
        var t = n.bytes2NestedObj(a, c, e.data, l);
        u += 1, _("nested", t, h);
    };
    k();
}

function O(e, t, o, a, c, l) {
    var s = [], i = 0;
    function u() {
        r.requestSTDiff2NtCollect(e, t, o, a, c, 3e3, d);
    }
    var y = function(e) {
        e.data[0] < s.length ? l(S(a, c, s[e.data[0]])) : (i += 1, u());
    }, k = function(e) {
        if (e.length > 0) {
            var t = [];
            e.forEach(function(e, r) {
                t.push(n.hex2bytes(e, 0, e.length));
            });
            var o = f((s = t).length, 1);
            r.requestFCheckMf1SecKeys(a, c, s, o, y);
        } else i <= 3 ? u() : l(null);
    }, d = function(e) {
        var t = n.bytes2StaticNestedObj(a, c, e.data);
        i += 1, _("staticnested", t, k);
    };
    u();
}

function T(e) {
    var t = new Array(), n = 0;
    if (e >= 255) n = 40; else if (e >= 127) n = 32; else if (e >= 63) n = 16; else {
        if (!(e >= 19)) throw "未曾支持的标签大小！";
        n = 5;
    }
    for (var r = 0; r < n; r++) t.push(r);
    return t;
}

function N(e) {
    if (null != e && "object" == t(e)) {
        for (var n = Object.keys(e), r = 0, o = 0; o < n.length; o++) null != e[n[o]].keya && (r += 1);
        return r;
    }
    throw "getKeyAMapKeyFoundCount 传入了非正常的keymap参数。";
}

function w(e) {
    if (null != e && "object" == t(e)) {
        for (var n = Object.keys(e), r = 0, o = 0; o < n.length; o++) null != e[n[o]].keyb && (r += 1);
        return r;
    }
    throw "getKeyBMapKeyFoundCount 传入了非正常的keymap参数。";
}

function D(e) {
    return N(e) + w(e);
}

function A(e) {
    return Object.keys(e).length == N(e);
}

function m(e) {
    return 2 * Object.keys(e).length == D(e);
}

function C(e) {
    return 0 == D(e);
}

function x(e) {
    for (var t = Object.keys(e), r = 0; r < t.length; r++) {
        var o = t[r], a = n.mifare_to_trail_block(n.mifare_sector_2_block(o));
        if (null != e[o].keya) return {
            block: a,
            type: 96,
            key_hex: e[o].keya
        };
        if (null != e[o].keyb) return {
            block: a,
            type: 97,
            key_hex: e[o].keyb
        };
    }
    return null;
}

function j(e) {
    for (var t = Object.keys(e), r = 0; r < t.length; r++) {
        var o = t[r], a = n.mifare_to_trail_block(n.mifare_sector_2_block(o));
        if (null == e[o].keya) return {
            block: a,
            type: 96
        };
    }
    return null;
}

function q(e) {
    for (var t = Object.keys(e), r = 0; r < t.length; r++) {
        var o = t[r], a = n.mifare_to_trail_block(n.mifare_sector_2_block(o));
        if (null == e[o].keyb) return {
            block: a,
            type: 97
        };
    }
    return null;
}

function K(e, t) {
    for (var n = Object.keys(t), r = 0; r < n.length; r++) {
        var o = n[r];
        void 0 === e[o] && (e[o] = {
            keya: null,
            keyb: null
        }), null != t[o].keya && (e[o].keya = t[o].keya), null != t[o].keyb && (e[o].keyb = t[o].keyb);
    }
}

function M(t, o, a) {
    var c, l = {};
    c = Array.isArray(t) ? t : Object.keys(t);
    var s = function(t) {
        var r, o = 0, s = e(c);
        try {
            for (s.s(); !(r = s.n()).done; ) {
                var i = r.value;
                1 == (t.data[i / 8 & 255] >> (i % 8 & 255) & 1) && (l[i].keyb = n.bytes2hex(t.data, 6 * o + 5, 6), 
                o++);
            }
        } catch (e) {
            s.e(e);
        } finally {
            s.f();
        }
        console.log("密钥B读取完成，成功读取到的个数是: " + o), a(l);
    }, i = f(o.length, c.length);
    r.requestFCheckMfNSecKeys(t, o, i, function(e) {
        for (var c = 0, i = 0; i < t.length; i++) {
            var u = e.data.slice(c, c + 2), f = 255 != u[0], y = 255 != u[1], k = f ? n.bytes2hex(o[u[0]], 0, 6) : null, d = y ? n.bytes2hex(o[u[1]], 0, 6) : null;
            l[i] = {
                keya: k,
                keyb: d
            }, c += 2;
        }
        if (m(l)) console.log("本次密钥检索已经发现全部的密钥！"), a(l); else if (N(l) > 0) if (function(e) {
            return Object.keys(e).length == w(e);
        }(l)) console.log("本次密钥检索已经发现全部的密钥B！"), a(l); else {
            var h = {}, g = Object.keys(l);
            for (c = 0; c < g.length; c++) null == l[g[c]].keyb && null != l[g[c]].keya && (h[g[c]] = l[g[c]].keya);
            var b = Object.keys(h);
            b.length > 0 ? (console.log("本次密钥检索有未发现的密钥B，将启动读取，需要读取的密钥B的个数是: " + b.length), r.requestMfReadKeyBByKeyA(h, 3e3, s)) : (console.log("本次密钥检索没有未发现的密钥B。"), 
            a(l));
        } else console.log("本次密钥检索未发现最少一个密钥A！"), a(l);
    });
}

function F(e, t, n, r, o) {
    E(t.block, t.type, e, n.block, n.type, r, o);
}

function I(e) {
    var t = {};
    return e.forEach(function(e) {
        t[e] = {
            keya: null,
            keyb: null
        };
    }), t;
}

function J() {
    var e = [];
    return [ o ].forEach(function(t) {
        Array.isArray(t) && t.forEach(function(t) {
            "string" == typeof t && /[A-Fa-f0-9]{12}/.test(t) && (t = t.toLowerCase(), -1 == e.indexOf(t) && e.push(t));
        });
    }), e;
}

function R(e, t, n, o) {
    var a = T(e), c = 2 * a.length, l = {}, s = J();
    console.log("开始尝试扫描空标签，第一步是fchk。"), y("fchk", c, s.length, I(a)), M(a, s, function(e) {
        K(l, e), m(e) ? t(l) : C(e) ? r.throwTagErrorEvent(o) : r.throwTagErrorEvent(n);
    });
}

module.exports = {
    TASK_NAME_FCHK: "fchk",
    TASK_NAME_DARKSIDE: "darkside",
    TASK_NAME_NESTED: "nested",
    TASK_NAME_STATICNESTED: "staticnested",
    setCacheKesy4Mifare: k,
    getCacheKeys4Mifare: d,
    requestDarksideRecovery: p,
    requestWkNestedRecovery: E,
    requestSTNestedRecovery: O,
    requestNestedKeyForSize: function(e, t) {
        var o = T(e), a = 2 * o.length, c = {}, l = null, s = J();
        function i(e) {
            var t, o = x(c), a = n.hex2bytes(o.key_hex);
            t = A(c) ? q(c) : j(c), console.log("需要解密的目标扇区数据: " + JSON.stringify(t)), null != l ? (console.log("Distance已经采集过，采集历史是: " + JSON.stringify(l)), 
            F(a, o, t, l, e)) : (console.log("开始侦测距离: ".concat(JSON.stringify(o), ", ").concat(o.key_hex)), 
            r.requestNestedDistDetect(o.block, o.type, a, 3e3, function(r) {
                l = n.bytes2NestedDistObj(r.data), console.log("第一次获取Distance，解析结果是: " + JSON.stringify(l)), 
                F(a, o, t, l, e);
            }));
        }
        var u = function(e) {
            K(c, e), m(c) ? (y("nested", a, D(c), c), t(c)) : (y("nested", a, D(c), c), i(f));
        }, f = function(e) {
            if (null == e) return r.throwTagErrorEvent(38), void console.log("解密失败了，nested超过重试上限还是未能解密该卡片！");
            var t = n.mifare_block_2_sector(e.block), l = {};
            l[t] = {
                keya: null,
                keyb: null
            };
            var s = n.bytes2hex(e.key, 0, e.key.length);
            96 == e.type ? l[t].keya = s : l[t].keyb = s, K(c, l), y("nested", a, D(c), c), 
            M(o, [ s ], u);
        }, k = function(e) {
            K(c, e), y("nested", a, D(c), c), i(f);
        }, d = function(e) {
            if (null == e) return console.log("解密失败了，darkside超过重试上限还是未能解密该卡片！"), void r.throwTagErrorEvent(39);
            M(o, [ n.bytes2hex(e.key, 0, e.key.length) ], k);
        };
        console.log("开始尝试解密普通标签，第一步是fchk。"), y("fchk", a, s.length, I(o)), M(o, s, function(e) {
            K(c, e), m(e) ? t(c) : C(e) ? (y("darkside", a, 0, c), p(3, 96, 21, d)) : (y("nested", a, D(c), c), 
            i(f));
        });
    },
    requestFastSTKeyForSize: function(e, t) {
        var o = T(e), a = 2 * o.length, c = {}, l = J();
        function s(e) {
            var t, r = x(c), o = n.hex2bytes(r.key_hex);
            t = A(c) ? q(c) : j(c), O(r.block, r.type, o, t.block, t.type, e);
        }
        var i = function(e) {
            K(c, e), m(c) ? (y("staticnested", a, D(c), c), t(c)) : (y("staticnested", a, D(c), c), 
            s(u));
        }, u = function(e) {
            if (null == e) return r.throwTagErrorEvent(38), void console.log("解密失败了，nested超过重试上限还是未能解密该卡片！");
            var t = n.mifare_block_2_sector(e.block), l = {};
            l[t] = {
                keya: null,
                keyb: null
            };
            var s = n.bytes2hex(e.key, 0, e.key.length);
            96 == e.type ? l[t].keya = s : l[t].keyb = s, K(c, l), y("staticnested", a, D(c), c), 
            M(o, [ s ], i);
        }, f = function(e) {
            44 == e.status ? s(u) : r.throwTagErrorEvent(41);
        };
        console.log("开始尝试解密ST标签，第一步是fchk。"), y("fchk", a, l.length, I(o)), M(o, l, function(e) {
            if (K(c, e), m(e)) t(c); else if (C(e)) y("darkside", a, 0, c), r.throwTagErrorEvent(41); else {
                y("staticnested", a, D(c), c);
                var o = x(c), l = n.hex2bytes(o.key_hex);
                r.requestSTDiffNTLoophole(o.block, o.type, l, 3e3, f);
            }
        });
    },
    checkUnencryptedForSizeElseUnsupported: function(e, t) {
        R(e, t, 41, 41);
    },
    checkHardnestedPartEncryptForSize: function(e, t) {
        R(e, t, 50, 41);
    },
    registerOnAttackKeysCbk: function(e) {
        n.addUniqueCallbackToList(i, e);
    },
    unregisterOnAttackKeysCbk: function(e) {
        n.removeCallbackFromList(i, e);
    }
};