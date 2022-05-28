var e = require('./4F97F14255C842DF29F19945DB418C74.js'),
    t = require('./8473358655C842DFE2155D813E918C74.js'),
    n = require('./D5AF71D355C842DFB3C919D452918C74.js'),
    a = !1,
    o = !1,
    r = null,
    l = [];

function c(n, a) {
    var o = n.data[10],
        r = {
            tag_type: t.TAG_TYPE_HF_14443A,
            uid_hex: e.bytes2hex(n.data, 0, o),
            sak_hex: e.bytes2hex(n.data, 12, 1),
            atqa_hex: e.bytes2hex(n.data.slice(13, 15), 0, 2),
            readable: !1
        },
        l = function (e) {
            0 == e.status ? ((r.tag_type = t.TAG_TYPE_MF1_MAYBE), (r.readable = !0)) : (r.tag_type = t.TAG_TYPE_HF_14443A), a(r);
        };

    e.request14AGetATSDataArr(1500, function (t) {
        0 == t.status && null != t.data && t.data.length > 0 && (r.ats_hex = e.bytes2hex(t.data, 0, t.data.length)), e.requestCheckMf3TimeAuth(1500, l);
    });
}

function u(n, a) {
    a({
        tag_type: t.TAG_TYPE_LF_EM410X,
        uid_hex: e.bytes2hex(n.data, 0, 5),
        readable: !0
    });
}

function s(n) {
    var a = {},
        o = function (e) {
            if (0 == e.status) (a.tag_type = t.TAG_TYPE_MF1_STDWK), n(a);
            else if (36 == e.status) (a.tag_type = t.TAG_TYPE_MF1_STDST), n(a);
            else {
                if (37 != e.status) {
                    var o = '在检测随机数类型时出现了不支持解析的状态: ' + e.status.toString(16);
                    throw (console.error(o), o);
                }

                (a.tag_type = t.TAG_TYPE_MF1_STDHD), n(a);
            }
        },
        r = function (e) {
            1 != e.status ? (0 != e.status ? t.requestNestedNTLoophole(1500, o) : ((a.tag_type = t.TAG_TYPE_MF1_GEN1A), (a.readable = !0), n(a))) : t.throwTagErrorEvent(1);
        };

    t.requestCheckMfBlockSize(3e3, function (t) {
        (a.max_block = t.data[0]), e.requestGEN1ATAGLoophole(1500, r);
    });
}

function i(e) {
    s(function (n) {
        Object.assign(t.getTagInformation(), n), console.log('完善的Mifare标签信息: ' + JSON.stringify(t.getTagInformation())), e(t.getTagInformation());
    });
}

function f(e, t) {
    return (e[parseInt(t / 8)] >> t % 8) & !0;
}

function _(t) {
    for (var n = [], a = 0; a < e.mifare_blks_count_sec(t); a++) n.push(a);

    return n;
}

function g(n, a, o, r, l) {
    var c = e.mifare_sector_2_block(n),
        u = {};

    if (
        (r.sort(function (e, t) {
            return e - t;
        }),
        r.length > 16)
    ) {
        var s = 'startReadMifareSectorForType发现使能读取的列表太大！' + r.length;
        throw (console.log(s), s);
    }

    t.requestRDSCOnceStandard(n, a, o, r, 3e3, function (t) {
        var n = e.chunkArray(t.data.slice(2), 16);
        r.forEach(function (e, a) {
            f(t.data, e) ? (u[c + a] = n[a]) : (u[c + a] = null);
        }),
            l(u);
    });
}

