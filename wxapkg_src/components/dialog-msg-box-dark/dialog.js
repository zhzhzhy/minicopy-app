Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: null
        },
        content: {
            type: String,
            value: "无"
        },
        confrimText: {
            type: String,
            value: "确认"
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        mode: {
            type: String,
            value: "msg"
        },
        inputstyle: {
            type: String,
            value: ""
        },
        inputtype: {
            type: String,
            value: "text"
        },
        maxlength: {
            type: Number,
            value: -1
        },
        value: {
            type: String,
            value: ""
        },
        placeholder: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        onUserInput: function(e) {
            this.setData({
                value: e.detail.value
            });
        },
        onClose: function() {
            this.triggerEvent("close");
        },
        onCancel: function() {
            this.triggerEvent("cancel");
        },
        onConfrim: function() {
            this.triggerEvent("confirm", {
                value: this.data.value
            });
        }
    }
});