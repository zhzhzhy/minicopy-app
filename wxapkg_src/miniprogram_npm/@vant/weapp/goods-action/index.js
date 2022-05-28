Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), o = require("../common/relation");

(0, e.VantComponent)({
    relation: (0, o.useChildren)("goods-action-button", function() {
        this.children.forEach(function(e) {
            e.updateStyle();
        });
    }),
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        }
    }
});