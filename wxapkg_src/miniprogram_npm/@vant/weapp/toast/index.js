Object.defineProperty(exports, "__esModule", {
    value: !0
}), (0, require("../common/component").VantComponent)({
    props: {
        show: Boolean,
        mask: Boolean,
        message: String,
        forbidClick: Boolean,
        zIndex: {
            type: Number,
            value: 1e3
        },
        type: {
            type: String,
            value: "text"
        },
        loadingType: {
            type: String,
            value: "circular"
        },
        position: {
            type: String,
            value: "middle"
        }
    },
    methods: {
        noop: function() {}
    }
});