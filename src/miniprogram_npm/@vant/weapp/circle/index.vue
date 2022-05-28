<template>
    <view class="van-circle">
        <canvas canvasId="van-circle" class="van-circle__canvas" id="van-circle" :style="'width: ' + utils.addUnit(size) + ';height:' + utils.addUnit(size)" :type="type"></canvas>
        <view class="van-circle__text" v-if="!text">
            <slot></slot>
        </view>
        <cover-view class="van-circle__text" v-else>{{ text }}</cover-view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/color.js');

var t = require('./../common/component.js');

var r = require('./../common/utils.js');

var a = require('./../common/validator.js');

var n = require('./../common/version.js');

var i = require('././canvas.js');

var o = 2 * Math.PI;
var l = -Math.PI / 2;
(0, t.VantComponent)({
    props: {
        text: String,
        lineCap: {
            type: String,
            value: 'round'
        },
        value: {
            type: Number,
            value: 0,
            observer: 'reRender'
        },
        speed: {
            type: Number,
            value: 50
        },
        size: {
            type: Number,
            value: 100,
            observer: function () {
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
            observer: function () {
                var that = this;
                this.setHoverColor().then(function () {
                    that.drawCircle(that.currentValue);
                });
            }
        },
        type: {
            type: String,
            value: ''
        },
        strokeWidth: {
            type: Number,
            value: 4
        },
        clockwise: {
            type: Boolean,
            value: true
        }
    },
    data: {
        hoverColor: e.BLUE
    },
    methods: {
        getContext: function () {
            var that = this;
            var t = this.data;
            var a = t.type;
            var o = t.size;
            if ('' === a || !(0, n.canIUseCanvas2d)()) {
                var l = uni.createCanvasContext('van-circle', this);
                return Promise.resolve(l);
            }

            var s = (0, r.getSystemInfoSync)().pixelRatio;
            return new Promise(function (t) {
                uni.createSelectorQuery()
                    .in(that)
                    .select('#van-circle')
                    .node()
                    .exec(function (r) {
                        var n = r[0].node;
                        var l = n.getContext(a);
                        that.inited || ((that.inited = true), (n.width = o * s), (n.height = o * s), l.scale(s, s));
                        t((0, i.adaptor)(l));
                    });
            });
        },
        setHoverColor: function () {
            var that = this;
            var t = this.data;
            var r = t.color;
            var n = t.size;
            return (0, a.isObj)(r)
                ? this.getContext().then(function (t) {
                      var a = t.createLinearGradient(n, 0, 0, 0);
                      Object.keys(r)
                          .sort(function (e, t) {
                              return parseFloat(e) - parseFloat(t);
                          })
                          .map(function (e) {
                              return a.addColorStop(parseFloat(e) / 100, r[e]);
                          });
                      that.hoverColor = a;
                  })
                : ((this.hoverColor = r), Promise.resolve());
        },
        presetCanvas: function (e, t, r, a, n) {
            var i = this.data;
            var o = i.strokeWidth;
            var l = i.lineCap;
            var s = i.clockwise;
            var c = i.size / 2;
            var u = c - o / 2;
            e.setStrokeStyle(t);
            e.setLineWidth(o);
            e.setLineCap(l);
            e.beginPath();
            e.arc(c, c, u, r, a, !s);
            e.stroke();

            if (n) {
                e.setFillStyle(n);
                e.fill();
            }
        },
        renderLayerCircle: function (e) {
            var t = this.data;
            var r = t.layerColor;
            var a = t.fill;
            this.presetCanvas(e, r, 0, o, a);
        },
        renderHoverCircle: function (e, t) {
            var r = this.data.clockwise;
            var a = o * (t / 100);
            var n = r ? l + a : 3 * Math.PI - (l + a);
            this.presetCanvas(e, this.hoverColor, l, n);
        },
        drawCircle: function (e) {
            var that = this;
            var r = this.data.size;
            this.getContext().then(function (a) {
                a.clearRect(0, 0, r, r);
                that.renderLayerCircle(a);
                var n;
                var i = ((n = e), Math.min(Math.max(n, 0), 100));
                if (0 !== i) {
                    that.renderHoverCircle(a, i);
                }

                a.draw();
            });
        },
        reRender: function () {
            var that = this;
            var t = this.data;
            var r = t.value;
            var a = t.speed;
            if (a <= 0 || a > 1000) {
                this.drawCircle(r);
            } else {
                this.clearMockInterval();
                this.currentValue = this.currentValue || 0;
                !(function t() {
                    that.interval = setTimeout(function () {
                        if (that.currentValue !== r) {
                            if (Math.abs(that.currentValue - r) < 1) {
                                that.currentValue = r;
                            } else {
                                if (that.currentValue < r) {
                                    that.currentValue += 1;
                                } else {
                                    that.currentValue -= 1;
                                }
                            }

                            that.drawCircle(that.currentValue);
                            t();
                        } else {
                            that.clearMockInterval();
                        }
                    }, 1000 / a);
                })();
            }
        },
        clearMockInterval: function () {
            if (this.interval) {
                clearTimeout(this.interval);
                this.interval = null;
            }
        }
    },
    mounted: function () {
        var that = this;
        this.currentValue = this.data.value;
        this.setHoverColor().then(function () {
            that.drawCircle(that.currentValue);
        });
    },
    destroyed: function () {
        this.clearMockInterval();
    }
});
</script>
<style>
@import './index.css';
</style>
