var e = require("../../A1D2754255C842DFC7B41D4546C18C74.js"), t = require("../../3E90FCB755C842DF58F694B049818C74.js");

require("../../4F97F14255C842DF29F19945DB418C74.js");

Page({
    data: {
        autoSave: !1,
        show: !1,
        sheet: [ {
            text: "本地",
            checked: !1
        }, {
            text: "云端",
            checked: !1
        } ],
        phone: ""
    },
    firmwareUpdate: function() {
        e.showToast("正在开发中");
    },
    unbound: function() {
        this.data.phone ? wx.navigateTo({
            url: "/pages/settings-device-unbind/unbind"
        }) : wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    sheetShow: function() {
        e.showToast("正在开发中");
    },
    cancel: function() {
        this.setData({
            show: !1
        });
    },
    getradio: function(e) {
        for (var t = e.currentTarget.dataset.id, a = this.data.sheet, o = 0; o < a.length; o++) this.data.sheet[o].checked = !1;
        this.data.sheet[t].checked = !0, this.setData({
            sheet: this.data.sheet
        });
        for (var n = -1, s = 0; s < a.length; s++) if (a[s].checked) {
            n = s;
            break;
        }
        -1 == n ? console.log("啥都没选") : console.log("需要传的值是: " + n);
    },
    onChange: function(a) {
        var o = this;
        return function(a) {
            if (0 == a) {
                var n = t.getStorageSyncHasDefault("autoSave", {});
                if (console.log("autosave是" + n), 1 == n) {
                    a = !1;
                    wx.setStorageSync("autoSave", a), o.setData({
                        autoSave: !1
                    });
                }
                e.showToast("自动保存已关闭");
            } else {
                a = !0;
                wx.setStorageSync("autoSave", a), o.setData({
                    autoSave: !0
                }), e.showToast("自动保存已开启");
            }
        }(a.detail);
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        e.judgePhoneNumber(this);
        var a = t.getStorageSyncHasDefault("autoSave", {});
        this.setData({
            autoSave: a
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});