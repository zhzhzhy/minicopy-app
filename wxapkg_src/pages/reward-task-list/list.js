Page({
    data: {
        shareShow: !0,
        viewShow: !0,
        adviceShow: !1,
        tikTokShow: !0,
        share: 0,
        view: 0,
        advice: 0,
        tikTok: 0
    },
    Tiktok: function() {
        wx.navigateTo({
            url: "/pages/reward-task-tiktok/tiktok"
        });
    },
    details: function() {
        wx.navigateTo({
            url: "/pages/goldCoinDetails/goldCoinDetails"
        });
    },
    onLoad: function(o) {
        console.log("options是" + JSON.stringify(o));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        o.from;
        return {
            title: "尼古拉小橙卡，手机开门快人一步",
            path: "/pages/device-connect-main/index",
            imageUrl: "../../static/img/share.jpg"
        };
    }
});