<template>
    <view>
        <van-popup @close="onClose" customStyle="width: 88%; border-radius: 24rpx; background: #1A1D26;" duration="100" :show="show">
            <view style="display: flex; flex-direction: column; width: 100%">
                <view class="container-title">
                    <text class="txt-title-main" style="font-size: large" v-if="title.length > 0">{{ title }}</text>
                    <text class="txt-title-main" :style="title.length > 0 ? 'margin-top: 64rpx;' : ''" v-if="content.length > 0">{{ content }}</text>
                    <view class="container-input" v-if="mode == 'edit'">
                        <input
                            @input="onUserInput"
                            :class="'input-center-data ' + inputstyle"
                            :maxlength="maxlength"
                            :placeholder="placeholder"
                            :showConfirmBar="false"
                            :type="inputtype"
                            :value="value"
                        />
                    </view>
                </view>
                <view class="container-button">
                    <view @tap="onCancel" class="btn-base btn-cancel" hoverClass="btn-bottom-hover" hoverStartTime="10" hoverStayTime="100" v-if="cancelText.length > 0">
                        {{ cancelText }}
                    </view>
                    <view @tap="onConfrim" class="btn-base btn-confirm" hoverClass="btn-bottom-hover" hoverStartTime="10" hoverStayTime="100" v-if="confrimText.length > 0">
                        {{ confrimText }}
                    </view>
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
        title: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: '无'
        },
        confrimText: {
            type: String,
            default: '确认'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        mode: {
            type: String,
            default: 'msg'
        },
        inputstyle: {
            type: String,
            default: ''
        },
        inputtype: {
            type: String,
            default: 'text'
        },
        maxlength: {
            type: Number,
            default: -1
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    methods: {
        onUserInput: function (e) {
            this.setData({
                value: e.detail.value
            });
        },
        onClose: function () {
            this.$emit('close');
        },
        onCancel: function () {
            this.$emit('cancel');
        },
        onConfrim: function () {
            this.$emit('confirm', {
                detail: {
                    value: this.value
                }
            });
        }
    }
};
</script>
<style>
@import './dialog.css';
</style>
