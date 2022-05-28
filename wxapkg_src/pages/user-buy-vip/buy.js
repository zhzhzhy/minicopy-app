require("../../3E90FCB755C842DF58F694B049818C74.js");

var t = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        listData: [ {
            code: "云解码读卡",
            text: "right",
            type: "right"
        }, {
            code: "云存储卡包",
            text: "right",
            type: "right"
        }, {
            code: "读卡额日限<50张\n间隔<60秒",
            text: "right",
            type: "right"
        }, {
            code: "读卡额日限<100张\n间隔<30秒",
            text: "error",
            type: "right"
        }, {
            code: "无限次数写卡",
            text: "error",
            type: "right"
        }, {
            code: "极速写卡",
            text: "error",
            type: "right"
        } ],
        products: ""
    },
    buy: function(e) {
        for (var o = e.currentTarget.dataset.id, n = this.data.products, a = 0; a < n.length; a++) this.data.products[a].checked = !1;
        this.data.products[o].checked = !0, this.setData({
            products: this.data.products
        });
        for (var c = -1, i = this.data.products, r = 0; r < i.length; r++) if (i[r].checked) {
            c = i[r].product_price;
            var s = i[r].id;
            break;
        }
        if (-1 == c) console.log("啥都没选"); else {
            console.log("我想购买: " + c), console.log("商品的id是: " + s);
            var p = t.getPhone(), d = t.obtain(this);
            console.log("手机号是: " + p), wx.request({
                url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Openvipwxconfig/prepayId",
                data: {
                    phone: p,
                    total_fee: c,
                    product_id: s,
                    token: d
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    console.log("新数据是" + JSON.stringify(t)), wx.requestPayment({
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: "MD5",
                        paySign: t.data.paySign,
                        total_fee: .01,
                        success: function(t) {
                            console.log("支付成功！");
                        },
                        fail: function(t) {
                            console.log(t);
                        }
                    });
                }
            });
        }
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        t.checkToken(this);
        var e = this;
        wx.request({
            url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Product/monthCard",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log("请求的数据是" + JSON.stringify(t));
                var o = t.data;
                o.forEach(function(e) {
                    e.checked = !1, t.data[0].checked = !0;
                }), e.setData({
                    products: t.data
                }), console.log("pro" + JSON.stringify(e.data.products));
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});