var n = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

require("../../3E90FCB755C842DF58F694B049818C74.js");

Page({
    data: {
        eqShow: "",
        dbinfo: "",
        deleteUuid: "",
        eqNum: 0
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        n.checkToken(this);
        var o = this, e = n.obtain(this), t = n.getPhone();
        wx.request({
            url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Unbound/query",
            data: {
                phone: t,
                token: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                console.log("返回的数据是" + JSON.stringify(n));
                var e = n.data, t = e.length;
                o.setData({
                    dbinfo: e,
                    eqNum: t
                });
            },
            fail: function(n) {
                console.log(n);
            }
        });
    },
    unbound: function(o) {
        var e = this, t = e.data.dbinfo[o.currentTarget.dataset.id].uuid;
        e.setData({
            deleteUuid: t
        }), wx.showModal({
            title: "",
            content: "解绑后设备可被其它账号绑定",
            success: function(o) {
                if (o.confirm) {
                    console.log("用户点击确定");
                    var t = n.obtain(e), i = n.getPhone(), a = e.data.deleteUuid;
                    wx.request({
                        url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Unbound/delete",
                        data: {
                            uuid: a,
                            phone: i,
                            token: t
                        },
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(n) {
                            console.log("删除返回的数据是" + JSON.stringify(n)), 1 == n.data && (wx.showToast({
                                title: "解绑成功！",
                                icon: "success",
                                duration: 2e3
                            }), e.onShow());
                        },
                        fail: function(n) {
                            console.log(n);
                        }
                    });
                } else console.log("用户点击取消");
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});