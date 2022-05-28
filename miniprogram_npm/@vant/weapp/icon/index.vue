<template>
    <view @tap="onClick" :class="computed.rootClass({ classPrefix: classPrefix, name: name })" :style="computed.rootStyle({ customStyle: customStyle, color: color, size: size })">
        <van-info customClass="van-icon__info" :dot="dot" :info="info" v-if="info !== null || dot"></van-info>
        <image class="van-icon__image" mode="aspectFit" :src="name" v-if="computed.isImage(name)"></image>
    </view>
</template>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
import vanInfo from '../info/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});
(0, require('./../common/component.js').VantComponent)({
    props: {
        dot: Boolean,
        info: null,
        size: null,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        },
        name: String
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        }
    }
});
</script>
<style>
@import './index.css';
</style>
