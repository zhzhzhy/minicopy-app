var a = require("../../4F97F14255C842DF29F19945DB418C74.js"), t = require("../../3E90FCB755C842DF58F694B049818C74.js"), e = require("../../8473358655C842DFE2155D813E918C74.js"), o = require("../../D5AF71D355C842DFB3C919D452918C74.js"), i = require("../../A1D2754255C842DFC7B41D4546C18C74.js"), n = {
    0: "寻卡",
    1: "读卡",
    2: "读卡完成"
};

Page({
    data: {
        pageStatus: 0,
        showReadProgress: !1,
        progress: 0,
        dumpSaved: !1,
        canExit: !1,
        showDumpSaveDialog: !1,
        dumpName: "",
        uid_hex: "",
        decrypt: "",
        step: "",
        max: "",
        decryptShow: !1,
        time_msg: ""
    },
    setPageStatus: function(a, t) {
        wx.setNavigationBarTitle({
            title: n[a]
        }), this.setData({
            pageStatus: a
        }, t);
    },
    gotoReadFail: function(a) {
        wx.redirectTo({
            url: "/pages/device-card-read-fail/fail?status=" + a
        });
    },
    onTagSearchTypeChange: function(a) {
        "HF" == a ? console.log("正在搜索高频卡") : console.log("正在搜索低频卡");
    },
    onTagReadingProgress: function(a) {
        var t = this;
        a = parseInt(a);
        t.setData({
            progress: a
        }), a >= 60 && this.setData({
            decryptShow: !1
        }), 100 == a && setTimeout(function() {
            t.setPageStatus(2);
        }, 2e3);
    },
    onTagAttackCallback: function(a, t, e, i, n) {
        var s = "";
        switch (a) {
          case o.TASK_NAME_FCHK:
            s = "扫默认密码";
            break;

          case o.TASK_NAME_DARKSIDE:
            s = "计算全加密";
            break;

          case o.TASK_NAME_NESTED:
            s = "计算半加密";
            break;

          case o.TASK_NAME_STATICNESTED:
            s = "计算无漏洞";
        }
        this.setData({
            decrypt: s,
            max: t,
            step: e,
            time_msg: n,
            decryptShow: !(e >= t)
        });
    },
    onTagNoFound: function() {
        setTimeout(function() {
            wx.navigateTo({
                url: "/pages/device-card-read-fail/fail"
            });
        }, 2e3);
    },
    onTagFound: function(a) {
        console.log("标签信息是 " + JSON.stringify(a)), this.setData({
            uid_hex: a.uid_hex
        }), a.readable ? this.setPageStatus(1, function() {
            t.startReadTagAllData(this.onTagReadingProgress);
        }) : this.gotoReadFail(105);
    },
    onSaveDumpToCardWallet: function() {
        this.data.dumpSaved ? i.showToast("此卡片已经保存了") : this.setData({
            showDumpSaveDialog: !0
        });
    },
    onUserCancelDumpSave: function() {
        this.setData({
            showDumpSaveDialog: !1
        });
    },
    onUserConfirmDumpSave: function(a) {
        var t = a.detail.dumpName, e = i.saveCard(t);
        e.isok ? (this.setData({
            canExit: !0,
            dumpSaved: !0,
            showDumpSaveDialog: !1
        }), i.showToast("保存成功！")) : i.showToast(e.message);
    },
    gotoWriteCard: function() {
        wx.redirectTo({
            url: "/pages/device-card-write-ready/write"
        });
    },
    onTagErrorCallback: function(a) {
        this.gotoReadFail(a);
    },
    onDeviceDisconnectCallback: function(a) {
        console.log("在读卡页面监听到设备断开连接！"), this.showToastNoIcon("设备断开连接"), 2 != this.data.pageStatus && this.gotoReadFail(107);
    },
    onBleComErrorCallback: function() {
        this.gotoReadFail(97);
    },
    onBleComTimeoutCallback: function() {
        this.gotoReadFail(108);
    },
    showToastNoIcon: function(a) {
        setTimeout(function() {
            wx.showToast({
                icon: "none",
                title: a
            });
        }, 100);
    },
    showExitTipsAtSearching: function(a) {
        wx.showModal({
            content: "当前正在寻卡，确认退出吗？",
            success: function(e) {
                e.confirm && t.stopLoopCardScanner(function() {
                    a.detail.goBack();
                });
            }
        });
    },
    showExitTipsAtDumpNoSave: function(a) {
        console.log(1111);
        var t = this;
        t.data.showDumpSaveDialog || wx.showActionSheet({
            alertText: "是否需要保存数据再退出？",
            itemList: [ "保存", "退出" ],
            success: function(e) {
                switch (e.tapIndex) {
                  case 0:
                    t.onSaveDumpToCardWallet();
                    break;

                  case 1:
                    a.detail.goBack();
                }
            },
            fail: function() {}
        });
    },
    onUserBack: function(a) {
        switch (this.data.pageStatus) {
          case 0:
            this.showExitTipsAtSearching(a);
            break;

          case 1:
            this.showToastNoIcon("读卡中，请稍等...");
            break;

          case 2:
            this.data.dumpSaved ? a.detail.goBack() : this.showExitTipsAtDumpNoSave(a);
        }
    },
    onLoad: function(t) {
        o.registerOnAttackKeysCbk(this.onTagAttackCallback), a.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        e.onTagErrorCallback(this.onTagErrorCallback), a.onComErrCallback(this.onBleComErrorCallback), 
        a.onTimeoutCallback(this.onBleComTimeoutCallback);
    },
    onUnload: function() {
        o.unregisterOnAttackKeysCbk(this.onTagAttackCallback), a.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        e.onTagErrorCallback(null), a.onComErrCallback(null), a.onTimeoutCallback(null);
    },
    onReady: function() {
        this.setPageStatus(0), t.startLoopTagScanner(6e4, this.onTagSearchTypeChange, this.onTagFound, this.onTagNoFound);
    },
    onShow: function() {},
    onHide: function() {}
});