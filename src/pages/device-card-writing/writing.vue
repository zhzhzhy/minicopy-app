<template>
    <view>
        <view>
            <devicebar></devicebar>
        </view>
        <view class="card">
            <view class="logo">
                <image class="logoImg" src="/static/static/img/writeCardLogo.svg"></image>
            </view>
            <view class="progressC">
                <view class="circle">
                    <van-circle color="#ffffff" layerColor="#f8be4c" :size="circleWidth" :value="progressStep">
                        <text style="color: #ffffff; height: 100%">{{ progressStep }}%</text>
                    </van-circle>
                </view>
            </view>
            <view class="cardNumberBlock">
                <view class="cardNumber">
                    <text>卡号：{{ cardNumber }}</text>
                </view>
            </view>
        </view>
        <view class="cardReadText">
            <view class="readCardTime">
                <text>正在写卡...大约需要5秒钟</text>
            </view>
            <view class="remain">
                <text>写卡期间请勿移动卡片</text>
            </view>
        </view>
        <backitp @back="onUserBack" :canback="false"></backitp>
    </view>
</template>

<script>
import vanCircle from '../../miniprogram_npm/@vant/weapp/circle/index';
import devicebar from '@/components/device-tab-bar/device';
import backitp from '@/components/back-intercept/back';
var e = require('../../8473358655C842DFE2155D813E918C74.js');

var t = require('../../3E90FCB755C842DF58F694B049818C74.js');

var i = require('../../4F97F14255C842DF29F19945DB418C74.js');

var o = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanCircle,
        devicebar,
        backitp
    },
    data() {
        return {
            progressStep: 0,
            cardNumber: '',
            circleWidth: '',
            smallCircleWidth: ''
        };
    },
    onShow: function () {
        var i = e.getTagInformation();
        var o = 128 * (uni.getSystemInfoSync().windowWidth / 750);
        var r = (o / 75) * 61;
        console.log('屏幕高度是' + o);
        this.setData(
            {
                circleWidth: o,
                smallCircleWidth: r,
                cardNumber: i.uid_hex
            },
            function () {
                t.startWriteCardDatas(this.onWriteCardProgressCall);
            }
        );
    },
    onHide: function () {},
    onLoad: function (t) {
        i.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback);
        e.onTagErrorCallback(this.onTagErrorCallback);
        i.onComErrCallback(this.onBleComErrorCallback);
        i.onTimeoutCallback(this.onBleComTimeoutCallback);
    },
    onUnload: function () {
        this.clearGotoWriteResultTimer();
        i.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback);
        e.onTagErrorCallback(null);
        i.onComErrCallback(null);
        i.onTimeoutCallback(null);
    },
    methods: {
        successCodeList: [],
        timerIDGotoWriteSuccess: -1,
        timerIDGotoWriteFailure: -1,

        gotoWriteFailure: function (e) {
            this.timerIDGotoWriteFailure = setTimeout(function () {
                uni.redirectTo({
                    url: '/pages/device-card-write-fail/fail?status=' + e
                });
            }, 1000);
        },

        gotoWriteSuccess: function (e) {
            var t = '/pages/device-card-write-success/success';

            if (null != e) {
                t += '?status='.concat(e);
            }

            this.timerIDGotoWriteSuccess = setTimeout(function () {
                uni.redirectTo({
                    url: t
                });
            }, 2000);
        },

        clearGotoWriteResultTimer: function () {
            clearTimeout(this.timerIDGotoWriteSuccess);
            clearTimeout(this.timerIDGotoWriteFailure);
        },

        onTagErrorCallback: function (e) {
            if (e in this.successCodeList) {
                this.gotoWriteSuccess(e);
            } else {
                this.gotoWriteFailure(e);
            }
        },

        onDeviceDisconnectCallback: function (e) {
            console.log('在读卡页面监听到设备断开连接！');
            this.gotoWriteFailure(107);
        },

        onBleComErrorCallback: function () {
            this.gotoWriteFailure(97);
        },

        onBleComTimeoutCallback: function () {
            this.gotoWriteFailure(108);
        },

        onWriteCardProgressCall: function (e) {
            this.setData({
                progressStep: Math.round(e)
            });

            if (100 == e) {
                this.gotoWriteSuccess();
            }
        },

        onUserBack: function (e) {
            o.showToast('请先等待写卡完成哦~');
        }
    }
};
</script>
<style>
@import './writing.css';
</style>
