<template>
    <view>
        <button
            :appParameter="appParameter"
            :ariaLabel="ariaLabel"
            @contact="onContact"
            @error="onError"
            @getphonenumber="onGetPhoneNumber"
            @getuserinfo="onGetUserInfo"
            @launchapp="onLaunchApp"
            @opensetting="onOpenSetting"
            @tap="parseEventDynamicCode($event, disabled || loading ? '' : 'onClick')"
            :businessId="businessId"
            :class="
                'custom-class ' +
                utils.bem('button', [
                    type,
                    size,
                    { block: block, round: round, plain: plain, square: square, loading: loading, disabled: disabled, hairline: hairline, unclickable: disabled || loading }
                ]) +
                ' ' +
                (hairline ? 'van-hairline--surround' : '')
            "
            :data-detail="dataset"
            :formType="formType"
            hoverClass="van-button--active hover-class"
            :id="id"
            :lang="lang"
            :openType="disabled || loading || (canIUseGetUserProfile && openType === 'getUserInfo') ? '' : openType"
            :sendMessageImg="sendMessageImg"
            :sendMessagePath="sendMessagePath"
            :sendMessageTitle="sendMessageTitle"
            :sessionFrom="sessionFrom"
            :showMessageCard="showMessageCard"
            :style="computed.rootStyle({ plain: plain, color: color, customStyle: customStyle })"
        >
            <block v-if="loading">
                <van-loading
                    :color="computed.loadingColor({ type: type, color: color, plain: plain })"
                    customClass="loading-class"
                    :size="loadingSize"
                    :type="loadingType"
                ></van-loading>
                <view class="van-button__loading-text" v-if="loadingText">{{ loadingText }}</view>
            </block>
            <block v-else>
                <van-icon class="van-button__icon" :classPrefix="classPrefix" customStyle="line-height: inherit;" :name="icon" size="1.2em" v-if="icon"></van-icon>
                <view class="van-button__text">
                    <slot></slot>
                </view>
            </block>
        </button>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/component.js');

var o = require('./../mixins/button.js');

var n = require('./../common/version.js');

var t = [o.button];

if ((0, n.canIUseFormFieldButton)()) {
    t.push('wx://form-field-button');
}

(0, e.VantComponent)({
    mixins: t,
    classes: ['hover-class', 'loading-class'],
    data: {
        baseStyle: ''
    },
    props: {
        formType: String,
        icon: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        },
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: 'circular'
        },
        type: {
            type: String,
            value: 'default'
        },
        dataset: null,
        size: {
            type: String,
            value: 'normal'
        },
        loadingSize: {
            type: String,
            value: '20px'
        },
        color: String
    },
    methods: {
        onClick: function (e) {
            var that = this;
            this.$emit('click', e);
            var n = this.data;
            var t = n.canIUseGetUserProfile;
            var i = n.openType;
            var a = n.getUserProfileDesc;
            var l = n.lang;
            if ('getUserInfo' === i && t) {
                uni.getUserProfile({
                    desc: a || '  ',
                    lang: l || 'en',
                    complete: function (e) {
                        that.$emit('getuserinfo', e);
                    }
                });
            }
        }
    }
});
</script>
<style>
@import './index.css';
</style>
