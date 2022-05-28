Component({
    properties: {
        showView: {
            type: Boolean,
            value: ""
        },
        contentColor: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        onBuyVipCancelCall: function() {
            this.setData({
                showView: !1
            });
        },
        onUserBuyVipCall: function() {
            wx.navigateTo({
                url: "/pages/user-buy-vip/buy"
            });
        },
        onUserBuyChanceCall: function() {
            wx.navigateTo({
                url: "/pages/user-buy-writetag-chance/chance"
            });
        }
    }
});