<template>
    <view>
        <van-overlay @click="onClickOverlay" :customStyle="overlayStyle" :duration="duration" :lockScroll="lockScroll" :show="show" :zIndex="zIndex" v-if="overlay"></van-overlay>
        <view
            @transitionend="onTransitionEnd"
            :class="'custom-class ' + classes + ' ' + utils.bem('popup', [position, { round: round, safe: safeAreaInsetBottom, safeTop: safeAreaInsetTop }])"
            :style="computed.popupStyle({ zIndex: zIndex, currentDuration: currentDuration, display: display, customStyle: customStyle })"
            v-if="inited"
        >
            <slot></slot>
            <van-icon
                @tap.native="onClickCloseIcon"
                :class="'close-icon-class van-popup__close-icon van-popup__close-icon--' + closeIconPosition"
                :name="closeIcon"
                v-if="closeable"
            ></van-icon>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
import vanIcon from '../icon/index';
import vanOverlay from '../overlay/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/component.js');

var o = require('./../mixins/transition.js');

(0, e.VantComponent)({
    classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class', 'close-icon-class'],
    mixins: [(0, o.transition)(false)],
    props: {
        round: Boolean,
        closeable: Boolean,
        customStyle: String,
        overlayStyle: String,
        transition: {
            type: String,
            observer: 'observeClass'
        },
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeIcon: {
            type: String,
            value: 'cross'
        },
        closeIconPosition: {
            type: String,
            value: 'top-right'
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        position: {
            type: String,
            value: 'center',
            observer: 'observeClass'
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: false
        },
        lockScroll: {
            type: Boolean,
            value: true
        }
    },
    created: function () {
        this.observeClass();
    },
    methods: {
        onClickCloseIcon: function () {
            this.$emit('close');
        },
        onClickOverlay: function () {
            this.$emit('click-overlay');

            if (this.data.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
        observeClass: function () {
            var e = this.data;
            var o = e.transition;
            var t = e.position;
            var s = e.duration;
            var n = {
                name: o || t
            };
            if ('none' === o) {
                n.duration = 0;
                this.originDuration = s;
            } else {
                if (null != this.originDuration) {
                    n.duration = this.originDuration;
                }
            }

            this.setData(n);
        }
    }
});
</script>
<style>
@import './index.css';
</style>
