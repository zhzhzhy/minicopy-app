Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        progress: {
            type: Number,
            value: 0
        },
        title: {
            type: String,
            value: "无"
        }
    },
    data: {},
    methods: {
        onClose: function() {
            this.triggerEvent("close");
        },
        onCancel: function() {
            this.triggerEvent("cancel");
        }
    }
});