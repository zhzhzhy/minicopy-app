<template>
    <view>
        <view class="itemBlock">
            <view @tap="getradio" :data-id="index" v-for="(item, index) in products" :key="index">
                <view :class="item.checked ? 'itemChecked' : 'itemNoChecked'">
                    <view class="fiftyText">
                        <text>{{ item.product_name }}</text>
                    </view>
                    <view class="fiftyRight">
                        <view class="line"></view>
                        <text class="Number">{{ item.product_price }} 元</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="leftLineBlock">
            <view class="leftLineoutsideBlock"></view>
            <view class="explainBlock">购买次卡使用说明：</view>
        </view>
        <view class="explainText">
            <view>
                <text>1.当您不想购买VIP时，您也可以单独购买写卡次数。</text>
            </view>
            <view style="margin-top: 10rpx">
                <text>2.每写入成功一张卡，即消耗一次写卡次数。</text>
            </view>
            <view style="margin-top: 10rpx">
                <text>3.写卡次数永久有效，写卡失败或重复写卡不会消耗次数。</text>
            </view>
            <view style="margin-top: 10rpx">
                <text>4.您也可以通过金币积分免费兑换写卡次数</text>
            </view>
        </view>
        <view @tap="buyNow" style="position: absolute; bottom: 78rpx; width: 662rpx; height: 80rpx; margin-left: 44rpx; margin-right: 44rpx; text-align: center">
            <van-button
                customStyle="width:662rpx;height: 80rpx;font-size:28rpx;border-radius:32px 32px 32px 32px;background:#F5A200;color:#ffffff;font-weight:600;background: #f5a200;"
                type="default"
            >
                立即购买
            </van-button>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
require('../../3E90FCB755C842DF58F694B049818C74.js');

var t = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanButton
    },
    data() {
        return {
            products: ''
        };
    },
    onLoad: function (t) {},
    onReady: function () {},
    onShow: function () {
        var that = this;
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Product/subCard',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (o) {
                console.log('请求的数据是' + JSON.stringify(o));
                var e = o.data;
                e.forEach(function (t) {
                    t.checked = false;
                    o.data[0].checked = true;
                });
                that.setData({
                    products: o.data
                });
                console.log('pro' + JSON.stringify(that.products));
            }
        });
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        getradio: function (t) {
            for (var o = t.currentTarget.dataset.id, e = this.products, n = 0; n < e.length; n++) {
                this.products[n].checked = false;
            }

            this.products[o].checked = true;
            this.setData({
                products: this.products
            });
        },

        buyNow: function () {
            for (var o = -1, e = this.products, n = 0; n < e.length; n++) {
                if (e[n].checked) {
                    o = e[n].product_price;
                    var a = e[n].id;
                    break;
                }
            }

            if (-1 == o) {
                console.log('啥都没选');
            } else {
                console.log('我想购买: ' + o);
                console.log('商品的id是: ' + a);
                var c = t.getPhone();
                var i = t.obtain(this);
                console.log('手机号是: ' + c);
                uni.request({
                    url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Purcheasewxconfig/prepayId',
                    data: {
                        phone: c,
                        total_fee: o,
                        product_id: a,
                        token: i
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (t) {
                        console.log('新数据是' + JSON.stringify(t));
                        uni.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: 'MD5',
                            paySign: t.data.paySign,
                            total_fee: 0.01,
                            success: function (t) {
                                console.log('支付成功！' + JSON.stringify(t));
                            },
                            fail: function (t) {
                                console.log(t);
                            }
                        });
                    }
                });
            }
        }
    }
};
</script>
<style>
@import './chance.css';
</style>
