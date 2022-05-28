Page({
    data: {
        status: ""
    },
    retry: function() {
        wx.navigateBack();
    },
    onLoad: function(t) {
        this.setData({
            status: t.status
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});