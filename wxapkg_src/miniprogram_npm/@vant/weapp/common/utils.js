require("../../../../@babel/runtime/helpers/Arrayincludes"), Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCurrentPage = exports.toPromise = exports.groupSetData = exports.getAllRect = exports.getRect = exports.pickExclude = exports.requestAnimationFrame = exports.addUnit = exports.getSystemInfoSync = exports.nextTick = exports.range = exports.isDef = void 0;

var e, t = require("./validator"), r = require("./version"), n = require("./validator");

function o() {
    return null == e && (e = wx.getSystemInfoSync()), e;
}

Object.defineProperty(exports, "isDef", {
    enumerable: !0,
    get: function() {
        return n.isDef;
    }
}), exports.range = function(e, t, r) {
    return Math.min(Math.max(e, t), r);
}, exports.nextTick = function(e) {
    (0, r.canIUseNextTick)() ? wx.nextTick(e) : setTimeout(function() {
        e();
    }, 1e3 / 30);
}, exports.getSystemInfoSync = o, exports.addUnit = function(e) {
    if ((0, t.isDef)(e)) return e = String(e), (0, t.isNumber)(e) ? "".concat(e, "px") : e;
}, exports.requestAnimationFrame = function(e) {
    return "devtools" === o().platform ? setTimeout(function() {
        e();
    }, 1e3 / 30) : wx.createSelectorQuery().selectViewport().boundingClientRect().exec(function() {
        e();
    });
}, exports.pickExclude = function(e, r) {
    return (0, t.isPlainObject)(e) ? Object.keys(e).reduce(function(t, n) {
        return r.includes(n) || (t[n] = e[n]), t;
    }, {}) : {};
}, exports.getRect = function(e, t) {
    return new Promise(function(r) {
        wx.createSelectorQuery().in(e).select(t).boundingClientRect().exec(function(e) {
            return void 0 === e && (e = []), r(e[0]);
        });
    });
}, exports.getAllRect = function(e, t) {
    return new Promise(function(r) {
        wx.createSelectorQuery().in(e).selectAll(t).boundingClientRect().exec(function(e) {
            return void 0 === e && (e = []), r(e[0]);
        });
    });
}, exports.groupSetData = function(e, t) {
    (0, r.canIUseGroupSetData)() ? e.groupSetData(t) : t();
}, exports.toPromise = function(e) {
    return (0, t.isPromise)(e) ? e : Promise.resolve(e);
}, exports.getCurrentPage = function() {
    var e = getCurrentPages();
    return e[e.length - 1];
};