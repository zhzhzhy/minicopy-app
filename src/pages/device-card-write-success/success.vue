<template>
    <view>
        <view>
            <devicebar></devicebar>
        </view>
        <view class="content">
            <view style="margin-top: 132rpx">
                <view>
                    <icon class="fail"></icon>
                </view>
                <view class="search">写卡成功</view>
                <view class="search">
                    <text class="continuitText1">快去刷卡开门吧，请连续刷卡成功开门三次，再使用！</text>
                </view>
            </view>
        </view>
        <view class="doubleBtn">
            <view class="leftBtn">
                <button
                    @tap="writeCard"
                    style="
                        width: 100%;
                        font-size: 30rpx;
                        border-radius: 20px 20px 20px 20px;
                        background: rgba(255, 255, 255, 0.9);
                        border: 1px solid #333333;
                        color: #333333;
                        font-weight: 500;
                    "
                >
                    再写一张
                </button>
            </view>
            <view class="rightBtn">
                <button
                    @tap="onWriteCardFinishExit"
                    style="
                        width: 100%;
                        font-size: 30rpx;
                        border-radius: 20px 20px 20px 20px;
                        padding: 3rpx 0rpx 3rpx 0rpx;
                        background: #f5a200;
                        color: #fff;
                        font-weight: 500;
                        border: #f5a200;
                    "
                >
                    完成
                </button>
            </view>
        </view>
    </view>
</template>

<script>
import devicebar from '@/components/device-tab-bar/device';
var n = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        devicebar
    },
    data() {
        return {};
    },
    onLoad: function (i) {
        n.deductionTimes();
    },
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    methods: {
        writeCard: function () {
            uni.navigateBack();
        },

        onWriteCardFinishExit: function () {
            uni.switchTab({
                url: '/pages/device-connect-main/index'
            });
        }
    }
};
</script>
<style>
@import './success.css';
</style>
