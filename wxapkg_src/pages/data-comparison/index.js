var a = require("../../3E90FCB755C842DF58F694B049818C74.js"), t = require("../../4F97F14255C842DF29F19945DB418C74.js");

Page({
    data: {
        baseList: [],
        nick1: "",
        nick2: ""
    },
    getDataHexArray: function(a) {
        if (null == a || null == a) return null;
        if (0 == a.length) return null;
        var n = [];
        return a.forEach(function(a) {
            var e = t.bytes2hex(a);
            n.push(e);
        }), n;
    },
    onLoad: function(n) {
        console.log("数据对比的options是" + JSON.stringify(n));
        var e = n.uuid1, r = n.uuid2, s = a.getStorageSyncHasDefault("dump_nicks", {});
        this.setData({
            nick1: s[e],
            nick2: s[r]
        });
        for (var o = a.getCardDataDumpInfo(e).tag_data, i = a.getCardDataDumpInfo(r).tag_data, c = this.getDataHexArray(o), u = this.getDataHexArray(i), l = [], f = 0; f < c.length; f++) {
            for (var d = c[f], g = u[f], p = f, h = t.mifare_block_2_sector(p), D = "", k = "", v = !0, y = 0; y < d.length; y++) {
                var b = d[y], _ = g[y];
                b != _ ? (D += '<span style="background: red;">'.concat(b, "</span>"), k += '<span style="background: red;">'.concat(_, "</span>"), 
                v = !1) : (D += b, k += _);
            }
            var m = '<span style="color: #f5a200;">1：</span>' + D, H = "<span>2：</span>" + k;
            l.push({
                sector: h,
                block: p,
                data: [ m, H ],
                same: v
            });
        }
        this.setData({
            baseList: l
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});