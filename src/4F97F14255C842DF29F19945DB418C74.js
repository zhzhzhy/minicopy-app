var e,
    n = require('@babel/runtime/helpers/typeof.js'),
    t = [
        0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290, 45419, 49548, 53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044, 29431, 25302, 37689, 33560,
        45947, 41818, 54205, 50076, 62463, 58334, 9314, 13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088, 38153, 58862, 62927, 50604, 54669, 13907, 9842, 5649,
        1584, 30423, 26358, 22165, 18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132, 18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790, 63919,
        35144, 39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770, 56317, 52188, 64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684, 23749, 11298,
        15363, 3168, 7233, 60846, 64911, 52716, 56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277, 20212, 15891, 11826, 7761, 3696, 65439, 61374, 57309, 53244, 48923, 44858,
        40793, 36728, 37256, 33193, 45514, 41451, 53516, 49453, 61774, 57711, 4224, 161, 12482, 8419, 20484, 16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981, 54044, 58239,
        62302, 689, 4752, 8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185, 62830, 58703, 54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413,
        42971, 47098, 34713, 38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068, 55628, 51565, 63758, 59695, 39368, 35305, 47498, 43435, 22596,
        18533, 30726, 26663, 6336, 2273, 14466, 10403, 52093, 56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061, 23124, 27191, 31254, 2801, 6864, 10931, 14994, 64814, 60687,
        56684, 52557, 48554, 44427, 40424, 36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342, 53085, 57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053,
        24180, 11923, 16050, 3793, 7920
    ],
    r = new Array(),
    o = new Array(),
    a = new Uint8Array(4096),
    c = !1,
    i = !1,
    u = !1,
    l = !1,
    s = !1,
    f = !1,
    p = !1,
    y = {
        cmd: 0,
        count: 0,
        data: null,
        call: null
    },
    h = {
        codeNumber: 0,
        codeString: '0.0'
    },
    d = {
        serial: '',
        hardware: 0,
        oscxtal: '',
        otpflag: 0
    },
    w = 0,
    v = null,
    g = 0,
    A = 0,
    m = 0,
    B = 0,
    b = 0,
    x = 0,
    E = !0,
    U = '0000'.concat('AE00') + '-0000-1000-8000-00805F9B34FB',
    C = null,
    D = function (e) {
        if ('object' == n(e) && e.hasOwnProperty('errCode'))
            switch (e.errCode) {
                case 1e4:
                case 10001:
                case 10008:
                case 10009:
                    u = !1;
            }
        'function' == typeof C ? C(e) : console.log('出现设备异常 '.concat(JSON.stringify(e), ' ，但是开发者没有注册设备异常处理器！'));
    },
    L = function () {
        console.log('出现通信超时异常，但是开发者没有注册超时处理器！');
    },
    S = function () {
        console.log('出现通信数据异常，但是开发者没有注册数据异常处理器！');
    },
    T = [],
    q = [],
    k = [],
    I = [];

function _(e) {
    for (var n = 65535, r = 0, o = e.length; r < o; ++r) {
        var a = 255 & (e[r] ^ (n >> 8));
        n = t[a] ^ (n << 8);
    }

    return 65535 & n;
}

function O(e, n, t) {
    if (!(Number.isInteger(e) && Number.isInteger(n))) throw 'PacketObject 检测到有不合格的传入参数，请解决这个问题！';
    (this.cmd = e),
        (this.status = n),
        (this.data = t),
        (this.catch = {
            timeout: !0
        }),
        (this.toUint8Array = function () {
            var e = new Array();
            e.push(1, 11), e.push(this.cmd, this.status);
            var n = new Uint8Array(2);
            return (
                null != this.data
                    ? (K(this.data.length, 2, n), Array.prototype.push.apply(e, n), (n[0] = n[1] = 0), Array.prototype.push.apply(e, n), Array.prototype.push.apply(e, this.data))
                    : e.push(0, 0, 0, 0),
                e.push(23, 4),
                K(_(e), 2, n),
                (e[6] = n[0]),
                (e[7] = n[1]),
                new Uint8Array(e)
            );
        });
}

function F(e) {
    e.deviceId == v && ((w = e.mtu), console.log('onBLEMTUChange 监听到MTU改变的事件，当前的MTU是: ' + e.mtu));
}

function N(e) {
    if (e.deviceId == v && 0 == e.connected) {
        console.log('onBLEConnectionCall 监听到设备链接断开。'), (p = !1), (v = null);

        for (var n = 0; n < o.length; n++)
            try {
                var t = o[n];
                clearTimeout(t.timer_id), o.splice(n, 1);
            } catch (e) {
                console.error('在清除BLE通信处理回调的缓存时出现异常: ' + e);
            }

        (o.length = 0),
            uni.offBLEConnectionStateChange(N),
            E &&
                uni.getBluetoothAdapterState({
                    success: function (e) {
                        console.log('重启搜索成功: ' + JSON.stringify(e)),
                            e.available ? $() : console.warn('警告，ble-device.js判断到在设备断开后，蓝牙适配器也不可用，将跳过自动启动扫描！');
                    },
                    fail: function (e) {
                        console.warn('警告，ble-device.js判断到在设备断开后，蓝牙适配器状态获取失败，将跳过自动启动扫描: ' + JSON.stringify(e));
                    }
                }),
            I.forEach(function (n) {
                try {
                    'function' == typeof n && n(e);
                } catch (e) {
                    console.error('在设备断开，进行回调通知时出现异常: ' + e);
                }
            });
    }
}

