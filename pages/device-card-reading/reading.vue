<template>
    <view style="background: white; height: 100%">
        <view>
            <devicebar></devicebar>
        </view>
        <block v-if="pageStatus == 0">
            <view class="content">
                <view :class="vipNum ? 'header_view_hide' : 'header_view_show'">
                    <view style="width: 323.5714rpx; height: 496rpx; margin: 0 auto">
                        <view style="width: 323.5714rpx; height: 450rpx; text-align: center; float: left; position: absolute">
                            <image src="/static/static/img/cardReader.png" style="width: 323.5714rpx; height: 450rpx"></image>
                        </view>
                        <view class="animation">
                            <view class="box2"></view>
                            <view class="box3"></view>
                        </view>
                    </view>
                </view>
                <view class="search">准备读卡</view>
                <view class="tipsText">
                    <text>请确保卡片或钥匙扣稳定贴于读卡器</text>
                </view>
            </view>
            <view>
                <problem-help></problem-help>
            </view>
        </block>
        <block v-if="pageStatus == 1">
            <view class="progress">
                <view class="progress-bar-box">
                    <view class="progress-bar-in" :style="'width:' + (progress + '%') + ';'">
                        <image src="/static/static/img/writeCardLogo.svg" style="width: 22%; height: 22%; padding: 20rpx"></image>
                    </view>
                </view>
            </view>
            <view class="cardReadText">
                <view class="readCardTime" v-if="decryptShow == false">
                    <view style="width: 520rpx; margin: 0 auto; height: 50rpx">
                        <view style="float: left">正在读卡</view>
                        <view style="float: left; width: 100rpx; text-align: left">{{ progress }}%</view>
                        <view style="float: left">
                            <text v-if="decryptShow == false">...大约需要3秒</text>
                        </view>
                    </view>
                </view>
                <view class="readCardTime" v-if="decryptShow == true">
                    <view style="width: 250rpx; height: 50rpx; margin: 0 auto">
                        <view style="float: left">正在读卡</view>
                        <view style="float: left">{{ progress }}%</view>
                    </view>
                </view>
                <view class="remain" v-if="decryptShow == true">
                    <view class="remainBlock">
                        <text>读卡期间请勿移动卡片</text>
                    </view>
                    <view style="width: 100%; height: 50rpx">
                        <view style="margin: 0 auto; width: 64%; height: 50rpx">
                            <view style="float: left; line-height: 50rpx; width: 55rpx; margin-left: 4.5%">正在</view>
                            <view style="float: left; line-height: 50rpx; width: 130rpx; margin-left: 0rpx; height: 50rpx; text-align: left">{{ decrypt }}</view>
                            <view style="float: left; line-height: 50rpx; width: 70rpx; height: 50rpx">{{ step }}/{{ max }}</view>
                            <view style="float: left; line-height: 50rpx; text-align: left">大约需要</view>
                            <view style="float: left; line-height: 50rpx; width: 100rpx; margin-left: 0rpx; text-align: left">{{ time_msg }}秒</view>
                        </view>
                    </view>
                </view>
            </view>
        </block>
        <block v-if="pageStatus == 2">
            <view class="content">
                <view style="margin-top: 132rpx">
                    <view>
                        <icon class="fail"></icon>
                    </view>
                    <view class="success">读卡成功</view>
                    <view class="successCardNumber">卡号：{{ uid_hex }}</view>
                </view>
            </view>
            <view class="doubleBtn">
                <view class="leftBtn">
                    <button @tap="onSaveDumpToCardWallet" :class="dumpSaved ? 'prohibit' : 'noProhibit'">保存到卡包</button>
                </view>
                <view class="rightBtn">
                    <button
                        @tap="gotoWriteCard"
                        style="width: 100%; font-size: 30rpx; border-radius: 20px 20px 20px 20px; padding: 3rpx 0rpx 3rpx 0rpx; background: #f5a200; color: #fff; font-weight: 500"
                    >
                        前往写卡
                    </button>
                </view>
            </view>
        </block>
        <backitp @back="onUserBack" :canback="canExit"></backitp>
        <save-data @cancel="onUserCancelDumpSave" @confirm="onUserConfirmDumpSave" :show="showDumpSaveDialog" theme="light" title="保存数据"></save-data>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import vanPopup from '../../miniprogram_npm/@vant/weapp/popup/index';
import vanCell from '../../miniprogram_npm/@vant/weapp/cell/index';
import vanImage from '../../miniprogram_npm/@vant/weapp/image/index';
import problemHelp from '../../components/problem-help/problem-help';
import backitp from '@/components/back-intercept/back';
import devicebar from '@/components/device-tab-bar/device';
import saveData from '../../components/dialog-tag-nick-editor/editor';
var a = require('../../4F97F14255C842DF29F19945DB418C74.js');

var t = require('../../3E90FCB755C842DF58F694B049818C74.js');

var e = require('../../8473358655C842DFE2155D813E918C74.js');

var o = require('../../D5AF71D355C842DFB3C919D452918C74.js');

var i = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

