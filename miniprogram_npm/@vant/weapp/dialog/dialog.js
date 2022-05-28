var t = function () {
    return (t =
        Object.assign ||
        function (t) {
            for (var e, n = 1, o = arguments.length; n < o; n++) for (var r in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);

            return t;
        }).apply(this, arguments);
};

Object.defineProperty(exports, '__esModule', {
    value: !0
});
var e = [],
    n = {
        show: !1,
        title: '',
        width: null,
        theme: 'default',
        message: '',
        zIndex: 100,
        overlay: !0,
        selector: '#van-dialog',
        className: '',
        asyncClose: !1,
        beforeClose: null,
        transition: 'scale',
        customStyle: '',
        messageAlign: '',
        overlayStyle: '',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        showConfirmButton: !0,
        showCancelButton: !1,
        closeOnClickOverlay: !1,
        confirmButtonOpenType: ''
    },
    o = t({}, n);

var r = function (n) {
    return (
        (n = t(t({}, o), n)),
        new Promise(function (o, r) {
            var c,
                s = n.context || (c = getCurrentPages())[c.length - 1].$mp.page.selectComponent(n.selector);
            delete n.context,
                delete n.selector,
                s
                    ? (s.setData(
                          t(
                              {
                                  callback: function (t, e) {
                                      'confirm' === t ? o(e) : r(e);
                                  }
                              },
                              n
                          )
                      ),
                      uni.nextTick(function () {
                          s.setData({
                              show: !0
                          });
                      }),
                      e.push(s))
                    : console.warn('未找到 van-dialog 节点，请确认 selector 及 context 是否正确');
        })
    );
};

(r.alert = function (t) {
    return r(t);
}),
    (r.confirm = function (e) {
        return r(
            t(
                {
                    showCancelButton: !0
                },
                e
            )
        );
    }),
    (r.close = function () {
        e.forEach(function (t) {
            t.close();
        }),
            (e = []);
    }),
    (r.stopLoading = function () {
        e.forEach(function (t) {
            t.stopLoading();
        });
    }),
    (r.currentOptions = o),
    (r.defaultOptions = n),
    (r.setDefaultOptions = function (e) {
        (o = t(t({}, o), e)), (r.currentOptions = o);
    }),
    (r.resetDefaultOptions = function () {
        (o = t({}, n)), (r.currentOptions = o);
    }),
    r.resetDefaultOptions(),
    (exports.default = r);
