<template>
    <view>
        <view class="topLine"></view>
        <view class="content">
            <view @tap="clearTap" class="imgBlock">
                <image :class="isClearShow ? 'clearImgShow' : 'clearImgHide'" src="/static/static/img/clear.png" style="width: 28rpx; height: 28rpx"></image>
            </view>
            <view class="searchHeader">
                <input @input="inputListener" class="input" placeholder="请输入兑换码" type="text" :value="inputValue" />
            </view>
            <view class="btn">
                <van-button
                    @tap.native="redeemNow"
                    customStyle="width:40%;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                    type="primary"
                >
                    立即兑换
                </van-button>
            </view>
            <modal @confirm="openConfirm" confirmText="确定" v-if="!hiddOpenModal" :noCancel="true" title="兑换失败">
                <view class="remainText">兑换码错误或已经被使用</view>
            </modal>
            <van-dialog confirmButtonColor="#576b95" id="van-dialog"></van-dialog>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import vanDialog from '../../miniprogram_npm/@vant/weapp/dialog/index';
var e = require('./../../@babel/runtime/helpers/interopRequireDefault.js')(require('@vant/weapp/dialog/dialog'));

require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanButton,
        vanDialog
    },
    data() {
        return {
            isClearShow: false,
            inputValue: '',
            hiddOpenModal: true
        };
    },
    externalClasses: ['input-class', 'icon-class'],
    props: {
        inputHint: {
            type: String,
            default: '搜索'
        },
        inputIcon: {
            type: String,
            default: '/static/components/clearInput/search.png'
        },
        inputType: {
            type: String,
            default: 'text'
        },
        isPassword: {
            type: Boolean,
            default: false
        },
        confirmType: {
            type: String,
            default: 'done'
        }
    },
    methods: {
        inputListener: function (e) {
            var t = e.detail.value;
            var i = e.detail.cursor;
            if (null == t || 0 === t.length) {
                this.setData({
                    isClearShow: false
                });
            } else {
                this.setData({
                    isClearShow: true
                });
            }

            var n = {
                value: t,
                cursor: i
            };
            this.$emit('inputListener', {
                detail: n
            });
        },
        inputConfirm: function (e) {
            var t = {
                value: e.detail.value
            };
            this.$emit('inputConfirm', {
                detail: t
            });
        },
        clearTap: function () {
            console.log('点击了清除');
            this.setData({
                isClearShow: false,
                inputValue: ''
            });
        },
        redeemNow: function () {
            e.default
                .alert({
                    title: '兑换失败',
                    message: '兑换码错误或已经被使用',
                    context: this
                })
                .then(function () {});
        },
        openConfirm: function () {
            this.setData({
                hiddOpenModal: true
            });
        }
    }
};
</script>
<style>
@import './clearInput.css';
</style>
