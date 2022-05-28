<template>
    <view>
        <view class="topLine"></view>
        <view class="outsideBlock">
            <view class="block">
                <view class="line">
                    <view class="right">
                        <view class="title">
                            <text>头像</text>
                        </view>
                        <view class="rightIcon">
                            <icon class="headPortrait" v-if="avatarUrl == ''"></icon>
                            <image :src="avatarUrl" style="width: 112rpx; height: 112rpx; border-radius: 50%" v-if="avatarUrl"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="none"></view>
        <view class="outsideBlocks">
            <view class="block">
                <view class="lines">
                    <view class="right">
                        <view class="title">
                            <text>手机号码</text>
                        </view>
                        <view class="rightIcons">
                            <view class="phoneNumber">
                                <text class="rightText">{{ phone }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="contaniner" v-if="phone">
            <view @tap="logOut" class="btn">
                <van-button
                    customStyle="width:320rpx;height: 80rpx;background: rgba(245, 162, 0, 0.1);border-radius: 20px 20px 20px 20px;font-size:30rpx;font-weight:500;color:#f5a200;opacity:1;border:none;"
                >
                    退出登录
                </van-button>
            </view>
        </view>
        <view class="text" v-else>
            <view @tap="logIn" class="btn">
                <van-button
                    customStyle="width:320rpx;height: 80rpx;background: rgba(245, 162, 0, 0.1);border-radius: 20px 20px 20px 20px;font-size:30rpx;font-weight:500;color:#f5a200;opacity:1;border:none;"
                >
                    请先登录
                </van-button>
            </view>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
var e = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

var t = require('../../4F97F14255C842DF29F19945DB418C74.js');

var a = require('../../3E90FCB755C842DF58F694B049818C74.js');

export default {
    components: {
        vanButton
    },
    data() {
        return {
            avatarUrl: '',
            phone: ''
        };
    },
    onLoad: function (e) {},
    onShow: function () {
        e.judgePhoneNumber(this);
        var t = a.getStorageSyncHasDefault('headPortrait', {});
        this.setData({
            avatarUrl: t
        });
    },
    methods: {
        logIn: function () {
            uni.navigateTo({
                url: '/pages/user-login-onekey/login'
            });
        },

        logOut: function () {
            uni.showModal({
                title: '提示',
                content: '是否确认退出登录？',
                success: function (a) {
                    if (a.confirm) {
                        console.log('用户点击确定');
                        e.removeAppStorage();
                        t.disconnectExistsDevice();
                        uni.navigateBack();
                    }
                }
            });
        }
    }
};
</script>
<style>
@import './info.css';
</style>