function T(t, n, a, o) {
    var r = _(t);

    g(t, 96, n, r, function (n) {
        var l, c;
        (l = n),
            (c = !0),
            Object.keys(l).forEach(function (e) {
                null == l[e] && (c = !1);
            }),
            c
                ? o(n)
                : ((r = (function (t, n) {
                      var a = [];
                      return (
                          Object.keys(t).forEach(function (o) {
                              if (null == t[o]) {
                                  var r = e.mifare_secblk_2_index(o, n);
                                  a.push(r);
                              }
                          }),
                          a
                      );
                  })(n, t)),
                  console.log('扇区'.concat(t, '读取失败的block: ') + JSON.stringify(r)),
                  g(t, 97, a, r, function (e) {
                      var t, a, r;
                      o(
                          ((t = n),
                          (a = e),
                          (r = {}),
                          Object.keys(t).forEach(function (e) {
                              (r[e] = t[e]), null == r[e] && e in a && null != a[e] && (r[e] = a[e]);
                          }),
                          Object.keys(a).forEach(function (e) {
                              e in r || (r[e] = a[e]);
                          }),
                          r)
                      );
                  }));
    });
}

function h(a, o) {
    var r = t.getMifareTagDatas(),
        l = t.getMifareCardKeys();
    (r.length = 0),
        (l.length = 0),
        a(t.getTagInformation().max_block, function (a) {
            n.setCacheKesy4Mifare(a);

            for (var c = Object.keys(a).length, u = 0; u < c; u++) {
                var s = e.hex2bytes(a[u].keya),
                    i = e.hex2bytes(a[u].keyb);
                l.push(s), l.push(i);
            }

            console.log(' '),
                console.log('密钥获取完成，开始以获得的密钥读取所有的扇区：'),
                (function n(l) {
                    if (l >= c) o(100);
                    else {
                        var u = e.hex2bytes(a[l].keya),
                            s = e.hex2bytes(a[l].keyb);
                        T(l, u, s, function (a) {
                            var i = Object.keys(a);
                            console.log('----------------------------------------------------------------------------------------'),
                                i.forEach(function (n, o) {
                                    var c = a[n];

                                    if (o == i.length - 1) {
                                        var f = new Array();
                                        Array.prototype.push.apply(f, u),
                                            null == a[n] ? Array.prototype.push.apply(f, [0, 0, 0, 0]) : Array.prototype.push.apply(f, a[n].slice(6, 10)),
                                            Array.prototype.push.apply(f, s),
                                            (c = f),
                                            console.log(
                                                '拼接密钥: '
                                                    .concat(e.bytes2hex(u), ' -- ')
                                                    .concat(e.bytes2hex(s), '，块')
                                                    .concat(e.mifare_sector_2_block(l) + o)
                                            );
                                    } else null == c && (c = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA));

                                    console.log('块'.concat(o, ', 数据: ').concat(e.bytes2hex(c))), r.push(c);
                                }),
                                o((l / c) * 100),
                                n(l + 1);
                        });
                    }
                })(0);
        });
}

function p(n, a, o, r, l, c) {
    t.requestWRBLMoreStandard(n, a, o, r, l, 3e3, function (t) {
        for (var a = {}, o = 0; o < e.mifare_blks_count_sec(n); o++) a[o] = 1 == ((t.data[parseInt(o / 8)] >> parseInt(o % 8)) & 1);

        c(a);
    });
}

function y(e, t, n, a, o, r) {
    if (
        (a.sort(function (e, t) {
            return e - t;
        }),
        a.length > 16)
    ) {
        var l = 'startWriteMifareSectorForType发现使能写入的列表太大！' + a.length;
        throw (console.log(l), l);
    }

    0 == e && ((a = [1, 2]), (o = [o[1], o[2]])), p(e, t, n, a, o, r);
}

function A(e, t) {
    for (var n = Object.keys(t), a = 0; a < n.length; a++) {
        var o = n[a];
        if (0 != t[o]);
        else if (0 != e || (0 != o && 3 != o)) return !1;
    }

    return !0;
}

function d(e, t) {
    for (var n = Object.keys(t), a = 0; a < e.length; a++) {
        var o = e[a];
        if (o in n && 0 == t[o]) return !1;
    }

    return !0;
}

function v(e, t) {
    for (var n = [], a = Object.keys(e), o = 0; o < a.length; o++) {
        var r = a[o];

        if (0 == e[r]) {
            if (0 == t && (0 == r || 3 == r)) continue;
            n.push(r);
        }
    }

    return (
        n.sort(function (e, t) {
            return e - t;
        }),
        n
    );
}

