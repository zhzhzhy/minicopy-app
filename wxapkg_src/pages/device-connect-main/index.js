var e = require("../../4F97F14255C842DF29F19945DB418C74.js"), t = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        pageStatus: 0,
        isAuthorizeLost: !1,
        systemSettingsLostList: [],
        showFindDialog: !1,
        deviceSelected: null,
        deviceNameConnected: "",
        deviceBindStatus: "",
        sendVip: !0,
        activity_type: "",
        sendVipClose: ""
    },
    isNeedRestartBLEAdapter: !0,
    isNeedCheckResourceNext: !0,
    isNeedReSelectBLEDevice: !0,
    setPageStatus: function(e, t) {
        this.setData({
            pageStatus: e
        }, t);
    },
    setAuthorizeLost: function() {
        this.setData({
            pageStatus: 1,
            isAuthorizeLost: !0
        });
    },
    setSystemSettingsLost: function(e, t) {
        this.setData({
            pageStatus: 1,
            isAuthorizeLost: !1,
            systemSettingsLostList: e
        }, t);
    },
    sendVipConfirm: function() {
        this.setData({
            sendVipClose: "yes"
        }), console.log("点击确定了" + this.data.sendVipClose), t.sendVip(this, this.data.activity_type), 
        t.userUseVip(), t.showToast("已经领取");
    },
    onUserDisconnectClick: function() {
        wx.showModal({
            title: "提示",
            content: "确定断开连接吗？",
            success: function(t) {
                t.confirm && e.disconnectExistsDevice();
            }
        });
    },
    onGotoReadTagClick: function() {
        wx.navigateTo({
            url: "/pages/device-card-reading/reading"
        });
    },
    onCloseDeviceFoundDialog: function() {
        this.setData({
            showFindDialog: !1
        });
    },
    onBLEAdapterErrorCall: function(e) {
        console.log("在主页面初始化蓝牙适配器遇到的问题" + JSON.stringify(e)), t.processBLEError(e), 10003 == e.errCode && this.setData({
            showFindDialog: !0
        });
    },
    onBLEDeviceFoundCallback: function(e) {
        var i = this;
        this.isNeedReSelectBLEDevice ? (console.log("需要重新选定设备: " + JSON.stringify(e)), this.isNeedReSelectBLEDevice = !1, 
        this.setData({
            showFindDialog: !0,
            deviceSelected: e
        }), t.isLogin() ? t.getDeviceBindStatus(e.deviceId, function(e) {
            switch (e) {
              case 0:
                e = 2;
                break;

              case 1:
                e = 3;
                break;

              case 2:
                e = 1;
            }
            i.setData({
                deviceBindStatus: e
            });
        }) : this.setData({
            deviceBindStatus: 2
        })) : console.log("不需要重新选定设备");
    },
    onBLEDeviceRemoveCallback: function(e) {
        console.log("设备被移除了: " + JSON.stringify(e)), this.isNeedReSelectBLEDevice || e.deviceId == this.data.deviceSelected.deviceId && (this.isNeedReSelectBLEDevice = !0, 
        this.setData({
            showFindDialog: !1,
            deviceSelected: null
        }));
    },
    connectFirstDevice: function() {
        if (e.isLeAdapterInitialized()) {
            if (1 != t.isLogin(this)) return console.log("未登录"), t.login(this), !1;
            console.log("已经登录"), wx.showLoading({
                title: "正在连接中"
            });
            var i = this.data.deviceSelected;
            t.getDeviceBindStatus(i.deviceId, function(s) {
                1 == s ? (wx.showModal({
                    content: "该设备已被绑定",
                    showCancel: !1
                }), wx.hideLoading()) : (e.connectTheBLEByMacAddr(i.deviceId), t.setDeviceInfo(i));
            });
        } else t.showToast("检测到蓝牙没有打开哦~");
    },
    onBLEDeviceDisconnectCallback: function() {
        this.setPageStatus(2), this.isNeedCheckResourceNext = !0, this.createResourceCheckTimer();
    },
    onBLEDeviceConnectCallback: function() {
        this.isNeedCheckResourceNext = !1;
        var e = t.getDeviceInfo();
        t.bindDeviceWithUser(e.deviceId, e.name), this.setData({
            deviceNameConnected: e.name
        }), this.setPageStatus(3), wx.hideLoading({
            success: function(e) {
                wx.showToast({
                    title: "连接成功！",
                    icon: "success",
                    duration: 1e3
                });
            }
        }), t.checkActivity(this);
    },
    onBLEAdapterInitOkCallback: function() {
        console.log("蓝牙适配器已经被初始化了，将会自动启动设备扫描。"), this.setPageStatus(2), setTimeout(function() {
            e.startBLEDevicesScanner();
        }, 500);
    },
    createResourceCheckTimer: function() {
        var e = this;
        this.timerid = setTimeout(function() {
            e.onTimerCheckResourceCall();
        }, 2e3);
    },
    onTimerCheckResourceCall: function() {
        var t = this;
        this.checkSystemSettings(function() {
            t.isNeedRestartBLEAdapter && (t.isNeedRestartBLEAdapter = !1, e.isLeAdapterInitialized() ? e.closeBLEDevicesAdapter(function() {
                setTimeout(function() {
                    e.startBLEDevicesAdapter(t.onBLEAdapterInitOkCallback);
                }, 500);
            }) : e.startBLEDevicesAdapter(t.onBLEAdapterInitOkCallback)), t.isNeedCheckResourceNext ? t.createResourceCheckTimer() : console.log("不需要继续检查资源完整性，将不会再次启动检测定时器。");
        }, function() {
            t.createResourceCheckTimer(), t.isNeedRestartBLEAdapter = !0;
        });
    },
    checkSystemSettings: function(e, t) {
        var i = wx.getSystemInfoSync(), s = [ {
            title: "打开手机蓝牙",
            success: i.bluetoothEnabled
        }, {
            title: "打开手机定位",
            success: i.locationEnabled
        }, {
            title: "打开微信定位权限",
            success: i.locationAuthorized
        } ], c = !0;
        for (var n in s) if (!s[n].success) {
            c = !1;
            break;
        }
        c ? e() : (this.setSystemSettingsLost(s), t());
    },
    checkMiniProgramSettings: function(e, t) {
        wx.authorize({
            scope: "scope.bluetooth",
            success: e,
            fail: function(e) {
                console.log("wx.authorize 接口调用错误: " + JSON.stringify(e)), t();
            }
        });
    },
    onUserTryReAuthorizeCallback: function() {
        var e = this;
        wx.openSetting({
            success: function(t) {
                t.authSetting["scope.bluetooth"] ? (console.log("用户已经授予小程序蓝牙权限，将继续检查其他的系统资源完整性..."), 
                e.createResourceCheckTimer()) : wx.showToast({
                    icon: "none",
                    title: "请勾选允许使用蓝牙"
                });
            }
        });
    },
    onShow: function() {
        e.onBLEDeviceErrCallback(this.onBLEAdapterErrorCall), -1 == this.timerid && this.onTimerCheckResourceCall();
    },
    onHide: function() {
        e.onBLEDeviceErrCallback(null), -1 != this.timerid && (clearTimeout(this.timerid), 
        this.timerid = -1);
    },
    onLoad: function(t) {
        var i = this;
        wx.hideTabBar(), e.registerDeviceFoundCallback(this.onBLEDeviceFoundCallback), e.registerDeviceRemovedCallback(this.onBLEDeviceRemoveCallback), 
        e.registerOnBLEConnectedCallback(this.onBLEDeviceConnectCallback), e.registerOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectCallback), 
        this.checkMiniProgramSettings(function() {
            i.onTimerCheckResourceCall();
        }, function() {
            i.setAuthorizeLost("小程序无蓝牙权限", "连接Mini复卡机需要蓝牙权限。", !0);
        });
    },
    onUnload: function() {
        e.unregisterDeviceFoundCallback(this.onBLEDeviceFoundCallback), e.unregisterDeviceRemovedCallback(this.onBLEDeviceRemoveCallback), 
        e.unregisterOnBLEConnectedCallback(this.onBLEDeviceConnectCallback), e.unregisterOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectCallback);
    }
});