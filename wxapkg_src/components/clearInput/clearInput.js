var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("@vant/weapp/dialog/dialog"));

require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Component({
    externalClasses: [ "input-class", "icon-class" ],
    properties: {
        inputHint: {
            type: String,
            value: "搜索"
        },
        inputIcon: {
            type: String,
            value: "search.png"
        },
        inputType: {
            type: String,
            value: "text"
        },
        isPassword: {
            type: Boolean,
            value: !1
        },
        confirmType: {
            type: String,
            value: "done"
        }
    },
    data: {
        isClearShow: !1,
        inputValue: "",
        hiddOpenModal: !0
    },
    methods: {
        inputListener: function(e) {
            var t = e.detail.value, i = e.detail.cursor;
            null == t || 0 === t.length ? this.setData({
                isClearShow: !1
            }) : this.setData({
                isClearShow: !0
            });
            var n = {
                value: t,
                cursor: i
            };
            this.triggerEvent("inputListener", n);
        },
        inputConfirm: function(e) {
            var t = {
                value: e.detail.value
            };
            this.triggerEvent("inputConfirm", t);
        },
        clearTap: function() {
            console.log("点击了清除"), this.setData({
                isClearShow: !1,
                inputValue: ""
            });
        },
        redeemNow: function() {
            e.default.alert({
                title: "兑换失败",
                message: "兑换码错误或已经被使用",
                context: this
            }).then(function() {});
        },
        openConfirm: function() {
            this.setData({
                hiddOpenModal: !0
            });
        }
    }
});