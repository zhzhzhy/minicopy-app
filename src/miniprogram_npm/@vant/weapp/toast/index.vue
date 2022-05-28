<template>
    <view>
        <van-overlay :customStyle="mask ? '' : 'background-color: transparent;'" :show="show" :zIndex="zIndex" v-if="mask || forbidClick"></van-overlay>
        <van-transition customClass="van-toast__container" :customStyle="'z-index: ' + zIndex" :show="show">
            <view @touchmove.stop.prevent="noop" :class="'van-toast van-toast--' + (type === 'text' || type === 'html' ? 'text' : 'icon') + ' van-toast--' + position">
                <text v-if="type === 'text'">{{ message }}</text>
                <rich-text :nodes="message" v-else-if="type === 'html'"></rich-text>
                <block v-else>
                    <van-loading color="white" customClass="van-toast__loading" :type="loadingType" v-if="type === 'loading'"></van-loading>
                    <van-icon class="van-toast__icon" :name="type" v-else></van-icon>
                    <text class="van-toast__text" v-if="message">{{ message }}</text>
                </block>
                <slot></slot>
            </view>
        </van-transition>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';
import vanOverlay from '../overlay/index';
import vanTransition from '../transition/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});
(0, require('./../common/component.js').VantComponent)({
    props: {
        show: Boolean,
        mask: Boolean,
        message: String,
        forbidClick: Boolean,
        zIndex: {
            type: Number,
            value: 1000
        },
        type: {
            type: String,
            value: 'text'
        },
        loadingType: {
            type: String,
            value: 'circular'
        },
        position: {
            type: String,
            value: 'middle'
        }
    },
    methods: {
        noop: function () {}
    }
});
</script>
<style>
@import './index.css';
</style>
