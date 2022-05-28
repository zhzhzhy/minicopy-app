<template>
    <view :class="'van-collapse-item custom-class ' + (index !== 0 ? 'van-hairline--top' : '')">
        <van-cell
            @click="onClick"
            :border="border && expanded"
            :class="utils.bem('collapse-item__title', { disabled: disabled, expanded: expanded })"
            :clickable="clickable"
            customClass="van-cell"
            hoverClass="van-cell--hover"
            :icon="icon"
            :isLink="isLink"
            :label="label"
            rightIconClass="van-cell__right-icon"
            :title="title"
            titleClass="title-class"
            :value="value"
        >
            <slot name="title" slot="title"></slot>
            <slot name="icon" slot="icon"></slot>
            <slot name="value"></slot>
            <slot name="right-icon" slot="right-icon"></slot>
        </van-cell>
        <view :animation="animation" :class="utils.bem('collapse-item__wrapper')" style="height: 0">
            <view class="van-collapse-item__content content-class">
                <slot></slot>
            </view>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
import vanCell from '../cell/index';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/component.js');

var t = require('./../common/relation.js');

var n = require('././animate.js');

(0, e.VantComponent)({
    classes: ['title-class', 'content-class'],
    relation: (0, t.useParent)('collapse'),
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        isLink: {
            type: Boolean,
            value: true
        }
    },
    data: {
        expanded: false
    },
    mounted: function () {
        this.updateExpanded();
        this.mounted = true;
    },
    methods: {
        updateExpanded: function () {
            if (this.parent) {
                var e = this.parent.data;
                var t = e.value;
                var a = e.accordion;
                var i = this.parent.children;
                var o = void 0 === i ? [] : i;
                var d = this.data.name;
                var l = o.indexOf(this);
                var s = null == d ? l : d;
                var r = a
                    ? t === s
                    : (t || []).some(function (e) {
                          return e === s;
                      });
                if (r !== this.data.expanded) {
                    (0, n.setContentAnimate)(this, r, this.mounted);
                }

                this.setData({
                    index: l,
                    expanded: r
                });
            }
        },
        onClick: function () {
            if (!this.data.disabled) {
                var e = this.data;
                var t = e.name;
                var n = e.expanded;
                var a = this.parent.children.indexOf(this);
                var i = null == t ? a : t;
                this.parent.switch(i, !n);
            }
        }
    }
});
</script>
<style>
@import './index.css';
</style>
