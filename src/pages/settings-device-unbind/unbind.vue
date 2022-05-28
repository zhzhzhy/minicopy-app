<template>
    <view>
        <view class="topText">
            <view class="topTexts">
                <text>
                    已绑定的设备
                    <text class="eqText">{{ eqNum }}</text>
                    台
                </text>
            </view>
        </view>
        <view @tap="unbound" class="content" :data-id="index" v-for="(item, index) in dbinfo" :key="index">
            <view>
                <view class="block">
                    <view class="picView">
                        <icon class="type"></icon>
                    </view>
                    <view class="name">
                        <text>{{ item.device_name }}</text>
                    </view>
                    <view class="rightBtn">
                        <view class="connImg">
                            <icon class="connect"></icon>
                        </view>
                        <view class="conn">
                            <text>解绑</text>
                        </view>
                    </view>
                </view>
                <view class="line"></view>
            </view>
        </view>
        <view class="eqContent" v-if="eqNum == ''">
            <view class="eqContentImg">
                <icon class="eqSearch"></icon>
            </view>
            <view class="eqContentText">
                <text>没有绑定的设备</text>
            </view>
        </view>
    </view>
</template>

<script>
var n = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

require('../../3E90FCB755C842DF58F694B049818C74.js');

export default {
    data() {
        return {
            eqShow: '',
            dbinfo: '',
            deleteUuid: '',
            eqNum: 0
        };
    },
    onLoad: function (n) {},
    onReady: function () {},
    onShow: function () {
        this.onShowClone3389();
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        onShowClone3389: function () {
            n.checkToken(this);
            var that = this;
            var e = n.obtain(this);
            var t = n.getPhone();
            uni.request({
                url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Unbound/query',

                data: {
                    phone: t,
                    token: e
                },

                header: {
                    'content-type': 'application/json'
                },

                success: function (n) {
                    console.log('返回的数据是' + JSON.stringify(n));
                    var e = n.data;
                    var t = e.length;
                    that.setData({
                        dbinfo: e,
                        eqNum: t
                    });
                },

                fail: function (n) {
                    console.log(n);
                }
            });
        },

        unbound: function (o) {
            var that = this;
            var t = that.dbinfo[o.currentTarget.dataset.id].uuid;
            that.setData({
                deleteUuid: t
            });
            uni.showModal({
                title: '',
                content: '解绑后设备可被其它账号绑定',
                success: function (o) {
                    if (o.confirm) {
                        console.log('用户点击确定');
                        var t = n.obtain(that);
                        var i = n.getPhone();
                        var a = that.deleteUuid;
                        uni.request({
                            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Unbound/delete',
                            data: {
                                uuid: a,
                                phone: i,
                                token: t
                            },
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (n) {
                                console.log('删除返回的数据是' + JSON.stringify(n));

                                if (1 == n.data) {
                                    uni.showToast({
                                        title: '解绑成功！',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                    that.onShowClone3389({});
                                }
                            },
                            fail: function (n) {
                                console.log(n);
                            }
                        });
                    } else {
                        console.log('用户点击取消');
                    }
                }
            });
        }
    }
};
</script>
<style>
@import './unbind.css';
</style>
