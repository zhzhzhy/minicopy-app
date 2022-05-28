var a = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        listData: [ {
            ID: "1",
            KEY: "1151561561516",
            code: "120",
            date: "2022-01-22 10:21:01"
        }, {
            ID: "1",
            KEY: "1151561561516",
            code: "120",
            date: "2022-01-22 10:21:01"
        }, {
            ID: "1",
            KEY: "1151561561516",
            code: "120",
            date: "2022-01-22 10:21:01"
        }, {
            ID: "1",
            KEY: "1151561561516",
            code: "120",
            date: "2022-01-22 10:21:01"
        } ],
        pageList: [ "公共资源库", "读卡历史库", "用户秘匙库" ],
        pageIndex: 0,
        autoSave: !0,
        deleteAdd: !1,
        addPassword: !1,
        deleteData: !1
    },
    onChange: function(e) {
        var t = this;
        return function(e) {
            if (0 == e) {
                var d = t.data.autoSave;
                if (console.log("autosave是" + d), 1 == d) {
                    e = !1;
                    t.setData({
                        autoSave: !1
                    });
                }
                a.showToast("自动保存已关闭");
            } else {
                e = !0;
                t.setData({
                    autoSave: !0
                }), a.showToast("自动保存已开启");
            }
        }(e.detail);
    },
    deleteData: function() {
        this.setData({
            deleteAdd: !0,
            deleteData: !0
        });
    },
    addPassword: function() {
        this.setData({
            deleteAdd: !0,
            addPassword: !0
        });
    },
    onLoad: function(a) {
        var e = a.pageIndex;
        e = null == e ? 0 : parseInt(e), this.setData({
            pageIndex: e
        });
    },
    onTabClick: function(a) {
        this.setData({
            pageIndex: a.currentTarget.dataset.id
        });
    }
});