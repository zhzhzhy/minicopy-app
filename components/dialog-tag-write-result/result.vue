<template>
    <view>
        <van-popup @close="onClose" customStyle="width: 88%; border-radius: 24rpx; background: #1A1D26;margin-top:-100rpx;" duration="100" :show="show">
            <view style="display: flex; flex-direction: column; width: 100%">
                <view class="container-icon">
                    <icon :class="success ? 'icon-success' : 'icon-fail'"></icon>
                </view>
                <view class="container-title">
                    <text class="txt-title-main">{{ titleMain }}</text>
                    <text :class="'txt-title-sub ' + (success ? 'txt-title-sub-succ' : 'txt-title-sub-fail')">{{ titleSub }}</text>
                </view>
                <view class="container-button">
                    <view @tap="onComplete" class="btn-base btn-complete" hoverClass="btn-bottom-hover" hoverStartTime="10" hoverStayTime="100" v-if="success">完成</view>
                    <block v-else>
                        <view @tap="onCancel" class="btn-base btn-cancel" hoverClass="btn-bottom-hover" hoverStartTime="10" hoverStayTime="100">取消</view>
                        <view @tap="onRetry" class="btn-base btn-confirm" hoverClass="btn-bottom-hover" hoverStartTime="10" hoverStayTime="100">重试</view>
                    </block>
                </view>
            </view>
        </van-popup>
    </view>
</template>

<script>
import vanPopup from '../../miniprogram_npm/@vant/weapp/popup/index';
export default {
    components: {
        vanPopup
    },
    data() {
        return {};
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        success: {
            type: Boolean,
            default: true
        },
        titleMain: {
            type: String,
            default: '无'
        },
        titleSub: {
            type: String,
            default: '无'
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
        onComplete: function () {
            this.$emit('complete');
        },
        onCancel: function () {
            this.$emit('cancel');
        },
        onRetry: function () {
            this.$emit('retry');
        }
    }
};
</script>
<style>
@import './result.css';
</style>
