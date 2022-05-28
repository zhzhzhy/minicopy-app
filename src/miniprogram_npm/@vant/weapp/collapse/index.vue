<template>
    <view :class="'custom-class van-collapse ' + (border ? 'van-hairline--top-bottom' : '')">
        <slot></slot>
    </view>
</template>

<script>
Object.defineProperty(exports, '__esModule', {
    value: true
});

var e = require('./../common/component.js');

var t = require('./../common/relation.js');

(0, e.VantComponent)({
    relation: (0, t.useChildren)('collapse-item'),
    props: {
        value: {
            type: null,
            observer: 'updateExpanded'
        },
        accordion: {
            type: Boolean,
            observer: 'updateExpanded'
        },
        border: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        updateExpanded: function () {
            this.children.forEach(function (e) {
                e.updateExpanded();
            });
        },
        switch: function (e, t) {
            var o = this.data;
            var n = o.accordion;
            var i = o.value;
            var a = e;
            if (n) {
                if (t) {
                    e = e;
                } else {
                    e = '';
                }
            } else {
                if (t) {
                    e = (i || []).concat(e);
                } else {
                    e = (i || []).filter(function (t) {
                        return t !== e;
                    });
                }
            }

            if (t) {
                this.$emit('open', a);
            } else {
                this.$emit('close', a);
            }

            this.$emit('change', e);
            this.$emit('input', e);
        }
    }
});
</script>
<style>
@import './index.css';
</style>
