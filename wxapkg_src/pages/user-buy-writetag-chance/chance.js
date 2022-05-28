require("../../3E90FCB755C842DF58F694B049818C74.js");

var t = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        products: ""
    },
    getradio: function(t) {
        for (var o = t.currentTarget.dataset.id, e = this.data.products, n = 0; n < e.length; n++) this.data.products[n].checked = !1;
        this.data.products[o].checked = !0, this.setData({
            products: this.data.products
        });
    },
    buyNow: function() {
        for (var o = -1, e = this.data.products, n = 0; n < e.length; n++) if (e[n].checked) {
            o = e[n].product_price;
            var a = e[n].id;
            break;
        }
        if (-1 == o) console.log("啥都没选"); else {
            console.log("我想购买: " + o), console.log("商品的id是: " + a);
            var c = t.getPhone(), i = t.obtain(this);
            console.log("手机号是: " + c), wx.request({
                url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Purcheasewxconfig/prepayId",
                data: {
                    phone: c,
                    total_fee: o,
                    product_id: a,
                    token: i
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
                            console.log("支付成功！" + JSON.stringify(t));
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
        var t = this;
        wx.request({
            url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Product/subCard",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                console.log("请求的数据是" + JSON.stringify(o));
                var e = o.data;
                e.forEach(function(t) {
                    t.checked = !1, o.data[0].checked = !0;
                }), t.setData({
                    products: o.data
                }), console.log("pro" + JSON.stringify(t.data.products));
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});