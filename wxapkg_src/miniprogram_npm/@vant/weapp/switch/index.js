Object.defineProperty(exports, "__esModule", {
    value: !0
}), (0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "node-class" ],
    props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: "30"
        },
        activeValue: {
            type: null,
            value: !0
        },
        inactiveValue: {
            type: null,
            value: !1
        }
    },
    methods: {
        onClick: function() {
            var e = this.data, i = e.activeValue, t = e.inactiveValue, a = e.disabled, l = e.loading;
            if (!a && !l) {
                var n = this.data.checked === i ? t : i;
                this.$emit("input", n), this.$emit("change", n);
            }
        }
    }
});