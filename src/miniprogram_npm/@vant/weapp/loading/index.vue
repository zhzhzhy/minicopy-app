<template>
    <view :class="'custom-class ' + utils.bem('loading', { vertical: vertical })">
        <view :class="'van-loading__spinner van-loading__spinner--' + type" :style="computed.spinnerStyle({ color: color, size: size })">
            <view class="van-loading__dot" v-if="type === 'spinner'" v-for="(item, index) in array12" :key="index"></view>
        </view>
        <view class="van-loading__text" :style="computed.textStyle({ textSize: textSize })">
            <slot></slot>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
Object.defineProperty(exports, '__esModule', {
    value: true
});
(0, require('./../common/component.js').VantComponent)({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: 'circular'
        },
        size: String,
        textSize: String
    },
    data: {
        array12: Array.from({
            length: 12
        })
    }
});
</script>
<style>
@import './index.css';
</style>
