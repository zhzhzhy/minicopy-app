<template>
    <view>
        <van-popup @close="onClose" customStyle="width: 88%; border-radius: 24rpx; background: #1A1D26;margin-top:-100rpx;" duration="100" :show="show">
            <view style="display: flex; flex-direction: column; width: 100%">
                <view class="container-title">
                    <text class="txt-title-main">{{ title }}</text>
                </view>
                <view class="container-progress">
                    <view class="progress-bar-box">
                        <view class="progress-bar-in" :style="'width:' + (progress + '%') + ';'">
                            <image src="/static/static/img/writeCardLogo.svg" style="width: 22%; height: 22%; padding: 20rpx"></image>
                        </view>
                    </view>
                </view>
                <view hidden class="container-button">
                    <view @tap="onCancel" class="btn-base btn-cancel" hoverClass="btn-bottom-hover" hoverStartTime="10" hoverStayTime="100">取消</view>
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
        progress: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: '无'
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
        onCancel: function () {
            this.$emit('cancel');
        }
    }
};
</script>
<style>
@import './progress.css';
</style>
