Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transition = void 0;

var e = require("../common/utils"), t = require("../common/validator"), a = function(e) {
    return {
        enter: "van-".concat(e, "-enter van-").concat(e, "-enter-active enter-class enter-active-class"),
        "enter-to": "van-".concat(e, "-enter-to van-").concat(e, "-enter-active enter-to-class enter-active-class"),
        leave: "van-".concat(e, "-leave van-").concat(e, "-leave-active leave-class leave-active-class"),
        "leave-to": "van-".concat(e, "-leave-to van-").concat(e, "-leave-active leave-to-class leave-active-class")
    };
};

exports.transition = function(n) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: n,
                observer: "observeShow"
            },
            duration: {
                type: null,
                value: 300,
                observer: "observeDuration"
            },
            name: {
                type: String,
                value: "fade"
            }
        },
        data: {
            type: "",
            inited: !1,
            display: !1
        },
        ready: function() {
            !0 === this.data.show && this.observeShow(!0, !1);
        },
        methods: {
            observeShow: function(e, t) {
                e !== t && (e ? this.enter() : this.leave());
            },
            enter: function() {
                var n = this, s = this.data, i = s.duration, r = s.name, o = a(r), c = (0, t.isObj)(i) ? i.enter : i;
                this.status = "enter", this.$emit("before-enter"), (0, e.requestAnimationFrame)(function() {
                    "enter" === n.status && (n.$emit("enter"), n.setData({
                        inited: !0,
                        display: !0,
                        classes: o.enter,
                        currentDuration: c
                    }), (0, e.requestAnimationFrame)(function() {
                        "enter" === n.status && (n.transitionEnded = !1, n.setData({
                            classes: o["enter-to"]
                        }));
                    }));
                });
            },
            leave: function() {
                var n = this;
                if (this.data.display) {
                    var s = this.data, i = s.duration, r = s.name, o = a(r), c = (0, t.isObj)(i) ? i.leave : i;
                    this.status = "leave", this.$emit("before-leave"), (0, e.requestAnimationFrame)(function() {
                        "leave" === n.status && (n.$emit("leave"), n.setData({
                            classes: o.leave,
                            currentDuration: c
                        }), (0, e.requestAnimationFrame)(function() {
                            "leave" === n.status && (n.transitionEnded = !1, setTimeout(function() {
                                return n.onTransitionEnd();
                            }, c), n.setData({
                                classes: o["leave-to"]
                            }));
                        }));
                    });
                }
            },
            onTransitionEnd: function() {
                if (!this.transitionEnded) {
                    this.transitionEnded = !0, this.$emit("after-".concat(this.status));
                    var e = this.data, t = e.show, a = e.display;
                    !t && a && this.setData({
                        display: !1
                    });
                }
            }
        }
    });
};