<template>
    <view>
        <van-popup closeable round @close="onUserClose" closeIcon="/static/img/close.svg" customStyle="background: #1A1D26;" duration="100" position="bottom" :show="show">
            <view class="container-dialog-main">
                <view class="container-dialog-title">
                    <text class="txt-title">修改0区卡号</text>
                </view>
                <view class="container-opera-main">
                    <view class="container-opera-item">
                        <view class="container-opera-title">
                            <text>模式</text>
                        </view>
                        <view class="container-opera-detail">
                            <view
                                @tap="onTabClick"
                                :class="'btn-tab-switch-base ' + (modeSelected == index ? 'btn-tab-switch-is-selected' : 'btn-tab-switch-no-selected')"
                                :data-id="index"
                                v-for="(item, index) in modeList"
                                :key="index"
                            >
                                <text>{{ item }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="container-opera-item" v-for="(item, index) in inputList" :key="index">
                        <view class="container-opera-title">
                            <text>{{ item.title }}</text>
                        </view>

                        <view class="container-opera-detail">
                            <view class="container-tag-uid-size" v-if="item.size">
                                <text>{{ item.size }} BYTE</text>
                            </view>
                            <view class="container-input-item">
                                <input @input="onUserInput" class="input-item-style" :data-id="item.index" :maxlength="item.maxlength" type="text" :value="item.value" />
                            </view>
                        </view>
                    </view>
                </view>
                <view class="explainBlock">
                    <view class="explain">说明</view>
                    <view class="bottomExplainText">
                        <text>
                            可使用本功能创建想要的0区0块，将对应的0区0块写入到对应的 卡数据内，以达到更改ATQA SAK等数值要求。
                            一般情况下不需要用户更改SAK或者ATQA，仅限读卡器检测卡片 类型时才需要使用，错误的更改可能导致不认卡。
                        </text>
                    </view>
                </view>
                <view class="doubleBtn">
                    <view class="leftBtn">
                        <button @tap="onUserCancel" class="bottomBtnCancel">取消</button>
                    </view>
                    <view class="rightBtn">
                        <button @tap="onUserConfirm" class="bottomBtnConfirm">确认修改</button>
                    </view>
                </view>
            </view>
        </van-popup>
    </view>
</template>

<script>
import vanPopup from '../../miniprogram_npm/@vant/weapp/popup/index';
var t = require('../../4F97F14255C842DF29F19945DB418C74.js');

export default {
    components: {
        vanPopup
    },
    data() {
        return {
            modeList: ['Mifare1卡', 'DESfire卡', 'JCOP兼容M1卡'],
            modeSelected: 0,
            inputList: {
                uid: {
                    title: 'UID',
                    value: '',
                    size: 4,
                    maxlength: 8,
                    index: 0
                },
                atqa: {
                    title: 'ATQA',
                    value: '',
                    maxlength: 4,
                    index: 1
                },
                sak: {
                    title: 'SAK',
                    value: '',
                    maxlength: 2,
                    index: 2
                },
                manufacturer: {
                    title: '厂商',
                    value: '',
                    maxlength: 16,
                    index: 3
                }
            }
        };
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 4
        }
    },
    watch: {
        show: {
            handler: function (t) {
                if (t) {
                    console.log('监听到修改框弹出，将会自动进行以下数据的解析，以获得详细的信息: ' + this.value);
                    this.inputList.uid.value = this.value.substr(0, 8);
                    this.inputList.sak.value = this.value.substr(10, 2);
                    this.inputList.atqa.value = this.value.substr(12, 4);
                    this.inputList.manufacturer.value = this.value.substr(16, 16);
                    this.setData({
                        inputList: this.inputList
                    });
                }
            },

            immediate: true,
            deep: true
        },
        size: {
            handler: function (t) {
                this.inputList.uid.size = t;
                this.setData({
                    inputList: this.inputList
                });
            },

            immediate: true,
            deep: true
        }
    },
    methods: {
        onTabClick: function (t) {
            var a;
            var i;
            var e = t.currentTarget.dataset.id;
            switch (e) {
                case 0:
                    a = '0400';
                    i = '08';
                    break;

                case 1:
                    a = '0800';
                    i = '20';
                    break;

                case 2:
                    a = '0400';
                    i = '28';
            }

            this.inputList.atqa.value = a;
            this.inputList.sak.value = i;
            this.setData({
                modeSelected: e,
                inputList: this.inputList
            });
        },
        onUserInput: function (t) {
            var that = this;
            var i = t.currentTarget.dataset.id;
            var e = t.detail.value;
            Object.keys(that.inputList).forEach(function (t) {
                var s = that.inputList[t];

                if (s.index == i) {
                    s.value = e;
                }
            });
            that.setData({
                inputList: that.inputList
            });
        },
        onUserClose: function () {
            this.$emit('close');
        },
        onUserCancel: function () {
            this.$emit('cancel');
        },
        isInputOk: function (t) {
            var a = t.value;
            var i = t.maxlength;
            return RegExp('^[a-fA-F0-9]{'.concat(i, '}$')).test(a);
        },
        onUserConfirm: function () {
            for (var a = Object.keys(this.inputList), i = 0; i < a.length; i++) {
                var e = this.inputList[a[i]];

                if (!this.isInputOk(e)) {
                    return void uni.showToast({
                        icon: 'none',
                        title: ''.concat(e.title, '输入异常！')
                    });
                }
            }

            var s = t.hex2bytes(this.inputList.uid.value);
            var n = s[0] ^ s[1] ^ s[2] ^ s[3];
            var u = this.inputList.uid.value;
            var r = t.bytes2hex([n]);
            var c = this.inputList.sak.value;
            var d = this.inputList.atqa.value;
            var l = this.inputList.manufacturer.value;
            var o = ''.concat(u).concat(r).concat(c).concat(d).concat(l);
            this.$emit('confirm', {
                detail: {
                    data: o,
                    uid: u,
                    bcc: r,
                    sak: c,
                    atqa: d,
                    manufacturer: l
                }
            });
        }
    }
};
</script>
<style>
@import './editor.css';
</style>
