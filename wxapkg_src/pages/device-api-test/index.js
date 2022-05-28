var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), a = e(require("@vant/weapp/toast/toast")), n = e(require("@vant/weapp/dialog/dialog")), o = e(require("../../D5AF71D355C842DFB3C919D452918C74.js")), s = require("../../4F97F14255C842DF29F19945DB418C74.js"), c = require("../../8473358655C842DFE2155D813E918C74.js"), l = require("../../D5AF71D355C842DFB3C919D452918C74.js"), i = require("../../3E90FCB755C842DF58F694B049818C74.js"), u = require("../../9AAC314255C842DFFCCA594501718C74.js"), f = require("../../39DE27D555C842DF5FB84FD20B718C74.js");

getApp();

Page({
    data: {
        scanRerutn: "未启动搜索",
        isLfTagFound: !1,
        isHfTagFound: !1,
        lfTagUID: null,
        hfTagUID: null,
        deviceName: "",
        lfTagUIDHexStr: ""
    },
    onTagError: function(e) {
        a.default.fail("出现错误: 0x" + e.toString(16));
    },
    onShow: function() {
        c.onTagErrorCallback(this.onTagError), s.registerOnBLEConnectedCallback(this.onConnectBLEOK);
    },
    onHide: function() {
        c.onTagErrorCallback(null), s.unregisterOnBLEConnectedCallback(this.onConnectBLEOK);
    },
    onBleCall: function(e) {
        console.log("蓝牙适配器事件" + JSON.stringify(e));
    },
    onReaderFound: function(e) {
        this.setData({
            scanRerutn: "当前搜索到的设备个数: " + s.getBLEDevicesFoundList().length
        });
    },
    onReaderRemoved: function(e) {
        console.log("设备被移除" + JSON.stringify(e)), this.setData({
            scanRerutn: "当前搜索到的设备个数: " + s.getBLEDevicesFoundList().length
        });
    },
    onReady: function() {
        s.registerDeviceFoundCallback(this.onReaderFound), s.registerDeviceRemovedCallback(this.onReaderRemoved), 
        o.default.registerOnAttackKeysCbk(this.onTagAttack), s.startBLEDevicesAdapter(this.onBleCall);
    },
    onStartScanReader: function() {
        s.startBLEDevicesScanner(), this.setData({
            scanRerutn: "正在搜索"
        });
    },
    onStopScanReader: function() {
        var e = this;
        s.closeBLEDevicesScanner(function() {
            e.setData({
                scanRerutn: "停止搜索"
            });
        });
    },
    onDisconnect: function() {
        var e = this;
        s.disconnectBLEByMacAddr("2B:80:03:3E:8A:73", function() {
            e.setData({
                scanRerutn: "当前是否连接" + (s.isBLEDeviceIsConnected() ? "是" : "否")
            });
        });
    },
    onDisconnectAll: function() {
        var e = this;
        s.disconnectExistsDevice(function() {
            e.setData({
                scanRerutn: "当前是否连接" + (s.isBLEDeviceIsConnected() ? "是" : "否")
            });
        });
    },
    onCloseAdapter: function() {
        var e = this;
        s.closeBLEDevicesAdapter(function() {
            e.setData({
                scanRerutn: "当前是否连接" + (s.isBLEDeviceIsConnected() ? "是" : "否")
            });
        });
    },
    onConnectBLEOK: function() {
        this.setData({
            scanRerutn: "连接成功"
        });
    },
    onConnectReader: function() {
        s.connectHeadFindingsBLE();
    },
    onConnectDXLReader: function() {
        var e, a = s.getBLEDevicesFoundList(), n = t(a);
        try {
            for (n.s(); !(e = n.n()).done; ) {
                var o = e.value;
                if ("DxlCopy" == o.name) {
                    s.connectTheBLEByMacAddr(o.deviceId);
                    break;
                }
            }
        } catch (e) {
            n.e(e);
        } finally {
            n.f();
        }
    },
    onSendData: function() {},
    onTestWebSocket: function() {},
    onOTAProgress: function(e) {
        this.setData({
            scanRerutn: "固件更新进度: " + e
        });
    },
    onTestOTA: function() {
        u.setOnOTAProgressUpdate(this.onOTAProgress), u.startUpdate();
    },
    onStartOTA: function() {
        console.log(f.getFrimwareInfo());
    },
    onReadSerial: function() {
        s.requestGetFactroyConfig(3e3, function(e) {
            102 == e.status ? console.log("读取成功: " + s.bytes2hex(e.data)) : console.log("读取失败！");
        });
    },
    onWriteSerial: function() {
        s.requestSetFactroyConfig([ 17, 34, 51, 65, 18, 34, 51, 66, 19, 34, 51, 67, 20, 34, 51, 68 ], [ 1, 1 ], 60, 3e3, function(e) {
            console.log("OTP序列号写入结果: 0x" + e.status.toString(16));
        });
    },
    onDeviceInput: function(e) {
        this.data.deviceName = e.detail, console.log("当前设备名: " + this.data.deviceName), 
        null != this.data.deviceName && this.data.deviceName.length > 0 && s.strToUTF8(this.data.deviceName).length > 29 && wx.showModal({
            content: "输入超过29个字节！" + s.utf8ToStr(res.data),
            showCancel: !1
        });
    },
    onLFIDInput: function(e) {
        this.data.lfTagUIDHexStr = e.detail, console.log("当前ID号: " + this.data.lfTagUIDHexStr), 
        null != this.data.lfTagUIDHexStr && this.data.lfTagUIDHexStr.length > 0 && this.data.lfTagUIDHexStr.length > 10 && wx.showModal({
            content: "输入超过10个字节！",
            showCancel: !1
        });
    },
    onGetDeviceName: function() {
        s.requestGetBLEDeviceName(3e3, function(e) {
            wx.showModal({
                content: "读取成功，设备名是: " + s.utf8ToStr(e.data),
                showCancel: !1
            });
        });
    },
    onSetDeviceName: function() {
        console.log("当前用户输入的设备名是：" + this.data.deviceName), null != this.data.deviceName && this.data.deviceName.length > 0 && this.data.deviceName.length <= 29 ? s.requestSetBLEDeviceName(this.data.deviceName, 3e3, function(e) {
            102 == e.status ? wx.showModal({
                content: "设置蓝牙名称成功",
                showCancel: !1
            }) : console.log("设置蓝牙名称失败: 0x" + e.status.toString(16));
        }) : wx.showModal({
            content: "未输入有效设备名",
            showCancel: !1
        });
    },
    onWrite82XXCustomUID: function() {
        if (console.log("当前用户输入的ID是：" + this.data.lfTagUIDHexStr), null != this.data.lfTagUIDHexStr && this.data.lfTagUIDHexStr.length > 0 && 10 == this.data.lfTagUIDHexStr.length) {
            var e = s.hex2bytes(this.data.lfTagUIDHexStr);
            s.requestOnceWrite82XXTag(e, 1e3, function(e) {
                64 == e.status ? a.default.fail("写卡成功") : a.default.fail("写卡失败");
            });
        } else wx.showModal({
            content: "未输入有效ID号",
            showCancel: !1
        });
    },
    onScanLFTag: function() {
        var e = this;
        e.setData({
            scanRerutn: "搜索中"
        }), console.log("-"), c.requestOnce410FieldScan(1e3, function(t) {
            var a = t.status.toString(16), n = s.bytes2hex(t.data);
            e.setData({
                isLfTagFound: "40" == a,
                lfTagUID: t.data
            });
            var o = "寻卡状态: ".concat(a, "\nID卡号: ").concat(n);
            e.setData({
                scanRerutn: o
            }), console.log(o);
        });
    },
    onWrite82XX: function() {
        this.data.isLfTagFound ? s.requestOnceWrite82XXTag(this.data.lfTagUID, 1e3, function(e) {
            64 == e.status ? a.default.fail("写卡成功") : a.default.fail("写卡失败");
        }) : a.default.fail("未发现卡片");
    },
    onWrite55XX: function() {
        this.data.isLfTagFound ? s.requestOnceWrite55XXTag(this.data.lfTagUID, 1e3, function(e) {
            64 == e.status ? a.default.fail("写卡成功") : a.default.fail("写卡失败");
        }) : a.default.fail("未发现卡片");
    },
    onRead82XXBlock: function() {
        s.requestReadThe82XXBlock(4, [ 187, 221, 51, 153 ], 3e3, function(e) {
            64 == e.status ? console.log("82xx读取成功，block数据是: " + s.bytes2hex(e.data)) : console.log("82xx读取失败，status是: 0x" + e.status.toString(16));
        });
    },
    write82xx: function(e) {
        s.requestWriteZX82XXBlock(4, [ 187, 221, 51, 153 ], e, 3e3, function(e) {
            64 == e.status ? console.log("82xx写入成功") : console.log("82xx写入失败，status是: 0x" + e.status.toString(16));
        });
    },
    onWrite82XXBlock1: function() {
        this.write82xx([ 17, 51, 17, 51 ]);
    },
    onWrite82XXBlock2: function() {
        this.write82xx([ 34, 68, 34, 68 ]);
    },
    onScanHf: function() {
        var e = this;
        e.setData({
            scanRerutn: "搜索中"
        }), console.log("-"), c.requestOnce14AFieldScan(1e3, function(t) {
            var a = null, n = null;
            null != t ? (a = t.status, n = s.bytes2hex(t.data, 0, 4), e.setData({
                isHfTagFound: 64 == a,
                hfTagUID: n
            })) : e.setData({
                isHfTagFound: !1,
                hfTagUID: null
            });
            var o = "寻卡状态: ".concat(a, "\nIC卡号: ").concat(n);
            e.setData({
                scanRerutn: o
            }), console.log(o);
        });
    },
    onAuthM1: function() {
        s.requestMfAuthentication(3, 96, [ 234, 92, 171, 97, 163, 47 ], 1e3, function(e) {
            null != e ? (console.log("requestAuthUse522 Res == ", e), 0 == e.status ? a.default.fail("验证成功") : a.default.fail("验证失败")) : a.default.fail("验证超时");
        });
    },
    onCheckMFSizeMax: function() {
        c.requestCheckMfBlockSize(1e4, function(e) {
            a.default.fail("该标签的最大读写块支持是: " + e.data[0]);
        });
    },
    onReadStdM1_1_Block: function() {
        s.requestRDBLOnceStandard(1, 96, [ 255, 255, 255, 255, 255, 255 ], 1e3, function(e) {
            null != e ? (console.log("requestRead1BlockStd Res == ", e), 0 == e.status ? (a.default.fail("读取成功"), 
            console.log("读取的数据: " + s.bytes2hex(e.data, 0, e.data.length))) : a.default.fail("验证失败")) : a.default.fail("读取超时");
        });
    },
    onReadStdM1_multi_Block: function() {
        s.requestRDSCOnceStandard(1, 96, [ 255, 255, 255, 255, 255, 255 ], [ 0, 1, 2, 3 ], 1e3, function(e) {
            null != e ? (console.log("requestReadNBlockStd Res == ", e), 0 == e.status ? (a.default.fail("读取成功"), 
            console.log("读取的数据: " + s.bytes2hex(e.data, 0, e.data.length))) : a.default.fail("验证失败")) : a.default.fail("读取超时");
        });
    },
    onWriteStdM1_1_Block: function() {
        s.requestWRBLOnceStandard(1, 96, [ 255, 255, 255, 255, 255, 255 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], 1e3, function(e) {
            null != e ? (console.log("requestWrite1BlockStd Res == " + JSON.stringify(e)), 0 == e.status ? a.default.fail("写入成功") : a.default.fail("验证失败")) : a.default.fail("写入超时");
        });
    },
    onWriteStdM1_multi_Block: function() {
        s.requestWRBLMoreStandard(1, [ [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ] ], 1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("写入成功") : a.default.fail("验证失败") : a.default.fail("写入超时");
        });
    },
    onReadGen1A1Block: function() {
        s.requestRDBLOnceGen1ATag(2, 1e3, function(e) {
            null != e ? 0 == e.status ? (a.default.fail("读取成功！"), console.log("读取成功: ", s.bytes2hex(e.data, 0, e.data.length))) : (a.default.fail("读取失败！"), 
            console.log("后门读单块失败!")) : a.default.fail("超时了。");
        });
    },
    onReadGen1A1Blocks: function() {
        s.requestRDBLMoreGen1ATag(1, 2, 1e3, function(e) {
            null != e ? 0 == e.status ? (a.default.fail("读取成功！"), console.log("读取成功: ", s.bytes2hex(e.data, 0, e.data.length))) : (a.default.fail("读取失败！"), 
            console.log("后门读单块失败!")) : a.default.fail("超时了。");
        });
    },
    onWriteGen1ABlock: function() {
        s.requestWRBLOnceGen1ATag(2, [ 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1 ], 1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("写入成功！") : a.default.fail("写入失败！") : a.default.fail("超时了。");
        });
    },
    onWriteGen1ABlocks: function() {
        s.requestWRBLMoreGen1ATag(1, [ [ 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2 ], [ 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1 ] ], 1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("写入成功！") : a.default.fail("写入失败！") : a.default.fail("超时了。");
        });
    },
    onTestDarksideSupport: function() {
        s.requestDarksideLoophole(1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("该标签支持Darkside") : a.default.fail("该标签不支持Darkside，ret == " + e.status) : a.default.fail("超时了。");
        });
    },
    onTestStaticNestedSupport: function() {
        s.requestStaticNTLoophole(1e3, function(e) {
            null != e ? 36 == e.status ? a.default.fail("该标签支持StaticNested") : a.default.fail("该标签不支持StaticNested，ret == " + e.status) : a.default.fail("超时了。");
        });
    },
    onTestWeakNestedSupport: function() {
        s.requestNestedNTLoophole(1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("该标签支持Nested") : a.default.fail("该标签不支持Nested，ret == " + e.status) : a.default.fail("超时了。");
        });
    },
    onTestGen1AUnlock: function() {
        s.requestUnlockChineseTag(1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("解锁成功") : a.default.fail("解锁失败，ret == " + e.status) : a.default.fail("超时了。");
        });
    },
    onTestGen1AUplock: function() {
        s.requestUplockChineseTag(1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("上锁成功") : a.default.fail("上锁失败，ret == " + e.status) : a.default.fail("超时了。");
        });
    },
    onTestAntResetDealy: function() {
        s.requestMF1AntResetDelay(69999, 1e3, function(e) {
            null != e ? 0 == e.status ? a.default.fail("修改延时成功") : a.default.fail("修改延时失败，ret == " + e.status) : a.default.fail("超时了。");
        });
    },
    onTestBatchKeysAuth1Sec: function() {
        for (var e = [], t = 0; t < 300; t++) e.push([ 255, 255, 162, 163, 164, 255 ]);
        e.push([ 160, 161, 162, 163, 164, 165 ]), s.requestFCheckMf1SecKeys(3, 96, e, 8e3, function(t) {
            null != t ? 0 == t.status ? t.data[0] < e.length ? a.default.fail("密钥批量验证成功，正确密钥所处的位置是: " + t.data[0]) : a.default.fail("密钥批量验证失败，没有发现有效的密钥！") : a.default.fail("密钥批量验证成功失败，ret == " + t.status) : a.default.fail("超时了。");
        });
    },
    onTestBatchKeysAuthNSec: function() {
        for (var e = [], t = 0; t < 16; t++) e.push(t);
        var n = [ "ffffffffffff", "000000000000", "a0a1a2a3a4a5", "d3f7d3f7d3f7", "b0b1b2b3b4b5", "c0c1c2c3c4c5", "d0d1d2d3d4d5", "aabbccddeeff", "1a2b3c4d5e6f", "123456789abc", "010203040506", "123456abcdef", "abcdef123456", "e7659e6d13f4", "88bae664ad07", "e46d4729b578", "dae5725041e5", "edcf9316de2b", "4a752b359061", "bf84b6f7507f", "c661457840fc", "5b32b3482578", "d4f746c8bea1", "b426886b1380", "2d8d13adc959", "6e991c465c3a", "84154187b052", "2d93da577b34", "74731f6173b2", "dc11853584e4", "d0e204ff84f8", "cc302703b3e5", "d65d0a099df0", "2570b2cff895", "7598e5cf9bd2", "14ea7f87c522", "cc2abc616ef7", "c8f23f0d4daf", "d8ab52332ca7", "910af6554e03", "548cd90a63d9", "df4733baa823", "7f57f575c4d6", "0ebd9d288a3e", "405978128362" ], o = new Date();
        s.requestFCheckMfNSecKeys(e, n, 2e4, function(t) {
            var c = new Date(), l = 2 * e.length * n.length, i = c - o;
            if (console.log("验证".concat(l, "次密钥耗时: ").concat(i, "ms, 平均每个密钥耗时: ").concat(i / l, "ms")), 
            null != t) if (0 == t.status) {
                a.default.fail("密钥批量验证成功，请看控制台打印的表!");
                for (var u = 0, f = 0; f < e.length; u += 2, f++) {
                    var r = t.data.slice(u, u + 2), d = 255 != r[0], g = 255 != r[1], h = d ? s.bytes2hex(n[r[0]], 0, 6) : "未发现", D = g ? s.bytes2hex(n[r[1]], 0, 6) : "未发现";
                    console.log("扇区".concat(u / 2, "，A: ").concat(h, ", B: ").concat(D));
                }
            } else a.default.fail("密钥批量验证成功失败，ret == " + t.status); else a.default.fail("超时了。");
        });
    },
    onTestBatchReadKeybs: function() {
        var e = {
            0: "A0A1A2A3A4A5",
            15: "FFFFFFFFFFFF"
        }, t = new Date().getTime();
        s.requestMfReadKeyBByKeyA(e, 1e4, function(n) {
            var o = new Date().getTime();
            if (console.log("API执行耗时: ", "".concat(o - t, "ms")), null != n) if (0 == n.status) {
                a.default.fail("密钥批量读取成功，请看控制台打印的表!");
                for (var c = 0, l = 0, i = Object.keys(e); l < i.length; l++) {
                    var u = i[l], f = s.bytes2hex(n.data, 6 * c + 5, 6);
                    console.log("扇区".concat(u, "，A: ").concat(e[u], ", B: ").concat(f)), c++;
                }
            } else a.default.fail("密钥批量验证成功失败，ret == " + n.status); else a.default.fail("超时了。");
        });
    },
    ontestNTDist: function() {
        s.requestNestedDistDetect(3, 96, [ 160, 161, 162, 163, 164, 165 ], 3e3, function(e) {
            if (null != e) if (0 == e.status) {
                var t = e.data.slice(4, 8);
                a.default.fail("nested距离侦测成功: " + s.bytes2Num(t, 0, t.length));
            } else a.default.fail("nested距离侦测失败，ret == " + e.status); else a.default.fail("超时了。");
        });
    },
    onTestNestedRecovery: function() {
        var e = new Date(), t = [ 160, 161, 162, 163, 164, 165 ];
        c.requestNestedDistDetect(3, 96, t, 3e3, function(a) {
            var o = s.bytes2NestedDistObj(a.data);
            console.log("距离是: " + o.dist), l.requestWkNestedRecovery(3, 96, t, 3, 97, o, function(t) {
                var a = new Date();
                console.log("NESTED解密耗时 " + (a - e)), null != t ? n.default.alert({
                    title: "Nested解密成功",
                    message: "验证成功的密钥: " + s.bytes2hex(t.key, 0, t.key.length)
                }).then(function() {}) : n.default.alert({
                    title: "Nested解密失败",
                    message: "本次没有成功解密出密钥"
                }).then(function() {});
            });
        });
    },
    onTestDarksideRecovery: function() {
        var e = new Date();
        l.requestDarksideRecovery(3, 96, 21, function(t) {
            var a = new Date();
            console.log("NESTED解密耗时 " + (a - e)), null != t ? n.default.alert({
                title: "Darkside解密成功",
                message: "验证成功的密钥: " + s.bytes2hex(t.key, 0, t.key.length)
            }).then(function() {}) : n.default.alert({
                title: "Darkside解密失败",
                message: "本次没有成功解密出密钥"
            }).then(function() {});
        });
    },
    onTagAttack: function(e, t, a, n, o) {
        var s = "";
        switch (e) {
          case l.TASK_NAME_FCHK:
            s = "空卡扫描";
            break;

          case l.TASK_NAME_DARKSIDE:
            s = "全加扫描";
            break;

          case l.TASK_NAME_NESTED:
            s = "半加扫描";
            break;

          case l.TASK_NAME_STATICNESTED:
            s = "极速ST扫描";
        }
        if (a == t) this.setData({
            scanRerutn: "密钥扫描完成，开始读取数据..."
        }); else {
            var c = "进行".concat(s, "密钥任务中，\n进度 ").concat(a, " / ").concat(t, "，\n大概耗时").concat(o, "秒");
            this.setData({
                scanRerutn: c
            });
        }
    },
    onLoopScanTag: function() {
        var e = this;
        e.setData({
            scanRerutn: "搜索中...",
            progress: 0
        }), i.startLoopTagScanner(1e4, function(t) {
            e.setData({
                scanRerutn: "寻找" + ("HF" == t ? "高频卡" : "低频卡") + "中..."
            });
        }, function(t) {
            e.setData({
                scanRerutn: "成功搜索到: " + t.uid_hex
            }), console.log("基础信息封装体: " + JSON.stringify(t)), t.readable ? (e.setData({
                scanRerutn: "启动自动读卡",
                progress: 0
            }), i.startReadTagAllData(function(t) {
                e.setData({
                    progress: t
                }), 100 == t && e.setData({
                    scanRerutn: "读卡成功"
                });
            })) : e.setData({
                scanRerutn: "卡片不支持读取"
            });
        }, function(t) {
            e.setData({
                scanRerutn: "轮询寻卡超时"
            });
        });
    },
    onStopLoopTagScan: function() {
        var e = this;
        e.setData({
            scanRerutn: "正在停止搜索标签......"
        }), i.stopLoopCardScanner(function() {
            e.setData({
                scanRerutn: "停止搜索标签成功！"
            });
        });
    },
    on1KeyWriteTag: function() {
        var e = this;
        e.setData({
            scanRerutn: "开始写卡"
        }), i.startWriteCardDatas(function(t) {
            e.setData({
                progress: t
            }), 100 == t && e.setData({
                scanRerutn: "写卡成功"
            });
        });
    },
    onSaveData: function() {
        i.saveDumpDatasToFile();
    },
    onDelDataFile: function() {
        i.deleteDumpFilesByID("412e2eb1-4a50-45f3-abb2-b2c358c572aa");
    },
    onDataFileList: function() {
        console.log("当前的dump列表: " + JSON.stringify(i.getCardDataFileList()));
    },
    onDataFileInfo: function() {
        var e = i.getCardDataDumpInfo("d9a21750-712d-43ef-87ce-51b3856c62f9");
        console.log("当前的dump信息: " + e.tag_info.tag_type);
    },
    onDataFileLoad: function() {
        i.loadFile2DataBuffer("ddd13c0e-750b-4f6c-80ff-ca327fcdfba0");
    },
    onDataFileUpdate: function() {
        var e = "d9a21750-712d-43ef-87ce-51b3856c62f9", t = i.getCardDataDumpInfo(e);
        null != t && (t.tag_info.tag_type = c.TAG_TYPE_HF_14443A), i.updateDumpDatasByID(e, t), 
        i.loadFile2DataBuffer(e);
    },
    onDataCreate: function() {
        var e = i.makeDatasSaveToFile({
            type: "IC"
        });
        console.log(e);
    },
    onTestKnownKeysAuth: function() {
        for (var e = new Array(), t = 0; t < 40; t++) e.push([ 255, 255, 255, 255, 255, 255 ]), 
        e.push([ 255, 255, 255, 255, 255, 255 ]);
        s.requestAuthMF1KnownKeys(e, 5e3, function(e) {
            console.log("验证已知密钥的结果: " + s.bytes2hex(e.data));
        });
    },
    onTestSTFastDecryptSupport: function() {
        var e = this;
        e.setData({
            scanRerutn: "开始检测"
        }), c.requestSTDiffNTLoophole(3, 96, [ 255, 255, 255, 255, 255, 255 ], 5e3, function(t) {
            var a = "";
            switch (t.status) {
              case 0:
                a = "其他Nested解密";
                break;

              case 44:
                a = "极速ST解密";
            }
            e.setData({
                scanRerutn: "该标签支持: " + a
            });
        });
    },
    onTestSTFastDecrypt: function() {
        c.requestSTDiff2NtCollect(3, 96, [ 255, 255, 255, 255, 255, 255 ], 7, 96, 5e3, function(e) {
            console.log("采集到的随机数数据: " + s.bytes2hex(e.data));
        });
    },
    onTestStaticNestedRecovery: function() {
        var e = new Date();
        l.requestSTNestedRecovery(3, 96, [ 255, 255, 255, 255, 255, 255 ], 7, 97, function(t) {
            var a = new Date();
            console.log("ST极速解密耗时 " + (a - e)), null != t ? n.default.alert({
                title: "StaticNested解密成功",
                message: "验证成功的密钥: " + s.bytes2hex(t.key, 0, t.key.length)
            }).then(function() {}) : n.default.alert({
                title: "StaticNested解密失败",
                message: "本次没有成功解密出密钥"
            }).then(function() {});
        });
    },
    onReadFirmwareVersion: function() {
        s.requestFirmwareVerCodes(3e3, function(e) {
            console.log("版本信息: ".concat(e.data[0], ".").concat(e.data[1]));
        });
    }
});