var n = require("../../4F97F14255C842DF29F19945DB418C74.js");

Page({
    data: {
        codeString: ""
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        var o = n.getDeivceFirmwareVerInfo();
        this.setData({
            codeString: o.codeString
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});