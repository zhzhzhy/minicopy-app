var e = function(e, t) {
    for (var n = {
        KYEyV: "1|5|7|10|4|13|11|3|6|8|0|14|2|9|12",
        ntwoe: function(e, t) {
            return e << t;
        },
        etLfC: function(e, t) {
            return e & t;
        },
        MpCmY: function(e, t) {
            return e >> t;
        },
        zJhgg: function(e, t) {
            return e & t;
        },
        Sycua: function(e, t) {
            return e >> t;
        },
        XCBUV: function(e, t) {
            return e & t;
        },
        oNjiP: function(e, t) {
            return e & t;
        }
    }, r = n.KYEyV.split("|"), c = 0; ;) {
        switch (r[c++]) {
          case "0":
            i &= 15;
            continue;

          case "1":
            var i;
            continue;

          case "2":
            t = n.ntwoe(n.etLfC(t, 65535), 4);
            continue;

          case "3":
            t ^= i;
            continue;

          case "4":
            i = n.MpCmY(n.zJhgg(i, 65535), 4);
            continue;

          case "5":
            var o = e;
            continue;

          case "6":
            i = n.MpCmY(n.zJhgg(t, 65535), 12);
            continue;

          case "7":
            i = n.Sycua(t, 8);
            continue;

          case "8":
            i ^= o;
            continue;

          case "9":
            t ^= i;
            continue;

          case "10":
            i ^= o;
            continue;

          case "11":
            t = n.ntwoe(n.XCBUV(t, 65535), 4);
            continue;

          case "12":
            return n.oNjiP(t, 65535);

          case "13":
          case "14":
            i *= 4129;
            continue;
        }
        break;
    }
}, t = function(t, n, r, c) {
    for (var i = function(e, t) {
        return e < t;
    }, o = function(e, t, n) {
        return e(t, n);
    }, u = function(e, t) {
        return e + t;
    }, a = 0; i(a, r); a++) c = o(e, t[u(n, a)], c);
    return c;
}, n = function(t, n, r, c) {
    var i = function(e, t) {
        return e > t;
    }, o = function(e, t, n) {
        return e(t, n);
    }, u = function(e, t) {
        return e + t;
    };
    n -= 1;
    for (var a = r; i(a, 0); a--) c = o(e, t[u(n, a)], c);
    return c;
}, r = function(e, t) {
    var n = function(e, t) {
        return e << t;
    }, r = function(e, t) {
        return e + t;
    };
    return function(e, t) {
        return e | t;
    }(e[t], n(e[r(t, 1)], 8));
}, c = function(e, t, n) {
    var r = function(e, t) {
        return e !== t;
    }, c = function(e, t) {
        return e + t;
    }, i = function(e, t) {
        return e < t;
    }, o = 0;
    for (o = 0; r(e[c(t, o)], 0) && i(o, n); o++) ;
    return String.fromCharCode.apply(null, new Uint8Array(e.buffer, t, o));
}, i = function(e, t, n) {
    for (var r = {
        QZWPH: "4|2|0|1|3|5",
        MjgRx: function(e, t, n) {
            return e(t, n);
        },
        gFNyg: "write_fail",
        oiNrs: function(e, t) {
            return e(t);
        },
        lvBHq: "write_success",
        fAIoN: function(e, t) {
            return e > t;
        }
    }, c = r.QZWPH.split("|"), i = 0; ;) {
        switch (c[i++]) {
          case "0":
            o.writeCharArgs && (o.writeCharArgs.valid = !1);
            continue;

          case "1":
            o.writeCharArgs = u;
            continue;

          case "2":
            var u = {
                timeout: n,
                cmd: t,
                buffer: e,
                valid: !0
            };
            continue;

          case "3":
            wx.writeBLECharacteristicValue({
                deviceId: o.deviceId,
                serviceId: o.service_uuid,
                characteristicId: t ? o.ctl_uuid : o.data_uuid,
                value: e,
                fail: function(e) {
                    u.valid && a.uOUax(f, a.nRSjC, e);
                },
                success: function() {
                    u.valid && a.GORXf(f, a.JKHOQ);
                }
            });
            continue;

          case "4":
            var a = {
                uOUax: function(e, t, n) {
                    return r.MjgRx(e, t, n);
                },
                nRSjC: r.gFNyg,
                GORXf: function(e, t) {
                    return r.oiNrs(e, t);
                },
                JKHOQ: r.lvBHq
            };
            continue;

          case "5":
            r.fAIoN(n, 0) && (o.timeout = r.MjgRx(setTimeout, function() {
                return f("cmd_timeout");
            }, n));
            continue;
        }
        break;
    }
}, o = {
    state: 0,
    ios: wx.getSystemInfoSync().system.toUpperCase().indexOf("IOS") >= 0
}, u = function(e, t, n) {
    var r = function(e, t) {
        return e === t;
    };
    for (var c in e) if (r(e[c].uuid.toLowerCase(), t.toLowerCase()) && (!n.read || e[c].properties.read) && (!n.write || e[c].properties.write) && (!n.notify || e[c].properties.notify)) return !0;
    return !1;
}, a = function(e, t, n) {
    var c, u = function(e, t) {
        return e || t;
    }, a = function(e, t) {
        return e === t;
    }, s = function(e, t, n) {
        return e(t, n);
    }, f = function(e, t, n, r) {
        return e(t, n, r);
    }, d = o.info.cmds;
    for (var g in n = u(n, 0), d) if (a(d[g].name, e)) {
        if (a(n, 0)) {
            c = d[g].cmd;
            break;
        }
        n--;
    }
    return !a(c, void 0) && (o.opcode = s(r, c, 0), f(i, c.buffer, !0, 5e3), !0);
}, s = function(e, t) {
    o.state = 1, wx.closeBLEConnection({
        deviceId: o.deviceId
    }), o.connectArgs && (t ? o.connectArgs.disconnect && o.connectArgs.disconnect({
        errMsg: e
    }) : o.connectArgs.fail && o.connectArgs.fail({
        errMsg: e
    }));
}, f = function e(t, n) {
    var c = {
        jwcJz: "createBLEConnection",
        CVumU: function(e, t) {
            return e === t;
        },
        RJEki: function(e, t) {
            return e(t);
        },
        XHLNe: "write_success",
        vhbNd: function(e, t) {
            return e(t);
        },
        MUaSL: function(e, t) {
            return e - t;
        },
        qQsnG: "升级模式切换失败，请手动切换并重试！",
        pbQqd: "请重新连接设备再次升级！",
        FBXIq: "1|0|8|4|7|11|9|10|6|3|2|5",
        UplDU: function(e, t, n) {
            return e(t, n);
        },
        tHAps: "user_connect",
        VpSPQ: "load_frimware",
        vAxIH: function(e, t) {
            return e === t;
        },
        zNFqt: function(e, t) {
            return e >= t;
        },
        LVmHl: "已连接状态下，不允许重新加载固件！",
        SegTB: function(e, t) {
            return e !== t;
        },
        dRQpU: "设备已连接或处于连接中！",
        pyJcV: function(e, t) {
            return e(t);
        },
        oqYFs: function(e, t) {
            return e != t;
        },
        gyVus: "connect_op_fail",
        MKuCo: "4|3|0|1|2",
        wIeXz: function(e, t) {
            return e < t;
        },
        Urgfy: function(e, t) {
            return e + t;
        },
        JpBLq: function(e, t) {
            return e + t;
        },
        MSMbq: "连接失败，错误码：",
        oqqAB: function(e, t) {
            return e !== t;
        },
        Lvxwt: "非预期的事件！",
        pGOwW: "connect_op_success",
        QVYhd: function(e, t) {
            return e !== t;
        },
        HTwGN: "device_connected",
        XucsG: function(e, t, n) {
            return e(t, n);
        },
        qttlt: "mtu_exchange",
        HUnKL: "1|3|7|2|0|4|5|6",
        LMQac: function(e, t) {
            return e + t;
        },
        EpOyr: "0000",
        PkKvG: "FAB1",
        uAtSb: "-0000-1000-8000-00805F9B34FB",
        bnsYg: function(e, t) {
            return e + t;
        },
        DleQp: "FAB0",
        hfCOZ: "FAB2",
        oTRZp: function(e, t) {
            return e + t;
        },
        vXayE: function(e, t) {
            return e + t;
        },
        QMBbU: "FAB3",
        niwdf: "service_found_success",
        iexQR: function(e, t) {
            return e !== t;
        },
        TLlVM: "service_found_fail",
        tmRfF: "chars_found_fail",
        bhGFy: "5|2|0|4|3|1",
        AlmZd: function(e, t) {
            return e === t;
        },
        eooFD: "未发现OTA服务",
        mkPPl: function(e, t) {
            return e + t;
        },
        PaReh: "服务发现失败，错误码：",
        VbbPD: function(e, t) {
            return e < t;
        },
        MLOkK: function(e, t) {
            return e(t);
        },
        oqbDY: "chars_found_success",
        CHRDA: "4|3|2|0|1",
        klJQl: function(e, t, n, r) {
            return e(t, n, r);
        },
        uVbmp: function(e, t, n, r) {
            return e(t, n, r);
        },
        gAoRY: function(e, t) {
            return e !== t;
        },
        TwYam: "enable_notify_fail",
        CMHQj: "4|1|6|3|0|5|2",
        czdAc: "使能Notify失败，错误码：",
        Ghfic: function(e, t) {
            return e !== t;
        },
        kEFws: function(e, t) {
            return e < t;
        },
        BRYLU: "enable_notify_success",
        rMjvQ: function(e, t) {
            return e !== t;
        },
        kpIYf: "cmd_complete",
        ISaOy: function(e, t) {
            return e >= t;
        },
        DKhww: "getAppVer",
        EKOuJ: "getFrimVer",
        CXjNJ: "5|2|3|1|4|0|6",
        bOPuQ: function(e, t) {
            return e !== t;
        },
        IjmOf: "获取设备信息错误，响应码：",
        SCnYe: function(e, t, n) {
            return e(t, n);
        },
        aDYLh: function(e, t, n) {
            return e(t, n);
        },
        tvfRH: function(e, t, n) {
            return e(t, n);
        },
        heVal: "获取设备信息失败，可能固件与产品不匹配",
        behPg: function(e, t, n) {
            return e(t, n);
        },
        iOsGm: "getStckVer",
        vgZcx: function(e, t) {
            return e(t);
        },
        OGnCB: function(e, t) {
            return e === t;
        },
        Iiimt: "0|3|1|4|2",
        lzyci: function(e, t) {
            return e !== t;
        },
        aSbeu: "getMode",
        jEVdU: "2|0|1|3|4",
        DSdkI: "切换到升级模式失败，请手动切换并重试",
        CuGeb: function(e, t, n) {
            return e(t, n);
        },
        iYjNb: "start_update",
        gqZoC: function(e, t) {
            return e === t;
        },
        QpDkx: "切换失败",
        RIqkf: "frimUpdReq",
        pOWsg: function(e, t) {
            return e === t;
        },
        FaRQS: "1|2|6|5|8|0|3|7|4",
        hWXDQ: "发送升级请求失败",
        vZvXh: function(e, t) {
            return e <= t;
        },
        OMejn: function(e, t, n, r) {
            return e(t, n, r);
        },
        VQvNg: "frimUpdInf",
        QRxSG: function(e, t) {
            return e + t;
        },
        Kkqnw: "设备拒绝升级，响应码：",
        ikvAC: function(e, t) {
            return e * t;
        },
        tpUzy: "1|2|3|4|0",
        oSquL: function(e, t, n, r) {
            return e(t, n, r);
        },
        PFEVO: function(e, t) {
            return e + t;
        },
        cEwjC: "发送升级请求失败，响应码：",
        dSJde: function(e, t) {
            return e === t;
        },
        DTEmf: "frimEncSet",
        lxsaS: "data_write_success",
        SKOol: function(e, t) {
            return e === t;
        },
        raIpX: "2|4|3|1|0",
        jBoOw: "发送加密请求失败",
        thgLK: "发送加密请求失败，响应码：",
        aDtlL: function(e, t, n) {
            return e(t, n);
        },
        MfZNE: "reboot_mode",
        Ptljf: "4|1|0|2|3|5",
        hdEjg: function(e, t) {
            return e == t;
        },
        BDZhv: "rbUpdate",
        vlEzI: "rbFission",
        RzEtp: function(e, t) {
            return e == t;
        },
        csTIH: "rbFFission",
        xhisz: "rbNormal",
        pngOq: function(e, t, n) {
            return e(t, n);
        },
        Mdoip: "固件不支持该命令",
        EHmbr: "当前状态不允许",
        ggfkc: "notify_value",
        odUpR: function(e, t) {
            return e << t;
        },
        YYOfb: function(e, t) {
            return e + t;
        },
        SzdDW: function(e, t, n) {
            return e(t, n);
        },
        kKLjB: function(e, t) {
            return e === t;
        },
        tPGpo: function(e, t, n) {
            return e(t, n);
        },
        cVBFe: "report",
        JULOw: "write_fail",
        hFzjW: function(e, t, n) {
            return e(t, n);
        },
        FRyFw: function(e, t, n) {
            return e(t, n);
        },
        mFXBk: "data_write_fail",
        jDMKS: "cmd_timeout",
        IJVQQ: function(e, t) {
            return e(t);
        },
        eYSDN: function(e, t) {
            return e >= t;
        },
        JhpKE: function(e, t) {
            return e > t;
        },
        nSDRH: function(e, t) {
            return e !== t;
        },
        VqAqf: "非预期的事件",
        eMgui: function(e, t) {
            return e === t;
        },
        RMKKD: "数据丢包，正在重传",
        qawhw: function(e, t) {
            return e === t;
        },
        YGqEB: "FLASH写出错",
        KpPgS: "固件校验失败",
        rCLYs: function(e, t) {
            return e + t;
        },
        VXVso: "设备错误，响应码：",
        cgPPI: "4|1|2|3|0",
        DzqKM: function(e, t, n) {
            return e(t, n);
        },
        VHlvr: "等待更新结果超时",
        ZohmF: function(e, t) {
            return e + t;
        },
        KPOiO: "蓝牙写失败，错误码：",
        hFFGx: function(e, t) {
            return e - t;
        },
        KxIhC: function(e, t) {
            return e < t;
        },
        RwrlV: function(e, t) {
            return e - t;
        },
        RqXfi: function(e, t) {
            return e - t;
        },
        Xjwpp: function(e, t) {
            return e(t);
        },
        GwAcJ: "3|4|2|1|0",
        LeNqw: function(e, t) {
            return e === t;
        },
        LLiWN: function(e, t) {
            return e === t;
        },
        YQbQF: function(e, t) {
            return e <= t;
        },
        zTECt: "固件版本小于或等于设备版本，无法更新！",
        QqdBb: function(e, t) {
            return e !== t;
        },
        amKXe: "启动更新失败，状态不允许！",
        ZBqJQ: function(e, t) {
            return e >= t;
        },
        opidV: "裂变模式下，不允许进行更新！",
        lYIab: "device_disconnect",
        ImXZB: function(e, t) {
            return e !== t;
        },
        VxFtb: "3|1|5|0|2|4",
        YSIYD: function(e, t) {
            return e >= t;
        },
        mtATE: "abort_update",
        ulsEB: function(e, t) {
            return e < t;
        },
        fdoPM: function(e, t) {
            return e === t;
        },
        zXHOH: "user_disconnect",
        SHvzm: function(e, t) {
            return e < t;
        }
    };
    switch (console.log(t, n, o.state), t) {
      case c.VpSPQ:
        if (c.vAxIH(o.state, 0)) o.state = 1; else if (c.zNFqt(o.state, 7)) return c.LVmHl;
        o.info = n.info, o.frimdata = n.frimdata;
        break;

      case c.tHAps:
        if (c.SegTB(o.state, 1)) return void (n.fail && n.fail({
            errMsg: c.dRQpU
        }));
        o.timeout && (c.pyJcV(clearTimeout, o.timeout), o.timeout = void 0), c.oqYFs(o.retry, !0) && (o.connectTime = new Date().getTime(), 
        o.connectArgs = n, o.deviceId = n.deviceId), c.UplDU(setTimeout, function() {
            wx.onBLEConnectionStateChange(l), o.state = 2, console.log(c.jwcJz), wx.createBLEConnection({
                timeout: 15e3,
                deviceId: o.deviceId,
                success: function(t) {
                    return e("connect_op_success", t);
                },
                fail: function(t) {
                    return e("connect_op_fail", t);
                }
            });
        }, 50);
        break;

      case c.gyVus:
        for (var f = c.MKuCo.split("|"), d = 0; ;) {
            switch (f[d++]) {
              case "0":
                var g = new Date().getTime();
                continue;

              case "1":
                if (c.wIeXz(g, c.Urgfy(o.connectTime, 5e3))) return o.retry = !0, c.pyJcV(e, c.tHAps);
                o.retry = !1;
                continue;

              case "2":
                o.connectArgs.fail && o.connectArgs.fail({
                    errMsg: n.errCode ? c.JpBLq(c.MSMbq, n.errCode) : n.errMsg
                });
                continue;

              case "3":
                o.state = 1;
                continue;

              case "4":
                if (c.oqqAB(o.state, 2)) return console.log(c.Lvxwt, t, n);
                continue;
            }
            break;
        }
        break;

      case c.pGOwW:
        if (c.QVYhd(o.state, 2)) return console.log(c.Lvxwt, t, n);
        o.state = 3;
        break;

      case c.HTwGN:
        if (c.QVYhd(o.state, 3) && c.QVYhd(o.state, 2)) return console.log(c.Lvxwt, t, n);
        if (o.state = 4, !wx.setBLEMTU) return c.XucsG(e, c.qttlt, 23);
        wx.setBLEMTU({
            deviceId: o.deviceId,
            mtu: 69,
            success: function(t) {
                return e("mtu_exchange", 69);
            },
            fail: function(t) {
                return e("mtu_exchange", t.errCode ? 23 : 69);
            }
        });
        break;

      case c.qttlt:
        for (var v = c.HUnKL.split("|"), m = 0; ;) {
            switch (v[m++]) {
              case "0":
                o.ctl_uuid = c.LMQac(c.LMQac(c.EpOyr, c.PkKvG), c.uAtSb);
                continue;

              case "1":
                if (c.QVYhd(o.state, 4)) return console.log(c.Lvxwt, t, n);
                continue;

              case "2":
                o.service_uuid = c.LMQac(c.bnsYg(c.EpOyr, c.DleQp), c.uAtSb);
                continue;

              case "3":
                o.mtu = n;
                continue;

              case "4":
                o.data_uuid = c.bnsYg(c.bnsYg(c.EpOyr, c.hfCOZ), c.uAtSb);
                continue;

              case "5":
                o.report_uuid = c.oTRZp(c.vXayE(c.EpOyr, c.QMBbU), c.uAtSb);
                continue;

              case "6":
                wx.getBLEDeviceServices({
                    deviceId: o.deviceId,
                    success: function(t) {
                        return e("service_found_success", t);
                    },
                    fail: function(t) {
                        return e("service_found_fail", t);
                    }
                });
                continue;

              case "7":
                o.state = 5;
                continue;
            }
            break;
        }
        break;

      case c.niwdf:
        if (c.iexQR(o.state, 5)) return console.log(c.Lvxwt, t, n);
        wx.getBLEDeviceCharacteristics({
            deviceId: o.deviceId,
            serviceId: o.service_uuid,
            success: function(t) {
                return e("chars_found_success", t);
            },
            fail: function(t) {
                return e("chars_found_fail", t);
            }
        });
        break;

      case c.TLlVM:
      case c.tmRfF:
        for (var b = c.bhGFy.split("|"), A = 0; ;) {
            switch (b[A++]) {
              case "0":
                wx.closeBLEConnection({
                    deviceId: o.deviceId
                });
                continue;

              case "1":
                o.connectArgs.fail && o.connectArgs.fail({
                    errMsg: c.vAxIH(n.errCode, 10004) || c.AlmZd(n.errCode, 10005) ? c.eooFD : n.errCode ? c.mkPPl(c.PaReh, n.errCode) : n.errMsg
                });
                continue;

              case "2":
                o.state = 1;
                continue;

              case "3":
                if (c.VbbPD(g, c.mkPPl(o.connectTime, 5e3))) return o.retry = !0, c.MLOkK(e, c.tHAps);
                o.retry = !1;
                continue;

              case "4":
                g = new Date().getTime();
                continue;

              case "5":
                if (c.iexQR(o.state, 5)) return console.log(c.Lvxwt, t, n);
                continue;
            }
            break;
        }
        break;

      case c.oqbDY:
        for (var w = c.CHRDA.split("|"), h = 0; ;) {
            switch (w[h++]) {
              case "0":
                wx.onBLECharacteristicValueChange(p);
                continue;

              case "1":
                wx.notifyBLECharacteristicValueChange({
                    characteristicId: o.report_uuid,
                    deviceId: o.deviceId,
                    serviceId: o.service_uuid,
                    state: !0,
                    success: function() {
                        return e("enable_notify_success");
                    },
                    fail: function(t) {
                        return e("enable_notify_fail", t);
                    }
                });
                continue;

              case "2":
                o.state = 6;
                continue;

              case "3":
                if (!(c.klJQl(u, n.characteristics, o.ctl_uuid, {
                    write: !0
                }) && c.klJQl(u, n.characteristics, o.data_uuid, {
                    write: !0
                }) && c.uVbmp(u, n.characteristics, o.report_uuid, {
                    notify: !0
                }))) return o.state = 1, wx.closeBLEConnection({
                    deviceId: o.deviceId
                }), void (o.connectArgs.fail && o.connectArgs.fail({
                    errMsg: c.eooFD
                }));
                continue;

              case "4":
                if (c.gAoRY(o.state, 5)) return console.log(c.Lvxwt, t, n);
                continue;
            }
            break;
        }
        break;

      case c.TwYam:
        for (var M = c.CMHQj.split("|"), k = 0; ;) {
            switch (M[k++]) {
              case "0":
                g = new Date().getTime();
                continue;

              case "1":
                wx.offBLECharacteristicValueChange(p);
                continue;

              case "2":
                o.connectArgs.fail && o.connectArgs.fail({
                    errMsg: n.errCode ? c.mkPPl(c.czdAc, n.errCode) : n.errMsg
                });
                continue;

              case "3":
                wx.closeBLEConnection({
                    deviceId: o.deviceId
                });
                continue;

              case "4":
                if (c.Ghfic(o.state, 6)) return console.log(c.Lvxwt, t, n);
                continue;

              case "5":
                if (c.kEFws(g, c.mkPPl(o.connectTime, 5e3))) return o.retry = !0, c.MLOkK(e, c.tHAps);
                o.retry = !1;
                continue;

              case "6":
                o.state = 1;
                continue;
            }
            break;
        }
        break;

      case c.BRYLU:
        if (c.rMjvQ(o.state, 6)) return console.log(c.Lvxwt, t, n);
        o.retry = !1, o.state = 7;

      case c.kpIYf:
        if (c.ISaOy(o.state, 15) && !o.updating) return void (o.state = 12);
        if (c.AlmZd(o.state, 7)) {
            if (o.state = 9, !c.XucsG(a, c.DKhww, 5e3)) return o.state = 8, c.XucsG(a, c.EKOuJ, 5e3);
        } else if (c.AlmZd(o.state, 9)) for (var V = c.CXjNJ.split("|"), C = 0; ;) {
            switch (V[C++]) {
              case "0":
                o.state = 10;
                continue;

              case "1":
                if (c.rMjvQ(S, 0) || c.bOPuQ(I, 0)) return c.MLOkK(s, c.mkPPl(c.IjmOf, I));
                continue;

              case "2":
                var I = c.SCnYe(r, n, 2);
                continue;

              case "3":
                var S = c.aDYLh(r, n, 4);
                continue;

              case "4":
                o.appVer = c.tvfRH(r, n, 6);
                continue;

              case "5":
                if (!n) return c.MLOkK(s, c.heVal);
                continue;

              case "6":
                return c.behPg(a, c.iOsGm, 5e3);
            }
            break;
        } else {
            if (c.AlmZd(o.state, 8) || c.AlmZd(o.state, 10)) {
                if (!n) return c.vgZcx(s, c.heVal);
                if (c.OGnCB(o.state, 10)) for (var x = c.Iiimt.split("|"), L = 0; ;) {
                    switch (x[L++]) {
                      case "0":
                        I = c.behPg(r, n, 2);
                        continue;

                      case "1":
                        if (c.bOPuQ(S, 1) || c.bOPuQ(I, 0)) return c.vgZcx(s, c.mkPPl(c.IjmOf, I));
                        continue;

                      case "2":
                        c.OGnCB(o.info.frimType, 0) ? o.frimVer = o.appVer : o.frimVer = o.stackVer;
                        continue;

                      case "3":
                        S = c.behPg(r, n, 4);
                        continue;

                      case "4":
                        o.stackVer = c.behPg(r, n, 6);
                        continue;
                    }
                    break;
                } else {
                    I = c.behPg(r, n, 2), S = c.behPg(r, n, 4);
                    if (c.lzyci(S, o.info.frimType) || c.lzyci(I, 0)) return c.vgZcx(s, c.mkPPl(c.IjmOf, I));
                    o.frimVer = c.behPg(r, n, 6);
                }
                return o.state = 11, c.behPg(a, c.aSbeu, 5e3);
            }
            if (c.OGnCB(o.state, 11)) for (var y = c.jEVdU.split("|"), B = 0; ;) {
                switch (y[B++]) {
                  case "0":
                    o.state = 12;
                    continue;

                  case "1":
                    o.workMode = c.behPg(r, n, 2);
                    continue;

                  case "2":
                    if (!n) return c.vgZcx(s, c.heVal);
                    continue;

                  case "3":
                    o.connectArgs.connected && o.connectArgs.connected({
                        appVer: o.appVer,
                        stackVer: o.stackVer,
                        workMode: o.workMode,
                        frimVer: o.frimVer
                    });
                    continue;

                  case "4":
                    if (o.updating) return c.lzyci(o.workMode, 1) ? (o.updating = !1, void (o.updateArgs.fail && o.updateArgs.fail({
                        errMsg: c.DSdkI
                    }))) : c.CuGeb(e, c.iYjNb, o.updateArgs);
                    continue;
                }
                break;
            } else {
                if (c.gqZoC(o.state, 13)) return n ? (o.state = 14, void wx.closeBLEConnection({
                    deviceId: o.deviceId
                })) : (o.state = 12, void (o.rebootModeArgs.fail && o.rebootModeArgs.fail({
                    errMsg: c.QpDkx
                })));
                if (c.gqZoC(o.state, 15)) o.state = 16, c.CuGeb(a, c.RIqkf, 5e3); else if (c.pOWsg(o.state, 16)) for (var O = c.FaRQS.split("|"), q = 0; ;) {
                    switch (O[q++]) {
                      case "0":
                        o.txPackets = 0;
                        continue;

                      case "1":
                        if (!n) return o.updating = !1, o.state = 12, void (o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.hWXDQ
                        }));
                        continue;

                      case "2":
                        I = c.CuGeb(r, n, 2);
                        continue;

                      case "3":
                        o.frimSize = o.frimdata.byteLength;
                        continue;

                      case "4":
                        if (!c.vZvXh(o.txSize, 0)) return o.state = 18, c.vgZcx(e, c.kpIYf);
                        o.state = 17, c.OMejn(a, c.VQvNg, 5e3, o.updInfIdx);
                        continue;

                      case "5":
                        if (c.oqYFs(I, 0)) return o.updating = !1, o.state = 12, void (o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.QRxSG(c.Kkqnw, I)
                        }));
                        continue;

                      case "6":
                        var E = c.CuGeb(r, n, 4);
                        continue;

                      case "7":
                        o.updInfIdx = 0;
                        continue;

                      case "8":
                        o.txSize = c.ikvAC(E, 4096);
                        continue;
                    }
                    break;
                } else if (c.pOWsg(o.state, 17)) for (var Q = c.tpUzy.split("|"), _ = 0; ;) {
                    switch (Q[_++]) {
                      case "0":
                        if (!c.oSquL(a, c.VQvNg, 5e3, o.updInfIdx)) return o.state = 18, c.vgZcx(e, c.kpIYf);
                        continue;

                      case "1":
                        if (!n) return o.updating = !1, o.state = 12, void (o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.hWXDQ
                        }));
                        continue;

                      case "2":
                        var z = c.CuGeb(r, n, 2);
                        continue;

                      case "3":
                        if (c.lzyci(z, 0)) return o.updating = !1, o.state = 12, void (o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.PFEVO(c.cEwjC, z)
                        }));
                        continue;

                      case "4":
                        o.updInfIdx++;
                        continue;
                    }
                    break;
                } else if (c.dSJde(o.state, 18)) {
                    if (o.state = 19, !c.CuGeb(a, c.DTEmf, 5e3)) return o.state = 20, c.CuGeb(e, c.lxsaS, {
                        write: !0
                    });
                } else if (c.SKOol(o.state, 19)) for (var P = c.raIpX.split("|"), F = 0; ;) {
                    switch (P[F++]) {
                      case "0":
                        return c.CuGeb(e, c.lxsaS, {
                            write: !0
                        });

                      case "1":
                        o.state = 20;
                        continue;

                      case "2":
                        if (!n) return o.updating = !1, o.state = 12, void (o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.jBoOw
                        }));
                        continue;

                      case "3":
                        if (c.lzyci(z, 0)) return o.updating = !1, o.state = 12, void (o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.PFEVO(c.thgLK, z)
                        }));
                        continue;

                      case "4":
                        z = c.aDtlL(r, n, 2);
                        continue;
                    }
                    break;
                }
            }
        }
        break;

      case c.MfZNE:
        for (var D = c.Ptljf.split("|"), Y = 0; ;) {
            switch (D[Y++]) {
              case "0":
                K = c.hdEjg(n.mode, 1) ? c.BDZhv : c.hdEjg(n.mode, 2) ? c.vlEzI : c.RzEtp(n.mode, 3) ? c.csTIH : c.xhisz;
                continue;

              case "1":
                var K;
                continue;

              case "2":
                o.state = 13;
                continue;

              case "3":
                if (!c.pngOq(a, K, 6e3)) return o.state = 12, void (n.fail && n.fail({
                    errMsg: c.Mdoip
                }));
                continue;

              case "4":
                if (c.lzyci(o.state, 12)) return void (n.fail && n.fail({
                    errMsg: c.EHmbr
                }));
                continue;

              case "5":
                o.rebootModeArgs = n;
                continue;
            }
            break;
        }
        break;

      case c.ggfkc:
        var R = new Uint8Array(n.value), H = c.PFEVO(R[0], c.odUpR(R[1], 8));
        if (c.SKOol(H, c.YYOfb(o.opcode, 1))) return o.timeout && (c.vgZcx(clearTimeout, o.timeout), 
        o.timeout = void 0), c.SzdDW(e, c.kpIYf, R);
        if (c.kKLjB(H, 55559)) return c.tPGpo(e, c.cVBFe, {
            report: R
        });
        break;

      case c.JULOw:
        if (o.timeout && (c.vgZcx(clearTimeout, o.timeout), o.timeout = void 0), c.kKLjB(n.errCode, 10008)) return void c.hFzjW(setTimeout, function() {
            return i(o.writeCharArgs.buffer, o.writeCharArgs.cmd, o.writeCharArgs.timeout);
        }, 5);
        o.writeCharArgs.cmd ? c.vgZcx(e, c.kpIYf) : c.FRyFw(e, c.mFXBk, {
            write: !1,
            errCode: n.errCode
        });
        break;

      case c.jDMKS:
        o.timeout = void 0, c.IJVQQ(e, c.kpIYf);
        break;

      case c.XHLNe:
        if (o.writeCharArgs.cmd) break;
        if (c.eYSDN(o.txPackets, 10) && (o.txPackets = 0, o.ios)) return c.FRyFw(setTimeout, function() {
            c.CVumU(o.state, 20) && c.RJEki(e, c.XHLNe);
        }, 20);
        n = {
            write: !0
        }, o.txSize += c.MUaSL(o.mtu, 3), o.txSize = c.JhpKE(o.txSize, o.frimSize) ? o.frimSize : o.txSize, 
        o.txPackets++;

      case c.lxsaS:
      case c.mFXBk:
      case c.cVBFe:
        if (c.nSDRH(o.state, 20)) return console.log(c.VqAqf, t, n);
        if (n.report) {
            var T;
            z = c.FRyFw(r, n.report, 2);
            if (c.eMgui(z, 5)) return console.log(c.RMKKD), o.state = 15, c.IJVQQ(e, c.kpIYf);
            if (c.qawhw(z, 6) ? T = c.YGqEB : c.qawhw(z, 9) ? T = c.KpPgS : c.nSDRH(z, 8) && (T = c.rCLYs(c.VXVso, z)), 
            T) return void (o.updateArgs.fail && (o.updating = !1, o.state = 12, o.updateArgs.fail({
                errMsg: T
            })));
            for (var Z = c.cgPPI.split("|"), X = 0; ;) {
                switch (Z[X++]) {
                  case "0":
                    return c.DzqKM(e, c.MfZNE, {
                        mode: o.update_rebootMode,
                        reconnect: !1
                    });

                  case "1":
                    o.updating = !1;
                    continue;

                  case "2":
                    o.update_rebootMode = o.updateArgs.rebootMode || 0;
                    continue;

                  case "3":
                    o.updateArgs.progress && o.updateArgs.progress({
                        txSize: o.frimSize,
                        frimSize: o.frimSize
                    });
                    continue;

                  case "4":
                    o.state = 12;
                    continue;
                }
                break;
            }
        } else if (n.timeout) o.updateArgs.fail && (o.updating = !1, o.state = 12, o.updateArgs.fail({
            errMsg: c.VHlvr
        })); else if (n.write) if (o.updateArgs.progress && o.updateArgs.progress({
            txSize: o.txSize ? c.hFFGx(o.txSize, 1) : 0,
            frimSize: o.frimSize
        }), c.KxIhC(o.txSize, o.frimSize)) {
            o.tailTimeout = 500;
            var G = c.hFFGx(o.frimSize, o.txSize);
            G = c.JhpKE(G, c.RwrlV(o.mtu, 3)) ? c.RqXfi(o.mtu, 3) : G, c.Xjwpp(i, o.frimdata.buffer.slice(o.txSize, c.ZohmF(o.txSize, G)));
        } else c.DzqKM(setTimeout, function() {
            c.vhbNd(i, o.frimdata.buffer.slice(c.MUaSL(o.frimSize, o.mtu), o.frimSize));
        }, o.tailTimeout), o.tailTimeout = 100; else o.updateArgs.fail && (o.updating = !1, 
        o.state = 12, o.updateArgs.fail({
            errMsg: c.ZohmF(c.KPOiO, n.errCode)
        }));
        break;

      case c.iYjNb:
        for (var j = c.GwAcJ.split("|"), N = 0; ;) {
            switch (j[N++]) {
              case "0":
                if (c.LeNqw(o.workMode, 0)) return c.DzqKM(e, c.MfZNE, {
                    mode: 1,
                    fail: function() {
                        o.updating = !1, o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.qQsnG
                        });
                    },
                    success: function() {
                        c.CVumU(o.state, 12) ? o.updating = !0 : o.updateArgs.fail && o.updateArgs.fail({
                            errMsg: c.pbQqd
                        });
                    }
                });
                if (c.LLiWN(o.workMode, 1)) return o.state = 15, o.updating = !0, c.Xjwpp(e, c.kpIYf);
                continue;

              case "1":
                o.updateArgs = n;
                continue;

              case "2":
                if (c.YQbQF(o.info.frimVer, o.frimVer)) return void (n.fail && n.fail({
                    errMsg: c.zTECt
                }));
                continue;

              case "3":
                if (c.QqdBb(o.state, 12)) return void (n.fail && n.fail({
                    errMsg: c.amKXe
                }));
                continue;

              case "4":
                if (c.ZBqJQ(o.workMode, 2)) return void (n.fail && n.fail({
                    errMsg: c.opidV
                }));
                continue;
            }
            break;
        }
        break;

      case c.lYIab:
        if (c.KxIhC(o.state, 2)) return console.log(c.Lvxwt, t, n);
        if (c.LLiWN(o.state, 14) && (console.log(o), c.ImXZB(o.rebootModeArgs.reconnect, !1))) for (var U = c.VxFtb.split("|"), J = 0; ;) {
            switch (U[J++]) {
              case "0":
                o.rebootModeArgs.oldFirmVer = o.frimVer;
                continue;

              case "1":
                o.rebootModeArgs.oldAppVer = o.appVer;
                continue;

              case "2":
                c.DzqKM(setTimeout, function() {
                    o.state = 1, c.UplDU(e, c.tHAps, {
                        deviceId: o.deviceId,
                        connected: function(e) {
                            o.connectArgs = o.rebootModeArgs.oldConnectArgs, o.connectArgs.connected && o.connectArgs.connected(e), 
                            o.rebootModeArgs.success && o.rebootModeArgs.success();
                        },
                        fail: function(e) {
                            for (var t = c.FBXIq.split("|"), n = 0; ;) {
                                switch (t[n++]) {
                                  case "0":
                                    e.workMode = o.rebootModeArgs.mode || 0;
                                    continue;

                                  case "1":
                                    o.connectArgs = o.rebootModeArgs.oldConnectArgs;
                                    continue;

                                  case "2":
                                    o.connectArgs.disconnected && o.connectArgs.disconnected();
                                    continue;

                                  case "3":
                                    o.connectArgs.connected && o.connectArgs.connected(e);
                                    continue;

                                  case "4":
                                    e.stackVer = o.rebootModeArgs.oldStackVer;
                                    continue;

                                  case "5":
                                    o.rebootModeArgs.success && o.rebootModeArgs.success();
                                    continue;

                                  case "6":
                                    o.frimVer = e.frimVer;
                                    continue;

                                  case "7":
                                    e.frimVer = o.rebootModeArgs.oldFirmVer;
                                    continue;

                                  case "8":
                                    e.appVer = o.rebootModeArgs.oldAppVer;
                                    continue;

                                  case "9":
                                    o.appVer = e.appVer;
                                    continue;

                                  case "10":
                                    o.stackVer = e.stackVer;
                                    continue;

                                  case "11":
                                    o.workMode = e.workMode;
                                    continue;
                                }
                                break;
                            }
                        }
                    });
                }, 1800);
                continue;

              case "3":
                o.rebootModeArgs.oldConnectArgs = o.connectArgs;
                continue;

              case "4":
                return;

              case "5":
                o.rebootModeArgs.oldStackVer = o.stackVer;
                continue;
            }
            break;
        }
        c.YSIYD(o.state, 12) && (c.LLiWN(o.state, 14) ? (o.workMode = o.rebootModeArgs.mode || 0, 
        o.connectArgs.connected && o.connectArgs.connected({
            appVer: o.appVer,
            stackVer: o.stackVer,
            workMode: o.workMode,
            frimVer: o.frimVer
        }), o.connectArgs.disconnected && o.connectArgs.disconnected(), o.rebootModeArgs.success && o.rebootModeArgs.success()) : o.connectArgs.disconnected && o.connectArgs.disconnected(), 
        c.KxIhC(o.state, 15) && (o.updating = !1, o.state = 1));
        break;

      case c.mtATE:
        if (c.ulsEB(o.state, 15)) return console.log(c.VqAqf, t, n);
        c.fdoPM(o.state, 20) && (o.state = 12), o.updating = !1;
        break;

      case c.zXHOH:
        for (var W = c.GwAcJ.split("|"), $ = 0; ;) {
            switch (W[$++]) {
              case "0":
                wx.closeBLEConnection({
                    deviceId: o.deviceId
                });
                continue;

              case "1":
                o.updating = !1;
                continue;

              case "2":
                o.connectTime = 0;
                continue;

              case "3":
                if (c.SHvzm(o.state, 2)) return console.log(c.Lvxwt, t, n);
                continue;

              case "4":
                o.state = 1;
                continue;
            }
            break;
        }
    }
}, d = function(e) {
    o.beaconStartArgs.fail && o.beaconStartArgs.fail({
        errMsg: e
    });
}, g = function() {
    var e = function(e, t) {
        return e === t;
    }, t = function(e, t) {
        return e(t);
    }, n = "IOS蓝牙不支持此功能，错误码：10020", r = function(e, t) {
        return e(t);
    }, c = "high", i = "0xC0FA";
    o.beaconServer && o.beaconServer.startAdvertising({
        powerLevel: c,
        advertiseRequest: {
            connectable: !0,
            manufacturerData: [ {
                manufacturerId: i,
                manufacturerSpecificData: o.info.otaBeaconCmd
            } ]
        }
    }).then(function(e) {}, function(c) {
        e(c.errCode, 10020) ? t(d, n) : r(d, c.errMsg);
    });
}, l = function(e) {
    var t = e.connected;
    return f(t ? "device_connected" : "device_disconnect");
}, p = function(e) {
    return f("notify_value", e);
};