function E(e, t) {
    var n = {};
    return (
        Object.keys(e).forEach(function (t) {
            n[t] = e[t];
        }),
        Object.keys(t).forEach(function (e) {
            1 == t[e] && (n[e] = !0);
        }),
        n
    );
}

function D(e) {
    return r((e = (e / 100) * 40 + 60));
}

function F(e) {
    return (r = e), D;
}

function b(e) {
    var n = t.getMifareTagDatas().length;
    return e.max_block + 1 >= n;
}

function S(e) {
    var n = function (n) {
            n.tag_type == t.TAG_TYPE_MF1_GEN1A
                ? b(n)
                    ? (function (e) {
                          I(x(), !0, e);
                      })(e)
                    : t.throwTagErrorEvent(99)
                : n.tag_type == t.TAG_TYPE_MF1_STDWK || n.tag_type == t.TAG_TYPE_MF1_STDST || n.tag_type == t.TAG_TYPE_MF1_STDHD
                ? b(n)
                    ? (function (e) {
                          var n = x();
                          !(function (e) {
                              for (var n, a, o = t.getMifareCardKeys(), r = new Array(), l = 0; l < o.length; l++) r.push([255, 255, 255, 255, 255, 255]);

                              var c = function (l) {
                                  if (m(l.data, r.length)) console.log('此容器卡是原卡的密钥！'), e(o);
                                  else {
                                      console.log('此容器卡有非原卡的密钥，将尝试合并原卡和空卡密钥！'), (n = l.data);

                                      for (var c = [], u = 0; u < r.length; u++) {
                                          var s = 1 == ((a[parseInt(u / 8)] >> parseInt(u % 8)) & 1),
                                              i = 1 == ((n[parseInt(u / 8)] >> parseInt(u % 8)) & 1);
                                          s ? c.push(r[u]) : i && c.push(o[u]);
                                      }

                                      c.length == r.length
                                          ? (console.log('合并成功，已经发现该容器卡所有的可用密钥！'), e(c))
                                          : (console.log('合并失败，未发现该容器卡所有的可用密钥！'), t.throwTagErrorEvent(42));
                                  }
                              };

                              console.log('开始检索默认密钥，密钥数量是: ' + r.length),
                                  t.requestAuthMF1KnownKeys(r, 5e3, function (n) {
                                      m(n.data, r.length)
                                          ? (console.log('此容器卡全都是默认密钥！'), e(r))
                                          : ((a = n.data), console.log('此容器卡有非默认密钥，将进行原卡密钥检索！'), t.requestAuthMF1KnownKeys(o, 5e3, c));
                                  });
                          })(function (t) {
                              G(t, n, !0, e);
                          });
                      })(e)
                    : t.throwTagErrorEvent(99)
                : t.throwTagErrorEvent(98);
        },
        a = function (e) {
            e.tag_type == t.TAG_TYPE_MF1_MAYBE
                ? s(function (t) {
                      Object.assign(e, t), n(e);
                  })
                : t.throwTagErrorEvent(98);
        };

    t.requestOnce14AFieldScan(3e3, function (e) {
        console.log('写卡时寻卡的结果: ' + JSON.stringify(e)), c(e, a);
    });
}

function M(n, a) {
    var o = new Array(),
        r = null;
    if (((r = null != a && null != a ? a : t.getTagInformation()), Array.prototype.push.apply(o, e.hex2bytes(r.uid_hex)), void 0 === n || null == n)) {
        if (8 == r.uid_hex.length)
            o.push(e.calcIDBcc(o)),
                Array.prototype.push.apply(o, e.hex2bytes(r.sak_hex)),
                Array.prototype.push.apply(o, e.hex2bytes(r.atqa_hex)),
                Array.prototype.push.apply(o, e.hex2bytes('01B6BA8B43B8751D'));
        else if (14 == r.uid_hex.length) Array.prototype.push.apply(o, e.hex2bytes('884400C82000000000'));
        else {
            if (20 != r.uid_hex.length) throw '不支持的卡片UID长度: ' + r.uid_hex.length;
            Array.prototype.push.apply(o, e.hex2bytes('884400C82000'));
        }
    } else if (8 == r.uid_hex.length)
        o.push(e.calcIDBcc(o)),
            Array.prototype.push.apply(o, e.hex2bytes(r.sak_hex)),
            Array.prototype.push.apply(o, e.hex2bytes(r.atqa_hex)),
            Array.prototype.push.apply(o, e.hex2bytes(n.slice(8, 16)));
    else if (14 == r.uid_hex.length) Array.prototype.push.apply(o, n.slice(7, 16));
    else {
        if (20 != r.uid_hex.length) throw '不支持的卡片UID长度: ' + r.uid_hex.length;
        Array.prototype.push.apply(o, n.slice(10, 16));
    }
    return o;
}

