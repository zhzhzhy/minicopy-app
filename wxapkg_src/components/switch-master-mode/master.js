Component({
    properties: {},
    data: {
        showSwitchDialog: !1
    },
    methods: {
        show: function() {
            this.setData({
                showSwitchDialog: !0
            });
        },
        close: function() {
            this.setData({
                showSwitchDialog: !1
            });
        },
        jump: function(t) {
            wx.navigateTo({
                url: "/pages/device-master-mode/index"
            });
        }
    }
});