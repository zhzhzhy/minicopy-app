Page({
    data: {
        activeNames: [ "0" ]
    },
    onChange: function(n) {
        this.setData({
            activeNames: n.detail
        });
    },
    onLoad: function(n) {
        var o = n.id;
        (1 == o || 2 == o) && this.setData({
            activeNames: [ "3" ]
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});