function M(e) {
    return void 0 === e || null == e;
}

function R(e, n, t) {
    return 'string' == typeof e
        ? e
        : (M(n) && (n = 0),
          M(t) && (t = e.length),
          Array.prototype.map
              .call(e.slice(n, n + t), function (e) {
                  return ('00' + e.toString(16)).slice(-2);
              })
              .join('')
              .toUpperCase());
}

function j(e, n, t) {
    if ('string' != typeof e) return e;
    var r = [];
    M(n) && (n = 0), M(t) && (t = e.length);

    for (var o = n; o < t; o += 2) r.push(parseInt(e.substr(o, 2), 16));

    return r;
}

function K(e, n, t) {
    for (; n--; ) (t[n] = 255 & e), (e >>= 8);
}

function W(e, n, t) {
    var r = new Uint8Array(e),
        o = new DataView(r.buffer);

    switch (t) {
        case 2:
            return o.getUint16(n);

        case 4:
            return o.getUint32(n);
    }

    var a = 'bytes2Num不支持此转换长度: ' + t;
    throw (console.error(a), new Error(a));
}

function G(e, n, t) {
    return (
        (r = e.slice(n, n + t)),
        (o = !1 && r.length > 0 && r[0] >= 128),
        (a = []),
        r.forEach(function (e, n) {
            o && (e = 256 - (n == r.length - 1 ? 0 : 1) - e);

            for (var t = 0; e > 0 || t < a.length; t++) (e += 256 * (a[t] || 0)), (a[t] = e % 10), (e = (e - a[t]) / 10);
        }),
        0 == a.length ? '0' : (o ? '-' : '') + a.reverse().join('')
    );
    var r, o, a;
}

function X(e, n, t) {
    return W(e, n, t).toString();
}

function P(e) {
    if (20 != e.length) {
        var n = '解析字节数组为OTP信息的时候，发现长度不等于20个字节，这不符合OTP信息的既定长度！';
        throw (console.error(n), n);
    }

    return {
        serial: R(e, 0, 16).toLowerCase(),
        hw_ver: ((e[16] << 8) & 65535) | e[17],
        oscxtal: e[18],
        otpflag: e[19]
    };
}

function V(e) {
    return e < 32 ? parseInt(4 * e) : parseInt(128 + 16 * (e - 32));
}

function J(e) {
    return parseInt(e) < 32 ? 4 : 16;
}

function z() {
    (A = 0), (g = 0);
}

function H() {
    var e = !1;

    try {
        if (0 == A) {
            if (1 != a[A++] || 11 != a[A++]) return console.error('包头无效'), void (e = !0);
            if (0 == (m = a[A++])) return console.error('通信异常，非法访问！（cmd == 0x00）'), void (e = !0);
            (B = a[A++]), (b = W(a, A, 2)), (x = W(a, (A += 2), 2)), (a[A] = 0), (a[A + 1] = 0), (A += 2);
        }

        if (A + b + 2 > g) return void console.log('数据不完整，等待下一帧！');
        var n = null;
        if ((b > 0 && ((n = a.slice(A, A + b)), (A += b)), 23 != a[A++] || 4 != a[A++])) return console.error('包尾无效'), void (e = !0);
        if (_(a.slice(0, A)) != x) return console.error('BLE通信异常，CRC校验失败，将自动重试通信！'), void (e = !0);
        (y.cmd = 0), (y.count = 0), (y.data = null), (y.call = null);

        for (var t = !1, r = new O(m, B, n), c = 0; c < o.length; c++) {
            var i = o[c];

            if (i.cmd == m) {
                clearTimeout(i.timer_id);

                try {
                    i.call(r);
                } catch (e) {
                    throw (console.error('在调用命令返回处理回调函数时出现了没有被catch的异常: ' + e), e);
                } finally {
                    (t = !0), o.splice(c, 1);
                }
            }
        }

        t || console.log('没有发现可用的处理回调去处理此指令的数据包: 0x' + cmd.toString(16)), z();
    } finally {
        e &&
            (function () {
                function e() {
                    for (var e = 0; e < o.length; e++) {
                        var n = o[e];
                        n.cmd == y.cmd && (clearTimeout(n.timer_id), o.splice(e, 1));
                    }
                }

                z(),
                    y.count > 15
                        ? (console.error('BLE通信异常，但是重试次数也超过上限，无法继续重试！'), e(), S())
                        : 'function' == typeof y.call && null != y.data
                        ? (e(), (y.count += 1), console.log('BLE通信重试次数: ' + y.count), oe(y.data, y.call))
                        : (console.error('BLE主动回复了奇怪的不符合包格式数据，将不会自动重试，并且需要通知上层！'), S());
            })();
    }
}

