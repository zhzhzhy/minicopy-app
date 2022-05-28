<template>
    <view class="content">
        <view class="topLine"></view>
        <view class="block" v-if="dbData !== ''" v-for="(item, index) in dbData" :key="index">
            <view>
                <text class="describes">问题描述：</text>
                <text class="question">{{ item.feedback_content }}</text>
            </view>

            <view class="time">
                <text class="describes">提交时间：</text>
                <text class="question">{{ item.feedback_time }}</text>
            </view>
        </view>
        <view class="noData" v-if="dbData == ''">
            <view class="noDataImgBlock">
                <image class="noDataImg" src="/static/static/img/noFeedbackRecord.png"></image>
            </view>
            <view class="noDataText">暂无反馈记录</view>
        </view>
    </view>
</template>

<script>
var n = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    data() {
        return {
            dbData: ''
        };
    },
    onLoad: function (n) {},
    onReady: function () {},
    onShow: function () {
        n.checkToken(this);
        var t = n.obtain(this);
        var o = n.getPhone();
        var that = this;
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Feedback/query',
            data: {
                phone: o,
                token: t
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (n) {
                console.log('返回的数据是' + JSON.stringify(n));
                that.setData({
                    dbData: n.data
                });
            }
        });
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
@import './history.css';
</style>
