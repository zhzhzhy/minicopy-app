var i = require("../../8473358655C842DFE2155D813E918C74.js"), e = require("../../4F97F14255C842DF29F19945DB418C74.js"), a = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        showView: !0,
        vipNum: !1,
        remainingTimes: "",
        cardType: "",
        cardList: [],
        modal: !1,
        vip_end_date: "",
        expirationTime: ""
    },
    onGotoWriteCardCall: function() {
        var i = this.data.remainingTimes;
        this.data.vip_end_date;
        if ("会员已过期" == this.data.expirationTime && 0 == i) this.setData({
            modal: !0
        }); else {
            if (!e.isBLEDeviceIsConnected()) return void a.showToast("设备断开连接,请重新连接");
            wx.navigateTo({
                url: "/pages/device-card-writing/writing"
            });
        }
    },
    onGotoTaobaoBuyCard: function() {
        wx.navigateTo({
            url: "/pages/user-go-taobao/go"
        });
    },
    onGotoHelpPageCall: function() {
        wx.navigateTo({
            url: "/pages/user-device-help/help?id=1"
        });
    },
    onShow: function() {
        var e = this;
        a.remainNumber1(function(i, a, t) {
            if ("会员已过期" == t) return console.log("剩余的次数是空 "), e.setData({
                expirationTime: "会员已过期",
                remainingTimes: i
            }), !1;
            e.setData({
                remainingTimes: i,
                vip_end_date: a,
                expirationTime: t
            }), null !== e.data.vip_end_date ? e.setData({
                showView: !1,
                vipNum: !0
            }) : e.setData({
                showView: !0,
                vipNum: !1
            }), "会员已过期" == e.data.expirationTime && obj.setData({
                showView: !0,
                vipNum: !1
            });
        });
        var t, n, o = i.getTagInformation().tag_type;
        console.log("卡的类型是" + JSON.stringify(o)), o == i.TAG_TYPE_LF_EM410X ? (t = [ "8268", "5577" ], 
        n = "ID") : (t = [ "UFUID", "FUID", "UID", "CUID" ], n = "IC"), this.setData({
            cardList: t,
            cardType: n
        });
    },
    onHide: function() {},
    onLoad: function(i) {},
    onUnload: function() {}
});