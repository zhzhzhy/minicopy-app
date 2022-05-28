var t = require("../../A1D2754255C842DFC7B41D4546C18C74.js"), a = require("../../3E90FCB755C842DF58F694B049818C74.js"), e = require("../../8473358655C842DFE2155D813E918C74.js");

Component({
    properties: {
        showView: {
            type: String,
            value: "0"
        },
        cardType: {
            type: String,
            value: ""
        }
    },
    observers: {
        showView: function(t) {
            console.log("新的值是" + t);
        }
    },
    data: {
        imgUrl: [ "/static/img/logo.jpg" ],
        list: [],
        show: !1,
        index: -1,
        showModal: !1,
        modelBackground: "IC卡"
    },
    pageLifetimes: {
        show: function() {
            this.saveData();
        }
    },
    methods: {
        saveData: function() {
            var t = a.getCardDataFileList(), i = a.getStorageSyncHasDefault("dump_nicks", {});
            if (null == i || "{}" == JSON.stringify(i)) return console.log("没有任何缓存数据"), this.setData({
                show: !1
            }), !1;
            var s = [];
            if (t.length > 0) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o], d = a.getCardDataDumpInfo(n);
                    if ("" == this.data.cardType) s.push({
                        nick: i[n],
                        type: d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? "ID卡" : "IC卡",
                        checked: !1,
                        uuid: n
                    }), this.setData({
                        show: !0
                    }); else if ("IC" == this.data.cardType) {
                        "IC卡" == (d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? "ID卡" : "IC卡") && (s.push({
                            nick: i[n],
                            type: d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? "ID卡" : "IC卡",
                            checked: !1,
                            uuid: n
                        }), this.setData({
                            show: !0
                        }));
                    } else if ("ID" == this.data.cardType) {
                        "ID卡" == (d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? "ID卡" : "IC卡") && (s.push({
                            nick: i[n],
                            type: d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? "ID卡" : "IC卡",
                            checked: !1,
                            uuid: n
                        }), this.setData({
                            show: !0
                        }));
                    }
                }
                this.setData({
                    list: s
                });
            } else this.setData({
                show: !1
            });
        },
        addCard: function() {
            this.setData({
                showModal: !0
            });
        },
        bottomBtnCancel: function() {
            this.setData({
                showModal: !1
            });
        },
        bottomBtnConfirm: function(a) {
            var e = a.detail;
            t.newCard(e).isok && (this.setData({
                showModal: !1
            }), this.saveData());
        },
        onDumpItemClick: function(t) {
            var e = this.data.showView, i = t.currentTarget.dataset.id;
            if ("0" == e) {
                var s = a.getCardDataFileList();
                wx.navigateTo({
                    url: "/pages/card-wallet-info/info?id=" + s[i]
                });
            } else if ("1" == e) {
                if (1 == this.data.list[i].checked) return this.data.list[i].checked = !1, void this.setData({
                    list: this.data.list,
                    index: -1
                });
                for (var o = 0; o < this.data.list.length; o++) this.data.list[o].checked = !1;
                this.data.list[i].checked = !0, this.setData({
                    list: this.data.list,
                    index: i
                });
            }
        },
        openData: function() {
            if (!(this.data.list.length <= 0)) {
                var a = this.data.index;
                if (console.log("index == " + a), -1 != a) {
                    var e = this.data.list;
                    this.triggerEvent("selected", e[a].uuid);
                } else t.showToast("请选择需要打开的数据");
            }
        }
    }
});