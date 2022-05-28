Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), i = require("../common/relation"), t = require("../mixins/button"), n = require("../mixins/link");

(0, e.VantComponent)({
    mixins: [ n.link, t.button ],
    relation: (0, i.useParent)("goods-action"),
    props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        type: {
            type: String,
            value: "danger"
        }
    },
    methods: {
        onClick: function(e) {
            this.$emit("click", e.detail), this.jumpLink();
        },
        updateStyle: function() {
            if (null != this.parent) {
                var e = this.index, i = this.parent.children, t = void 0 === i ? [] : i;
                this.setData({
                    isFirst: 0 === e,
                    isLast: e === t.length - 1
                });
            }
        }
    }
});