var n = {
    0: '寻卡',
    1: '读卡',
    2: '读卡完成'
};
export default {
    components: {
        vanButton,
        vanPopup,
        vanCell,
        vanImage,
        problemHelp,
        backitp,
        devicebar,
        saveData
    },
    data() {
        return {
            pageStatus: 0,
            showReadProgress: false,
            progress: 0,
            dumpSaved: false,
            canExit: false,
            showDumpSaveDialog: false,
            dumpName: '',
            uid_hex: '',
            decrypt: '',
            step: '',
            max: '',
            decryptShow: false,
            time_msg: '',
            vipNum: false
        };
    },
    onLoad: function (t) {
        o.registerOnAttackKeysCbk(this.onTagAttackCallback);
        a.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback);
        e.onTagErrorCallback(this.onTagErrorCallback);
        a.onComErrCallback(this.onBleComErrorCallback);
        a.onTimeoutCallback(this.onBleComTimeoutCallback);
    },
    onUnload: function () {
        o.unregisterOnAttackKeysCbk(this.onTagAttackCallback);
        a.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback);
        e.onTagErrorCallback(null);
        a.onComErrCallback(null);
        a.onTimeoutCallback(null);
    },
    onReady: function () {
        this.setPageStatus(0);
        t.startLoopTagScanner(60000, this.onTagSearchTypeChange, this.onTagFound, this.onTagNoFound);
    },
    onShow: function () {},
    onHide: function () {},
    methods: {
        setPageStatus: function (a, t) {
            uni.setNavigationBarTitle({
                title: n[a]
            });
            this.setData(
                {
                    pageStatus: a
                },
                t
            );
        },

        gotoReadFail: function (a) {
            uni.redirectTo({
                url: '/pages/device-card-read-fail/fail?status=' + a
            });
        },

        onTagSearchTypeChange: function (a) {
            if ('HF' == a) {
                console.log('正在搜索高频卡');
            } else {
                console.log('正在搜索低频卡');
            }
        },

        onTagReadingProgress: function (a) {
            var that = this;
            a = parseInt(a);
            that.setData({
                progress: a
            });

            if (a >= 60) {
                this.setData({
                    decryptShow: false
                });
            }

            if (100 == a) {
                setTimeout(function () {
                    that.setPageStatus(2);
                }, 2000);
            }
        },

        onTagAttackCallback: function (a, t, e, i, n) {
            var s = '';

            switch (a) {
                case o.TASK_NAME_FCHK:
                    s = '扫默认密码';
                    break;

                case o.TASK_NAME_DARKSIDE:
                    s = '计算全加密';
                    break;

                case o.TASK_NAME_NESTED:
                    s = '计算半加密';
                    break;

                case o.TASK_NAME_STATICNESTED:
                    s = '计算无漏洞';
            }

            this.setData({
                decrypt: s,
                max: t,
                step: e,
                time_msg: n,
                decryptShow: !(e >= t)
            });
        },

        onTagNoFound: function () {
            setTimeout(function () {
                uni.navigateTo({
                    url: '/pages/device-card-read-fail/fail'
                });
            }, 2000);
        },

        onTagFound: function (a) {
            console.log('标签信息是 ' + JSON.stringify(a));
            this.setData({
                uid_hex: a.uid_hex
            });

            if (a.readable) {
                this.setPageStatus(1, function () {
                    t.startReadTagAllData(this.onTagReadingProgress);
                });
            } else {
                this.gotoReadFail(105);
            }
        },

        onSaveDumpToCardWallet: function () {
            if (this.dumpSaved) {
                i.showToast('此卡片已经保存了');
            } else {
                this.setData({
                    showDumpSaveDialog: true
                });
            }
        },

        onUserCancelDumpSave: function () {
            this.setData({
                showDumpSaveDialog: false
            });
        },

        onUserConfirmDumpSave: function (a) {
            var t = a.detail.dumpName;
            var e = i.saveCard(t);
            if (e.isok) {
                this.setData({
                    canExit: true,
                    dumpSaved: true,
                    showDumpSaveDialog: false
                });
                i.showToast('保存成功！');
            } else {
                i.showToast(e.message);
            }
        },

        gotoWriteCard: function () {
            uni.redirectTo({
                url: '/pages/device-card-write-ready/write'
            });
        },

        onTagErrorCallback: function (a) {
            this.gotoReadFail(a);
        },

        onDeviceDisconnectCallback: function (a) {
            console.log('在读卡页面监听到设备断开连接！');
            this.showToastNoIcon('设备断开连接');

            if (2 != this.pageStatus) {
                this.gotoReadFail(107);
            }
        },

        onBleComErrorCallback: function () {
            this.gotoReadFail(97);
        },

        onBleComTimeoutCallback: function () {
            this.gotoReadFail(108);
        },

        showToastNoIcon: function (a) {
            setTimeout(function () {
                uni.showToast({
                    icon: 'none',
                    title: a
                });
            }, 100);
        },

        showExitTipsAtSearching: function (a) {
            uni.showModal({
                content: '当前正在寻卡，确认退出吗？',
                success: function (e) {
                    if (e.confirm) {
                        t.stopLoopCardScanner(function () {
                            a.detail.goBack();
                        });
                    }
                }
            });
        },

        showExitTipsAtDumpNoSave: function (a) {
            console.log(1111);
            var that = this;
            that.showDumpSaveDialog ||
                uni.showActionSheet({
                    alertText: '是否需要保存数据再退出？',
                    itemList: ['保存', '退出'],
                    success: function (e) {
                        switch (e.tapIndex) {
                            case 0:
                                that.onSaveDumpToCardWallet();
                                break;

                            case 1:
                                a.detail.goBack();
                        }
                    },
                    fail: function () {}
                });
        },

        onUserBack: function (a) {
            switch (this.pageStatus) {
                case 0:
                    this.showExitTipsAtSearching(a);
                    break;

                case 1:
                    this.showToastNoIcon('读卡中，请稍等...');
                    break;

                case 2:
                    if (this.dumpSaved) {
                        a.detail.goBack();
                    } else {
                        this.showExitTipsAtDumpNoSave(a);
                    }
            }
        }
    }
};
</script>
<style>
@import './reading.css';
</style>
