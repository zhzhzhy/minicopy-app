<template>
    <view>
        <van-cell
            :arrowDirection="arrowDirection"
            :border="border"
            :center="center"
            :clickable="clickable"
            customClass="van-field"
            :customStyle="customStyle"
            :icon="leftIcon"
            :isLink="isLink"
            :required="required"
            :size="size"
            titleStyle="margin-right: 12px;"
            :titleWidth="titleWidth"
        >
            <slot name="left-icon" slot="icon"></slot>
            <view :class="'label-class ' + utils.bem('field__label', { disabled: disabled })" slot="title" v-if="label">{{ label }}</view>
            <slot name="label" slot="title" v-else></slot>
            <view :class="utils.bem('field__body', [type])">
                <view @tap="onClickInput" :class="utils.bem('field__control', [inputAlign, 'custom'])">
                    <slot name="input"></slot>
                </view>
                <!-- parse <include src="./textarea.wxml" v-if="type==='textarea'"></include> -->
                <textarea
                    :adjustPosition="adjustPosition"
                    :autoFocus="autoFocus"
                    :autoHeight="!!autosize"
                    @blur="onBlur"
                    @confirm="onConfirm"
                    @focus="onFocus"
                    @input="onInput"
                    @keyboardheightchange="onKeyboardHeightChange"
                    @linechange="onLineChange"
                    @tap="onClickInput"
                    :class="utils.bem('field__control', [inputAlign, type, { disabled: disabled, error: error }]) + ' input-class'"
                    :cursor="cursor"
                    :cursorSpacing="cursorSpacing"
                    :disableDefaultPadding="disableDefaultPadding"
                    :disabled="disabled || readonly"
                    :fixed="fixed"
                    :focus="focus"
                    :holdKeyboard="holdKeyboard"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    :placeholderClass="utils.bem('field__placeholder', { error: error, disabled: disabled })"
                    :placeholderStyle="placeholderStyle"
                    :selectionEnd="selectionEnd"
                    :selectionStart="selectionStart"
                    :showConfirmBar="showConfirmBar"
                    :style="computed.inputStyle(autosize)"
                    :value="innerValue"
                ></textarea>

                <!-- parse <include src="./input.wxml" v-else></include> -->
                <input
                    :adjustPosition="adjustPosition"
                    :alwaysEmbed="alwaysEmbed"
                    :autoFocus="autoFocus"
                    @blur="onBlur"
                    @confirm="onConfirm"
                    @focus="onFocus"
                    @input="onInput"
                    @keyboardheightchange="onKeyboardHeightChange"
                    @tap="onClickInput"
                    :class="utils.bem('field__control', [inputAlign, { disabled: disabled, error: error }]) + ' input-class'"
                    :confirmHold="confirmHold"
                    :confirmType="confirmType"
                    :cursor="cursor"
                    :cursorSpacing="cursorSpacing"
                    :disabled="disabled || readonly"
                    :focus="focus"
                    :holdKeyboard="holdKeyboard"
                    :maxlength="maxlength"
                    :password="password || type === 'password'"
                    :placeholder="placeholder"
                    :placeholderClass="utils.bem('field__placeholder', { error: error })"
                    :placeholderStyle="placeholderStyle"
                    :selectionEnd="selectionEnd"
                    :selectionStart="selectionStart"
                    :type="type"
                    :value="innerValue"
                />

                <van-icon @touchstart.native.stop.prevent="onClear" class="van-field__clear-root van-field__icon-root" :name="clearIcon" v-if="showClear"></van-icon>
                <view @tap="onClickIcon" class="van-field__icon-container">
                    <van-icon :class="'van-field__icon-root ' + iconClass" customClass="right-icon-class" :name="rightIcon || icon" v-if="rightIcon || icon"></van-icon>
                    <slot name="right-icon"></slot>
                    <slot name="icon"></slot>
                </view>
                <view class="van-field__button">
                    <slot name="button"></slot>
                </view>
            </view>
            <view class="van-field__word-limit" v-if="showWordLimit && maxlength">
                <view :class="utils.bem('field__word-num', { full: value.length >= maxlength })">{{ value.length >= maxlength ? maxlength : value.length }}</view>
                /{{ maxlength }}
            </view>
            <view :class="utils.bem('field__error-message', [errorMessageAlign, { disabled: disabled, error: error }])" v-if="errorMessage">{{ errorMessage }}</view>
        </van-cell>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
