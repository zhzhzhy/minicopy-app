<template>
    <view
        @tap="onClick"
        :class="'custom-class ' + utils.bem('cell', [size, { center: center, required: required, borderless: !border, clickable: isLink || clickable }])"
        hoverClass="van-cell--hover hover-class"
        hoverStayTime="70"
        :style="customStyle"
    >
        <van-icon class="van-cell__left-icon-wrap" customClass="van-cell__left-icon" :name="icon" v-if="icon"></van-icon>
        <slot name="icon" v-else></slot>
        <view class="van-cell__title title-class" :style="computed.titleStyle({ titleWidth: titleWidth, titleStyle: titleStyle })">
            <block v-if="title">{{ title }}</block>
            <slot name="title" v-else></slot>
            <view class="van-cell__label label-class" v-if="label || useLabelSlot">
                <slot name="label" v-if="useLabelSlot"></slot>
                <block v-else-if="label">{{ label }}</block>
            </view>
        </view>
        <view class="van-cell__value value-class">
            <block v-if="value || value === 0">{{ value }}</block>
            <slot v-else></slot>
        </view>
        <van-icon
            class="van-cell__right-icon-wrap right-icon-class"
            customClass="van-cell__right-icon"
            :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
            v-if="isLink"
        ></van-icon>
        <slot name="right-icon" v-else></slot>
        <slot name="extra"></slot>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
import vanIcon from '../icon/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../mixins/link.js');

(0, require('./../common/component.js').VantComponent)({
    classes: ['title-class', 'label-class', 'value-class', 'right-icon-class', 'hover-class'],
    mixins: [e.link],
    props: {
        title: null,
        value: null,
        icon: String,
        size: String,
        label: String,
        center: Boolean,
        isLink: Boolean,
        required: Boolean,
        clickable: Boolean,
        titleWidth: String,
        customStyle: String,
        arrowDirection: String,
        useLabelSlot: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        titleStyle: String
    },
    methods: {
        onClick: function (e) {
            this.$emit('click', e.detail);
            this.jumpLink();
        }
    }
});
</script>
<style>
@import './index.css';
</style>
