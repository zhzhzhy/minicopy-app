Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.chooseVideoProps = exports.chooseImageProps = void 0, exports.chooseImageProps = {
    sizeType: {
        type: Array,
        value: [ "original", "compressed" ]
    },
    capture: {
        type: Array,
        value: [ "album", "camera" ]
    }
}, exports.chooseVideoProps = {
    capture: {
        type: Array,
        value: [ "album", "camera" ]
    },
    compressed: {
        type: Boolean,
        value: !0
    },
    maxDuration: {
        type: Number,
        value: 60
    },
    camera: {
        type: String,
        value: "back"
    }
};