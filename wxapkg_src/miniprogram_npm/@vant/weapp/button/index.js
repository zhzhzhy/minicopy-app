Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), o = require("../mixins/button"), n = require("../common/version"), t = [ o.button ];

(0, n.canIUseFormFieldButton)() && t.push("wx://form-field-button"), (0, e.VantComponent)({
    mixins: t,
    classes: [ "hover-class", "loading-class" ],
    data: {
        baseStyle: ""
    },
    props: {
        formType: String,
        icon: String,
        classPrefix: {
            type: String,
            value: "van-icon"
        },
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: "circular"
        },
        type: {
            type: String,
            value: "default"
        },
        dataset: null,
        size: {
            type: String,
            value: "normal"
        },
        loadingSize: {
            type: String,
            value: "20px"
        },
        color: String
    },
    methods: {
        onClick: function(e) {
            var o = this;
            this.$emit("click", e);
            var n = this.data, t = n.canIUseGetUserProfile, i = n.openType, a = n.getUserProfileDesc, l = n.lang;
            "getUserInfo" === i && t && wx.getUserProfile({
                desc: a || "  ",
                lang: l || "en",
                complete: function(e) {
                    o.$emit("getuserinfo", e);
                }
            });
        }
    }
});