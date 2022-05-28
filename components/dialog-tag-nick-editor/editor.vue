<template>
    <view v-if="show">
        <view @touchmove.stop.prevent="preventTouchMove" class="container-dialog-mask"></view>
        <view class="container-dialog-content" :style="themeMap.base">
            <view class="txt-title" :style="themeMap.title">{{ title }}</view>
            <view class="container-center-input">
                <input
                    @input="onCardNameInput"
                    class="input-dump-name"
                    cursorSpacing="140"
                    :placeholder="placeholder"
                    placeholderClass="phClass"
                    :placeholderStyle="themeMap.placeholder"
                    :style="themeMap.input"
                    :value="value"
                />
            </view>
            <view class="container-bottom-btns" :style="themeMap.btnbase">
                <view @tap="onSaveCancel" class="btn-cancel" :style="themeMap.btncancel">取消</view>
                <view @tap="onSaveDumpClick" class="btn-confirm" :style="themeMap.btnconfirm">确定</view>
            </view>
        </view>
    </view>
</template>

<script>
var t = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    data() {
        return {
            placeholder: '请输入数据名称',

            themeMap: {
                base: '',
                title: '',
                placeholder: '',
                input: '',
                btnbase: '',
                btncancel: '',
                btnconfirm: ''
            }
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'light'
        },
        title: {
            type: String,
            default: '无'
        },
        value: {
            type: String,
            default: ''
        }
    },
    watch: {
        show: {
            handler: function (e) {
                if (e) {
                    this.setData({
                        placeholder: t.createDefaultNick()
                    });
                }
            },

            immediate: true,
            deep: true
        }
    },
    beforeMount: function () {
        var t = {};

        switch (this.theme) {
            case 'light':
                t.base = 'background: #FFFFFF';
                t.title = 'color: #000000; font-weigth';
                t.input = 'color: #333333; border-color: rgba(0, 0, 0, 0.1); caret-color: #F5A200;';
                t.btnbase = 'border-top: 1px solid rgba(0, 0, 0, 0.1);';
                t.btncancel = 'border-right: 1px solid rgba(0, 0, 0, 0.1); color: #000000;';
        }

        this.setData({
            themeMap: t
        });
    },
    methods: {
        onSaveDumpClick: function () {
            var t = this.value;

            if (t.length <= 0) {
                t = this.placeholder;
            }

            this.$emit('confirm', {
                detail: {
                    dumpName: t
                }
            });
        },

        onSaveCancel: function () {
            this.setData({
                value: ''
            });
            this.$emit('cancel');
        },

        onCardNameInput: function (e) {
            if (e.detail.value.length > 12) {
                t.showToast('输入字符不能大于12位');
            } else {
                this.setData({
                    value: e.detail.value
                });
            }
        },

        preventTouchMove() {
            console.log('占位：函数 preventTouchMove 未声明');
        }
    }
};
</script>
<style>
@import './editor.css';
</style>
