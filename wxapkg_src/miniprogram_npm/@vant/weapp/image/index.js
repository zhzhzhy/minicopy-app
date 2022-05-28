Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = require("../common/component"), e = require("../mixins/button");

(0, o.VantComponent)({
    mixins: [ e.button ],
    classes: [ "custom-class", "loading-class", "error-class", "image-class" ],
    props: {
        src: {
            type: String,
            observer: function() {
                this.setData({
                    error: !1,
                    loading: !0
                });
            }
        },
        round: Boolean,
        width: null,
        height: null,
        radius: null,
        lazyLoad: Boolean,
        useErrorSlot: Boolean,
        useLoadingSlot: Boolean,
        showMenuByLongpress: Boolean,
        fit: {
            type: String,
            value: "fill"
        },
        showError: {
            type: Boolean,
            value: !0
        },
        showLoading: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        error: !1,
        loading: !0,
        viewStyle: ""
    },
    methods: {
        onLoad: function(o) {
            this.setData({
                loading: !1
            }), this.$emit("load", o.detail);
        },
        onError: function(o) {
            this.setData({
                loading: !1,
                error: !0
            }), this.$emit("error", o.detail);
        },
        onClick: function(o) {
            this.$emit("click", o.detail);
        }
    }
});