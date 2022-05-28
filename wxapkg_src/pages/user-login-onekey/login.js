var e = require("../../A1D2754255C842DFC7B41D4546C18C74.js"), o = (getApp(), "");

Page({
    data: {
        canLogin: !1
    },
    onLoad: function() {
        wx.login({
            success: function(e) {
                console.log("马上去获取openid");
                wx.request({
                    url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/login",
                    data: {
                        code: e.code,
                        encryptedData: 1,
                        iv: 1
                    },
                    header: {
                        "content-type": "application/json"
                    }
                });
            }
        });
    },
    onShow: function() {
        var o = e.obtain();
        if (console.log("登录这里的token是" + o), 0 !== Object.keys(o).length) return wx.navigateBack(), 
        !1;
        console.log("token是对象");
    },
    agree: function() {
        wx.navigateTo({
            url: "/pages/user-agreement/agreement"
        });
    },
    showPermissionWarn: function() {
        wx.showToast({
            title: "请先同意《法律声明及隐私政策》",
            icon: "none",
            duration: 2e3
        });
    },
    onCheckChange: function(e) {
        var o = e.detail.value.length > 0;
        o ? console.log("已选中") : (console.log("已取消"), this.showPermissionWarn()), this.setData({
            canLogin: o
        });
    },
    handleGetUserInfo: function(e) {
        console.log(e);
        var o = e.detail.userInfo;
        wx.setStorageSync("userinfo", o), wx.navigateBack({
            delta: 1
        });
    },
    checkPermission: function() {
        this.data.canLogin || this.showPermissionWarn();
    },
    getPhoneNumber: function(n) {
        var t = n.detail.iv, a = n.detail.encryptedData;
        "getPhoneNumber:ok" === n.detail.errMsg ? wx.login({
            success: function(n) {
                console.log("马上去获取openid"), wx.request({
                    url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/login",
                    data: {
                        code: n.code,
                        encryptedData: a,
                        iv: t
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(n) {
                        if (console.log("获取到openid后台数据"), console.log(n), "-41003" == n.data) return e.showToast("获取手机号失败，请重新登录"), 
                        !1;
                        o = n.data.msg;
                        var t = n.data.data;
                        console.log("手机号=", o), wx.setStorage({
                            key: "phoneObj",
                            data: o,
                            success: function(e) {
                                console.log("数据缓存成功");
                            }
                        }), wx.setStorage({
                            key: "token",
                            data: t,
                            success: function(e) {
                                console.log("数据缓存成功");
                            }
                        }), wx.showToast({
                            title: "登录成功！",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack();
                        }, 1e3);
                    },
                    fail: function(e) {
                        console.log("请求失败: " + JSON.stringify(e)), wx.showToast({
                            title: "获取openid失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            }
        }) : (console.log("用户拒绝"), wx.showModal({
            title: "提示",
            content: "你已拒绝授权，请重新点击并授权",
            showCancel: !1,
            confirmText: "知道了"
        }));
    }
});