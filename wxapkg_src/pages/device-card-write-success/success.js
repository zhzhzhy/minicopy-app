var n = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {},
    writeCard: function() {
        wx.navigateBack();
    },
    onWriteCardFinishExit: function() {
        wx.switchTab({
            url: "/pages/device-connect-main/index"
        });
    },
    onLoad: function(i) {
        n.deductionTimes();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});