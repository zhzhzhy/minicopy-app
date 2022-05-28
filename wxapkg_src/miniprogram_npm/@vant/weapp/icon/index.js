Object.defineProperty(exports, "__esModule", {
    value: !0
}), (0, require("../common/component").VantComponent)({
    props: {
        dot: Boolean,
        info: null,
        size: null,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: "van-icon"
        },
        name: String
    },
    methods: {
        onClick: function() {
            this.$emit("click");
        }
    }
});