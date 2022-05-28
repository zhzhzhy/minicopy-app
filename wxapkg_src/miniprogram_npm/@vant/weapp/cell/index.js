Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../mixins/link");

(0, require("../common/component").VantComponent)({
    classes: [ "title-class", "label-class", "value-class", "right-icon-class", "hover-class" ],
    mixins: [ e.link ],
    props: {
        title: null,
        value: null,
        icon: String,
        size: String,
        label: String,
        center: Boolean,
        isLink: Boolean,
        required: Boolean,
        clickable: Boolean,
        titleWidth: String,
        customStyle: String,
        arrowDirection: String,
        useLabelSlot: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        titleStyle: String
    },
    methods: {
        onClick: function(e) {
            this.$emit("click", e.detail), this.jumpLink();
        }
    }
});