module.exports = {
    load: function(e) {
        for (var i = {
            RmXIX: "8|15|11|10|12|7|5|0|9|13|16|2|14|6|4|1|3",
            pMNFN: function(e, t, n) {
                return e(t, n);
            },
            qArbq: function(e, t) {
                return e - t;
            },
            wbBHO: function(e, t) {
                return e < t;
            },
            XfMkm: "7|4|3|0|2|5|1|6",
            QqEnv: function(e, t) {
                return e > t;
            },
            wwSUO: function(e, t) {
                return e < t;
            },
            EQLVN: "OTA固件信息块错误！",
            TOvWI: function(e, t) {
                return e === t;
            },
            HsrEw: "frimEncSet",
            gxgRX: function(e, t) {
                return e + t;
            },
            ZqCnu: function(e, t) {
                return e + t;
            },
            RwCWa: function(e, t) {
                return e + t;
            },
            osWYX: function(e, t) {
                return e + t;
            },
            ZdYxD: function(e, t, n, r) {
                return e(t, n, r);
            },
            Gdsny: function(e, t) {
                return e + t;
            },
            roHke: function(e, t) {
                return e === t;
            },
            AtKnI: "frimOtaBcn",
            aFptD: function(e, t) {
                return e - t;
            },
            KHQZz: function(e, t, n) {
                return e(t, n);
            },
            mITAP: "load_frimware",
            hRnMm: function(e, t) {
                return e > t;
            },
            QcGVf: function(e, t) {
                return e != t;
            },
            IXHhA: function(e, t) {
                return e % t;
            },
            EnWfw: function(e, t, n) {
                return e(t, n);
            },
            gDnpk: function(e, t) {
                return e - t;
            },
            YnsMH: function(e, t) {
                return e instanceof t;
            },
            ocJBd: "固件类型不是ArrayBuffer或长度太小！",
            qtAKf: function(e, t, n) {
                return e(t, n);
            },
            TfyIG: function(e, t) {
                return e - t;
            },
            zjiBB: function(e, t, n, r, c) {
                return e(t, n, r, c);
            },
            JIbIO: function(e, t) {
                return e - t;
            },
            hNisL: function(e, t) {
                return e != t;
            },
            fYmpZ: function(e, t) {
                return e - t;
            },
            EDybP: "固件检查错误，不是OTA固件格式！",
            cKKhd: function(e, t, n) {
                return e(t, n);
            },
            ZObLd: function(e, t) {
                return e % t;
            },
            jLOPd: function(e, t) {
                return e - t;
            }
        }, o = i.RmXIX.split("|"), u = 0; ;) {
            switch (o[u++]) {
              case "0":
                m.frimType = i.pMNFN(r, e, i.qArbq(b, 12));
                continue;

              case "1":
                for (var a = 0; i.wbBHO(a, p); a += 32) for (var s = i.XfMkm.split("|"), d = 0; ;) {
                    switch (s[d++]) {
                      case "0":
                        if (i.QqEnv(g, 20) || i.wwSUO(g, 4)) return i.EQLVN;
                        continue;

                      case "1":
                        !m.encyptCmd && i.TOvWI(l.name, i.HsrEw) && (m.encyptCmd = l.cmd);
                        continue;

                      case "2":
                        l.cmd = new Uint8Array(e.buffer.slice(i.gxgRX(i.gxgRX(A, a), 12), i.ZqCnu(i.RwCWa(i.RwCWa(A, a), 12), g)));
                        continue;

                      case "3":
                        var g = e[i.RwCWa(i.osWYX(A, a), 11)];
                        continue;

                      case "4":
                        l.name = i.ZdYxD(c, e, i.Gdsny(A, a), 11);
                        continue;

                      case "5":
                        m.cmds.push(l);
                        continue;

                      case "6":
                        !m.otaBeaconCmd && i.roHke(l.name, i.AtKnI) && (m.otaBeaconCmd = l.cmd);
                        continue;

                      case "7":
                        var l = {};
                        continue;
                    }
                    break;
                }
                continue;

              case "2":
                var p = i.aFptD(v, 12);
                continue;

              case "3":
                return i.KHQZz(f, i.mITAP, {
                    info: m,
                    frimdata: new Uint8Array(e.buffer, 0, A)
                });

              case "4":
                m.cmds = [];
                continue;

              case "5":
                m.frimVer = i.KHQZz(r, e, i.aFptD(b, 10));
                continue;

              case "6":
                if (i.hRnMm(v, b) || i.QcGVf(i.IXHhA(A, 4), 0) || i.roHke(p, 0)) return i.EQLVN;
                continue;

              case "7":
                var v = i.EnWfw(r, e, i.gDnpk(b, 8));
                continue;

              case "8":
                if (!i.YnsMH(e, ArrayBuffer) || i.wwSUO(e.byteLength, 12)) return i.ocJBd;
                continue;

              case "9":
                m.pid = i.qtAKf(r, e, i.gDnpk(b, 14));
                continue;

              case "10":
                var m = {};
                continue;

              case "11":
                var b = e.byteLength;
                continue;

              case "12":
                if (i.QcGVf(i.qtAKf(r, e, i.TfyIG(b, 6)), 35293) || i.QcGVf(i.zjiBB(n, e, 0, i.TfyIG(b, 2), 0), i.qtAKf(r, e, i.JIbIO(b, 2))) || i.hNisL(i.zjiBB(t, e, 0, i.fYmpZ(b, 4), 0), i.qtAKf(r, e, i.fYmpZ(b, 4)))) return i.EDybP;
                continue;

              case "13":
                m.vid = i.cKKhd(r, e, i.fYmpZ(b, 16));
                continue;

              case "14":
                p = i.fYmpZ(p, i.ZObLd(p, 32));
                continue;

              case "15":
                e = new Uint8Array(e.slice(0));
                continue;

              case "16":
                var A = i.jLOPd(b, v);
                continue;
            }
            break;
        }
    },
    getFrimwareInfo: function() {
        var e = function(e, t) {
            return e === t;
        };
        if (!function(e, t) {
            return e === t;
        }(o.info, void 0) && !e(o.frimdata, void 0)) return {
            frimVer: o.info.frimVer,
            frimType: o.info.frimType,
            frimProductId: o.info.pid,
            frimVendorId: o.info.vid,
            frimSize: o.frimdata.byteLength,
            frimEncrypt: !!o.info.encyptCmd
        };
    },
    deviceConnect: function(e) {
        var t = function(e, t) {
            return e === t;
        }, n = "请先加载固件！", r = function(e, t, n) {
            return e(t, n);
        }, c = "user_connect";
        if (e = function(e, t) {
            return e || t;
        }(e, {}), !t(o.info, void 0)) return r(f, c, e);
        e.fail && e.fail({
            errMsg: n
        });
    },
    deviceDisconnect: function() {
        return function(e, t) {
            return e(t);
        }(f, "user_disconnect");
    },
    otaBeaconStart: function(e) {
        for (var t = {
            Vhmoe: "3|0|1|5|4|2",
            qgrCe: function(e, t) {
                return e || t;
            },
            mdzfo: function(e) {
                return e();
            },
            qHdgl: function(e) {
                return e();
            },
            ttPVa: function(e, t) {
                return e(t);
            },
            DcDSo: function(e, t) {
                return e === t;
            },
            mAaZv: "请先加载固件",
            TxRLK: "固件不支持该功能"
        }, n = t.Vhmoe.split("|"), r = 0; ;) {
            switch (n[r++]) {
              case "0":
                var c;
                continue;

              case "1":
                o.beaconStartArgs = t.qgrCe(e, {});
                continue;

              case "2":
                o.beaconServer ? (o.beaconServer.stopAdvertising(), t.mdzfo(g)) : wx.createBLEPeripheralServer({
                    success: function(e) {
                        o.beaconServer = e.server, i.OeQvn(g);
                    },
                    fail: function(e) {
                        i.qdaNa(d, e.errMsg);
                    }
                });
                continue;

              case "3":
                var i = {
                    OeQvn: function(e) {
                        return t.qHdgl(e);
                    },
                    qdaNa: function(e, n) {
                        return t.ttPVa(e, n);
                    }
                };
                continue;

              case "4":
                if (c) return void t.ttPVa(d, c);
                continue;

              case "5":
                t.DcDSo(o.info, void 0) ? c = t.mAaZv : o.info.otaBeaconCmd || (c = t.TxRLK);
                continue;
            }
            break;
        }
    },
    otaBeaconStop: function() {
        o.beaconServer && o.beaconServer.stopAdvertising();
    },
    rebootToMode: function(e) {
        var t = function(e, t, n) {
            return e(t, n);
        }, n = "reboot_mode", r = function(e, t) {
            return e || t;
        };
        return e = function(e, t) {
            return e || t;
        }(e, {}), t(f, n, r(e, {}));
    },
    startUpdate: function(e) {
        var t = function(e, t, n) {
            return e(t, n);
        }, n = "start_update";
        return e = function(e, t) {
            return e || t;
        }(e, {}), t(f, n, e);
    },
    abortUpdate: function() {
        return function(e, t) {
            return e(t);
        }(f, "abort_update");
    }
};