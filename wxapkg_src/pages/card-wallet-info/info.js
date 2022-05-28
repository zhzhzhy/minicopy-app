var a = require("../../3E90FCB755C842DF58F694B049818C74.js"), t = require("../../8473358655C842DFE2155D813E918C74.js"), e = require("../../4F97F14255C842DF29F19945DB418C74.js"), i = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        btnList: [ {
            title: "修改数据",
            value: "",
            bindtap: "onDataEditCall"
        }, {
            title: "复制数据",
            value: "",
            bindtap: "onDataCopyCall"
        }, {
            title: "分享数据",
            value: "",
            bindtap: "onDataShareCall"
        }, {
            title: "数据分析",
            value: "",
            bindtap: "onDataAnalysisCall"
        }, {
            title: "删除卡片",
            value: "",
            bindtap: "onDataDumpDelCall"
        } ],
        nameEditor: {
            showNameEditor: !1,
            defaultName: ""
        }
    },
    onDataEditCall: function() {
        wx.navigateTo({
            url: "/pages/device-master-mode/index?" + "uuid=".concat(this.uuid)
        });
    },
    getTagDataFromMifareTag: function() {
        for (var a = "", t = 0; t < this.dumpinfo.tag_data.length; t++) a += "".concat(e.bytes2hex(this.dumpinfo.tag_data[t]), "\n");
        return a;
    },
    getTagDataFromEm410xTag: function() {
        return this.dumpinfo.tag_info.uid_hex;
    },
    onDataCopyCall: function() {
        var a = null;
        switch (this.dumpinfo.tag_info.tag_type) {
          case t.TAG_TYPE_HF_14443A:
            break;

          case t.TAG_TYPE_MF1_GEN1A:
          case t.TAG_TYPE_MF1_MAYBE:
          case t.TAG_TYPE_MF1_STDHD:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDWK:
            a = this.getTagDataFromMifareTag();
            break;

          case t.TAG_TYPE_LF_EM410X:
            a = this.getTagDataFromEm410xTag();
        }
        null != a ? wx.setClipboardData({
            data: a,
            success: function(a) {
                i.showToast("数据复制成功");
            }
        }) : i.showToast("无数据可复制");
    },
    onDataDumpDelCall: function() {
        var t = this;
        wx.showModal({
            content: "是否确认删除此卡片",
            success: function(e) {
                if (e.confirm) {
                    var i = t.uuid;
                    a.deleteDumpFilesByID(i);
                    var n = a.getStorageSyncHasDefault("dump_nicks", {});
                    delete n[i], wx.setStorageSync("dump_nicks", n), wx.navigateBack();
                }
            }
        });
    },
    onUserGotoWriteTagCall: function() {
        if (i.isLogin()) {
            var t = this.uuid;
            a.loadFile2DataBuffer(t) ? e.isBLEDeviceIsConnected() ? wx.navigateTo({
                url: "/pages/device-card-write-ready/write"
            }) : i.showToast("设备没有连接") : i.showToast("加载数据失败");
        } else wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        });
    },
    onDataShareCall: function() {
        i.showToast("正在开发中");
    },
    onDataAnalysisCall: function() {
        i.showToast("正在开发中");
    },
    onUserEditNameCall: function() {
        this.data.nameEditor.showNameEditor = !0, this.data.nameEditor.defaultName = this.data.taginfo.nick, 
        this.setData({
            nameEditor: this.data.nameEditor
        });
    },
    dissmissNameEditorDialog: function() {
        this.data.nameEditor.showNameEditor = !1, this.setData({
            nameEditor: this.data.nameEditor
        });
    },
    onUserCancelNameEdit: function() {
        this.dissmissNameEditorDialog();
    },
    onUserConfirmNameEdit: function(t) {
        var e = a.getStorageSyncHasDefault("dump_nicks", {});
        e[this.uuid] = t.detail.dumpName, wx.setStorageSync("dump_nicks", e), this.dissmissNameEditorDialog(), 
        this.data.taginfo.nick = t.detail.dumpName, this.setData({
            taginfo: this.data.taginfo
        }), i.showToast("修改成功！");
    },
    dateFormat: function(a) {
        var t = new Date(a);
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
    },
    createInfoDetail: function(a) {
        var e = [];
        switch (a.tag_type) {
          case t.TAG_TYPE_HF_14443A:
            break;

          case t.TAG_TYPE_MF1_GEN1A:
          case t.TAG_TYPE_MF1_MAYBE:
          case t.TAG_TYPE_MF1_STDHD:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDWK:
            e.push("类型: IC卡"), e.push("UID: ".concat(a.uid_hex)), e.push("SAK: ".concat(a.sak_hex, " ATQA: ").concat(a.atqa_hex)), 
            "ats_hex" in a && e.push("ATS: ".concat(a.ats_hex));
            break;

          case t.TAG_TYPE_LF_EM410X:
            e.push("类型: ID卡"), e.push("卡号: ".concat(a.uid_hex));
        }
        return e.push("创建时间: ".concat(this.dateFormat(this.dumpinfo.tag_date))), e;
    },
    createInfoStyle: function(a) {
        switch (a.tag_type) {
          case t.TAG_TYPE_HF_14443A:
            break;

          case t.TAG_TYPE_MF1_GEN1A:
          case t.TAG_TYPE_MF1_MAYBE:
          case t.TAG_TYPE_MF1_STDHD:
          case t.TAG_TYPE_MF1_STDST:
          case t.TAG_TYPE_MF1_STDWK:
            return "bg-tag-info-type-ic";

          case t.TAG_TYPE_LF_EM410X:
            return "bg-tag-info-type-id";
        }
        return "";
    },
    onLoad: function(a) {
        this.uuid = a.id, console.log("卡包详情页接收到的DUMP序号是: " + this.uuid);
    },
    onShow: function() {
        this.dumpinfo = a.getCardDataDumpInfo(this.uuid);
        var t = a.getStorageSyncHasDefault("dump_nicks", {}), e = this.dumpinfo.tag_info;
        this.setData({
            taginfo: {
                nick: t[this.uuid],
                style: this.createInfoStyle(e),
                detail: this.createInfoDetail(e)
            }
        });
    }
});