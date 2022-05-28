<template>
    <view v-if="showDailog">
        <view class="commodity_screen"></view>
        <view class="commodity_attr_box">
            <view class="van_action_left_title">添加卡片</view>
            <view class="van_action_close">
                <icon @tap="close" class="close"></icon>
            </view>
            <view class="btnTabBlock">
                <view class="van_action_left_text1">卡片类型</view>
                <view @tap="model" :class="modelBackground == 'IC' ? 'btnTab' : 'NoBtnTab'" :data-id="1" style="margin-left: 45%">IC卡</view>
                <view @tap="model" :class="modelBackground == 'ID' ? 'btnTab' : 'NoBtnTab'" :data-id="2">ID卡</view>
            </view>
            <view class="inputBlock">
                <view class="van_action_left_text1">卡片名称</view>
                <view class="btnTabInputBlock">
                    <input @input="btnTabInput" class="btnTabInput" maxlength="12" placeholder="请输入卡片名称" placeholderClass="placeholderClass" type="text" value="" />
                </view>
            </view>
            <view class="doubleBtn">
                <view class="leftBtn">
                    <button @tap="cancel" class="bottomBtnCancel">取消</button>
                </view>
                <view class="rightBtn">
                    <button @tap="confirm" class="bottomBtnConfirm">确定</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import vanActionSheet from '../../miniprogram_npm/@vant/weapp/action-sheet/index';
require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanActionSheet
    },
    data() {
        return {
            modelBackground: 'IC',
            cardName: ''
        };
    },
    props: {
        showDailog: {
            type: Boolean,
            default: 'false'
        }
    },
    methods: {
        close: function () {
            this.setData({
                showDailog: false
            });
        },
        cancel: function () {
            this.$emit('cancel');
        },
        confirm: function () {
            console.log('111' + this.modelBackground);
            var t = {
                type: this.modelBackground,
                cardName: this.cardName
            };
            this.$emit('confirm', {
                detail: t
            });
        },
        model: function (t) {
            var a = t.currentTarget.dataset.id;

            if (1 == a) {
                this.setData({
                    modelBackground: 'IC'
                });
            } else {
                if (2 == a) {
                    this.setData({
                        modelBackground: 'ID'
                    });
                }
            }
        },
        btnTabInput: function (t) {
            this.setData({
                cardName: t.detail.value
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
