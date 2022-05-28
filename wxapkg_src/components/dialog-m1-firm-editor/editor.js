var t = require("../../4F97F14255C842DF29F19945DB418C74.js");

Component({
    properties: {
        value: {
            type: String,
            value: ""
        },
        show: {
            type: Boolean,
            value: !1
        },
        size: {
            type: Number,
            value: 4
        }
    },
    data: {
        modeList: [ "Mifare1卡", "DESfire卡", "JCOP兼容M1卡" ],
        modeSelected: 0,
        inputList: {
            uid: {
                title: "UID",
                value: "",
                size: 4,
                maxlength: 8,
                index: 0
            },
            atqa: {
                title: "ATQA",
                value: "",
                maxlength: 4,
                index: 1
            },
            sak: {
                title: "SAK",
                value: "",
                maxlength: 2,
                index: 2
            },
            manufacturer: {
                title: "厂商",
                value: "",
                maxlength: 16,
                index: 3
            }
        }
    },
    observers: {
        show: function(t) {
            t && (console.log("监听到修改框弹出，将会自动进行以下数据的解析，以获得详细的信息: " + this.data.value), this.data.inputList.uid.value = this.data.value.substr(0, 8), 
            this.data.inputList.sak.value = this.data.value.substr(10, 2), this.data.inputList.atqa.value = this.data.value.substr(12, 4), 
            this.data.inputList.manufacturer.value = this.data.value.substr(16, 16), this.setData({
                inputList: this.data.inputList
            }));
        },
        size: function(t) {
            this.data.inputList.uid.size = t, this.setData({
                inputList: this.data.inputList
            });
        }
    },
    methods: {
        onTabClick: function(t) {
            var a, i, e = t.currentTarget.dataset.id;
            switch (e) {
              case 0:
                a = "0400", i = "08";
                break;

              case 1:
                a = "0800", i = "20";
                break;

              case 2:
                a = "0400", i = "28";
            }
            this.data.inputList.atqa.value = a, this.data.inputList.sak.value = i, this.setData({
                modeSelected: e,
                inputList: this.data.inputList
            });
        },
        onUserInput: function(t) {
            var a = this, i = t.currentTarget.dataset.id, e = t.detail.value;
            Object.keys(a.data.inputList).forEach(function(t) {
                var s = a.data.inputList[t];
                s.index == i && (s.value = e);
            }), a.setData({
                inputList: a.data.inputList
            });
        },
        onUserClose: function() {
            this.triggerEvent("close");
        },
        onUserCancel: function() {
            this.triggerEvent("cancel");
        },
        isInputOk: function(t) {
            var a = t.value, i = t.maxlength;
            return RegExp("^[a-fA-F0-9]{".concat(i, "}$")).test(a);
        },
        onUserConfirm: function() {
            for (var a = Object.keys(this.data.inputList), i = 0; i < a.length; i++) {
                var e = this.data.inputList[a[i]];
                if (!this.isInputOk(e)) return void wx.showToast({
                    icon: "none",
                    title: "".concat(e.title, "输入异常！")
                });
            }
            var s = t.hex2bytes(this.data.inputList.uid.value), n = s[0] ^ s[1] ^ s[2] ^ s[3], u = this.data.inputList.uid.value, r = t.bytes2hex([ n ]), c = this.data.inputList.sak.value, d = this.data.inputList.atqa.value, l = this.data.inputList.manufacturer.value, o = "".concat(u).concat(r).concat(c).concat(d).concat(l);
            this.triggerEvent("confirm", {
                data: o,
                uid: u,
                bcc: r,
                sak: c,
                atqa: d,
                manufacturer: l
            });
        }
    }
});