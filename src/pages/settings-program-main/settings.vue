<template>
    <view>
        <view class="autoSave">
            <view class="blockText">卡片数据自动保存</view>
            <view class="autoSaveSwitch">
                <van-switch activeColor="#08c264" @change="onChange" :checked="autoSave" title=""></van-switch>
            </view>
        </view>
        <view @tap="sheetShow" class="saveLocation">
            <view class="blockText">卡片数据保存位置</view>
            <view class="arrowBlock">
                本地
                <icon class="rightArrow"></icon>
            </view>
        </view>
        <view @tap="unbound" class="saveLocation" style="margin-top: 14rpx">
            <view class="blockText">读卡器与账号解绑</view>
            <view class="arrowBlock">
                <icon class="rightArrow"></icon>
            </view>
        </view>
        <view @tap="firmwareUpdate" class="saveLocation" style="margin-top: 14rpx">
            <view class="blockText">固件更新</view>
            <view class="arrowBlock">
                <icon class="rightArrow"></icon>
            </view>
        </view>
        <van-action-sheet :actions="actions" :round="false" :show="show">
            <view class="sheet_title">
                <text>卡片数据保存位置</text>
            </view>
            <view @tap="getradio" :data-id="index" v-for="(item, index) in sheet" :key="index">
                <view class="location">{{ item.text }}</view>
            </view>
            <view class="emptyBlock"></view>
            <view @tap="cancel" class="cancel">
                <text>取消</text>
            </view>
        </van-action-sheet>
    </view>
</template>

<script>
import vanSwitch from '../../miniprogram_npm/@vant/weapp/switch/index';
import vanCell from '../../miniprogram_npm/@vant/weapp/cell/index';
import vanActionSheet from '../../miniprogram_npm/@vant/weapp/action-sheet/index';
var e = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

var t = require('../../3E90FCB755C842DF58F694B049818C74.js');

require('../../4F97F14255C842DF29F19945DB418C74.js');

export default {
    components: {
        vanSwitch,
        vanCell,
        vanActionSheet
    },
    data() {
        return {
            autoSave: false,
            show: false,

            sheet: [
                {
                    text: '本地',
                    checked: false
                },
                {
                    text: '云端',
                    checked: false
                }
            ],

            phone: '',
            actions: []
        };
    },
    onLoad: function (e) {},
    onReady: function () {},
    onShow: function () {
        e.judgePhoneNumber(this);
        var a = t.getStorageSyncHasDefault('autoSave', {});
        this.setData({
            autoSave: a
        });
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        firmwareUpdate: function () {
            e.showToast('正在开发中');
        },

        unbound: function () {
            if (this.phone) {
                uni.navigateTo({
                    url: '/pages/settings-device-unbind/unbind'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/user-login-onekey/login'
                });
            }
        },

        sheetShow: function () {
            e.showToast('正在开发中');
        },

        cancel: function () {
            this.setData({
                show: false
            });
        },

        getradio: function (e) {
            for (var t = e.currentTarget.dataset.id, a = this.sheet, o = 0; o < a.length; o++) {
                this.sheet[o].checked = false;
            }

            this.sheet[t].checked = true;
            this.setData({
                sheet: this.sheet
            });
            for (var n = -1, s = 0; s < a.length; s++) {
                if (a[s].checked) {
                    n = s;
                    break;
                }
            }

            if (-1 == n) {
                console.log('啥都没选');
            } else {
                console.log('需要传的值是: ' + n);
            }
        },

        onChange: function (a) {
            var that = this;
            return (function (a) {
                if (0 == a) {
                    var n = t.getStorageSyncHasDefault('autoSave', {});
                    console.log('autosave是' + n);

                    if (1 == n) {
                        a = false;
                        uni.setStorageSync('autoSave', a);
                        that.setData({
                            autoSave: false
                        });
                    }

                    e.showToast('自动保存已关闭');
                } else {
                    a = true;
                    uni.setStorageSync('autoSave', a);
                    that.setData({
                        autoSave: true
                    });
                    e.showToast('自动保存已开启');
                }
            })(a.detail);
        }
    }
};
</script>
<style>
@import './settings.css';
</style>
