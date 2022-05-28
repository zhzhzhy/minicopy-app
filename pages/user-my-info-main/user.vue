<template>
    <view>
        <view class="head head-height">
            <view class="custom"></view>
            <view v-if="phone">
                <view class="userinfo">
                    <view style="position: absolute">
                        <icon @tap="getUserInfo" class="userinfo-avatars" v-if="avatarUrl == ''"></icon>
                        <image class="userinfo-avatar" :src="avatarUrl" v-if="avatarUrl"></image>
                    </view>
                    <view>
                        <image @tap="bindViewTap" class="userinfo-avatar" mode="cover"></image>
                    </view>
                    <view>
                        <text class="phoneNumber">{{ phone }}</text>
                        <view class="membershipType" v-if="expirationTime == '会员已过期'">
                            <view>
                                <image src="/static/static/img/ordinaryMember.png" style="width: 128rpx; height: 40rpx"></image>
                            </view>
                        </view>
                        <view class="membershipType" v-else>
                            <view>
                                <image class="doMember" src="/static/static/img/distinguishedMember.png"></image>
                            </view>
                        </view>
                    </view>
                    <view @tap="personCenter" class="headArrow">
                        <icon class="headIcon"></icon>
                    </view>
                </view>
                <view class="coinsNumber">
                    <view class="coins">
                        <view>
                            <text class="leftNumber">0</text>
                        </view>
                        <view>
                            <text class="coinsText">金币</text>
                        </view>
                    </view>
                    <view class="remainingTimes">
                        <view @tap="purchase" class="purchase">购买</view>
                        <view>
                            <text @tap="purchase" class="rightNumber">{{ remainingTimes }}</text>
                        </view>
                        <view>
                            <text class="remainText">次数</text>
                        </view>
                    </view>
                </view>
            </view>
            <view v-else>
                <view class="jumpLogin"></view>
                <view class="userinfo">
                    <view style="position: absolute">
                        <icon @tap="getUserInfo" class="userinfo-avatars" v-if="avatarUrl == ''"></icon>
                        <image class="userinfo-avatar" :src="avatarUrl" v-if="avatarUrl"></image>
                    </view>
                    <view>
                        <image class="userinfo-avatar"></image>
                    </view>
                    <view>
                        <view @tap="jumpLogin" class="membershipType">
                            <view class="loginRegister">登录/注册</view>
                        </view>
                    </view>
                </view>
                <view class="coinsNumber">
                    <view class="coins">
                        <view>
                            <text class="leftNumber">-</text>
                        </view>
                        <view>
                            <text class="coinsText">金币</text>
                        </view>
                    </view>
                    <view class="remainingTimes">
                        <view>
                            <text class="rightNumber">-</text>
                        </view>
                        <view>
                            <text class="remainText">次数</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="phone">
            <view class="blackBlock" v-if="expirationTime == '会员已过期'">
                <view>
                    <image class="vipMember" src="/static/static/img/vipMember.png"></image>
                </view>
                <view class="date">
                    <text>开通vip享受权益</text>
                </view>
                <view @tap="renewNow1" class="renewNow">
                    <van-button
                        customStyle="width:80px;height:30px;font-size:12px;border-radius:20px 20px 20px 20px;background:#eedbb4;color:#3a3d57;font-weight:500;border:none;"
                        type="default"
                    >
                        立即开通
                    </van-button>
                </view>
            </view>
            <view class="blackBlock" v-else>
                <view>
                    <image class="vipMember" src="/static/static/img/vipMember.png"></image>
                </view>
                <view class="date">
                    <text>{{ vip_end_date }}到期</text>
                </view>
                <view @tap="renewNow1" class="renewNow">
                    <van-button
                        customStyle="width:80px;height:30px;font-size:12px;border-radius:20px 20px 20px 20px;background:#eedbb4;color:#3a3d57;font-weight:500;border:none;"
                        type="default"
                    >
                        立即续费
                    </van-button>
                </view>
            </view>
        </view>
        <view v-else>
            <view class="blackBlock">
                <view>
                    <image class="vipMember" src="/static/static/img/vipMember.png"></image>
                </view>
                <view class="date">
                    <text>开通vip享受权益</text>
                </view>
                <view @tap="renewNow" class="renewNow">
                    <van-button
                        customStyle="width:80px;height:30px;font-size:12px;border-radius:20px 20px 20px 20px;background:#eedbb4;color:#3a3d57;font-weight:500;border:none;"
                        type="default"
                    >
                        立即开通
                    </van-button>
                </view>
            </view>
        </view>
        <view class="content">
            <view class="outsideBlock" style="background: #ffffff">
                <view class="block" v-for="(item, index) in block1" :key="index">
                    <view @tap="item.bindTap" class="line">
                        <view class="icon">
                            <icon :class="item.iconTitle"></icon>
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ item.title }}</text>
                            </view>
                            <view class="rightIcon">
                                <icon class="iconArrow"></icon>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="none"></view>
            </view>
            <view class="outsideBlock1" style="background: #ffffff">
                <view class="block" v-for="(item, index) in block2" :key="index">
                    <view @tap="item.bindTap" class="line">
                        <view class="icon">
                            <icon :class="item.iconTitle"></icon>
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ item.title }}</text>
                            </view>
                            <view class="rightIcon">
                                <icon class="iconArrow"></icon>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="none"></view>
            </view>
            <view class="outsideBlock2" style="background: #ffffff">
                <view class="block" v-for="(item, index) in block3" :key="index">
                    <view @tap="item.bindTap" class="line">
                        <view class="icon">
                            <icon :class="item.iconTitle"></icon>
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ item.title }}</text>
                            </view>
                            <view class="rightIcon">
                                <icon class="iconArrow"></icon>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <tabbar selected="3"></tabbar>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import vanPopup from '../../miniprogram_npm/@vant/weapp/popup/index';
