<template>
    <view>
        <van-transition
            @tap.native="onClick"
            @touchmove.native.stop.prevent="noop"
            customClass="van-overlay"
            :customStyle="'z-index: ' + zIndex + '; ' + customStyle"
            :duration="duration"
            :show="show"
            v-if="lockScroll"
        >
            <slot></slot>
        </van-transition>
        <van-transition @tap.native="onClick" customClass="van-overlay" :customStyle="'z-index: ' + zIndex + '; ' + customStyle" :duration="duration" :show="show" v-else>
            <slot></slot>
        </van-transition>
    </view>
</template>

<script>
import vanTransition from '../transition/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});
(0, require('./../common/component.js').VantComponent)({
    props: {
        show: Boolean,
        customStyle: String,
        duration: {
            type: null,
            value: 300
        },
        zIndex: {
            type: Number,
            value: 1
        },
        lockScroll: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        },
        noop: function () {}
    }
});
</script>
<style>
@import './index.css';
</style>
