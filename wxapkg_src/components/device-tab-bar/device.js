var e = require("../../4F97F14255C842DF29F19945DB418C74.js");

Component({
    properties: {
        showcontent: {
            type: Boolean,
            value: !0
        }
    },
    observers: {
        showcontent: function(t) {
            this.setData({
                showsub: t && e.isBLEDeviceIsConnected()
            });
        }
    },
    data: {
        connected: e.isBLEDeviceIsConnected(),
        showsub: !0
    },
    lifetimes: {
        attached: function() {
            var t = this;
            this.callback_connected = function() {
                return t.onBLEDeviceConnected();
            }, e.registerOnBLEConnectedCallback(this.callback_connected), this.callback_disconnected = function() {
                return t.onBLEDeviceDisconnected();
            }, e.registerOnBLEDisconnectedCallback(this.callback_disconnected), this.updateDeviceStatusAuto();
        },
        detached: function() {
            e.unregisterOnBLEConnectedCallback(this.callback_connected), e.unregisterOnBLEDisconnectedCallback(this.callback_disconnected);
        }
    },
    pageLifetimes: {
        show: function() {
            this.updateDeviceStatusAuto();
        },
        hide: function() {}
    },
    methods: {
        updateDeviceStatusAuto: function() {
            var t = e.isBLEDeviceIsConnected();
            this.setData({
                connected: t,
                showsub: this.data.showcontent && t
            });
        },
        onBLEDeviceConnected: function() {
            this.setData({
                connected: !0,
                showsub: this.data.showcontent
            });
        },
        onBLEDeviceDisconnected: function() {
            this.setData({
                connected: !1,
                showsub: !1
            });
        },
        onTabClick: function() {
            this.data.connected || wx.navigateTo({
                url: "/pages/device-connect-list/discovery"
            });
        }
    }
});