import vanCell from '../cell/index';
import vanIcon from '../icon/index';
var e = function () {
    return (e =
        Object.assign ||
        function (e) {
            for (var t, i = 1, n = arguments.length; i < n; i++) {
                for (var a in (t = arguments[i])) {
                    if (Object.prototype.hasOwnProperty.call(t, a)) {
                        e[a] = t[a];
                    }
                }
            }

            return e;
        }).apply(this, arguments);
};

Object.defineProperty(exports, '__esModule', {
    value: true
});

var t = require('./../common/utils.js');

var i = require('./../common/component.js');

var n = require('././props.js');

(0, i.VantComponent)({
    field: true,
    classes: ['input-class', 'right-icon-class', 'label-class'],
    props: e(e(e(e({}, n.commonProps), n.inputProps), n.textareaProps), {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        autosize: null,
        required: Boolean,
        iconClass: String,
        clickable: Boolean,
        inputAlign: String,
        customStyle: String,
        errorMessage: String,
        arrowDirection: String,
        showWordLimit: Boolean,
        errorMessageAlign: String,
        readonly: {
            type: Boolean,
            observer: 'setShowClear'
        },
        clearable: {
            type: Boolean,
            observer: 'setShowClear'
        },
        clearTrigger: {
            type: String,
            value: 'focus'
        },
        border: {
            type: Boolean,
            value: true
        },
        titleWidth: {
            type: String,
            value: '6.2em'
        },
        clearIcon: {
            type: String,
            value: 'clear'
        }
    }),
    data: {
        focused: false,
        innerValue: '',
        showClear: false
    },
    created: function () {
        this.value = this.data.value;
        this.setData({
            innerValue: this.value
        });
    },
    methods: {
        onInput: function (e) {
            var t = (e.detail || {}).value;
            var i = void 0 === t ? '' : t;
            this.value = i;
            this.setShowClear();
            this.emitChange();
        },
        onFocus: function (e) {
            this.focused = true;
            this.setShowClear();
            this.$emit('focus', e.detail);
        },
        onBlur: function (e) {
            this.focused = false;
            this.setShowClear();
            this.$emit('blur', e.detail);
        },
        onClickIcon: function () {
            this.$emit('click-icon');
        },
        onClickInput: function (e) {
            this.$emit('click-input', e.detail);
        },
        onClear: function () {
            var that = this;
            this.setData({
                innerValue: ''
            });
            this.value = '';
            this.setShowClear();
            (0, t.nextTick)(function () {
                that.emitChange();
                that.$emit('clear', '');
            });
        },
        onConfirm: function (e) {
            var t = (e.detail || {}).value;
            var i = void 0 === t ? '' : t;
            this.value = i;
            this.setShowClear();
            this.$emit('confirm', i);
        },
        setValue: function (e) {
            this.value = e;
            this.setShowClear();

            if ('' === e) {
                this.setData({
                    innerValue: ''
                });
            }

            this.emitChange();
        },
        onLineChange: function (e) {
            this.$emit('linechange', e.detail);
        },
        onKeyboardHeightChange: function (e) {
            this.$emit('keyboardheightchange', e.detail);
        },
        emitChange: function () {
            var that = this;
            this.setData({
                value: this.value
            });
            (0, t.nextTick)(function () {
                that.$emit('input', that.value);
                that.$emit('change', that.value);
            });
        },
        setShowClear: function () {
            var e = this.data;
            var t = e.clearable;
            var i = e.readonly;
            var n = e.clearTrigger;
            var a = this.focused;
            var o = this.value;
            var r = false;
            if (t && !i) {
                r = !!o && ('always' === n || ('focus' === n && a));
            }

            this.setData({
                showClear: r
            });
        },
        noop: function () {}
    }
});
</script>
<style>
@import './index.css';
</style>
