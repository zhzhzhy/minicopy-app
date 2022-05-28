Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.adaptor = void 0, exports.adaptor = function(t) {
    return Object.assign(t, {
        setStrokeStyle: function(e) {
            t.strokeStyle = e;
        },
        setLineWidth: function(e) {
            t.lineWidth = e;
        },
        setLineCap: function(e) {
            t.lineCap = e;
        },
        setFillStyle: function(e) {
            t.fillStyle = e;
        },
        setFontSize: function(e) {
            t.font = String(e);
        },
        setGlobalAlpha: function(e) {
            t.globalAlpha = e;
        },
        setLineJoin: function(e) {
            t.lineJoin = e;
        },
        setTextAlign: function(e) {
            t.textAlign = e;
        },
        setMiterLimit: function(e) {
            t.miterLimit = e;
        },
        setShadow: function(e, n, i, o) {
            t.shadowOffsetX = e, t.shadowOffsetY = n, t.shadowBlur = i, t.shadowColor = o;
        },
        setTextBaseline: function(e) {
            t.textBaseline = e;
        },
        createCircularGradient: function() {},
        draw: function() {}
    });
};