<template>
    <view>
        <view class="content">
            <view>
                <image class="device" src="/static/static/img/cardReader.svg"></image>
            </view>
            <view style="margin-top: 20rpx; color: #666666; font-size: 26rpx; font-weight: 500">{{ codeString }}</view>
        </view>
        <view style="width: 100%; height: auto; margin-top: 126rpx; padding-left: 80rpx">
            <view style="color: #333333; font-weight: 600; font-size: 28rpx">更新说明</view>
            <view style="margin-top: 24rpx; font-size: 24rpx; font-weight: 400; color: #757875">1.增加新的功能</view>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
var n = require('../../4F97F14255C842DF29F19945DB418C74.js');

export default {
    components: {
        vanButton
    },
    data() {
        return {
            codeString: ''
        };
    },
    onLoad: function (n) {},
    onReady: function () {},
    onShow: function () {
        var o = n.getDeivceFirmwareVerInfo();
        this.setData({
            codeString: o.codeString
        });
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
