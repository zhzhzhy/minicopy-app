Object.defineProperty(exports, "__esModule", {
    value: !0
}), (0, require("../common/component").VantComponent)({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: "circular"
        },
        size: String,
        textSize: String
    },
    data: {
        array12: Array.from({
            length: 12
        })
    }
});