var e = require("../../8473358655C842DFE2155D813E918C74.js"), t = require("../../3E90FCB755C842DF58F694B049818C74.js"), i = require("../../4F97F14255C842DF29F19945DB418C74.js"), o = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        progressStep: 0,
        cardNumber: "",
        circleWidth: "",
        smallCircleWidth: ""
    },
    successCodeList: [],
    timerIDGotoWriteSuccess: -1,
    timerIDGotoWriteFailure: -1,
    gotoWriteFailure: function(e) {
        this.timerIDGotoWriteFailure = setTimeout(function() {
            wx.redirectTo({
                url: "/pages/device-card-write-fail/fail?status=" + e
            });
        }, 1e3);
    },
    gotoWriteSuccess: function(e) {
        var t = "/pages/device-card-write-success/success";
        null != e && (t += "?status=".concat(e)), this.timerIDGotoWriteSuccess = setTimeout(function() {
            wx.redirectTo({
                url: t
            });
        }, 2e3);
    },
    clearGotoWriteResultTimer: function() {
        clearTimeout(this.timerIDGotoWriteSuccess), clearTimeout(this.timerIDGotoWriteFailure);
    },
    onTagErrorCallback: function(e) {
        e in this.successCodeList ? this.gotoWriteSuccess(e) : this.gotoWriteFailure(e);
    },
    onDeviceDisconnectCallback: function(e) {
        console.log("在读卡页面监听到设备断开连接！"), this.gotoWriteFailure(107);
    },
    onBleComErrorCallback: function() {
        this.gotoWriteFailure(97);
    },
    onBleComTimeoutCallback: function() {
        this.gotoWriteFailure(108);
    },
    onWriteCardProgressCall: function(e) {
        this.setData({
            progressStep: Math.round(e)
        }), 100 == e && this.gotoWriteSuccess();
    },
    onUserBack: function(e) {
        o.showToast("请先等待写卡完成哦~");
    },
    onShow: function() {
        var i = e.getTagInformation(), o = 128 * (wx.getSystemInfoSync().windowWidth / 750), r = o / 75 * 61;
        console.log("屏幕高度是" + o), this.setData({
            circleWidth: o,
            smallCircleWidth: r,
            cardNumber: i.uid_hex
        }, function() {
            t.startWriteCardDatas(this.onWriteCardProgressCall);
        });
    },
    onHide: function() {},
    onLoad: function(t) {
        i.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), e.onTagErrorCallback(this.onTagErrorCallback), 
        i.onComErrCallback(this.onBleComErrorCallback), i.onTimeoutCallback(this.onBleComTimeoutCallback);
    },
    onUnload: function() {
        this.clearGotoWriteResultTimer(), i.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        e.onTagErrorCallback(null), i.onComErrCallback(null), i.onTimeoutCallback(null);
    }
});