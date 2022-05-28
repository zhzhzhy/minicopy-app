Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.canIUseGetUserProfile = exports.canIUseCanvas2d = exports.canIUseNextTick = exports.canIUseGroupSetData = exports.canIUseAnimate = exports.canIUseFormFieldButton = exports.canIUseModel = void 0;

var e = require("./utils");

function t(t) {
    return function(e, t) {
        e = e.split("."), t = t.split(".");
        for (var r = Math.max(e.length, t.length); e.length < r; ) e.push("0");
        for (;t.length < r; ) t.push("0");
        for (var n = 0; n < r; n++) {
            var s = parseInt(e[n], 10), o = parseInt(t[n], 10);
            if (s > o) return 1;
            if (s < o) return -1;
        }
        return 0;
    }((0, e.getSystemInfoSync)().SDKVersion, t) >= 0;
}

exports.canIUseModel = function() {
    return t("2.9.3");
}, exports.canIUseFormFieldButton = function() {
    return t("2.10.3");
}, exports.canIUseAnimate = function() {
    return t("2.9.0");
}, exports.canIUseGroupSetData = function() {
    return t("2.4.0");
}, exports.canIUseNextTick = function() {
    return wx.canIUse("nextTick");
}, exports.canIUseCanvas2d = function() {
    return t("2.9.0");
}, exports.canIUseGetUserProfile = function() {
    return !!wx.getUserProfile;
};