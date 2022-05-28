var e = require("@babel/runtime/helpers/typeof.js"), t = require("4F97F14255C842DF29F19945DB418C74.js"), r = {
    tag_type: null
}, n = [ [] ], s = [ [] ], u = function(e) {
    console.log("开发者没有注册标签异常处理器: 0x" + e.toString(16));
};

function a(e) {
    null != u && u(e);
}

function o(t, r) {
    return function(n) {
        if (t instanceof Uint8Array || t instanceof Array) -1 != t.indexOf(n.status) ? r(n) : a(n.status); else {
            if ("number" != typeof t) throw "开发者传入参数异常，proxyTagErrorEvent 不支持此类型的状态值: " + e(t);
            n.status == t ? r(n) : a(n.status);
        }
    };
}

function c(e, t) {
    return function() {
        if (0 == arguments.length || "function" != typeof arguments[arguments.length - 1]) throw "无法自动封箱代理该函数，开发者至少要保证onRespCall在实参结尾被定义！";
        arguments[arguments.length - 1] = o(t, arguments[arguments.length - 1]), e.apply(this, Array.prototype.slice.call(arguments, 0));
    };
}

module.exports = {
    TAG_TYPE_HF_14443A: "14443A",
    TAG_TYPE_LF_EM410X: "EM410x",
    TAG_TYPE_MF1_MAYBE: "Mf1NTMaybe",
    TAG_TYPE_MF1_STDWK: "Mf1StdNTWK",
    TAG_TYPE_MF1_STDST: "Mf1StdNTST",
    TAG_TYPE_MF1_STDHD: "Mf1StdNTHD",
    TAG_TYPE_MF1_GEN1A: "Mf1Gen1ABD",
    TAG_MF1_DEFAULT_DATA: "00000000000000000000000000000000",
    TAG_MF1_DEFAULT_TRAI: "FFFFFFFFFFFFFF078069FFFFFFFFFFFF",
    getTagInformation: function() {
        return r;
    },
    setTagInformation: function(e) {
        r = e;
    },
    getMifareTagDatas: function() {
        return n;
    },
    setMifareTagDatas: function(e) {
        n = e;
    },
    getMifareCardKeys: function() {
        return s;
    },
    getMifareKeysMap: function() {
        for (var e = {}, r = 0, n = 0; r < s.length; r += 2, n++) {
            var u = null != s[r] ? t.bytes2hex(s[r]) : null, a = null != s[r + 1] ? t.bytes2hex(s[r + 1]) : null;
            e[n] = {
                keya: u,
                keyb: a
            };
        }
        return e;
    },
    setMifareCardKeys: function(e) {
        s = e;
    },
    onTagErrorCallback: function(e) {
        u = e;
    },
    throwTagErrorEvent: a,
    requestOnce410FieldScan: c(t.requestOnce410FieldScan, 64),
    requestOnceWrite55XXTag: c(t.requestOnceWrite55XXTag, 64),
    requestOnceWrite82XXTag: c(t.requestOnceWrite82XXTag, 64),
    requestOnce14AFieldScan: c(t.requestOnce14AFieldScan, 0),
    requestMfAuthentication: c(t.requestMfAuthentication, 0),
    request14AGetATSDataArr: c(t.request14AGetATSDataArr, 0),
    requestCheckMf3TimeAuth: c(t.requestCheckMf3TimeAuth, 0),
    requestCheckMfBlockSize: c(t.requestCheckMfBlockSize, 0),
    requestRDBLOnceStandard: c(t.requestRDBLOnceStandard, 0),
    requestRDSCOnceStandard: c(t.requestRDSCOnceStandard, 0),
    requestWRBLOnceStandard: c(t.requestWRBLOnceStandard, 0),
    requestWRBLMoreStandard: c(t.requestWRBLMoreStandard, 0),
    requestRDBLOnceGen1ATag: c(t.requestRDBLOnceGen1ATag, 0),
    requestRDBLMoreGen1ATag: c(t.requestRDBLMoreGen1ATag, 0),
    requestWRBLOnceGen1ATag: c(t.requestWRBLOnceGen1ATag, 0),
    requestWRBLMoreGen1ATag: c(t.requestWRBLMoreGen1ATag, 0),
    requestFCheckMf1SecKeys: c(t.requestFCheckMf1SecKeys, 0),
    requestFCheckMfNSecKeys: c(t.requestFCheckMfNSecKeys, 0),
    requestMfReadKeyBByKeyA: c(t.requestMfReadKeyBByKeyA, 0),
    requestNestedDistDetect: c(t.requestNestedDistDetect, 0),
    requestNested2NtCollect: c(t.requestNested2NtCollect, 0),
    requestDarksideRecovery: c(t.requestDarksideRecovery, 0),
    requestMF1AntResetDelay: c(t.requestMF1AntResetDelay, 0),
    requestGEN1ATAGLoophole: c(t.requestGEN1ATAGLoophole, 0),
    requestDarksideLoophole: c(t.requestDarksideLoophole, 0),
    requestStaticNTLoophole: c(t.requestStaticNTLoophole, [ 0, 36 ]),
    requestNestedNTLoophole: c(t.requestNestedNTLoophole, [ 0, 36, 37 ]),
    requestUnlockChineseTag: c(t.requestUnlockChineseTag, 0),
    requestUplockChineseTag: c(t.requestUplockChineseTag, 0),
    requestAuthMF1KnownKeys: c(t.requestAuthMF1KnownKeys, 0),
    requestSTDiffNTLoophole: c(t.requestSTDiffNTLoophole, [ 0, 44 ]),
    requestSTDiff2NtCollect: c(t.requestSTDiff2NtCollect, 0)
};