function Z(e) {
    if (e.value.byteLength <= 0) console.log('无效的数据接收长度，跳过本次操作！');
    else {
        for (var n = new Uint8Array(e.value), t = 0; t < n.length; t++) a[g++] = n[t];

        g < 10 ? console.log('检测到接收缓冲区中的数据量太小，不足以形成一个最小包！') : H();
    }
}

function Q(e) {
    for (var n = 0; n < e.devices.length; n++) {
        var t = e.devices[n],
            o = !0;
        t.lastFoundTimeStamp = new Date().getTime();

        for (var a = 0; a < r.length; a++) {
            var c = r[a];
            t.deviceId == c.deviceId && ((r[a] = t), (o = !1));
        }

        o &&
            (r.push(t),
            T.forEach(function (e) {
                try {
                    e(t);
                } catch (e) {
                    console.error('设备在寻找设备时出现代码层次未处理的异常: ' + e);
                }
            }));
    }
}

function Y() {
    if (!u || null == D) throw '检测到蓝牙适配器未被初始化就调用了操作函数，这是不允许的，你应该在类似 onReady 中的生命周期中初始化设备';
}

function $() {
    Y(),
        s || l
            ? console.log('开发者重复调用了扫描，这是不应该的！')
            : ((l = !0),
              uni.startBluetoothDevicesDiscovery({
                  allowDuplicatesKey: !0,
                  interval: 0,
                  powerLevel: 'high',
                  services: ['AE00'],
                  success: function (n) {
                      0 == n.errno
                          ? ((s = !0),
                            (function () {
                                function n(e) {
                                    q.forEach(function (n) {
                                        try {
                                            n(e);
                                        } catch (e) {
                                            console.error('设备在移除设备时出现代码层次未处理的异常: ' + e);
                                        }
                                    });
                                }

                                r.forEach(function (e) {
                                    e.lastFoundTimeStamp = new Date().getTime();
                                }),
                                    (e = setInterval(function () {
                                        for (var e = 0; e < r.length; e++) {
                                            var t = r[e],
                                                o = new Date().getTime();
                                            o >= t.lastFoundTimeStamp
                                                ? o - t.lastFoundTimeStamp > 2500 && (console.log('时间差距: ' + (o - t.lastFoundTimeStamp)), r.splice(e, 1), n(t))
                                                : (r.splice(e, 1), n(t));
                                        }
                                    }, 200));
                            })(),
                            uni.onBluetoothDeviceFound(Q))
                          : D(n);
                  },
                  fail: D,
                  complete: function () {
                      l = !1;
                  }
              }));
}

function ee(e, n) {
    if ('function' == typeof n) {
        if (-1 == e.indexOf(n)) return e.push(n), !0;
        console.error('不允许添加重复的引用: ' + n);
    } else console.error('不允许添加非回调函数的引用: ' + n);

    return !1;
}

function ne(e, n) {
    if ('function' == typeof n) {
        var t = e.indexOf(n);
        return -1 == t ? (console.error('不存在注册历史的引用: ' + n), !1) : (e.splice(t, 1), !0);
    }

    return console.error('不允许添加非回调函数的引用: ' + n), !1;
}

function te(n) {
    Y(),
        s
            ? uni.stopBluetoothDevicesDiscovery({
                  success: function (e) {
                      0 == e.errno ? n() : D(e);
                  },
                  fail: function (e) {
                      1e4 == e.errCode ? n() : D(e);
                  },
                  complete: function () {
                      (s = !1), clearInterval(e), uni.offBluetoothDeviceFound(Q);
                  }
              })
            : (console.log('当前扫描未在进行，直接跳过！'), n());
}

