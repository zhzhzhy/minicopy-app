Component({
    properties: {
        selected: {
            type: Number,
            default: 0
        }
    },
    data: {
        color: "#333333",
        selectedColor: "#f5a200",
        list: [ {
            pagePath: "/pages/device-connect-main/index",
            text: "首页",
            iconPath: "/static/img/home.png",
            selectedIconPath: "/static/img/home1.png"
        }, {
            pagePath: "/pages/shop-application-main/shop",
            text: "商城",
            iconPath: "/static/img/mall.png",
            selectedIconPath: "/static/img/mall1.png"
        }, {
            pagePath: "/pages/card-wallet-list/list",
            text: "卡包",
            iconPath: "/static/img/card.png",
            selectedIconPath: "/static/img/card1.png"
        }, {
            pagePath: "/pages/user-my-info-main/user",
            text: "我的",
            iconPath: "/static/img/person.png",
            selectedIconPath: "/static/img/person1.png"
        } ]
    },
    methods: {
        switchTab: function(t) {
            var e = t.currentTarget.dataset.path;
            wx.switchTab({
                url: e
            });
        }
    }
});