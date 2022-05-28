<template>
    <view :class="contentColor == '1' ? 'frame' : 'masterFrame'" v-if="showViewClone == true">
        <view :class="contentColor == '1' ? 'whiteBlock' : 'whiteBlockMaster'">
            <view :class="contentColor == '1' ? 'number0' : 'number0Master'">
                <text>写卡次数用完啦</text>
            </view>
            <view style="width: 640rpx; text-align: center; position: absolute; margin-top: 32rpx; color: #848484; font-size: 34rpx; font-weight: 500">
                <text>继续写卡请开通vip或购买次数</text>
            </view>
            <view @tap="onUserBuyVipCall" :class="contentColor == '1' ? 'openVip' : 'openVipMaster'">
                <text>开通VIP</text>
            </view>
            <view @tap="onUserBuyChanceCall" :class="contentColor == '1' ? 'purchaseCard' : 'purchaseCardMaster'">
                <text>单次购买</text>
            </view>
            <view @tap="onBuyVipCancelCall" :class="contentColor == '1' ? 'cancel1' : 'cancel1Master'">
                <text>取消</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        showView: {
            type: Boolean,
            default: ''
        },
        contentColor: {
            type: String,
            default: ''
        }
    },
    methods: {
        onBuyVipCancelCall: function () {
            this.setData({
                showViewClone: false
            });
        },
        onUserBuyVipCall: function () {
            uni.navigateTo({
                url: '/pages/user-buy-vip/buy'
            });
        },
        onUserBuyChanceCall: function () {
            uni.navigateTo({
                url: '/pages/user-buy-writetag-chance/chance'
            });
        }
    },
    watch: {
        showView: {
            handler: function (newVal, oldVal) {
                this.showViewClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
