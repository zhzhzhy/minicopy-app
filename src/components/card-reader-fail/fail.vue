<template>
    <view>
        <view>
            <devicebar></devicebar>
        </view>
        <view class="content">
            <view style="margin-top: 132rpx">
                <view>
                    <icon class="fail-img"></icon>
                </view>
                <view class="main-title">
                    <text>{{ title }}</text>
                </view>
            </view>
            <view class="content-err">
                <view>
                    <view class="fail-title">
                        <text>错误代码</text>
                    </view>
                    <view class="fail-msg">
                        <text>{{ code }}</text>
                    </view>
                </view>
                <view>
                    <view class="fail-title">
                        <text>失败原因</text>
                    </view>
                    <view class="fail-msg">
                        <text>{{ reason }}</text>
                    </view>
                </view>
            </view>
            <view class="btn">
                <van-button
                    @tap.native="onUserRetryClickCallback"
                    customStyle="width:80%;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                    type="primary"
                >
                    重试
                </van-button>
            </view>
        </view>
        <view>
            <view class="question">
                <text @tap="gotoUserHelp">遇到问题?</text>
                <icon class="doubleArrow"></icon>
            </view>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import devicebar from '@/components/device-tab-bar/device';
var t = require('../../1736EF7655C842DF715087715F518C74.js');

export default {
    components: {
        vanButton,
        devicebar
    },
    data() {
        return {
            reason: '',
            code: '0x999'
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
            default: 2457
        },
        helpCode: {
            type: Number,
            default: void 0
        }
    },
    watch: {
        status: {
            handler: function (t) {
                this.formatCode(t);
            },

            immediate: true,
            deep: true
        }
    },
    beforeMount: function () {
        this.formatCode(this.status);
    },
    methods: {
        formatCode: function (e) {
            var a = parseInt(e);
            var s = a.toString(16);
            if (s.length < 2) {
                s = '0' + s;
            }

            this.setData({
                code: '0x' + s,
                reason: t.getMsg(a)
            });
        },
        gotoUserHelp: function () {
            uni.navigateTo({
                url: '/pages/user-device-help/help?id=' + this.helpCode
            });
        },
        onUserRetryClickCallback: function () {
            this.$emit('retry', {
                detail: {}
            });
        }
    }
};
</script>
<style>
@import './fail.css';
</style>
