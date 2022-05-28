<template>
    <view>
        <van-popup
            @close="onClickOverlay"
            :closeOnClickOverlay="closeOnClickOverlay"
            :customClass="'van-dialog van-dialog--' + theme + ' ' + className"
            :customStyle="'width: ' + utils.addUnit(width) + ';' + customStyle"
            :overlay="overlay"
            :overlayStyle="overlayStyle"
            :show="show"
            :transition="transition"
            :zIndex="zIndex"
        >
            <view :class="utils.bem('dialog__header', { isolated: !(message || useSlot) })" v-if="title || useTitleSlot">
                <slot name="title" v-if="useTitleSlot"></slot>
                <block v-else-if="title">{{ title }}</block>
            </view>
            <slot v-if="useSlot"></slot>
            <view :class="utils.bem('dialog__message', [theme, messageAlign, { hasTitle: title }])" v-else-if="message">
                <text class="van-dialog__message-text">{{ message }}</text>
            </view>
            <van-goods-action customClass="van-dialog__footer--round-button" v-if="theme === 'round-button'">
                <van-goods-action-button
                    @click="onCancel"
                    class="van-dialog__button van-hairline--right"
                    customClass="van-dialog__cancel"
                    :customStyle="'color: ' + cancelButtonColor"
                    :loading="loading.cancel"
                    size="large"
                    v-if="showCancelButton"
                >
                    {{ cancelButtonText }}
                </van-goods-action-button>
                <van-goods-action-button
                    :appParameter="appParameter"
                    @click="onConfirm"
                    @contact="onContact"
                    @error="onError"
                    @getphonenumber="onGetPhoneNumber"
                    @getuserinfo="onGetUserInfo"
                    @launchapp="onLaunchApp"
                    @opensetting="onOpenSetting"
                    :businessId="businessId"
                    class="van-dialog__button"
                    customClass="van-dialog__confirm"
                    :customStyle="'color: ' + confirmButtonColor"
                    :lang="lang"
                    :loading="loading.confirm"
                    :openType="confirmButtonOpenType"
                    :sendMessageImg="sendMessageImg"
                    :sendMessagePath="sendMessagePath"
                    :sendMessageTitle="sendMessageTitle"
                    :sessionFrom="sessionFrom"
                    :showMessageCard="showMessageCard"
                    size="large"
                    v-if="showConfirmButton"
                >
                    {{ confirmButtonText }}
                </van-goods-action-button>
            </van-goods-action>
            <view class="van-hairline--top van-dialog__footer" v-else>
                <van-button
                    @click="onCancel"
                    class="van-dialog__button van-hairline--right"
                    customClass="van-dialog__cancel"
                    :customStyle="'color: ' + cancelButtonColor"
                    :loading="loading.cancel"
                    size="large"
                    v-if="showCancelButton"
                >
                    {{ cancelButtonText }}
                </van-button>
                <van-button
                    :appParameter="appParameter"
                    @click="onConfirm"
                    @contact="onContact"
                    @error="onError"
                    @getphonenumber="onGetPhoneNumber"
                    @getuserinfo="onGetUserInfo"
                    @launchapp="onLaunchApp"
                    @opensetting="onOpenSetting"
                    :businessId="businessId"
                    class="van-dialog__button"
                    customClass="van-dialog__confirm"
                    :customStyle="'color: ' + confirmButtonColor"
                    :lang="lang"
                    :loading="loading.confirm"
                    :openType="confirmButtonOpenType"
                    :sendMessageImg="sendMessageImg"
                    :sendMessagePath="sendMessagePath"
                    :sendMessageTitle="sendMessageTitle"
                    :sessionFrom="sessionFrom"
                    :showMessageCard="showMessageCard"
                    size="large"
                    v-if="showConfirmButton"
                >
                    {{ confirmButtonText }}
                </van-button>
            </view>
        </van-popup>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
import vanPopup from '../popup/index';
import vanButton from '../button/index';
import vanGoodsAction from '../goods-action/index';
import vanGoodsActionButton from '../goods-action-button/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var t = require('./../common/component.js');

var e = require('./../mixins/button.js');

var o = require('./../common/color.js');

var n = require('./../common/utils.js');

(0, t.VantComponent)({
    mixins: [e.button],
    props: {
        show: {
            type: Boolean,
            observer: function (t) {
                if (!t) {
                    this.stopLoading();
                }
            }
        },
        title: String,
        message: String,
        theme: {
            type: String,
            value: 'default'
        },
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        beforeClose: null,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: null,
        zIndex: {
            type: Number,
            value: 2000
        },
        confirmButtonText: {
            type: String,
            value: '确认'
        },
        cancelButtonText: {
            type: String,
            value: '取消'
        },
        confirmButtonColor: {
            type: String,
            value: o.RED
        },
        cancelButtonColor: {
            type: String,
            value: o.GRAY
        },
        showConfirmButton: {
            type: Boolean,
            value: true
        },
        overlay: {
            type: Boolean,
            value: true
        },
        transition: {
            type: String,
            value: 'scale'
        }
    },
    data: {
        loading: {
            confirm: false,
            cancel: false
        },
        callback: function () {}
    },
    methods: {
        onConfirm: function () {
            this.handleAction('confirm');
        },
        onCancel: function () {
            this.handleAction('cancel');
        },
        onClickOverlay: function () {
            this.close('overlay');
        },
        close: function (t) {
            var that = this;
            this.setData({
                show: false
            });
            uni.nextTick(function () {
                that.$emit('close', t);
                var o = that.data.callback;

                if (o) {
                    o(t, that);
                }
            });
        },
        stopLoading: function () {
            this.setData({
                loading: {
                    confirm: false,
                    cancel: false
                }
            });
        },
        handleAction: function (t) {
            var e;
            var that = this;
            this.$emit(t, {
                dialog: this
            });
            var i = this.data;
            var a = i.asyncClose;
            var l = i.beforeClose;
            if (a || l) {
                if (l) {
                    (0, n.toPromise)(l(t)).then(function (e) {
                        if (e) {
                            that.close(t);
                        } else {
                            that.stopLoading();
                        }
                    });
                }
            } else {
                this.close(t);
            }
        }
    }
});
</script>
<style>
@import './index.css';
</style>
