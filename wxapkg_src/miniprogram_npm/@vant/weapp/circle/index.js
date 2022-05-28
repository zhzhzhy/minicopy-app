Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/color"), t = require("../common/component"), r = require("../common/utils"), a = require("../common/validator"), n = require("../common/version"), i = require("./canvas");

var o = 2 * Math.PI, l = -Math.PI / 2;

(0, t.VantComponent)({
    props: {
        text: String,
        lineCap: {
            type: String,
            value: "round"
        },
        value: {
            type: Number,
            value: 0,
            observer: "reRender"
        },
        speed: {
            type: Number,
            value: 50
        },
        size: {
            type: Number,
            value: 100,
            observer: function() {
                this.drawCircle(this.currentValue);
            }
        },
        fill: String,
        layerColor: {
            type: String,
            value: e.WHITE
        },
        color: {
            type: null,
            value: e.BLUE,
            observer: function() {
                var e = this;
                this.setHoverColor().then(function() {
                    e.drawCircle(e.currentValue);
                });
            }
        },
        type: {
            type: String,
            value: ""
        },
        strokeWidth: {
            type: Number,
            value: 4
        },
        clockwise: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        hoverColor: e.BLUE
    },
    methods: {
        getContext: function() {
            var e = this, t = this.data, a = t.type, o = t.size;
            if ("" === a || !(0, n.canIUseCanvas2d)()) {
                var l = wx.createCanvasContext("van-circle", this);
                return Promise.resolve(l);
            }
            var s = (0, r.getSystemInfoSync)().pixelRatio;
            return new Promise(function(t) {
                wx.createSelectorQuery().in(e).select("#van-circle").node().exec(function(r) {
                    var n = r[0].node, l = n.getContext(a);
                    e.inited || (e.inited = !0, n.width = o * s, n.height = o * s, l.scale(s, s)), t((0, 
                    i.adaptor)(l));
                });
            });
        },
        setHoverColor: function() {
            var e = this, t = this.data, r = t.color, n = t.size;
            return (0, a.isObj)(r) ? this.getContext().then(function(t) {
                var a = t.createLinearGradient(n, 0, 0, 0);
                Object.keys(r).sort(function(e, t) {
                    return parseFloat(e) - parseFloat(t);
                }).map(function(e) {
                    return a.addColorStop(parseFloat(e) / 100, r[e]);
                }), e.hoverColor = a;
            }) : (this.hoverColor = r, Promise.resolve());
        },
        presetCanvas: function(e, t, r, a, n) {
            var i = this.data, o = i.strokeWidth, l = i.lineCap, s = i.clockwise, c = i.size / 2, u = c - o / 2;
            e.setStrokeStyle(t), e.setLineWidth(o), e.setLineCap(l), e.beginPath(), e.arc(c, c, u, r, a, !s), 
            e.stroke(), n && (e.setFillStyle(n), e.fill());
        },
        renderLayerCircle: function(e) {
            var t = this.data, r = t.layerColor, a = t.fill;
            this.presetCanvas(e, r, 0, o, a);
        },
        renderHoverCircle: function(e, t) {
            var r = this.data.clockwise, a = o * (t / 100), n = r ? l + a : 3 * Math.PI - (l + a);
            this.presetCanvas(e, this.hoverColor, l, n);
        },
        drawCircle: function(e) {
            var t = this, r = this.data.size;
            this.getContext().then(function(a) {
                a.clearRect(0, 0, r, r), t.renderLayerCircle(a);
                var n, i = (n = e, Math.min(Math.max(n, 0), 100));
                0 !== i && t.renderHoverCircle(a, i), a.draw();
            });
        },
        reRender: function() {
            var e = this, t = this.data, r = t.value, a = t.speed;
            if (a <= 0 || a > 1e3) this.drawCircle(r); else {
                this.clearMockInterval(), this.currentValue = this.currentValue || 0;
                !function t() {
                    e.interval = setTimeout(function() {
                        e.currentValue !== r ? (Math.abs(e.currentValue - r) < 1 ? e.currentValue = r : e.currentValue < r ? e.currentValue += 1 : e.currentValue -= 1, 
                        e.drawCircle(e.currentValue), t()) : e.clearMockInterval();
                    }, 1e3 / a);
                }();
            }
        },
        clearMockInterval: function() {
            this.interval && (clearTimeout(this.interval), this.interval = null);
        }
    },
    mounted: function() {
        var e = this;
        this.currentValue = this.data.value, this.setHoverColor().then(function() {
            e.drawCircle(e.currentValue);
        });
    },
    destroyed: function() {
        this.clearMockInterval();
    }
});