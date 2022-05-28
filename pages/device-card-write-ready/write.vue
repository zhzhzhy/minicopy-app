<template>
    <view>
        <view>
            <devicebar></devicebar>
        </view>
        <view class="content">
            <view :class="showView ? 'header_view_hide' : 'header_view_show'">
                <view style="width: 323.5714rpx; height: 496rpx; margin: 0 auto">
                    <view style="width: 323.5714rpx; height: 450rpx; text-align: center; float: left; position: absolute">
                        <image src="/static/static/img/vipEqu.png" style="width: 323.5714rpx; height: 450rpx"></image>
                    </view>
                    <view class="animation">
                        <view class="box2"></view>
                        <view class="box3"></view>
                    </view>
                </view>
            </view>
            <view :class="vipNum ? 'header_view_hide' : 'header_view_show'">
                <view style="width: 323.5714rpx; height: 496rpx; margin: 0 auto">
                    <view style="width: 323.5714rpx; height: 450rpx; text-align: center; float: left; position: absolute">
                        <image src="/static/static/img/cardReader.png" style="width: 323.5714rpx; height: 450rpx"></image>
                    </view>
                    <view style="width: 323.5714rpx; height: 60rpx; float: left; position: absolute; margin-left: 2rpx; margin-top: 5rpx">
                        <view class="remainingTimes">
                            <text>剩余{{ remainingTimes }}次</text>
                        </view>
                    </view>
                    <view class="animation">
                        <view class="box2"></view>
                        <view class="box3"></view>
                    </view>
                </view>
            </view>
            <view class="search">请换上尼古拉小橙卡</view>
            <view class="cardType">
                <view :class="cardType == 'ID' ? 'ID' : 'IC'">{{ cardType }}</view>
                <view class="tips">
                    <text class="sonType" v-for="(item, index) in cardList" :key="index">{{ item }}</text>
                </view>
            </view>
            <view class="startWriteCard">
                <van-button
                    @tap.native="onGotoWriteCardCall"
                    customStyle="width:160px;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                    type="primary"
                >
                    开始写卡
                </van-button>
            </view>
        </view>
        <view class="bottom">
            <view class="bottomBlock">
                <view class="iconBlock">
                    <icon class="orangeCard"></icon>
                </view>
                <view @tap="onGotoTaobaoBuyCard" class="textBlock">
                    <text :decode="true">购买小橙卡 &nbsp;|</text>
                </view>
            </view>
            <view class="problem">
                <text @tap="onGotoHelpPageCall">遇到问题?</text>
                <icon class="doubleArrow"></icon>
            </view>
        </view>
        <dialog-buy-service :contentColor="1" :showView="modal"></dialog-buy-service>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import vanPopup from '../../miniprogram_npm/@vant/weapp/popup/index';
import vanCell from '../../miniprogram_npm/@vant/weapp/cell/index';
import vanImage from '../../miniprogram_npm/@vant/weapp/image/index';
import vanActionSheet from '../../miniprogram_npm/@vant/weapp/action-sheet/index';
import devicebar from '@/components/device-tab-bar/device';
import dialogBuyService from '@/components/dialog-buy-service/index';
var i = require('../../8473358655C842DFE2155D813E918C74.js');

var e = require('../../4F97F14255C842DF29F19945DB418C74.js');

var a = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanButton,
        vanPopup,
        vanCell,
        vanImage,
        vanActionSheet,
        devicebar,
        dialogBuyService
    },
    data() {
        return {
            showView: true,
            vipNum: false,
            remainingTimes: '',
            cardType: '',
            cardList: [],
            modal: false,
            vip_end_date: '',
            expirationTime: ''
        };
    },
    onShow: function () {
        var that = this;
        a.remainNumber1(function (i, a, t) {
            if ('会员已过期' == t) {
                console.log('剩余的次数是空 ');
                that.setData({
                    expirationTime: '会员已过期',
                    remainingTimes: i
                });
                return false;
            }

            that.setData({
                remainingTimes: i,
                vip_end_date: a,
                expirationTime: t
            });

            if (null !== that.vip_end_date) {
                that.setData({
                    showView: false,
                    vipNum: true
                });
            } else {
                that.setData({
                    showView: true,
                    vipNum: false
                });
            }

            if ('会员已过期' == that.expirationTime) {
                obj.setData({
                    showView: true,
                    vipNum: false
                });
            }
        });
        var t;
        var n;
        var o = i.getTagInformation().tag_type;
        console.log('卡的类型是' + JSON.stringify(o));

        if (o == i.TAG_TYPE_LF_EM410X) {
            t = ['8268', '5577'];
            n = 'ID';
        } else {
            t = ['UFUID', 'FUID', 'UID', 'CUID'];
            n = 'IC';
        }

        this.setData({
            cardList: t,
            cardType: n
        });
    },
    onHide: function () {},
    onLoad: function (i) {},
    onUnload: function () {},
    methods: {
        onGotoWriteCardCall: function () {
            var i = this.remainingTimes;
            this.vip_end_date;

            if ('会员已过期' == this.expirationTime && 0 == i) {
                this.setData({
                    modal: true
                });
            } else {
                if (!e.isBLEDeviceIsConnected()) {
                    return void a.showToast('设备断开连接,请重新连接');
                }

                uni.navigateTo({
                    url: '/pages/device-card-writing/writing'
                });
            }
        },

        onGotoTaobaoBuyCard: function () {
            uni.navigateTo({
                url: '/pages/user-go-taobao/go'
            });
        },

        onGotoHelpPageCall: function () {
            uni.navigateTo({
                url: '/pages/user-device-help/help?id=1'
            });
        }
    }
};
</script>
<style>
@import './write.css';
</style>