function x() {
    var n = e.getStorageSyncHasDefault('auto_invalid_acs_fix', !0),
        a = e.getStorageSyncHasDefault('use_anticollision_sak', !0);
    console.log('是否启用了自动修复控制位: ' + n), console.log('是否启用了自动修复SAK: ' + a);
    var o = new Array();
    return (
        t.getMifareTagDatas().forEach(function (r, l) {
            var c = r;
            0 == l
                ? null == c
                    ? ((c = M()), console.log('厂商块为空，自动修正后的数据是: ' + e.bytes2hex(c)))
                    : a && 8 == t.getTagInformation().uid_hex.length
                    ? ((c = M(c)), console.log('厂商块不为空，强行修正SAK后的数据是: ' + e.bytes2hex(c)))
                    : console.log('厂商块不为空且无需修正厂商块。')
                : e.mifare_is_trailer_blk(l)
                ? null == c
                    ? n
                        ? ((c = e.hex2bytes(t.TAG_MF1_DEFAULT_TRAI)), console.log('尾部块'.concat(l, '为空，自动修正为默认尾部块')))
                        : ((c = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA)),
                          console.log('尾部块'.concat(l, '为空，不自动修正为默认尾部块，而是使用空的数据填充，此操作可能会导致卡片锁死。')))
                    : 0 == c[6] &&
                      0 == c[7] &&
                      0 == c[8] &&
                      0 == c[9] &&
                      (n
                          ? ((c[6] = 255), (c[7] = 7), (c[8] = 128), (c[9] = 105), console.log('尾部块'.concat(l, '控制位为空，自动修正为默认控制位，此操作可避免锁卡。')))
                          : console.log('尾部块'.concat(l, '控制位为空，但是不自动修正，此操作可能会导致卡片锁死。')))
                : null == c && ((c = e.hex2bytes(t.TAG_MF1_DEFAULT_DATA)), console.log('数据块'.concat(l, '为空，自动修正为空的数据块。')));
            o.push(c);
        }),
        o
    );
}

function m(e, t) {
    for (var n = !0, a = 0; a < t; a++) {
        if (!(1 == ((e[parseInt(a / 8)] >> parseInt(a % 8)) & 1))) {
            n = !1;
            break;
        }
    }

    return n;
}

