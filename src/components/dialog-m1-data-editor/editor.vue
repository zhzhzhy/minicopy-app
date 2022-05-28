<template>
    <view>
        <van-popup @close="onClose" customStyle="width: 88%; border-radius: 24rpx; background: #1A1D26;margin-top:-100rpx;" duration="100" :show="show">
            <view style="display: flex; flex-direction: column; width: 100%">
                <view style="height: 136rpx; width: 100%; display: flex; align-items: center; justify-content: center">
                    <text class="txt-top-main-title">扇区{{ sector }} | 块{{ block }}{{ mode == 1 ? '(密码区)' : '' }}</text>
                </view>
                <view class="container-center" :style="mode != 0 ? 'display: none;' : ''">
                    <view class="container-input" style="flex: 1; margin-left: 56rpx; height: 118rpx">
                        <textarea
                            @input="onUserInput"
                            class="input-center-data"
                            :disableDefaultPadding="true"
                            maxlength="32"
                            :showConfirmBar="false"
                            type="text"
                            :value="value"
                        ></textarea>
                    </view>
                    <text
                        :class="
                            (hexLength || inputStatus ? 'txt-input-status' : '') +
                            ' ' +
                            (inputStatus == 1 ? 'icon-input-normal' : '') +
                            ' ' +
                            (inputStatus == 2 ? 'icon-input-error' : '')
                        "
                    >
                        {{ hexLength ? hexLength : '' }}
                    </text>
                </view>
                <view class="container-center" :style="'flex-direction: column; ' + (mode != 1 ? 'display: none;' : '')">
                    <view class="container-center" style="margin-top: 16rpx" v-for="(item, index) in trilMode" :key="index">
                        <text class="txt-tril-title">{{ item.title }}</text>

                        <view class="container-input">
                            <input
                                @input="onUserInput"
                                :class="'input-center-data ' + item.style"
                                :data-id="index"
                                :maxlength="item.maxlen"
                                :showConfirmBar="false"
                                type="text"
                                :value="item.value"
                            />
                        </view>

                        <text :class="'txt-input-status ' + (item.status == 1 ? 'icon-input-normal' : '') + ' ' + (item.status == 2 ? 'icon-input-error' : '')">
                            {{ item.length ? item.length : '' }}
                        </text>
                    </view>
                </view>
                <view class="container-bottom">
                    <view @tap="onCancelCallback" class="btn-bottom-item btn-bottom-cancel" hoverClass="btn-bottom-hover" hoverStartTime="10" hoverStayTime="100">取消</view>
                    <view class="btn-bottom-item-split-vertical"></view>
                    <view
                        @tap="onConfirmCallback"
                        :class="'btn-bottom-item btn-bottom-confirm ' + (inputStatus != 1 ? 'btn-bottom-confirm-disabled: ' : '')"
                        :hoverClass="inputStatus == 1 ? 'btn-bottom-hover' : ''"
                        hoverStartTime="10"
                        hoverStayTime="100"
                    >
                        确认修改
                    </view>
                </view>
            </view>
        </van-popup>
    </view>
</template>

<script>
import vanPopup from '../../miniprogram_npm/@vant/weapp/popup/index';
export default {
    components: {
        vanPopup
    },
    data() {
        return {
            inputStatus: 0,
            hexLength: 32,
            trilMode: {
                keya: {
                    title: 'A密码',
                    value: '',
                    length: 0,
                    status: 0,
                    maxlen: 12,
                    style: 'mifare-data-block-trail-keya'
                },
                tril: {
                    title: '控制位',
                    value: '',
                    length: 0,
                    status: 0,
                    maxlen: 8,
                    style: 'mifare-data-block-trail-ctl'
                },
                keyb: {
                    title: 'B密码',
                    value: '',
                    length: 0,
                    status: 0,
                    maxlen: 12,
                    style: 'mifare-data-block-trail-keyb'
                }
            }
        };
    },
    props: {
        sector: {
            type: Number,
            default: 0
        },
        block: {
            type: Number,
            default: 0
        },
        show: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        mode: {
            type: Number,
            default: 0
        }
    },
    watch: {
        show: {
            handler: function (t) {
                if (t) {
                    if (0 == this.mode) {
                        this.updateMode0InputStatus();
                    }

                    if (1 == this.mode) {
                        this.trilMode.keya.value = this.value.substr(0, 12);
                        this.trilMode.tril.value = this.value.substr(12, 8);
                        this.trilMode.keyb.value = this.value.substr(20, 12);
                        this.updateMode1InputStatus();
                    }
                }
            },

            immediate: true,
            deep: true
        }
    },
    methods: {
        updateMode0InputStatus: function () {
            var t = null;
            var a = 0;
            if (32 == this.value.length) {
                if (/^[a-fA-F0-9]{32}$/.test(this.value)) {
                    a = 1;
                } else {
                    a = 2;
                }
            } else {
                if (/^[a-fA-F0-9]+$/.test(this.value)) {
                    t = this.value.length;
                } else {
                    a = 2;
                }
            }

            this.setData({
                hexLength: t,
                inputStatus: a
            });
        },
        updateMode1InputStatus: function () {
            var t = 1;
            var that = this;
            Object.keys(that.trilMode).forEach(function (e) {
                var l = that.trilMode[e];
                var s = null;
                var n = 0;
                if (l.value.length == l.maxlen) {
                    if (RegExp('^[a-fA-F0-9]{'.concat(l.maxlen, '}$')).test(l.value)) {
                        n = 1;
                    } else {
                        n = 2;
                    }
                } else {
                    if (/^[a-fA-F0-9]+$/.test(l.value)) {
                        s = l.value.length;
                    } else {
                        n = 2;
                    }
                }

                l.length = s;
                l.status = n;

                if (1 != n) {
                    t = 2;
                }
            });
            that.setData({
                trilMode: that.trilMode,
                inputStatus: t
            });
        },
        onUserInput: function (t) {
            var that = this;
            var e = t.detail.value;
            if (0 == this.mode) {
                if (e.length > 32) {
                    e = e.substr(0, 32);
                    console.log('len = '.concat(e.length, ' val = ').concat(e));
                }

                this.setData(
                    {
                        value: e
                    },
                    function () {
                        return that.updateMode0InputStatus();
                    }
                );
            }

            if (1 == this.mode) {
                var l = t.currentTarget.dataset.id;
                var s = this.trilMode[l];
                if (e.length > s.maxlen) {
                    e = e.substr(0, s.maxlen);
                    console.log('len = '.concat(e.length, ' val = ').concat(e));
                }

                s.value = e;
                this.setData(
                    {
                        trilMode: this.trilMode
                    },
                    function () {
                        return that.updateMode1InputStatus();
                    }
                );
            }
        },
        onClose: function () {
            this.$emit('close');
        },
        onCancelCallback: function () {
            this.$emit('cancel');
        },
        showToast: function (t) {
            uni.showToast({
                icon: 'none',
                title: t
            });
        },
        onConfirmCallback: function () {
            var t;

            if (1 == this.inputStatus) {
                if (1 == this.mode) {
                    t = ''.concat(this.trilMode.keya.value).concat(this.trilMode.tril.value).concat(this.trilMode.keyb.value);
                } else {
                    t = this.value;
                }

                console.log('最终数据: ' + t);
                this.$emit('confirm', {
                    detail: {
                        sector: this.sector,
                        block: this.block,
                        data: t
                    }
                });
            }
        }
    }
};
</script>
<style>
@import './editor.css';
</style>
