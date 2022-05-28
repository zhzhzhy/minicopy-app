App({
    onLaunch: function() {
        this.autoUpdate();
    },
    showWarnAndExit: function(n) {
        wx.showModal({
            title: "温馨提示",
            content: n,
            showCancel: !1,
            success: function() {
                wx.exitMiniProgram({
                    success: function() {
                        console.log("用户不愿意更新，强制退出小程序！");
                    }
                });
            }
        });
    },
    autoUpdate: function() {
        var n = this;
        if (wx.canIUse("getUpdateManager")) {
            var t = wx.getUpdateManager();
            t.onCheckForUpdate(function(o) {
                o.hasUpdate && wx.showModal({
                    title: "更新提示",
                    content: "检测到新版本，是否下载新版本并重启小程序？",
                    success: function(o) {
                        o.confirm ? n.downLoadAndUpdate(t) : o.cancel && n.showWarnAndExit("请更新后再使用哦~");
                    }
                });
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    downLoadAndUpdate: function(n) {
        var t = this;
        wx.showLoading(), n.onUpdateReady(function() {
            wx.hideLoading(), n.applyUpdate();
        }), n.onUpdateFailed(function() {
            wx.hideLoading(), t.showWarnAndExit("新版本下载失败，请您删除当前小程序，重新搜索（或扫码）打开哟！");
        });
    },
    globalData: {
        userInfo: null
    }
});