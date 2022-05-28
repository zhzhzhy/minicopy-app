<template>
    <view @tap="onClick" :class="'custom-class ' + utils.bem('image', { round: round })" :style="computed.rootStyle({ width: width, height: height, radius: radius })">
        <image
            @error="onError"
            @load="onLoad"
            class="image-class van-image__img"
            :lazyLoad="lazyLoad"
            :mode="computed.mode(fit)"
            :showMenuByLongpress="showMenuByLongpress"
            :src="src"
            v-if="!error"
        ></image>
        <view class="loading-class van-image__loading" v-if="loading && showLoading">
            <slot name="loading" v-if="useLoadingSlot"></slot>
            <van-icon customClass="van-image__loading-icon" name="photo" v-else></van-icon>
        </view>
        <view class="error-class van-image__error" v-if="error && showError">
            <slot name="error" v-if="useErrorSlot"></slot>
            <van-icon customClass="van-image__error-icon" name="photo-fail" v-else></van-icon>
        </view>
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

var o = require('./../common/component.js');

var e = require('./../mixins/button.js');

(0, o.VantComponent)({
    mixins: [e.button],
    classes: ['custom-class', 'loading-class', 'error-class', 'image-class'],
    props: {
        src: {
            type: String,
            observer: function () {
                this.setData({
                    error: false,
                    loading: true
                });
            }
        },
        round: Boolean,
        width: null,
        height: null,
        radius: null,
        lazyLoad: Boolean,
        useErrorSlot: Boolean,
        useLoadingSlot: Boolean,
        showMenuByLongpress: Boolean,
        fit: {
            type: String,
            value: 'fill'
        },
        showError: {
            type: Boolean,
            value: true
        },
        showLoading: {
            type: Boolean,
            value: true
        }
    },
    data: {
        error: false,
        loading: true,
        viewStyle: ''
    },
    methods: {
        onLoad: function (o) {
            this.setData({
                loading: false
            });
            this.$emit('load', o.detail);
        },
        onError: function (o) {
            this.setData({
                loading: false,
                error: true
            });
            this.$emit('error', o.detail);
        },
        onClick: function (o) {
            this.$emit('click', o.detail);
        }
    }
});
</script>
<style>
@import './index.css';
</style>
