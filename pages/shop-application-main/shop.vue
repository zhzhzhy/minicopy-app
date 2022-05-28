<template>
    <view>
        <view>
            <devicebar></devicebar>
        </view>
        <view class="contentBlock">
            <view>
                <icon class="computer"></icon>
            </view>
            <view class="development">
                <text>正在开发中...</text>
            </view>
        </view>
        <tabbar selected="1"></tabbar>
    </view>
</template>

<script>
import devicebar from '@/components/device-tab-bar/device';
import tabbar from '@/components/custom-tab-bar/index';
export default {
    components: {
        devicebar,
        tabbar
    },
    data() {
        return {
            selected: 1
        };
    },
    onLoad: function (n) {
        uni.hideTabBar();
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
@import './shop.css';
</style>
