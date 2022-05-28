Component({
    properties: {
        canback: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        backListenPageShow: !1,
        backListenerEnable: !1
    },
    observers: {
        canback: function(t) {
            this.updateStatus(t);
        }
    },
    pageLifetimes: {
        show: function() {
            this.updateStatus(this.data.canback);
        },
        hide: function() {
            this.updateStatus(!0);
        }
    },
    lifetimes: {
        detached: function() {
            this.updateStatus(!0);
        },
        error: function(t) {
            console.log("页面事件拦截组件错误: " + t);
        }
    },
    methods: {
        onUserback: function() {
            var t = this;
            t.data.backListenerEnable && (console.log("拦截了退出事件！"), t.data.canback ? (t.setData({
                backListenPageShow: !1
            }), console.log("判断到可以返回")) : (console.log("判断到无法返回"), t.updateStatus(!1, function() {
                t.triggerEvent("back", {
                    goBack: function(a) {
                        t.updateStatus(!0, function() {
                            wx.navigateBack(a);
                        });
                    },
                    "提示: ": "使用 e.detail.goBack(option); 可退出页面，其中参数option将直接传递给 wx.navigateBack(option)。"
                });
            })));
        },
        updateStatus: function(t, a) {
            this.setData({
                backListenerEnable: !t,
                backListenPageShow: !t
            }, function() {
                "function" == typeof a && setTimeout(a, 50);
            });
        }
    }
});