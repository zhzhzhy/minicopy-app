Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        success: {
            type: Boolean,
            value: !0
        },
        titleMain: {
            type: String,
            value: "无"
        },
        titleSub: {
            type: String,
            value: "无"
        }
    },
    data: {},
    methods: {
        onClose: function() {
            this.triggerEvent("close");
        },
        onComplete: function() {
            this.triggerEvent("complete");
        },
        onCancel: function() {
            this.triggerEvent("cancel");
        },
        onRetry: function() {
            this.triggerEvent("retry");
        }
    }
});