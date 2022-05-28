Component({
    properties: {
        sector: {
            type: Number,
            value: 0
        },
        block: {
            type: Number,
            value: 0
        },
        show: {
            type: Boolean,
            value: !1
        },
        value: {
            type: String,
            value: ""
        },
        mode: {
            type: Number,
            value: 0
        }
    },
    observers: {
        show: function(t) {
            t && (0 == this.data.mode && this.updateMode0InputStatus(), 1 == this.data.mode && (this.data.trilMode.keya.value = this.data.value.substr(0, 12), 
            this.data.trilMode.tril.value = this.data.value.substr(12, 8), this.data.trilMode.keyb.value = this.data.value.substr(20, 12), 
            this.updateMode1InputStatus()));
        }
    },
    data: {
        inputStatus: 0,
        hexLength: 32,
        trilMode: {
            keya: {
                title: "A密码",
                value: "",
                length: 0,
                status: 0,
                maxlen: 12,
                style: "mifare-data-block-trail-keya"
            },
            tril: {
                title: "控制位",
                value: "",
                length: 0,
                status: 0,
                maxlen: 8,
                style: "mifare-data-block-trail-ctl"
            },
            keyb: {
                title: "B密码",
                value: "",
                length: 0,
                status: 0,
                maxlen: 12,
                style: "mifare-data-block-trail-keyb"
            }
        }
    },
    methods: {
        updateMode0InputStatus: function() {
            var t = null, a = 0;
            32 == this.data.value.length ? a = /^[a-fA-F0-9]{32}$/.test(this.data.value) ? 1 : 2 : /^[a-fA-F0-9]+$/.test(this.data.value) ? t = this.data.value.length : a = 2, 
            this.setData({
                hexLength: t,
                inputStatus: a
            });
        },
        updateMode1InputStatus: function() {
            var t = 1, a = this;
            Object.keys(a.data.trilMode).forEach(function(e) {
                var l = a.data.trilMode[e], s = null, n = 0;
                l.value.length == l.maxlen ? n = RegExp("^[a-fA-F0-9]{".concat(l.maxlen, "}$")).test(l.value) ? 1 : 2 : /^[a-fA-F0-9]+$/.test(l.value) ? s = l.value.length : n = 2;
                l.length = s, l.status = n, 1 != n && (t = 2);
            }), a.setData({
                trilMode: a.data.trilMode,
                inputStatus: t
            });
        },
        onUserInput: function(t) {
            var a = this, e = t.detail.value;
            if (0 == this.data.mode && (e.length > 32 && (e = e.substr(0, 32), console.log("len = ".concat(e.length, " val = ").concat(e))), 
            this.setData({
                value: e
            }, function() {
                return a.updateMode0InputStatus();
            })), 1 == this.data.mode) {
                var l = t.currentTarget.dataset.id, s = this.data.trilMode[l];
                e.length > s.maxlen && (e = e.substr(0, s.maxlen), console.log("len = ".concat(e.length, " val = ").concat(e))), 
                s.value = e, this.setData({
                    trilMode: this.data.trilMode
                }, function() {
                    return a.updateMode1InputStatus();
                });
            }
        },
        onClose: function() {
            this.triggerEvent("close");
        },
        onCancelCallback: function() {
            this.triggerEvent("cancel");
        },
        showToast: function(t) {
            wx.showToast({
                icon: "none",
                title: t
            });
        },
        onConfirmCallback: function() {
            var t;
            1 == this.data.inputStatus && (t = 1 == this.data.mode ? "".concat(this.data.trilMode.keya.value).concat(this.data.trilMode.tril.value).concat(this.data.trilMode.keyb.value) : this.data.value, 
            console.log("最终数据: " + t), this.triggerEvent("confirm", {
                sector: this.data.sector,
                block: this.data.block,
                data: t
            }));
        }
    }
});