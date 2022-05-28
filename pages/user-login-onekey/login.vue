<template>
    <view>
        <view class="loginContent">
            <view class="logo">
                <image class="logoImg" src="/static/static/img/login_logo.png"></image>
            </view>
            <view class="loginButton">
                <van-button
                    @getphonenumber="getPhoneNumber"
                    @tap.native="checkPermission"
                    customStyle="width:100%;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                    :disabled="!canLogin"
                    openType="getPhoneNumber"
                    type="primary"
                >
                    微信一键登录
                </van-button>
            </view>
            <view class="agree">
                <view class="viewRead">
                    <checkbox-group @change="onCheckChange">
                        <checkbox :checked="false" class="radio" :value="0"></checkbox>
                        <text class="read" :decode="true">&nbsp;阅读并同意法律声明及</text>
                        <text @tap="agree" class="privacy">《隐私政策》</text>
                    </checkbox-group>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
var e = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

var o = (getApp(), '');
export default {
    components: {
        vanButton
    },
    data() {
        return {
            canLogin: false
        };
    },
    onLoad: function () {
        uni.login({
            success: function (e) {
                console.log('马上去获取openid');
                uni.request({
                    url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/login',
                    data: {
                        code: e.code,
                        encryptedData: 1,
                        iv: 1
                    },
                    header: {
                        'content-type': 'application/json'
                    }
                });
            }
        });
    },
    onShow: function () {
        var o = e.obtain();
        console.log('登录这里的token是' + o);

        if (0 !== Object.keys(o).length) {
            uni.navigateBack();
            return false;
        }

        console.log('token是对象');
    },
    methods: {
        agree: function () {
            uni.navigateTo({
                url: '/pages/user-agreement/agreement'
            });
        },

        showPermissionWarn: function () {
            uni.showToast({
                title: '请先同意《法律声明及隐私政策》',
                icon: 'none',
                duration: 2000
            });
        },

        onCheckChange: function (e) {
            var o = e.detail.value.length > 0;

            if (o) {
                console.log('已选中');
            } else {
                console.log('已取消');
                this.showPermissionWarn();
            }

            this.setData({
                canLogin: o
            });
        },

        handleGetUserInfo: function (e) {
            console.log(e);
            var o = e.detail.userInfo;
            uni.setStorageSync('userinfo', o);
            uni.navigateBack({
                delta: 1
            });
        },

        checkPermission: function () {
            this.canLogin || this.showPermissionWarn();
        },

        getPhoneNumber: function (n) {
            var t = n.detail.iv;
            var a = n.detail.encryptedData;
            if ('getPhoneNumber:ok' === n.detail.errMsg) {
                uni.login({
                    success: function (n) {
                        console.log('马上去获取openid');
                        uni.request({
                            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/login',
                            data: {
                                code: n.code,
                                encryptedData: a,
                                iv: t
                            },
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (n) {
                                console.log('获取到openid后台数据');
                                console.log(n);

                                if ('-41003' == n.data) {
                                    e.showToast('获取手机号失败，请重新登录');
                                    return false;
                                }

                                o = n.data.msg;
                                var t = n.data.data;
                                console.log('手机号=', o);
                                uni.setStorage({
                                    key: 'phoneObj',
                                    data: o,
                                    success: function (e) {
                                        console.log('数据缓存成功');
                                    }
                                });
                                uni.setStorage({
                                    key: 'token',
                                    data: t,
                                    success: function (e) {
                                        console.log('数据缓存成功');
                                    }
                                });
                                uni.showToast({
                                    title: '登录成功！',
                                    icon: 'success',
                                    duration: 1000
                                });
                                setTimeout(function () {
                                    uni.navigateBack();
                                }, 1000);
                            },
                            fail: function (e) {
                                console.log('请求失败: ' + JSON.stringify(e));
                                uni.showToast({
                                    title: '获取openid失败',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        });
                    }
                });
            } else {
                console.log('用户拒绝');
                uni.showModal({
                    title: '提示',
                    content: '你已拒绝授权，请重新点击并授权',
                    showCancel: false,
                    confirmText: '知道了'
                });
            }
        }
    }
};
</script>
<style>
@import './login.css';
</style>