function re(e) {
    if ((Y(), f)) console.log('正在连接中，但是又尝试发起连接设备，这是不应该的！');
    else if (p) console.log('开发者想重复连接设备，这是不应该的！');
    else {
        f = !0;

        var n = function () {
                te(function () {
                    k.forEach(function (e) {
                        'function' == typeof e && e();
                    });
                });
            },
            t = function (t) {
                var r, o;
                (v = e),
                    (w = t.mtu - 3),
                    (p = !0),
                    console.log('MTU获取成功，当前的MTU是: ' + w),
                    (r = n),
                    (o = function () {
                        (p = !1),
                            D({
                                errno: 1509005,
                                errCode: 10100,
                                errMsg: '获取复卡机设备信息失败'
                            });
                    }),
                    ie(1500, function (e) {
                        null == e
                            ? o()
                            : ((h.codeNumber = e.data[0] | e.data[1]),
                              (h.codeString = ''.concat(e.data[0], '.').concat(e.data[1])),
                              se(2e3, function (e) {
                                  if (null == e || 102 != e.status) o();
                                  else {
                                      var n = P(e.data);
                                      (d.serial = n.serial), (d.hardware = n.hw_ver), (d.oscxtal = n.oscxtal), (d.otpflag = n.otpflag), r();
                                  }
                              }));
                    });
            },
            r = function (n) {
                0 == n.errno
                    ? uni.getBLEMTU({
                          deviceId: e,
                          writeType: 'write',
                          success: t,
                          fail: D,
                          complete: function () {
                              f = !1;
                          }
                      })
                    : ((p = !1), D(n));
            },
            o = function () {
                uni.notifyBLECharacteristicValueChange({
                    state: !0,
                    deviceId: e,
                    serviceId: U,
                    characteristicId: '0000AE02-0000-1000-8000-00805F9B34FB',
                    success: r,
                    fail: function (e) {
                        (f = !1), D(e);
                    }
                });
            },
            a = function (n) {
                0 == n.errno
                    ? (uni.onBLECharacteristicValueChange(Z),
                      (function (e, n) {
                          uni.setBLEMTU({
                              deviceId: e,
                              mtu: 512,
                              success: function (e) {
                                  0 == e.errno ? console.log('MTU请求设置完成，请开发去关注 wx.onBLEMTUChange 的回调事件！') : D(e);
                              },
                              complete: n
                          });
                      })(e, o))
                    : ((f = !1), D(n));
            },
            c = function (n) {
                0 == n.errno
                    ? uni.getBLEDeviceCharacteristics({
                          deviceId: e,
                          serviceId: U,
                          success: a,
                          fail: function (e) {
                              (f = !1), D(e);
                          }
                      })
                    : ((f = !1), D(n));
            };

        uni.onBLEConnectionStateChange(N),
            uni.onBLEMTUChange(F),
            uni.createBLEConnection({
                deviceId: e,
                timeout: 3e3,
                success: function (n) {
                    0 == n.errno
                        ? uni.getBLEDeviceServices({
                              deviceId: e,
                              success: c,
                              fail: function (e) {
                                  (f = !1), D(e);
                              }
                          })
                        : ((f = !1), D(n));
                },
                fail: function (e) {
                    (f = !1), D(e);
                }
            });
    }
}

function oe(e, n) {
    if ((Y(), !(e instanceof Uint8Array))) throw '开发者在调用 sendDataPacket2BLE 时不可以传入非 Uint8Array 类型的参数！';
    p && null != v
        ? (function t(r) {
              if (r >= e.length) n();
              else {
                  var o;
                  o = w + r > e.length ? e.length : w + r;
                  var a = e.slice(r, o);
                  uni.writeBLECharacteristicValue({
                      characteristicId: '0000AE01-0000-1000-8000-00805F9B34FB',
                      deviceId: v,
                      serviceId: U,
                      value: a.buffer,
                      success: function (e) {
                          0 == e.errno ? t(r + a.length) : D(e);
                      },
                      fail: D
                  });
              }
          })(0)
        : console.log('由于开发者的逻辑疏忽导致设备未连接就尝试发送数据！');
}

function ae(e, n, t) {
    return function () {
        var r = setTimeout(function () {
                var n = o.findIndex(function (e) {
                    return e.timer_id == r;
                });
                if ('number' != typeof n || isNaN(n)) console.log('任务超时，但是在待处理命令回调列表中没有找到任务的回调对象！');
                else {
                    var a = o.splice(n, 1);

                    if (Array.isArray(a) && a.length >= 1) {
                        a = a[0];
                        var c = 'timer id == '.concat(r, '\ncallback index == ').concat(n, '\ncmd == 0x').concat(a.cmd.toString(16));
                        console.log('任务超时，自动移除: \n任务信息：\n' + c);
                    }

                    e.catch.timeout ? null != L && L() : t(null);
                }
            }, n),
            a = {
                cmd: e.cmd,
                call: t,
                timer_id: r
            };
        o.push(a);
    };
}

function ce(e, n, t) {
    var r = ae(e, n, t);
    (y.cmd = e.cmd), (y.count = 0), (y.data = e.toUint8Array()), (y.call = r), oe(y.data, y.call);
}

function ie(e, n) {
    var t = new O(99, 0, null);
    (t.catch.timeout = !1), ce(t, e, n);
}

function ue(e, n) {
    for (var t = new Array(), r = 0, o = e.length / n, a = 0; a < o; a++) {
        for (var c = new Array(), i = 0; i < n && ((c[i] = e[r++]), r != e.length); i++);

        t[a] = c;
    }

    return t;
}

function le(e, n, t, r, o) {
    var a = new Array();
    a.push(n, e),
        t.forEach(function (e, n) {
            'string' == typeof e && (e = j(e, 0, e.length)), Array.prototype.push.apply(a, e);
        }),
        ce(new O(50, 0, new Uint8Array(a)), r, o);
}

