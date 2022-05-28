var t = require("../../1736EF7655C842DF715087715F518C74.js");

Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        status: {
            type: Number,
            value: 2457
        },
        helpCode: {
            type: Number,
            value: void 0
        }
    },
    observers: {
        status: function(t) {
            this.formatCode(t);
        }
    },
    data: {
        reason: "",
        code: "0x999"
    },
    lifetimes: {
        attached: function() {
            this.formatCode(this.data.status);
        }
    },
    methods: {
        formatCode: function(e) {
            var a = parseInt(e), s = a.toString(16);
            s.length < 2 && (s = "0" + s), this.setData({
                code: "0x" + s,
                reason: t.getMsg(a)
            });
        },
        gotoUserHelp: function() {
            wx.navigateTo({
                url: "/pages/user-device-help/help?id=" + this.data.helpCode
            });
        },
        onUserRetryClickCallback: function() {
            this.triggerEvent("retry", {});
        }
    }
});