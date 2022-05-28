var e = require("../../A1D2754255C842DFC7B41D4546C18C74.js"), n = require("../../3E90FCB755C842DF58F694B049818C74.js");

getApp();

Page({
    data: {
        block1: [ {
            iconTitle: "couponExchange",
            title: "券码兑换",
            bindTap: "couponExchange"
        }, {
            iconTitle: "iconRanking",
            title: "金币排行",
            bindTap: "iconRanking"
        }, {
            iconTitle: "iconTask",
            title: "金币任务",
            bindTap: "iconTask"
        } ],
        block2: [ {
            iconTitle: "iconSet",
            title: "功能设置",
            bindTap: "iconSet"
        }, {
            iconTitle: "iconAbout",
            title: "关于我们",
            bindTap: "iconAbout"
        } ],
        block3: [ {
            iconTitle: "iconOpinion",
            title: "意见反馈",
            bindTap: "iconOpinion"
        }, {
            iconTitle: "iconQuest",
            title: "问题帮助",
            bindTap: "iconQuest"
        } ],
        show: !0,
        phone: "",
        selected: 3,
        remainingTimes: "",
        vip_end_date: "",
        expirationTime: "",
        avatarUrl: ""
    },
    getUserInfo: function() {
        var n = this;
        wx.getUserProfile({
            desc: "显示头像",
            success: function(e) {
                console.log("获取用户信息成功", e);
                var i = e.userInfo.avatarUrl;
                e.userInfo.nickName;
                wx.setStorageSync("headPortrait", i), n.setData({
                    avatarUrl: i
                });
            },
            fail: function(n) {
                console.log("获取用户信息失败", n), "getUserProfile:fail auth deny" == n.errMsg && e.showToast("您已取消授权获取头像");
            }
        });
    },
    jumpLogin: function() {
        console.log("dssdsd"), wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    personCenter: function() {
        wx.navigateTo({
            url: "/pages/user-info-details/info"
        });
    },
    purchase: function() {
        wx.navigateTo({
            url: "/pages/user-buy-writetag-chance/chance"
        });
    },
    renewNow: function() {
        wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    renewNow1: function() {
        wx.navigateTo({
            url: "/pages/user-buy-vip/buy"
        });
    },
    couponExchange: function() {
        wx.navigateTo({
            url: "/pages/user-exchange-code/exchange"
        });
    },
    iconRanking: function() {
        e.showToast("正在开发中");
    },
    iconTask: function() {
        e.showToast("正在开发中");
    },
    iconSet: function() {
        wx.navigateTo({
            url: "/pages/settings-program-main/settings"
        });
    },
    iconAbout: function() {
        wx.navigateTo({
            url: "/pages/about-nikolalab/about-us"
        });
    },
    iconOpinion: function() {
        this.data.phone ? wx.navigateTo({
            url: "/pages/user-feedback-commit/feedback"
        }) : wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    iconQuest: function() {
        wx.navigateTo({
            url: "/pages/user-device-help/help"
        });
    },
    onLoad: function(e) {
        wx.hideTabBar();
    },
    onShow: function() {
        if (e.judgePhoneNumber(this), e.isLogin()) {
            var i = this;
            e.remainNumber(function(e, n, o) {
                if ("会员已过期" == o) return console.log("剩余的次数是空 "), i.setData({
                    expirationTime: "会员已过期",
                    remainingTimes: e
                }), !1;
                i.setData({
                    remainingTimes: e,
                    vip_end_date: n,
                    expirationTime: o
                });
            });
        }
        var o = n.getStorageSyncHasDefault("headPortrait", {});
        if (console.log("avatarUrl是" + JSON.stringify(o)), Object.keys(o).length <= 0) return this.setData({
            avatarUrl: ""
        }), !1;
        this.setData({
            avatarUrl: o
        });
    }
});