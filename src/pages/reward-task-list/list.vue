<template>
    <view>
        <view class="topLine"></view>
        <view class="topBlock">
            <view class="myCoin">我的金币</view>
            <view class="detailedBlock">
                <view @tap="details" class="detailed">
                    <text>明细</text>
                </view>
                <view class="rightArrowBlock">
                    <icon class="rightArrow"></icon>
                </view>
            </view>
            <view class="coinNumberBlock">
                <view class="coinBlock">
                    <icon class="coin"></icon>
                </view>
                <view class="numberBlock">
                    <text>100</text>
                </view>
            </view>
        </view>
        <view class="content">
            <view class="secondBlock">
                <view class="picView"></view>
                <view class="imgBlock">
                    <icon class="viewImg"></icon>
                </view>
                <view class="name">
                    <text>观看广告（{{ view }}/1）</text>
                </view>
                <view class="code">
                    <text>送10金币</text>
                </view>
                <view class="btn" v-if="viewShow">
                    <van-button
                        @tap.native="showDailog"
                        customStyle="width:68px;height:26px;background:#ffffff;border-radius:20px 20px 20px 20px;border: 1px solid #F5A200;color:#f5a200;"
                        size="small"
                        type="info"
                    >
                        去完成
                    </van-button>
                </view>
                <view class="btns" v-else>
                    <view style="float: left; margin-right: 10rpx">
                        <icon class="success"></icon>
                    </view>
                    <view style="float: left; font-size: 24rpx; font-weight: 400; margin-top: 3rpx">
                        <text>完成</text>
                    </view>
                </view>
            </view>
            <view class="secondBlock">
                <view class="picView"></view>
                <view class="imgBlock">
                    <icon class="adviceImg"></icon>
                </view>
                <view class="name">
                    <text>提出建议（{{ advice }}/1）</text>
                </view>
                <view class="code">
                    <text>通过审核后送20金币</text>
                </view>
                <view class="btn" v-if="opinionShow">
                    <van-button
                        @tap.native="showDailog"
                        customStyle="width:68px;height:26px;background:#ffffff;border-radius:20px 20px 20px 20px;border: 1px solid #F5A200;color:#f5a200;"
                        size="small"
                        type="info"
                    >
                        去完成
                    </van-button>
                </view>
                <view class="btns" v-else>
                    <view style="float: left; margin-right: 10rpx">
                        <icon class="success"></icon>
                    </view>
                    <view style="float: left; font-size: 24rpx; font-weight: 400; margin-top: 3rpx">
                        <text>完成</text>
                    </view>
                </view>
            </view>
            <view class="secondBlock">
                <view class="picView"></view>
                <view class="imgBlock">
                    <icon class="tikTokImg"></icon>
                </view>
                <view class="name">
                    <text>发布抖音（{{ tikTok }}/1）</text>
                </view>
                <view class="code">
                    <text>通过审核后送20金币</text>
                </view>
                <view class="btn" v-if="tikTokShow">
                    <van-button
                        @tap.native="Tiktok"
                        customStyle="width:68px;height:26px;background:#ffffff;border-radius:20px 20px 20px 20px;border: 1px solid #F5A200;color:#f5a200;"
                        size="small"
                        type="info"
                    >
                        去完成
                    </van-button>
                </view>
                <view class="btns" v-else>
                    <view style="float: left; margin-right: 10rpx">
                        <icon class="success"></icon>
                    </view>
                    <view style="float: left; font-size: 24rpx; font-weight: 400; margin-top: 3rpx">
                        <text>完成</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            shareShow: true,
            viewShow: true,
            adviceShow: false,
            tikTokShow: true,
            share: 0,
            view: 0,
            advice: 0,
            tikTok: 0,
            opinionShow: ''
        };
    },
    onLoad: function (o) {
        console.log('options是' + JSON.stringify(o));
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function (o) {
        o.from;
        return {
            title: '尼古拉小橙卡，手机开门快人一步',
            path: '/pages/device-connect-main/index',
            imageUrl: '/static/static/img/share.jpg'
        };
    },
    methods: {
        Tiktok: function () {
            uni.navigateTo({
                url: '/pages/reward-task-tiktok/tiktok'
            });
        },

        details: function () {
            uni.navigateTo({
                url: '/pages/goldCoinDetails/goldCoinDetails'
            });
        },

        showDailog() {
            console.log('占位：函数 showDailog 未声明');
        }
    }
};
</script>
<style>
@import './list.css';
</style>
