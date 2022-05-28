<template>
    <view :class="'custom-class ' + utils.bem('goods-action', { safe: safeAreaInsetBottom })">
        <slot></slot>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/component.js');

var o = require('./../common/relation.js');

(0, e.VantComponent)({
    relation: (0, o.useChildren)('goods-action-button', function () {
        this.children.forEach(function (e) {
            e.updateStyle();
        });
    }),
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    }
});
</script>
<style>
@import './index.css';
</style>