function G(n, a, o, r) {
    var c = a.length,
        u = e.mifare_secs_count_all(c);
    o || (l.length = 0);

    for (var s = 0; s < n.length; s += 2)
        console.log(
            '索引是: '
                .concat(s, ', 密钥是A: ')
                .concat(e.bytes2hex(n[s]), '，密钥B是: ')
                .concat(e.bytes2hex(n[s + 1]))
        );

    var i = function (e) {
        d([0, 3], e)
            ? (console.log('写卡全部成功（包括厂商块）'), r(100))
            : d([3], e)
            ? (console.log('写卡部分成功（只有尾部块）'), o ? t.throwTagErrorEvent(46) : (l.push(0), r(100)))
            : (console.log('写卡不成功（厂商块和尾部块都失败！）'), o ? t.throwTagErrorEvent(45) : (l.push(0, 3), r(100)));
    };

    console.log('扇区数量总数: ' + u),
        (function c(s) {
            if (s >= u) {
                var f = [a[0], a[3]];
                return (
                    (g = n[0]),
                    (T = n[1]),
                    (D = i),
                    void p(0, 96, g, (F = [0, 3]), (h = f), function (e) {
                        if (d([0, 3], e)) D(e);
                        else {
                            F = [];
                            var t = [];
                            0 == e[0] && (F.push(0), t.push(h[0])),
                                0 == e[3] && (F.push(3), t.push(h[1])),
                                p(0, 97, T, F, t, function (t) {
                                    D(E(e, t));
                                });
                        }
                    })
                );
            }

            var g,
                T,
                h,
                D,
                F,
                b = e.mifare_sector_2_block(s),
                S = b + e.mifare_blks_count_sec(s),
                M = a.slice(b, S),
                x = n[parseInt(2 * s)],
                m = n[parseInt(2 * s + 1)];
            !(function (e, t, n, a, o) {
                var r = _(e);

                y(e, 96, t, r, a, function (t) {
                    if (A(e, t)) o(t);
                    else {
                        (r = v(t, e)), console.log('扇区'.concat(e, '写入失败的block: ') + JSON.stringify(r));

                        for (var l = [], c = 0; c < r.length; c++) l.push(a[r[c]]);

                        y(e, 97, n, r, l, function (e) {
                            o(E(t, e));
                        });
                    }
                });
            })(s, x, m, M, function (n) {
                if (A(s, n)) {
                    console.log('普通sector写入成功: ' + s + ', 数据: ');

                    for (var a = 0; a < M.length; a++) console.log('Block'.concat(a, ': ') + e.bytes2hex(M[a], 0, 16));
                } else {
                    if ((console.log('普通sector写入失败: ' + s), o)) return void t.throwTagErrorEvent(45);
                    Array.prototype.push.apply(l, v(n, s));
                }

                r(((s += 1) / u) * 100 - 5), c(s);
            });
        })(0);
}

function k(e) {
    var n = X(t.getTagInformation());
    G(t.getMifareCardKeys(), n, !1, e);
}

function I(n, a, o) {
    var r = 16,
        l = n.length,
        c = function (t) {
            a
                ? e.requestUnlockChineseTag(3e3, function (t) {
                      0 == t.status
                          ? e.requestUplockChineseTag(3e3, function (e) {
                                o(100), console.log('GEN1A上锁'.concat(0 == e.status ? '成功' : '失败'));
                            })
                          : o(100);
                  })
                : o(100);
        };

    console.log('上限块是: ' + l),
        (function e(a) {
            if (a >= l) t.requestWRBLOnceGen1ATag(0, n[0], 2e3, c);
            else {
                console.log('当前的写开始位置: ' + a + ', 上限block：' + l);
                var u = n.slice(a, a + r);
                t.requestWRBLMoreGen1ATag(a, u, 3e3, function (n) {
                    a += r;

                    for (var c = 0; c < r; c++) if (!f(n.data, c)) return console.log('后门block写入失败: ' + (c + a)), void t.throwTagErrorEvent(43);

                    a + r > l && (r = l - a), o((a / l) * 100 - 5), e(a);
                });
            }
        })(1);
}

