<script>
export default {
    data() {
        return {};
    },
    onLaunch: function () {
        this.globalData.autoUpdate();
    },
    globalData: {
        userInfo: null,

        showWarnAndExit: function (n) {
            uni.showModal({
                title: '温馨提示',
                content: n,
                showCancel: false,
                success: function () {
                    uni.exitMiniProgram({
                        success: function () {
                            console.log('用户不愿意更新，强制退出小程序！');
                        }
                    });
                }
            });
        },

        autoUpdate: function () {
            var that = this;

            if (uni.canIUse('getUpdateManager')) {
                var t = uni.getUpdateManager();
                t.onCheckForUpdate(function (o) {
                    if (o.hasUpdate) {
                        uni.showModal({
                            title: '更新提示',
                            content: '检测到新版本，是否下载新版本并重启小程序？',
                            success: function (o) {
                                if (o.confirm) {
                                    that.downLoadAndUpdate(t);
                                } else {
                                    if (o.cancel) {
                                        that.showWarnAndExit('请更新后再使用哦~');
                                    }
                                }
                            }
                        });
                    }
                });
            } else {
                uni.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                });
            }
        },

        downLoadAndUpdate: function (n) {
            var that = this;
            uni.showLoading();
            n.onUpdateReady(function () {
                uni.hideLoading();
                n.applyUpdate();
            });
            n.onUpdateFailed(function () {
                uni.hideLoading();
                that.showWarnAndExit('新版本下载失败，请您删除当前小程序，重新搜索（或扫码）打开哟！');
            });
        }
    }
};
</script>
<style>
@import './app.css';
</style>
