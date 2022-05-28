Page({
    data: {
        type: "",
        uuid1: "",
        mode: ""
    },
    onLoad: function(e) {
        var t = e.type, a = e.uuid1, i = e.mode;
        console.log("uuid1是" + a), this.setData({
            type: t,
            uuid1: a,
            mode: i
        });
    },
    onUnload: function() {},
    onShow: function() {},
    onHide: function() {},
    onDumpSelected: function(e) {
        var t = this.data.type, a = this.data.mode;
        if ("IC" == t && "equal" == a) {
            var i = this.data.uuid1;
            wx.redirectTo({
                url: "/pages/data-comparison/index?" + "uuid1=".concat(i, "&uuid2=").concat(e.detail)
            });
        } else wx.navigateBack(), this.getOpenerEventChannel().emit("onDumpSelected", e.detail);
    }
});