n.registerOnAttackKeysCbk(function (e, t, n, a, o) {
    'function' == typeof r && r((n / t) * 60);
});
var Y = {};
(Y[t.TAG_TYPE_HF_14443A] = null),
    (Y[t.TAG_TYPE_LF_EM410X] = function (e) {
        e(100);
    }),
    (Y[t.TAG_TYPE_MF1_MAYBE] = function (e) {
        i(function () {
            q(e);
        });
    }),
    (Y[t.TAG_TYPE_MF1_GEN1A] = function (n) {
        var a = t.getMifareTagDatas(),
            o = t.getMifareCardKeys();
        (a.length = 0), (o.length = 0);

        for (var r = 16, l = t.getTagInformation().max_block + 1, c = e.mifare_secs_count_all(l), u = 0; u < c; u++) o.push(null, null);

        console.log('上限块是: ' + l),
            (function c(u) {
                u >= l ||
                    (console.log('当前的读开始位置: ' + u + ', 上限block：' + l),
                    t.requestRDBLMoreGen1ATag(u, r, 3e3, function (s) {
                        for (var i = e.chunkArray(s.data.slice(2), 16), _ = 0; _ < i.length; _++) {
                            var g = i[_],
                                T = u + _;
                            if (!f(s.data, _)) return (a[T] = null), console.log('后门块读取失败: ' + T), void t.throwTagErrorEvent(40);

                            if (((a[T] = g), e.mifare_is_trailer_blk(T))) {
                                var h = g.slice(0, 6),
                                    p = g.slice(10, 16),
                                    y = e.mifare_block_2_sector(T);
                                (o[2 * y] = h), (o[2 * y + 1] = p);
                            }
                        }

                        (u += r) + r > l && (r = l - u), n((u / l) * 100), c(u);
                    }));
            })(0);
    }),
    (Y[t.TAG_TYPE_MF1_STDWK] = function (e) {
        h(n.requestNestedKeyForSize, F(e));
    }),
    (Y[t.TAG_TYPE_MF1_STDST] = function (e) {
        h(n.requestFastSTKeyForSize, F(e));
    }),
    (Y[t.TAG_TYPE_MF1_STDHD] = function (e) {
        h(n.checkHardnestedPartEncryptForSize, e);
    });
var P = {};
(P[t.TAG_TYPE_HF_14443A] = null),
    (P[t.TAG_TYPE_LF_EM410X] = function (n) {
        var a = t.getTagInformation(),
            o = e.hex2bytes(a.uid_hex);

        function r(t) {
            return e.bytes2hex(t, 0, t.length) == a.uid_hex;
        }

        var l = function (e) {
                64 == e.status && r(e.data) ? n(100) : t.throwTagErrorEvent(69);
            },
            c = function (t) {
                e.requestOnce410FieldScan(2e3, l);
            },
            u = function (e) {
                64 == e.status && r(e.data) ? n(100) : (n(60), t.requestOnceWrite82XXTag(o, 2e3, c));
            },
            s = function (t) {
                e.requestOnce410FieldScan(2e3, u);
            };

        e.requestOnce410FieldScan(2e3, function (e) {
            64 == e.status && r(e.data) ? t.throwTagErrorEvent(68) : (n(30), t.requestOnceWrite55XXTag(o, 2e3, s));
        });
    }),
    (P[t.TAG_TYPE_MF1_GEN1A] = S),
    (P[t.TAG_TYPE_MF1_STDWK] = S),
    (P[t.TAG_TYPE_MF1_STDST] = S),
    (P[t.TAG_TYPE_MF1_STDHD] = S);
var w = {};

function q(e) {
    if (null == t.getTagInformation().tag_type) throw '开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了读取操作！';
    var n = Y[t.getTagInformation().tag_type];
    if (null == n) throw '开发者没有判断 readable 变量吗？为什么对不支持读取的标签调用了读取操作！';
    n(e);
}

function O() {
    return t.getMifareTagDatas();
}

(w[t.TAG_TYPE_HF_14443A] = null),
    (w[t.TAG_TYPE_LF_EM410X] = null),
    (w[t.TAG_TYPE_MF1_GEN1A] = function (e) {
        I(X(t.getTagInformation()), !1, e);
    }),
    (w[t.TAG_TYPE_MF1_STDWK] = k),
    (w[t.TAG_TYPE_MF1_STDST] = k),
    (w[t.TAG_TYPE_MF1_STDHD] = k);
var L = {};

function B() {
    return e.getStorageSyncHasDefault('dump_file_list', []);
}

function C(e) {
    for (var t = B(), n = 'dump_file_uuid_'.concat(e), a = !0, o = !1, r = 0; r < t.length; r++)
        if (t[r] == e) {
            t.splice(r, 1), (o = !0);
            break;
        }

    if (o)
        try {
            uni.setStorageSync('dump_file_list', t);
        } catch (e) {
            console.log('deleteDumpFileCache' + e), (a = !1);
        }

    try {
        uni.removeStorageSync(n);
    } catch (e) {
        console.log('deleteDumpFileCache' + e), (a = !1);
    }

    return a;
}

