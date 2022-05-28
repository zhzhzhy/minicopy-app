Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), e = require("../mixins/button"), o = require("../common/color"), n = require("../common/utils");

(0, t.VantComponent)({
    mixins: [ e.button ],
    props: {
        show: {
            type: Boolean,
            observer: function(t) {
                !t && this.stopLoading();
            }
        },
        title: String,
        message: String,
        theme: {
            type: String,
            value: "default"
        },
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        beforeClose: null,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: null,
        zIndex: {
            type: Number,
            value: 2e3
        },
        confirmButtonText: {
            type: String,
            value: "确认"
        },
        cancelButtonText: {
            type: String,
            value: "取消"
        },
        confirmButtonColor: {
            type: String,
            value: o.RED
        },
        cancelButtonColor: {
            type: String,
            value: o.GRAY
        },
        showConfirmButton: {
            type: Boolean,
            value: !0
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        transition: {
            type: String,
            value: "scale"
        }
    },
    data: {
        loading: {
            confirm: !1,
            cancel: !1
        },
        callback: function() {}
    },
    methods: {
        onConfirm: function() {
            this.handleAction("confirm");
        },
        onCancel: function() {
            this.handleAction("cancel");
        },
        onClickOverlay: function() {
            this.close("overlay");
        },
        close: function(t) {
            var e = this;
            this.setData({
                show: !1
            }), wx.nextTick(function() {
                e.$emit("close", t);
                var o = e.data.callback;
                o && o(t, e);
            });
        },
        stopLoading: function() {
            this.setData({
                loading: {
                    confirm: !1,
                    cancel: !1
                }
            });
        },
        handleAction: function(t) {
            var e, o = this;
            this.$emit(t, {
                dialog: this
            });
            var i = this.data, a = i.asyncClose, l = i.beforeClose;
            a || l ? (this.setData(((e = {})["loading.".concat(t)] = !0, e)), l && (0, n.toPromise)(l(t)).then(function(e) {
                e ? o.close(t) : o.stopLoading();
            })) : this.close(t);
        }
    }
});