<template>
    <view>
        <view class="topText">
            <view class="topTexts">
                <text>
                    附近的设备
                    <text class="eqText">{{ deviceList.length }}</text>
                    台
                </text>
            </view>
        </view>
        <view class="content">
            <view class="search0" v-if="deviceList.length == 0">
                <view class="eqContentImg">
                    <icon class="eqSearch"></icon>
                </view>
                <view class="eqContentText">
                    <text>附近没有可连接的设备</text>
                </view>
            </view>
            <view @tap="onUserConnectDeviceForItem" :data-id="index" v-for="(item, index) in deviceList" :key="index">
                <view class="block" hoverClass="view-connect-device-item-hover" hoverStartTime="10" hoverStayTime="100">
                    <view class="picView">
                        <icon class="type"></icon>
                    </view>
                    <view class="name">
                        <text>{{ item.name }}</text>
                    </view>
                    <view :class="item.connected == true ? 'rightBtn1' : 'rightBtn'">
                        <view :class="item.connected == true ? 'connImg1' : 'connImg'">
                            <icon :class="item.connected == true ? 'connect1' : 'connect'"></icon>
                        </view>
                        <view :class="item.connected == true ? 'conn1' : 'conn'">
                            <text>{{ item.connected == true ? ' 断开' : '连接' }}</text>
                        </view>
                    </view>
                </view>

                <view class="line"></view>
            </view>
        </view>
    </view>
</template>

<script>
var e = require('../../4F97F14255C842DF29F19945DB418C74.js');

var i = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    data() {
        return {
            deviceList: []
        };
    },
    onShow: function () {
        this.showAllDevice();
    },
    onLoad: function (i) {
        var that = this;
        e.registerDeviceFoundCallback(this.onDeviceStatusChange);
        e.registerDeviceRemovedCallback(this.onDeviceStatusChange);
        e.registerOnBLEConnectedCallback(this.onBLEDeviceConnectOkCallback);
        e.registerOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectOkCallback);
        e.onBLEDeviceErrCallback(this.onBLEAdapterErrorCall);
        console.log('页面加载完成，注册回调完成！');
        this.timerIDShowDevices = setInterval(function () {
            that.showAllDevice();
        }, 1000);
    },
    onUnload: function () {
        e.unregisterDeviceFoundCallback(this.onDeviceStatusChange);
        e.unregisterDeviceRemovedCallback(this.onDeviceStatusChange);
        e.unregisterOnBLEConnectedCallback(this.onBLEDeviceConnectOkCallback);
        e.unregisterOnBLEDisconnectedCallback(this.onBLEDeviceDisconnectOkCallback);
        e.onBLEDeviceErrCallback(null);
        clearInterval(this.timerIDShowDevices);
    },
    methods: {
        timerIDShowDevices: -1,

        showAllDevice: function () {
            for (var i = e.getBLEDevicesFoundList(), n = [], t = 0; t < i.length; t++) {
                var c = i[t];
                n.push({
                    name: c.name,
                    connected: c.deviceId == e.getBLEDeviceIDByEstablished()
                });
            }

            this.setData({
                deviceList: n
            });
        },

        onDeviceStatusChange: function (e) {
            this.showAllDevice();
        },

        onBLEDeviceConnectOkCallback: function () {
            i.userUseVip();
            uni.hideLoading({
                success: function (e) {
                    uni.showToast({
                        title: '连接成功！',
                        icon: 'success',
                        duration: 1000
                    });
                }
            });
            this.showAllDevice();
        },

        onBLEDeviceDisconnectOkCallback: function () {
            console.log('连接列表页监听到设备断开连接！');
            i.showToast('设备已断开连接');
            this.showAllDevice();
        },

        onBLEAdapterErrorCall: function (e) {
            console.log('在主页面初始化蓝牙适配器遇到的问题' + JSON.stringify(e));
            i.processBLEError(e);
        },

        onUserConnectDeviceForItem: function (n) {
            if (e.isLeAdapterInitialized()) {
                var t = n.currentTarget.dataset.id;
                var c = e.getBLEDevicesFoundList()[t];
                if (e.isBLEDeviceIsConnected()) {
                    if (c.deviceId == e.getBLEDeviceIDByEstablished()) {
                        e.disconnectExistsDevice();
                    } else {
                        i.showToast('请先断开之前的连接');
                    }
                } else {
                    if (!i.isLogin(this)) {
                        return void i.login(this);
                    }

                    console.log('已经登录');
                    uni.showLoading({
                        title: '正在连接中'
                    });
                    console.log('当前点击第' + t + '个，设备ID是:' + c.deviceId + '，设备名是: ' + c.name);
                    i.getDeviceBindStatus(c.deviceId, function (n) {
                        if (1 == n) {
                            i.showToast('连接失败，设备被他人绑定');
                            return false;
                        }

                        i.setDeviceInfo(c);
                        e.connectTheBLEByMacAddr(c.deviceId);
                    });
                }
            } else {
                i.showToast('蓝牙可能没有打开哦~');
            }
        }
    }
};
</script>
<style>
@import './discovery.css';
</style>