function K(t) {
    var n = B(),
        a = e.generateUUID();
    n.push(a);

    try {
        uni.setStorageSync('dump_file_list', n), uni.setStorageSync('dump_file_uuid_'.concat(a), t);
    } catch (e) {
        return console.log('appendDumpFileCache' + e), C(a), null;
    }

    return a;
}

function H() {
    var e = t.getTagInformation(),
        n = e.tag_type;

    if (null != n) {
        var a = L[n];
        if (null != a)
            return {
                tag_info: e,
                tag_data: a(),
                tag_date: new Date().getTime()
            };
        console.log('不支持保存数据的卡片类型: ' + n);
    } else console.log('没有有效的卡片信息，无法保存数据！');

    return null;
}

function U(t) {
    var n = 'dump_file_uuid_'.concat(t);
    return e.getStorageSyncHasDefault(n, null);
}

function N(n) {
    t.setMifareTagDatas(n.tag_data);
    var a = t.getMifareCardKeys();
    return (
        (a.length = 0),
        n.tag_data.forEach(function (t, n) {
            if (e.mifare_is_trailer_blk(n)) {
                var o = t.slice(0, 6),
                    r = t.slice(10, 16);
                a.push(o), a.push(r), console.log('加载块'.concat(n, '的Key: ').concat(e.bytes2hex(o), ' -- ').concat(e.bytes2hex(r)));
            }
        }),
        !0
    );
}

(L[t.TAG_TYPE_HF_14443A] = null),
    (L[t.TAG_TYPE_LF_EM410X] = function () {
        return [];
    }),
    (L[t.TAG_TYPE_MF1_MAYBE] = O),
    (L[t.TAG_TYPE_MF1_GEN1A] = O),
    (L[t.TAG_TYPE_MF1_STDWK] = O),
    (L[t.TAG_TYPE_MF1_STDST] = O),
    (L[t.TAG_TYPE_MF1_STDHD] = O);
var W = {};

function j(e, t) {
    var n = 'dump_file_uuid_'.concat(e);

    if (-1 != uni.getStorageInfoSync().keys.indexOf(n)) {
        if (null != t) return uni.setStorageSync(n, t), console.log('更新信息成功！'), !0;
        console.log('更新信息失败，传入的信息为空！');
    } else console.log('更新失败，UUID指向的DUMP信息不存在！');

    return !1;
}

function X(n) {
    for (var a = [], o = n.max_block + 1, r = 0; r < o; r++)
        0 == r ? a.push(M(null, n)) : e.mifare_is_trailer_blk(r) ? a.push(e.hex2bytes(t.TAG_MF1_DEFAULT_TRAI)) : a.push(e.hex2bytes(t.TAG_MF1_DEFAULT_DATA));

    return a;
}

