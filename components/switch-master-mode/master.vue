<template>
    <view>
        <view @tap="show" class="icon-switch-mode"></view>
        <van-action-sheet @tap.native="close" :show="showSwitchDialog" title="切换模式">
            <view class="content-easy-mode">
                <view class="content-radio">
                    <radio :checked="true" color="#f5a200"></radio>
                </view>
                <view class="easy-mode-title">
                    <text>简洁模式</text>
                </view>
                <view class="easy-mode-text">
                    <text>极简界面，轻易上手</text>
                </view>
            </view>
            <view @tap="jump" class="content-master-mode">
                <view class="content-radio">
                    <view style="width: 38rpx; height: 38rpx; border-radius: 100%; border: 1px solid #ccc; margin-top: 2%"></view>
                </view>
                <view class="master-mode-title">
                    <text>专家模式</text>
                </view>
                <view class="master-mode-text">
                    <text>专业界面，专业体验</text>
                </view>
            </view>
        </van-action-sheet>
    </view>
</template>

<script>
import vanActionSheet from '../../miniprogram_npm/@vant/weapp/action-sheet/index';
export default {
    components: {
        vanActionSheet
    },
    data() {
        return {
            showSwitchDialog: false
        };
    },
    props: {},
    methods: {
        show: function () {
            this.setData({
                showSwitchDialog: true
            });
        },
        close: function () {
            this.setData({
                showSwitchDialog: false
            });
        },
        jump: function (t) {
            uni.navigateTo({
                url: '/pages/device-master-mode/index'
            });
        }
    }
};
</script>
<style>
@import './master.css';
</style>
