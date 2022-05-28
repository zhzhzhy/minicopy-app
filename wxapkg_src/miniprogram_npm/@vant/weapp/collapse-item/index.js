Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), t = require("../common/relation"), n = require("./animate");

(0, e.VantComponent)({
    classes: [ "title-class", "content-class" ],
    relation: (0, t.useParent)("collapse"),
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        isLink: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        expanded: !1
    },
    mounted: function() {
        this.updateExpanded(), this.mounted = !0;
    },
    methods: {
        updateExpanded: function() {
            if (this.parent) {
                var e = this.parent.data, t = e.value, a = e.accordion, i = this.parent.children, o = void 0 === i ? [] : i, d = this.data.name, l = o.indexOf(this), s = null == d ? l : d, r = a ? t === s : (t || []).some(function(e) {
                    return e === s;
                });
                r !== this.data.expanded && (0, n.setContentAnimate)(this, r, this.mounted), this.setData({
                    index: l,
                    expanded: r
                });
            }
        },
        onClick: function() {
            if (!this.data.disabled) {
                var e = this.data, t = e.name, n = e.expanded, a = this.parent.children.indexOf(this), i = null == t ? a : t;
                this.parent.switch(i, !n);
            }
        }
    }
});