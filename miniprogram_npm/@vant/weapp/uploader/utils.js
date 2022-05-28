var e = function () {
    return (e =
        Object.assign ||
        function (e) {
            for (var t, i = 1, r = arguments.length; i < r; i++) for (var u in (t = arguments[i])) Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u]);

            return e;
        }).apply(this, arguments);
};

Object.defineProperty(exports, '__esModule', {
    value: !0
}),
    (exports.chooseFile = exports.isVideoFile = exports.isImageFile = void 0);

var t = require('./../common/utils.js'),
    i = require('./../common/validator.js');

(exports.isImageFile = function (e) {
    return null != e.isImage ? e.isImage : e.type ? 'image' === e.type : !!e.url && (0, i.isImageUrl)(e.url);
}),
    (exports.isVideoFile = function (e) {
        return null != e.isVideo ? e.isVideo : e.type ? 'video' === e.type : !!e.url && (0, i.isVideoUrl)(e.url);
    }),
    (exports.chooseFile = function (i) {
        var r = i.accept,
            u = i.multiple,
            o = i.capture,
            a = i.compressed,
            n = i.maxDuration,
            c = i.sizeType,
            s = i.camera,
            p = i.maxCount;
        return new Promise(function (i, l) {
            switch (r) {
                case 'image':
                    uni.chooseImage({
                        count: u ? Math.min(p, 9) : 1,
                        sourceType: o,
                        sizeType: c,
                        success: function (r) {
                            return i(
                                (function (i) {
                                    return i.tempFiles.map(function (i) {
                                        return e(e({}, (0, t.pickExclude)(i, ['path'])), {
                                            type: 'image',
                                            url: i.path,
                                            thumb: i.path
                                        });
                                    });
                                })(r)
                            );
                        },
                        fail: l
                    });
                    break;

                case 'media':
                    uni.chooseMedia({
                        count: u ? Math.min(p, 9) : 1,
                        sourceType: o,
                        maxDuration: n,
                        sizeType: c,
                        camera: s,
                        success: function (r) {
                            return i(
                                (function (i) {
                                    return i.tempFiles.map(function (r) {
                                        return e(e({}, (0, t.pickExclude)(r, ['fileType', 'thumbTempFilePath', 'tempFilePath'])), {
                                            type: i.type,
                                            url: r.tempFilePath,
                                            thumb: 'video' === i.type ? r.thumbTempFilePath : r.tempFilePath
                                        });
                                    });
                                })(r)
                            );
                        },
                        fail: l
                    });
                    break;

                case 'video':
                    uni.chooseVideo({
                        sourceType: o,
                        compressed: a,
                        maxDuration: n,
                        camera: s,
                        success: function (r) {
                            return i(
                                (function (i) {
                                    return [
                                        e(e({}, (0, t.pickExclude)(i, ['tempFilePath', 'thumbTempFilePath', 'errMsg'])), {
                                            type: 'video',
                                            url: i.tempFilePath,
                                            thumb: i.thumbTempFilePath
                                        })
                                    ];
                                })(r)
                            );
                        },
                        fail: l
                    });
                    break;

                default:
                    uni.chooseMessageFile({
                        count: u ? p : 1,
                        type: r,
                        success: function (r) {
                            return i(
                                (function (i) {
                                    return i.tempFiles.map(function (i) {
                                        return e(e({}, (0, t.pickExclude)(i, ['path'])), {
                                            url: i.path
                                        });
                                    });
                                })(r)
                            );
                        },
                        fail: l
                    });
            }
        });
    });
