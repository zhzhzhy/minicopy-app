Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setContentAnimate = void 0;

var t = require("../common/utils");

exports.setContentAnimate = function(e, n, i) {
    (0, t.getRect)(e, ".van-collapse-item__content").then(function(t) {
        return t.height;
    }).then(function(t) {
        !function(t, e, n, i) {
            var o = wx.createAnimation({
                duration: 0,
                timingFunction: "ease-in-out"
            });
            if (e) return 0 === i ? o.height("auto").top(1).step() : o.height(i).top(1).step({
                duration: n ? 300 : 1
            }).height("auto").step(), void t.setData({
                animation: o.export()
            });
            o.height(i).top(0).step({
                duration: 1
            }).height(0).step({
                duration: 300
            }), t.setData({
                animation: o.export()
            });
        }(e, n, i, t);
    });
};