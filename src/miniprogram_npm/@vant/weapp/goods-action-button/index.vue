<template>
    <view>
        <van-button
            :appParameter="appParameter"
            @click="onClick"
            @contact="onContact"
            @error="onError"
            @getphonenumber="onGetPhoneNumber"
            @getuserinfo="onGetUserInfo"
            @launchapp="onLaunchApp"
            @opensetting="onOpenSetting"
            :businessId="businessId"
            :class="utils.bem('goods-action-button', [type, { first: isFirst, last: isLast, plain: plain }])"
            :color="color"
            customClass="van-goods-action-button__inner"
            :disabled="disabled"
            :id="id"
            :lang="lang"
            :loading="loading"
            :openType="openType"
            :plain="plain"
            :sendMessageImg="sendMessageImg"
            :sendMessagePath="sendMessagePath"
            :sendMessageTitle="sendMessageTitle"
            :sessionFrom="sessionFrom"
            :showMessageCard="showMessageCard"
            :type="type"
        >
            {{ text }}
            <slot></slot>
        </van-button>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
import vanButton from '../button/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/component.js');

var i = require('./../common/relation.js');

var t = require('./../mixins/button.js');

var n = require('./../mixins/link.js');

(0, e.VantComponent)({
    mixins: [n.link, t.button],
    relation: (0, i.useParent)('goods-action'),
    props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        type: {
            type: String,
            value: 'danger'
        }
    },
    methods: {
        onClick: function (e) {
            this.$emit('click', e.detail);
            this.jumpLink();
        },
        updateStyle: function () {
            if (null != this.parent) {
                var e = this.index;
                var i = this.parent.children;
                var t = void 0 === i ? [] : i;
                this.setData({
                    isFirst: 0 === e,
                    isLast: e === t.length - 1
                });
            }
        }
    }
});
</script>
<style>
@import './index.css';
</style>
