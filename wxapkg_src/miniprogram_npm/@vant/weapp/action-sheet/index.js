Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), t = require("../mixins/button");

(0, e.VantComponent)({
    mixins: [ t.button ],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        description: String,
        round: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickAction: {
            type: Boolean,
            value: !0
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        onSelect: function(e) {
            var t = this, o = e.currentTarget.dataset.index, n = this.data, i = n.actions, l = n.closeOnClickAction, s = n.canIUseGetUserProfile, c = i[o];
            c && (this.$emit("select", c), l && this.onClose(), "getUserInfo" === c.openType && s && wx.getUserProfile({
                desc: c.getUserProfileDesc || "  ",
                complete: function(e) {
                    t.$emit("getuserinfo", e);
                }
            }));
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onClose: function() {
            this.$emit("close");
        },
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.onClose();
        }
    }
});