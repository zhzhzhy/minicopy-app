<template>
    <view>
        <van-popup
            @close="onClickOverlay"
            :closeOnClickOverlay="closeOnClickOverlay"
            customClass="van-action-sheet"
            :overlay="overlay"
            position="bottom"
            :round="round"
            :safeAreaInsetBottom="safeAreaInsetBottom"
            :show="show"
            :zIndex="zIndex"
        >
            <view class="van-action-sheet__header" v-if="title">
                {{ title }}
                <van-icon @click="onClose" customClass="van-action-sheet__close" name="cross"></van-icon>
            </view>
            <view class="van-action-sheet__description van-hairline--bottom" v-if="description">{{ description }}</view>
            <view v-if="actions && actions.length">
                <button
                    :appParameter="appParameter"
                    @contact="onContact"
                    @error="onError"
                    @getphonenumber="onGetPhoneNumber"
                    @getuserinfo="onGetUserInfo"
                    @launchapp="onLaunchApp"
                    @opensetting="onOpenSetting"
                    @tap="parseEventDynamicCode($event, item.disabled || item.loading ? '' : 'onSelect')"
                    :class="utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }) + ' ' + (item.className || '')"
                    :data-index="index"
                    hoverClass="van-action-sheet__item--hover"
                    :lang="lang"
                    :openType="item.disabled || item.loading || (canIUseGetUserProfile && item.openType === 'getUserInfo') ? '' : item.openType"
                    :sendMessageImg="sendMessageImg"
                    :sendMessagePath="sendMessagePath"
                    :sendMessageTitle="sendMessageTitle"
                    :sessionFrom="sessionFrom"
                    :showMessageCard="showMessageCard"
                    :style="item.color ? 'color: ' + item.color : ''"
                    v-for="(item, index) in actions"
                    :key="index"
                >
                    <block v-if="!item.loading">
                        {{ item.name }}
                        <view class="van-action-sheet__subname" v-if="item.subname">{{ item.subname }}</view>
                    </block>

                    <van-loading customClass="van-action-sheet__loading" size="22px" v-else></van-loading>
                </button>
            </view>
            <slot></slot>
            <block v-if="cancelText">
                <view class="van-action-sheet__gap"></view>
                <view @tap="onCancel" class="van-action-sheet__cancel" hoverClass="van-action-sheet__cancel--hover" hoverStayTime="70">{{ cancelText }}</view>
            </block>
        </van-popup>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
import vanIcon from '../icon/index';
import vanPopup from '../popup/index';
import vanLoading from '../loading/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/component.js');

var t = require('./../mixins/button.js');

(0, e.VantComponent)({
    mixins: [t.button],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        description: String,
        round: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        closeOnClickAction: {
            type: Boolean,
            value: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onSelect: function (e) {
            var that = this;
            var o = e.currentTarget.dataset.index;
            var n = this.data;
            var i = n.actions;
            var l = n.closeOnClickAction;
            var s = n.canIUseGetUserProfile;
            var c = i[o];
            if (c) {
                this.$emit('select', c);

                if (l) {
                    this.onClose();
                }

                if ('getUserInfo' === c.openType && s) {
                    uni.getUserProfile({
                        desc: c.getUserProfileDesc || '  ',
                        complete: function (e) {
                            that.$emit('getuserinfo', e);
                        }
                    });
                }
            }
        },
        onCancel: function () {
            this.$emit('cancel');
        },
        onClose: function () {
            this.$emit('close');
        },
        onClickOverlay: function () {
            this.$emit('click-overlay');
            this.onClose();
        }
    }
});
</script>
<style>
@import './index.css';
</style>