function se(e, n) {
    var t = new O(103, 0, null);
    (t.catch.timeout = !1), ce(t, e, n);
}

function fe(e) {
    for (var n = new Array(), t = 0, r = 0; r < e.length; r++) {
        var o = encodeURI(e[r]);
        if (1 == o.length) n[t++] = o.charCodeAt(0);
        else for (var a = o.split('%'), c = 1; c < a.length; c++) n[t++] = parseInt('0x' + a[c]);
    }

    return n;
}

module.exports = {
    bytes2hex: R,
    hex2bytes: j,
    num2Bytes: K,
    bytes2Num: W,
    calcIDBcc: function (e, n, t) {
        var r = 0;
        M(n) && (n = 0), M(t) && (t = e.length);

        for (var o = n; o < t; o++) r ^= e[o];

        return r;
    },
    chunkArray: ue,
    bytes2Uint32Str: X,
    bytes2Uint64Str: G,
    generateUUID: function () {
        var e = new Date().getTime();

        try {
            window.performance && 'function' == typeof window.performance.now && (e += performance.now());
        } catch (e) {}

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (n) {
            var t = (e + 16 * Math.random()) % 16 | 0;
            return (e = Math.floor(e / 16)), ('x' == n ? t : (3 & t) | 8).toString(16);
        });
    },
    strToUTF8: fe,
    utf8ToStr: function (e) {
        var n = '';
        e.forEach(function (e) {
            n += e < 127 ? String.fromCharCode(e) : '%' + e.toString(16).toUpperCase();
        });

        try {
            return decodeURI(n);
        } catch (e) {
            return n;
        }
    },
    calcCRC16: _,
    addUniqueCallbackToList: ee,
    removeCallbackFromList: ne,
    getStorageSyncHasDefault: function (e, n) {
        var t;

        try {
            var r = uni.getStorageSync(e);
            (null == r || void 0 === r || ('string' == typeof r && 0 == r.length)) && (r = n), (t = r);
        } catch (e) {
            (t = n), console.log(e);
        }

        return t;
    },
    bytes2NestedDistObj: function (e) {
        return (e instanceof Uint8Array || e instanceof Array) && 8 == e.length
            ? {
                  uid: X(e, 0, 4),
                  dist: X(e, 4, 4)
              }
            : (console.log('bytes2NestedDistObj 发现传入的数据不符合规范！'), null);
    },
    bytes2NestedObj: function (e, n, t, r) {
        if ((t instanceof Uint8Array || t instanceof Array) && t.length % 9 == 0) {
            for (var o = new Array(), a = 0; a < t.length; a += 9) {
                var c = {
                    nt1: X(t, a, 4),
                    nt2: X(t, a + 4, 4),
                    par: t[a + 8] + ''
                };
                o.push(c);
            }

            return {
                uid: r.uid,
                dist: r.dist,
                type: '' + n,
                block: '' + e,
                cores: o
            };
        }

        return console.log('bytes2NestedObj 发现传入的数据不符合规范！'), null;
    },
    bytes2StaticNestedObj: function (e, n, t) {
        if ((t instanceof Uint8Array || t instanceof Array) && (t.length - 4) % 8 == 0) {
            for (var r = new Array(), o = X(t, 0, 4), a = 4; a < t.length; a += 8) {
                var c = {
                    nt1: X(t, a, 4),
                    nt2: X(t, a + 4, 4)
                };
                r.push(c);
            }

            return {
                uid: o,
                type: '' + n,
                block: '' + e,
                cores: r
            };
        }

        return console.log('bytes2StaticNestedObj 发现传入的数据不符合规范！'), null;
    },
    bytes2DarksideObj: function (e) {
        return (e instanceof Uint8Array || e instanceof Array) && 32 == e.length
            ? (console.log('par解析结果: ' + G(e, 8, 8)),
              {
                  uid: X(e, 0, 4),
                  nt1: X(e, 4, 4),
                  par: G(e, 8, 8),
                  ks1: G(e, 16, 8),
                  nr: X(e, 24, 4),
                  ar: X(e, 28, 4)
              })
            : (console.log('bytes2DarksideObj 发现传入的数据不符合规范！'), null);
    },
    bytes2OTPInfo: P,
    mifare_block_2_sector: function (e) {
        return e < 128 ? parseInt(e / 4) : parseInt(32 + (e - 128) / 16);
    },
    mifare_sector_2_block: V,
    mifare_to_trail_block: function (e) {
        var n;
        return (n = e < 128 ? e + (3 - (e % 4)) : e + (15 - (e % 16))), parseInt(n);
    },
    mifare_blks_count_sec: J,
    mifare_blks_count_all: function (e) {
        if (0 == (e = parseInt(e))) throw 'sec_count 不可以为0';
        if (e <= 32) return parseInt(4 * e);
        if (e > 32 && 40 == e) return 256;
        throw '不支持的secmax: ' + e;
    },
    mifare_secs_count_all: function (e) {
        if (0 == (e = parseInt(e))) throw 'blk_count 不可以为0';
        if (e <= 128) return parseInt(e / 4);
        if (e > 128 && 256 == e) return 40;
        throw '不支持的blk_count: ' + e;
    },
    mifare_is_first_block: function (e) {
        return e < 128 ? e % 4 == 0 : e % 16 == 0;
    },
    mifare_is_trailer_blk: function (e) {
        return e < 128 ? (e + 1) % 4 == 0 : (e + 1) % 16 == 0;
    },
    mifare_secblk_2_index: function (e, n) {
        var t = 0,
            r = J(n),
            o = V(n);
        if (e > o + r - 1 || e < o) return -1;

        for (var a = 0; a < r && e != a + o; a++) ++t;

        return t;
    },
    startBLEDevicesAdapter: function (e) {
        c
            ? console.log('开发者重复调用了初始化，自动跳过！')
            : ((c = !0),
              uni.openBluetoothAdapter({
                  mode: 'central',
                  success: function (n) {
                      0 == n.errno ? ((u = !0), e(), console.log('适配器初始化成功！')) : ((u = !1), console.log('适配器初始化失败！'), D(n));
                  },
                  fail: D,
                  complete: function () {
                      (c = !1), console.log('适配器初始化完成，请关注上面的初始化结果！');
                  }
              }));
    },
    isLeAdapterInitialized: function () {
        return u;
    },
    closeBLEDevicesAdapter: function (e) {
        Y(),
            i
                ? console.log('开发者重复调用了反初始化，这是不应该的！')
                : ((i = !0),
                  te(function () {
                      u &&
                          null != D &&
                          uni.closeBluetoothAdapter({
                              success: function (n) {
                                  0 == n.errno ? (e(), console.log('适配器关闭成功！')) : (D(n), console.log('适配器关闭失败！'));
                              },
                              fail: D,
                              complete: function () {
                                  (u = !1), (i = !1);
                              }
                          });
                  }));
    },
    startBLEDevicesScanner: $,
    registerDeviceFoundCallback: function (e) {
        ee(T, e);
    },
    registerDeviceRemovedCallback: function (e) {
        ee(q, e);
    },
    unregisterDeviceFoundCallback: function (e) {
        ne(T, e);
    },
    unregisterDeviceRemovedCallback: function (e) {
        ne(q, e);
    },
    setAuthRediscoveryEnable: function (e) {
        E = e;
    },
    onBLEDeviceErrCallback: function (e) {
        C = e;
    },
    closeBLEDevicesScanner: te,
    getBLEDevicesFoundList: function () {
        return r;
    },
    isBLEDeviceIsConnected: function () {
        return p;
    },
    getBLEDeviceIDByEstablished: function () {
        return v;
    },
    getDeviceFactroyOTPInfo: function () {
        return d;
    },
    getDeivceFirmwareVerInfo: function () {
        return h;
    },
    registerOnBLEConnectedCallback: function (e) {
        ee(k, e);
    },
    unregisterOnBLEConnectedCallback: function (e) {
        ne(k, e);
    },
    registerOnBLEDisconnectedCallback: function (e) {
        ee(I, e);
    },
    unregisterOnBLEDisconnectedCallback: function (e) {
        ne(I, e);
    },
    connectTheBLEByMacAddr: re,
    connectHeadFindingsBLE: function () {
        if ((Y(), 0 != r.length)) {
            var e = r[0];
            return re(e.deviceId), e;
        }

        console.log('开发者未在逻辑中确保有搜索到最少一个设备就调用了 connectTo0Reader 函数。');
    },
    disconnectExistsDevice: function () {
        p &&
            uni.closeBLEConnection({
                deviceId: v,
                fail: function (e) {
                    D(e);
                },
                success: function (e) {
                    0 == e.errno || D(e);
                },
                complete: function () {
                    p = !1;
                }
            });
    },
    sendRawDatas2BLEDevice: oe,
    sendPacketWaitResponse: ce,
    onTimeoutCallback: function (e) {
        L = e;
    },
    onComErrCallback: function (e) {
        S = e;
    },
    requestReadChipUniqueID: function (e, n) {
        var t = new O(65, 0, null);
        (t.catch.timeout = !1), ce(t, e, n);
    },
    requestFirmwareVerCodes: ie,
    requestGetFactroyConfig: se,
    requestSetFactroyConfig: function (e, n, t, r, o) {
        var a = new Array();
        Array.prototype.push.apply(a, e), Array.prototype.push.apply(a, n), Array.prototype.push.apply(a, [t, 0]), ce(new O(102, 0, new Uint8Array(a)), r, o);
    },
    requestGetBLEDeviceName: function (e, n) {
        ce(new O(105, 0, null), e, n);
    },
    requestSetBLEDeviceName: function (e, n, t) {
        var r = fe(e);
        console.log('requestSetBLEDeviceName 检测到设备名称 "'.concat(e, '" 占用字节数: ') + r.length), ce(new O(104, 0, new Uint8Array(r)), n, t);
    },
    requestOnce410FieldScan: function (e, n) {
        ce(new O(57, 0, null), e, n);
    },
    requestOnceWrite55XXTag: function (e, n, t) {
        var r = new Array();
        Array.prototype.push.apply(r, e),
            Array.prototype.push.apply(r, [32, 32, 102, 102]),
            [
                [81, 36, 54, 72],
                [25, 146, 4, 39]
            ].forEach(function (e, n) {
                Array.prototype.push.apply(r, e);
            }),
            ce(new O(66, 0, new Uint8Array(r)), n, t);
    },
    requestOnceWrite82XXTag: function (e, n, t) {
        var r = new Array();
        Array.prototype.push.apply(r, e),
            [[187, 221, 51, 153]].forEach(function (e, n) {
                Array.prototype.push.apply(r, e);
            }),
            ce(new O(64, 0, new Uint8Array(r)), n, t);
    },
    requestReadThe82XXBlock: function (e, n, t, r) {
        var o = new Array();
        o.push(e), Array.prototype.push.apply(o, n), ce(new O(101, 0, new Uint8Array(o)), t, r);
    },
    requestWriteZX82XXBlock: function (e, n, t, r, o) {
        var a = new Array();
        a.push(e), Array.prototype.push.apply(a, n), Array.prototype.push.apply(a, t), ce(new O(100, 0, new Uint8Array(a)), r, o);
    },
    requestOnce14AFieldScan: function (e, n) {
        ce(new O(51, 0, null), e, n);
    },
    request14AGetATSDataArr: function (e, n) {
        ce(new O(86, 0, null), e, n);
    },
    requestMfAuthentication: function (e, n, t, r, o) {
        var a = new Array();
        a.push(n, e), Array.prototype.push.apply(a, t), ce(new O(67, 0, new Uint8Array(a)), r, o);
    },
    requestCheckMf3TimeAuth: function (e, n) {
        ce(new O(87, 0, null), e, n);
    },
    requestCheckMfBlockSize: function (e, n) {
        ce(new O(88, 0, null), e, n);
    },
    requestAuthMF1KnownKeys: function (e, n, t) {
        var r = new Array();
        e.forEach(function (e) {
            Array.prototype.push.apply(r, e);
        }),
            ce(new O(96, 0, new Uint8Array(r)), n, t);
    },
    requestGEN1ATAGLoophole: function (e, n) {
        ce(new O(85, 0, null), e, n);
    },
    requestDarksideLoophole: function (e, n) {
        ce(new O(54, 0, null), e, n);
    },
    requestStaticNTLoophole: function (e, n) {
        ce(new O(55, 0, null), e, n);
    },
    requestSTDiffNTLoophole: function (e, n, t, r, o) {
        var a = new Array();
        a.push(n, e), Array.prototype.push.apply(a, t), ce(new O(97, 0, new Uint8Array(a)), r, o);
    },
    requestNestedNTLoophole: function (e, n) {
        ce(new O(56, 0, null), e, n);
    },
    requestUnlockChineseTag: function (e, n) {
        ce(new O(82, 0, null), e, n);
    },
    requestUplockChineseTag: function (e, n) {
        ce(new O(83, 0, null), e, n);
    },
    requestMF1AntResetDelay: function (e, n, t) {
        var r = new ArrayBuffer(4);
        new DataView(r).setUint32(0, e), ce(new O(53, 0, new Uint8Array(r)), n, t);
    },
    requestFCheckMf1SecKeys: function (e, n, t, r, o) {
        if (t.length > 42) {
            var a = ue(t, 42),
                c = 0;
            le(e, n, a[c++], r, function i(u) {
                if (null == u) o(null);
                else if (0 == u.status) {
                    if (255 != u.data[0]) {
                        var l = 42 * (c - 1) + u.data[0];
                        (u.data = [l]), o(u);
                    } else console.log('当前进度: '.concat(c, ', ').concat(a.length)), c >= a.length ? ((u.data = [t.length]), o(u)) : le(e, n, a[c++], r, i);
                } else o(u);
            });
        } else le(e, n, t, r, o);
    },
    requestFCheckMfNSecKeys: function (e, n, t, r) {
        if (!(e instanceof Uint8Array || e instanceof Array)) throw 'requestFCheckMfNSecKeys只允许传入数组，该数组是需要批量验证密钥的扇区，最小0，最大39。';

        for (var o = [0, 0, 0, 0, 0], a = 0; a < e.length; a++) {
            var c = e[a];
            if (c >= 40 || c < 0) throw 'requestFCheckMfNSecKeys 判断有无效的使能验证扇区：' + c;
            o[(c / 8) & 255] |= 1 << (c % 8 & 255);
        }

        var i = new Array();
        Array.prototype.push.apply(i, o),
            n.forEach(function (e) {
                'string' == typeof e && (e = j(e)), Array.prototype.push.apply(i, e);
            }),
            ce(new O(84, 0, new Uint8Array(i)), t, r);
    },
    requestMfReadKeyBByKeyA: function (e, t, r) {
        if ('object' != n(e)) throw 'requestMfReadKeyBByKeyA只允许传入映射表，该数组是需要批量读取密钥B的扇区到密钥的映射列表';

        for (var o = [0, 0, 0, 0, 0], a = [], c = 0, i = Object.keys(e); c < i.length; c++) {
            var u = i[c];
            if (u >= 40 || u < 0) throw 'requestMfReadKeyBByKeyA 判断有无效的使能验证扇区：' + u;
            (o[(u / 8) & 255] |= 1 << (u % 8 & 255)), a.push(e[u]);
        }

        var l = new Array();
        Array.prototype.push.apply(l, o),
            a.forEach(function (e, n) {
                'string' == typeof e && (e = j(e, 0, e.length)), Array.prototype.push.apply(l, e);
            }),
            ce(new O(89, 0, new Uint8Array(l)), t, r);
    },
    requestNestedDistDetect: function (e, n, t, r, o) {
        var a = new Array();
        a.push(n, e), Array.prototype.push.apply(a, t), ce(new O(48, 0, new Uint8Array(a)), r, o);
    },
    requestNested2NtCollect: function (e, n, t, r, o, a, c) {
        var i = new Array();
        i.push(n, e), Array.prototype.push.apply(i, t), i.push(o, r), ce(new O(49, 0, new Uint8Array(i)), a, c);
    },
    requestDarksideRecovery: function (e, n, t, r, o, a) {
        var c = new Array();
        c.push(n, e), c.push(t, r), ce(new O(52, 0, new Uint8Array(c)), o, a);
    },
    requestSTDiff2NtCollect: function (e, n, t, r, o, a, c) {
        var i = new Array();
        i.push(n, e), Array.prototype.push.apply(i, t), i.push(o, r), ce(new O(98, 0, new Uint8Array(i)), a, c);
    },
    requestRDBLOnceStandard: function (e, n, t, r, o) {
        var a = new Array();
        a.push(n, e), Array.prototype.push.apply(a, t), ce(new O(68, 0, new Uint8Array(a)), r, o);
    },
    requestRDSCOnceStandard: function (e, n, t, r, o, a) {
        var c = new Array();
        c.push(n, V(e)), Array.prototype.push.apply(c, t);

        for (var i = [0, 0], u = 0; u < r.length; u++) {
            var l = r[u];
            if (l >= 16 || l < 0) throw 'requestRDSCOnceStandard 判断有无效的使能读取block：' + l;
            i[(l / 8) & 255] |= 1 << (l % 8 & 255);
        }

        Array.prototype.push.apply(c, i), ce(new O(69, 0, new Uint8Array(c)), o, a);
    },
    requestWRBLOnceStandard: function (e, n, t, r, o, a) {
        var c = new Array();
        c.push(n, e), Array.prototype.push.apply(c, t), Array.prototype.push.apply(c, r), ce(new O(70, 0, new Uint8Array(c)), o, a);
    },
    requestWRBLMoreStandard: function (e, n, t, r, o, a, c) {
        if (r.length != o.length) {
            var i = 'requestWRBLMoreStandard 检测到使能列表和传入的block数据组大小不匹配！';
            throw (console.log(i), i);
        }

        var u = new Array();
        u.push(n, V(e)), Array.prototype.push.apply(u, t);

        for (var l = [0, 0], s = 0; s < r.length; s++) {
            var f = r[s];
            if (f >= 16 || f < 0) throw 'requestWRBLMoreStandard 判断有无效的使能读取block：' + f;
            l[(f / 8) & 255] |= 1 << (f % 8 & 255);
        }

        Array.prototype.push.apply(u, l),
            o.forEach(function (e) {
                Array.prototype.push.apply(u, e);
            }),
            ce(new O(71, 0, new Uint8Array(u)), a, c);
    },
    requestRDBLOnceGen1ATag: function (e, n, t) {
        ce(new O(72, 0, new Uint8Array([e])), n, t);
    },
    requestRDBLMoreGen1ATag: function (e, n, t, r) {
        var o = new Array();
        o.push(e, n), ce(new O(73, 0, new Uint8Array(o)), t, r);
    },
    requestWRBLOnceGen1ATag: function (e, n, t, r) {
        var o = new Array();
        o.push(e), Array.prototype.push.apply(o, n), ce(new O(80, 0, new Uint8Array(o)), t, r);
    },
    requestWRBLMoreGen1ATag: function (e, n, t, r) {
        var o = new Array();
        o.push(e, n.length),
            n.forEach(function (e) {
                Array.prototype.push.apply(o, e);
            }),
            ce(new O(81, 0, new Uint8Array(o)), t, r);
    }
};
