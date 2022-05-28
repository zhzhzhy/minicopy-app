var e = require("../../../../@babel/runtime/helpers/typeof");

function t(e) {
    return "function" == typeof e;
}

function r(t) {
    return null !== t && "object" === e(t) && !Array.isArray(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isVideoUrl = exports.isImageUrl = exports.isBoolean = exports.isNumber = exports.isObj = exports.isDef = exports.isPromise = exports.isPlainObject = exports.isFunction = void 0, 
exports.isFunction = t, exports.isPlainObject = r, exports.isPromise = function(e) {
    return r(e) && t(e.then) && t(e.catch);
}, exports.isDef = function(e) {
    return null != e;
}, exports.isObj = function(t) {
    var r = e(t);
    return null !== t && ("object" === r || "function" === r);
}, exports.isNumber = function(e) {
    return /^\d+(\.\d+)?$/.test(e);
}, exports.isBoolean = function(e) {
    return "boolean" == typeof e;
};

var o = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i, s = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

exports.isImageUrl = function(e) {
    return o.test(e);
}, exports.isVideoUrl = function(e) {
    return s.test(e);
};