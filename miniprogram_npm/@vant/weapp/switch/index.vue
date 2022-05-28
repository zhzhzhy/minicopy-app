<template>
    <view
        @tap="onClick"
        :class="utils.bem('switch', { on: checked === activeValue, disabled: disabled }) + ' custom-class'"
        :style="computed.rootStyle({ size: size, checked: checked, activeColor: activeColor, inactiveColor: inactiveColor, activeValue: activeValue })"
    >
        <view class="van-switch__node node-class">
            <van-loading
                :color="computed.loadingColor({ checked: checked, activeColor: activeColor, inactiveColor: inactiveColor, activeValue: activeValue })"
                customClass="van-switch__loading"
                v-if="loading"
            ></van-loading>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
import vanLoading from '../loading/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});
(0, require('./../common/component.js').VantComponent)({
    field: true,
    classes: ['node-class'],
    props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: '30'
        },
        activeValue: {
            type: null,
            value: true
        },
        inactiveValue: {
            type: null,
            value: false
        }
    },
    methods: {
        onClick: function () {
            var e = this.data;
            var i = e.activeValue;
            var t = e.inactiveValue;
            var a = e.disabled;
            var l = e.loading;
            if (!a && !l) {
                var n = this.data.checked === i ? t : i;
                this.$emit('input', n);
                this.$emit('change', n);
            }
        }
    }
});
</script>
<style>
@import './index.css';
</style>