import vanCell from '../../miniprogram_npm/@vant/weapp/cell/index';
import vanIcon from '../../miniprogram_npm/@vant/weapp/icon/index';
import tabbar from '@/components/custom-tab-bar/index';
var e = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

var n = require('../../3E90FCB755C842DF58F694B049818C74.js');

getApp();
export default {
    components: {
        vanButton,
        vanPopup,
        vanCell,
        vanIcon,
        tabbar
    },
    data() {
        return {
            block1: [
                {
                    iconTitle: 'couponExchange',
                    title: '券码兑换',
                    bindTap: 'couponExchange'
                },
                {
                    iconTitle: 'iconRanking',
                    title: '金币排行',
                    bindTap: 'iconRanking'
                },
                {
                    iconTitle: 'iconTask',
                    title: '金币任务',
                    bindTap: 'iconTask'
                }
            ],
            block2: [
                {
                    iconTitle: 'iconSet',
                    title: '功能设置',
                    bindTap: 'iconSet'
                },
                {
                    iconTitle: 'iconAbout',
                    title: '关于我们',
                    bindTap: 'iconAbout'
                }
            ],
            block3: [
                {
                    iconTitle: 'iconOpinion',
                    title: '意见反馈',
                    bindTap: 'iconOpinion'
                },
                {
                    iconTitle: 'iconQuest',
                    title: '问题帮助',
                    bindTap: 'iconQuest'
                }
            ],
            show: true,
            phone: '',
            selected: 3,
            remainingTimes: '',
            vip_end_date: '',
            expirationTime: '',
            avatarUrl: ''
        };
    },
    onLoad: function (e) {
        uni.hideTabBar();
    },
    onShow: function () {
        e.judgePhoneNumber(this);

        if (e.isLogin()) {
            var that = this;
            e.remainNumber(function (e, n, o) {
                if ('会员已过期' == o) {
                    console.log('剩余的次数是空 ');
                    that.setData({
                        expirationTime: '会员已过期',
                        remainingTimes: e
                    });
                    return false;
                }

                that.setData({
                    remainingTimes: e,
                    vip_end_date: n,
                    expirationTime: o
                });
            });
        }

        var o = n.getStorageSyncHasDefault('headPortrait', {});
        console.log('avatarUrl是' + JSON.stringify(o));

        if (Object.keys(o).length <= 0) {
            this.setData({
                avatarUrl: ''
            });
            return false;
        }

        this.setData({
            avatarUrl: o
        });
    },
    methods: {
        getUserInfo: function () {
            var that = this;
            uni.getUserProfile({
                desc: '显示头像',
                success: function (e) {
                    console.log('获取用户信息成功', e);
                    var i = e.userInfo.avatarUrl;
                    e.userInfo.nickName;
                    uni.setStorageSync('headPortrait', i);
                    that.setData({
                        avatarUrl: i
                    });
                },
                fail: function (n) {
                    console.log('获取用户信息失败', n);

                    if ('getUserProfile:fail auth deny' == n.errMsg) {
                        e.showToast('您已取消授权获取头像');
                    }
                }
            });
        },

        jumpLogin: function () {
            console.log('dssdsd');
            uni.navigateTo({
                url: '/pages/user-login-onekey/login'
            });
        },

        personCenter: function () {
            uni.navigateTo({
                url: '/pages/user-info-details/info'
            });
        },

        purchase: function () {
            uni.navigateTo({
                url: '/pages/user-buy-writetag-chance/chance'
            });
        },

        renewNow: function () {
            uni.navigateTo({
                url: '/pages/user-login-onekey/login'
            });
        },

        renewNow1: function () {
            uni.navigateTo({
                url: '/pages/user-buy-vip/buy'
            });
        },

        couponExchange: function () {
            uni.navigateTo({
                url: '/pages/user-exchange-code/exchange'
            });
        },

        iconRanking: function () {
            e.showToast('正在开发中');
        },

        iconTask: function () {
            e.showToast('正在开发中');
        },

        iconSet: function () {
            uni.navigateTo({
                url: '/pages/settings-program-main/settings'
            });
        },

        iconAbout: function () {
            uni.navigateTo({
                url: '/pages/about-nikolalab/about-us'
            });
        },

        iconOpinion: function () {
            if (this.phone) {
                uni.navigateTo({
                    url: '/pages/user-feedback-commit/feedback'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/user-login-onekey/login'
                });
            }
        },

        iconQuest: function () {
            uni.navigateTo({
                url: '/pages/user-device-help/help'
            });
        },

        bindViewTap() {
            console.log('占位：函数 bindViewTap 未声明');
        }
    }
};
</script>
<style>
@import './user.css';
</style>
