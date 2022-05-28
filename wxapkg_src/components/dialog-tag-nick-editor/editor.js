var t = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        theme: {
            type: String,
            value: "light"
        },
        title: {
            type: String,
            value: "无"
        },
        value: {
            type: String,
            value: ""
        }
    },
    data: {
        placeholder: "请输入数据名称"
    },
    observers: {
        show: function(e) {
            e && this.setData({
                placeholder: t.createDefaultNick()
            });
        }
    },
    lifetimes: {
        attached: function() {
            var t = {};
            switch (this.data.theme) {
              case "light":
                t.base = "background: #FFFFFF", t.title = "color: #000000; font-weigth", t.input = "color: #333333; border-color: rgba(0, 0, 0, 0.1); caret-color: #F5A200;", 
                t.btnbase = "border-top: 1px solid rgba(0, 0, 0, 0.1);", t.btncancel = "border-right: 1px solid rgba(0, 0, 0, 0.1); color: #000000;";
            }
            this.setData({
                themeMap: t
            });
        }
    },
    methods: {
        onSaveDumpClick: function() {
            var t = this.data.value;
            t.length <= 0 && (t = this.data.placeholder), this.triggerEvent("confirm", {
                dumpName: t
            });
        },
        onSaveCancel: function() {
            this.setData({
                value: ""
            }), this.triggerEvent("cancel");
        },
        onCardNameInput: function(e) {
            e.detail.value.length > 12 ? t.showToast("输入字符不能大于12位") : this.setData({
                value: e.detail.value
            });
        }
    }
});