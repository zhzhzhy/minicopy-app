<template>
    <view>
        <card-wallet-list style="width: 100%; height: 100%; overflow: hidden"></card-wallet-list>
        <tabbar selected="2"></tabbar>
    </view>
</template>

<script>
import vanCell from '../../miniprogram_npm/@vant/weapp/cell/index';
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import cardWalletList from '../../components/card-wallet-list/card-wallet-list';
import devicebar from '@/components/device-tab-bar/device';
import master from '@/components/switch-master-mode/master';
import tabbar from '@/components/custom-tab-bar/index';
export default {
    components: {
        vanCell,
        vanButton,
        cardWalletList,
        devicebar,
        master,
        tabbar
    },
    data() {
        return {};
    },
    onLoad: function () {
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
@import './list.css';
</style>
