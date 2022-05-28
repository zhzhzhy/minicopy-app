var n = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        dbData: ""
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        n.checkToken(this);
        var t = n.obtain(this), o = n.getPhone(), e = this;
        wx.request({
            url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Feedback/query",
            data: {
                phone: o,
                token: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                console.log("返回的数据是" + JSON.stringify(n)), e.setData({
                    dbData: n.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});