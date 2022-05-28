<template>
    <view>
        <view class="top-line"></view>
        <view @tap="onTabClick" class="content-bar">
            <view class="content-icon-text">
                <icon :class="connected ? 'badge-left-connected' : 'badge-left-disconnected'"></icon>
                <view class="content-text">
                    <text>读卡器{{ connected ? '已连接' : '未连接' }}</text>
                </view>
                <icon class="arrow-right" v-if="!connected"></icon>
                <slot v-if="showsub"></slot>
            </view>
        </view>
    </view>
</template>

<script>
var e = require('../../4F97F14255C842DF29F19945DB418C74.js');

export default {
    data() {
        return {
            connected: e.isBLEDeviceIsConnected(),
            showsub: true
        };
    },

    props: {
        showcontent: {
            type: Boolean,
            default: true
        }
    },

    watch: {
        showcontent: {
            handler: function (t) {
                this.setData({
                    showsub: t && e.isBLEDeviceIsConnected()
                });
            },

            immediate: true,
            deep: true
        }
    },

    beforeMount: function () {
        var that = this;

        this.callback_connected = function () {
            return that.onBLEDeviceConnected();
        };

        e.registerOnBLEConnectedCallback(this.callback_connected);

        this.callback_disconnected = function () {
            return that.onBLEDeviceDisconnected();
        };

        e.registerOnBLEDisconnectedCallback(this.callback_disconnected);
        this.updateDeviceStatusAuto();
    },

    destroyed: function () {
        e.unregisterOnBLEConnectedCallback(this.callback_connected);
        e.unregisterOnBLEDisconnectedCallback(this.callback_disconnected);
    },

    onPageShow: function () {
        this.updateDeviceStatusAuto();
    },

    onPageHide: function () {},

    methods: {
        updateDeviceStatusAuto: function () {
            var t = e.isBLEDeviceIsConnected();
            this.setData({
                connected: t,
                showsub: this.showcontent && t
            });
        },
        onBLEDeviceConnected: function () {
            this.setData({
                connected: true,
                showsub: this.showcontent
            });
        },
        onBLEDeviceDisconnected: function () {
            this.setData({
                connected: false,
                showsub: false
            });
        },
        onTabClick: function () {
            this.connected ||
                uni.navigateTo({
                    url: '/pages/device-connect-list/discovery'
                });
        }
    }
};
</script>
<style>
@import './device.css';
</style>
