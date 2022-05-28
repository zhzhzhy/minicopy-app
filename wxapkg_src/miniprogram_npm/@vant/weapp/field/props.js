Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.textareaProps = exports.inputProps = exports.commonProps = void 0, exports.commonProps = {
    value: {
        type: String,
        observer: function(e) {
            e !== this.value && (this.setData({
                innerValue: e
            }), this.value = e);
        }
    },
    placeholder: String,
    placeholderStyle: String,
    placeholderClass: String,
    disabled: Boolean,
    maxlength: {
        type: Number,
        value: -1
    },
    cursorSpacing: {
        type: Number,
        value: 50
    },
    autoFocus: Boolean,
    focus: Boolean,
    cursor: {
        type: Number,
        value: -1
    },
    selectionStart: {
        type: Number,
        value: -1
    },
    selectionEnd: {
        type: Number,
        value: -1
    },
    adjustPosition: {
        type: Boolean,
        value: !0
    },
    holdKeyboard: Boolean
}, exports.inputProps = {
    type: {
        type: String,
        value: "text"
    },
    password: Boolean,
    confirmType: String,
    confirmHold: Boolean,
    alwaysEmbed: Boolean
}, exports.textareaProps = {
    autoHeight: Boolean,
    fixed: Boolean,
    showConfirmBar: {
        type: Boolean,
        value: !0
    },
    disableDefaultPadding: {
        type: Boolean,
        value: !0
    }
};