(W[t.TAG_TYPE_HF_14443A] = null),
    (W[t.TAG_TYPE_LF_EM410X] = function (e) {
        return !0;
    }),
    (W[t.TAG_TYPE_MF1_MAYBE] = N),
    (W[t.TAG_TYPE_MF1_GEN1A] = N),
    (W[t.TAG_TYPE_MF1_STDWK] = N),
    (W[t.TAG_TYPE_MF1_STDST] = N),
    (W[t.TAG_TYPE_MF1_STDHD] = N),
    (module.exports = {
        getStorageSyncHasDefault: e.getStorageSyncHasDefault,
        startLoopTagScanner: function (n, r, l, s) {
            (a = !0), (o = !1);
            var i = !0,
                f = new Date().getTime();
            e.requestOnce14AFieldScan(3e3, function _(g) {
                if (0 == a || 0 == e.isBLEDeviceIsConnected()) return console.log('强行结束自动搜索标签的过程！'), void (o = !0);
                var T = 0;

                if ((i || (T = 64), g.status != T)) {
                    if (new Date().getTime() - f > n) return t.setTagInformation(null), (o = !0), void s();
                    i ? ((i = !1), r('LF'), e.requestOnce410FieldScan(3e3, _)) : ((i = !0), r('HF'), e.requestOnce14AFieldScan(3e3, _));
                } else {
                    var h = function (e) {
                        t.setTagInformation(e), (o = !0), l(e);
                    };

                    i ? c(g, h) : u(g, h);
                }
            });
        },
        stopLoopCardScanner: function (t) {
            if (a) {
                a = !1;
                var n = setInterval(function () {
                    o || 0 == e.isBLEDeviceIsConnected() ? (clearInterval(n), t()) : console.log('正在等待自动扫描标签的过程停止......');
                }, 1);
            } else t();
        },
        startHFTagOneSearch: function (n, a) {
            e.requestOnce14AFieldScan(3e3, function (e) {
                if (0 != e.status) t.setTagInformation(null), a();
                else {
                    c(e, function (e) {
                        t.setTagInformation(e), n(e);
                    });
                }
            });
        },
        startCheckMF1Detail: i,
        startLFTagOneSearch: function (n, a) {
            e.requestOnce410FieldScan(2e3, function (e) {
                if (64 != e.status) t.setTagInformation(null), a();
                else {
                    u(e, function (e) {
                        t.setTagInformation(e), n(e);
                    });
                }
            });
        },
        startReadTagAllData: q,
        startWriteCardDatas: function (e) {
            if (null == t.getTagInformation().tag_type) throw '开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了写卡操作！';
            var n = P[t.getTagInformation().tag_type];
            if (null == n) throw '开发者没有判断 readable 变量吗？为什么对不支持写卡的标签调用了写卡操作！';
            n(e);
        },
        startWipeTagAllData: function (e) {
            if (null == t.getTagInformation().tag_type) throw '开发者没有使用 startLoopTagScanner 进行寻卡吗？没有寻到卡为什么调用了清空操作！';
            var n = w[t.getTagInformation().tag_type];
            if (null == n) throw '开发者没有判断 readable 变量吗？为什么对不支持清空卡的标签调用了清空操作！';
            n(e);
        },
        getWriteBlocks4Fail: function () {
            return l;
        },
        saveDumpDatasToFile: function () {
            var e = H();
            return null != e ? K(e) : null;
        },
        makeEmptyMifareData: X,
        makeDatasSaveToFile: function (e) {
            var t = null,
                n = null;

            switch (e.type.toLowerCase()) {
                case 'ic':
                    n = X(
                        (t = {
                            tag_type: 'Mf1StdNTWK',
                            uid_hex: 'E0658888',
                            sak_hex: '08',
                            atqa_hex: '0400',
                            readable: !0,
                            max_block: 63
                        })
                    );
                    break;

                case 'id':
                    (t = {
                        tag_type: 'EM410x',
                        uid_hex: '4400999559',
                        readable: !0
                    }),
                        (n = []);
            }

            var a = {
                tag_info: t,
                tag_data: n,
                tag_date: new Date().getTime()
            };
            return null != a ? K(a) : null;
        },
        deleteDumpFilesByID: function (e) {
            if ('string' == typeof e) return C(e);

            if (Array.isArray(e)) {
                for (var t = !0, n = 0; n < e.length; n++) 0 == C(e[n]) && (console.log('有一个删除DUMP信息的任务失败了，其UUID是: ' + e[n]), (t = !1));

                return t;
            }

            return console.log('startDeleteDumpFile 不支持的传入格式！'), !1;
        },
        updateDumpDatasByID: j,
        updateDumpFromMemByID: function (e) {
            return j(e, H());
        },
        getCardDataFileList: function () {
            return B();
        },
        getCardDataDumpInfo: U,
        loadFile2DataBuffer: function (e) {
            var n = U(e);
            if (null == n) return console.log('loadFile2DataBuffer 无法加载指定的DUMP信息: ' + e), !1;
            t.setTagInformation(n.tag_info);
            var a = W[t.getTagInformation().tag_type],
                o = !0;
            return null != a ? (o = a(n)) : console.log('标签类型 '.concat(t.getTagInformation().tag_type, ' 不支持加载数据到内存中，自动跳过！')), o;
        }
    });
