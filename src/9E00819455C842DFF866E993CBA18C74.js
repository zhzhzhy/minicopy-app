var e = require('./nfcapi/wsota/ota.js'),
    t = require('./nfcapi/util/util.js'),
    a = !1,
    i = function e(t) {
        10001 === t.errCode
            ? uni.showModal({
                  showCancel: !0,
                  title: '蓝牙未打开',
                  content: '请打开手机蓝牙功能，再点击确定按钮！',
                  success: function (t) {
                      t.confirm &&
                          uni.openBluetoothAdapter({
                              fail: e
                          });
                  }
              })
            : uni.showModal({
                  showCancel: !1,
                  title: '蓝牙错误',
                  content: t.errMsg
              });
    };

export default {
    data() {
        return {
            frimname: '',
            frimtype: '',
            frimProductId: '',
            frimver: '',
            frimsize: '',
            frimLoadOk: '',
            frimencrpyt: '',
            wakeupDeviceSwitchValue: '',
            scanning: '',
            deviceList: '',
            showProgress: '',
            progressEnd: '',
            update_title: '',
            update_msg: '',
            deviceState: '',
            connectState: '',
            appVer: '',
            stackVer: '',
            workMode: '',
            showDevicePage: '',
            workModePage: '',
            deviceName: '',
            deviceId: ''
        };
    },
    onLaunch: function () {
        var e = uni.getStorageSync('logs') || [];
        e.unshift(Date.now()),
            uni.setStorageSync('logs', e),
            uni.openBluetoothAdapter({
                fail: i
            }),
            uni.onBluetoothDeviceFound(this.globalData.bluetoothDeviceFound);
    },
    globalData: {
        chooseFrimware: function () {
            var a = getApp();
            uni.chooseMessageFile({
                count: 1,
                type: 'file',
                success: function (i) {
                    var o = uni.getFileSystemManager(),
                        c = i.tempFiles[0],
                        s = '';
                    void 0 !== c && (s = c.path.substr(c.path.lastIndexOf('.') + 1)),
                        'bin' == s
                            ? o.readFile({
                                  filePath: c.path,
                                  success: function (i) {
                                      var o = e.load(i.data);

                                      if (void 0 === o) {
                                          var s = e.getFrimwareInfo(),
                                              n = s.frimType > 1 ? t.int2str(s.frimType, 16, 4) : 0 == s.frimType ? '应用' : '协议栈',
                                              r = t.int2str(s.frimVer, 16, 4),
                                              d = s.frimEncrypt ? 'AES安全' : '无',
                                              p = t.int2str(s.frimProductId, 16, 4);
                                          t.int2str(s.frimVendorId, 16, 4);
                                          a.stopUpdateBeacon(),
                                              a.page.setData({
                                                  frimname: c.name,
                                                  frimtype: n,
                                                  frimProductId: p,
                                                  frimver: r,
                                                  frimsize: s.frimSize + ' B',
                                                  frimLoadOk: !0,
                                                  frimencrpyt: d,
                                                  wakeupDeviceSwitchValue: !1
                                              });
                                      } else
                                          uni.showModal({
                                              showCancel: !1,
                                              title: '固件错误',
                                              content: o
                                          });
                                  }
                              })
                            : uni.showModal({
                                  showCancel: !1,
                                  title: '固件类型错误',
                                  content: '仅支持.bin格式的固件'
                              });
                }
            });
        },

        startBleScan: function () {
            var e = getApp();
            if (
                (e.page.setData({
                    scanning: !0
                }),
                a)
            )
                return (
                    (e.deviceList = {}),
                    void e.page.setData({
                        deviceList: e.deviceList
                    })
                );
            (a = !0),
                uni.startBluetoothDevicesDiscovery({
                    allowDuplicatesKey: !0,
                    powerLevel: 'high',
                    fail: function (t) {
                        e.page.setData({
                            scanning: !1
                        }),
                            (a = !1),
                            i(t);
                    },
                    success: function (t) {
                        (e.deviceList = {}),
                            e.page.setData({
                                deviceList: e.deviceList
                            });
                    }
                });
        },

        stopBleScan: function () {
            getApp().globalData.page.setData({
                scanning: !1
            }),
                (a = !1),
                uni.stopBluetoothDevicesDiscovery();
        },

        page: '',

        startUpdate: function () {
            var t = getApp();
            (t.device.txSize = 0),
                t.page.setData({
                    showProgress: !0,
                    progressEnd: !1
                }),
                t.page.drawProgressbg(),
                t.page.setProgress(0),
                (t.update_time = new Date().getTime()),
                e.startUpdate({
                    rebootMode: 2,
                    progress: function (e) {
                        var t = getApp();

                        if (e.txSize >= e.frimSize) {
                            t.device.txSize = e.txSize;
                            var a = new Date().getTime() - t.update_time;
                            t.page.setData({
                                progressEnd: !0,
                                update_title: '更新成功，耗时：' + (a / 1e3).toFixed(2) + 'S',
                                update_msg: ''
                            });
                        } else e.txSize - t.device.txSize >= 2048 && ((t.device.txSize = e.txSize), t.page.setProgress(e.txSize / e.frimSize));
                    },
                    fail: function (e) {
                        getApp().globalData.page.setData({
                            showProgress: !0,
                            progressEnd: !0,
                            update_title: '更新失败',
                            update_msg: e.errMsg
                        });
                    }
                });
        },

        abortUpdate: function () {
            var t = getApp();
            e.abortUpdate(),
                t.page.setData({
                    showProgress: !1,
                    progressEnd: !1
                });
        },

        disconnectDevice: function () {
            var t = getApp();
            e.deviceDisconnect(),
                (t.device.state = 0),
                t.page.setData({
                    deviceState: t.device.state,
                    connectState: t.getConnectStateDesc()
                });
        },

        bluetoothDeviceFound: function (e) {
            var a = getApp();

            for (var i in e.devices) {
                var o = e.devices[i],
                    c = !1,
                    s = {
                        name: o.name ? o.name : 'N/A',
                        deviceId: o.deviceId,
                        showId: t.convertDeviceId(o.deviceId),
                        rssi: o.RSSI
                    },
                    n = new Uint8Array(o.advertisData);

                if (n.byteLength >= 10 && 250 == n[0] && 192 == n[1]) {
                    var r = n[2] + (n[3] << 8),
                        d = n[4] + (n[5] << 8),
                        p = n[6] + (n[7] << 8);
                    (s.appVer = t.int2str(r, 16, 4)), (s.stackVer = t.int2str(d, 16, 4)), (s.workMode = p);
                } else if (!o.name) continue;

                var v = a.deviceList[s.deviceId];
                void 0 === v
                    ? ((a.deviceList[s.deviceId] = s), (c = !0))
                    : (void 0 === s.appVer && void 0 !== v.appVer && ((s.appVer = v.appVer), (s.stackVer = v.stackVer), (s.workMode = 0)),
                      o.name || (s.name = v.name),
                      (s.name == v.name && s.rssi == v.rssi && s.appVer == v.appVer && s.stackVer == v.stackVer && s.workMode == v.workMode) ||
                          ((a.deviceList[s.deviceId] = s), (c = !0))),
                    c &&
                        a.page.setData({
                            deviceList: a.deviceList
                        });
            }
        },

        connectDevice: function (a) {
            var i = getApp();

            if (!(i.device && i.device.state >= 1)) {
                var o = i.deviceList[a];

                if (void 0 === o) {
                    if (i.device.deviceId !== a) return;
                    o = i.device;
                } else i.stopBleScan(), (i.device = o);

                (i.device.state = 1),
                    e.deviceConnect({
                        deviceId: i.device.deviceId,
                        connected: function (e) {
                            (i.device.state = 2),
                                (i.device.appVer = t.int2str(e.appVer, 16, 4)),
                                (i.device.stackVer = t.int2str(e.stackVer, 16, 4)),
                                (i.device.workMode = e.workMode),
                                i.page.setData({
                                    appVer: i.device.appVer,
                                    stackVer: i.device.stackVer,
                                    workMode: i.getWorkModeDesc(),
                                    deviceState: i.device.state,
                                    connectState: i.getConnectStateDesc()
                                }),
                                uni.showToast({
                                    title: '已获取设备信息'
                                });
                        },
                        fail: function (e) {
                            var t = getApp();
                            (t.device.state = 0),
                                t.page.setData({
                                    deviceState: t.device.state,
                                    connectState: t.getConnectStateDesc()
                                }),
                                uni.showModal({
                                    showCancel: !1,
                                    title: '连接失败',
                                    content: e.errMsg
                                });
                        },
                        disconnected: function () {
                            (i.device.state = 0),
                                i.page.setData({
                                    deviceState: i.device.state,
                                    connectState: i.getConnectStateDesc()
                                }),
                                uni.showToast({
                                    title: '设备已断开',
                                    icon: 'none'
                                });
                        }
                    }),
                    i.stopUpdateBeacon(),
                    i.page.setData({
                        showDevicePage: !1,
                        workModePage: !1,
                        deviceName: o.name,
                        deviceId: o.showId,
                        appVer: o.appVer,
                        stackVer: o.stackVer,
                        workMode: i.getWorkModeDesc(),
                        deviceState: i.device.state,
                        connectState: i.getConnectStateDesc(),
                        wakeupDeviceSwitchValue: !1
                    });
            }
        },

        deviceList: {},
        device: {},

        getConnectStateDesc: function () {
            var e = getApp();
            return 1 === e.device.state ? '连接中..' : 2 === e.device.state ? '已连接' : '未连接';
        },

        getWorkModeDesc: function () {
            var e = getApp();
            return 0 === e.device.workMode
                ? '正常模式'
                : 1 === e.device.workMode
                ? '升级模式'
                : 2 === e.device.workMode
                ? '裂变模式'
                : 3 === e.device.workMode
                ? '强制裂变模式'
                : '';
        },

        startUpdateBeacon: function () {
            e.otaBeaconStart({
                fail: function (e) {
                    getApp().globalData.page.setData({
                        wakeupDeviceSwitchValue: !1
                    }),
                        uni.showModal({
                            showCancel: !1,
                            title: '打开失败',
                            content: e.errMsg
                        });
                }
            });
        },

        stopUpdateBeacon: function () {
            e.otaBeaconStop();
        },

        rebootToMode: function (t) {
            e.rebootToMode({
                mode: t - 0,
                success: function () {
                    uni.showToast({
                        title: '切换成功'
                    }),
                        getApp().globalData.page.setData({
                            workModePage: !1
                        });
                },
                fail: function (e) {
                    uni.showModal({
                        showCancel: !1,
                        title: '切换失败',
                        content: e.errMsg
                    });
                }
            });
        }
    }
};
