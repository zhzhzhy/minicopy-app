Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), t = require("../common/relation");

(0, e.VantComponent)({
    relation: (0, t.useChildren)("collapse-item"),
    props: {
        value: {
            type: null,
            observer: "updateExpanded"
        },
        accordion: {
            type: Boolean,
            observer: "updateExpanded"
        },
        border: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        updateExpanded: function() {
            this.children.forEach(function(e) {
                e.updateExpanded();
            });
        },
        switch: function(e, t) {
            var o = this.data, n = o.accordion, i = o.value, a = e;
            e = n ? t ? e : "" : t ? (i || []).concat(e) : (i || []).filter(function(t) {
                return t !== e;
            }), t ? this.$emit("open", a) : this.$emit("close", a), this.$emit("change", e), 
            this.$emit("input", e);
        }
    }
});