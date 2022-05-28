var e = require("../../A1D2754255C842DFC7B41D4546C18C74.js"), t = require("../../4F97F14255C842DF29F19945DB418C74.js"), a = require("../../3E90FCB755C842DF58F694B049818C74.js");

Page({
    data: {
        avatarUrl: ""
    },
    logIn: function() {
        wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    logOut: function() {
        wx.showModal({
            title: "提示",
            content: "是否确认退出登录？",
            success: function(a) {
                a.confirm && (console.log("用户点击确定"), e.removeAppStorage(), t.disconnectExistsDevice(), 
                wx.navigateBack());
            }
        });
    },
    onLoad: function(e) {},
    onShow: function() {
        e.judgePhoneNumber(this);
        var t = a.getStorageSyncHasDefault("headPortrait", {});
        this.setData({
            avatarUrl: t
        });
    }
});