<template>
    <view>
        <view class="bg"></view>
        <view class="blackBlock">
            <image class="blackImg" src="/static/static/img/vipImg.png"></image>
        </view>
        <view class="vipMonth">
            <view @tap="buy" class="oneMonth" :data-id="index" v-for="(item, index) in products" :key="index">
                <view class="monthNumber">
                    <text>{{ item.product_month }}</text>
                </view>

                <view class="vipMC">
                    <text>{{ item.product_type }}</text>
                </view>

                <view class="moneyBlock">
                    <text class="money">￥</text>
                    <text class="Number">{{ item.product_price }}</text>
                </view>

                <view class="purchase">
                    <van-button
                        customStyle="width:156rpx;height: 30px;font-size:28rpx;border-radius:32px 32px 32px 32px;background:#F5A200;color:#664002;font-weight:600;background: linear-gradient(90deg, #FFE9C8 0%, #FEDEA6 47%, #FFCF8B 100%, #FFD389 100%);border:none;"
                        type="default"
                    >
                        购买
                    </van-button>
                </view>
            </view>
        </view>
        <view class="vipContent">
            <view class="vipRAIBlock">
                <image class="vipRAI" src="/static/static/img/bg_vip3.svg"></image>
            </view>
        </view>
        <view class="vipTable">
            <view class="table">
                <view class="tr bg-w">
                    <view class="th RAI">权益</view>
                    <view class="th ordinaryUser">普通用户</view>
                    <view class="th vipUser">VIP用户</view>
                </view>
                <view class="tr">
                    <view class="td RAIText">
                        <view class="tdText">
                            <text>云解码读卡</text>
                        </view>
                        <view class="tdText3">
                            <text>云存储卡包</text>
                        </view>
                        <view class="cardRead">
                            <view class="cardReadText1">
                                <text>读卡额日限＜50张</text>
                            </view>
                            <view class="cardReadText2">
                                <text>间隔＜60秒</text>
                            </view>
                        </view>
                        <view class="cardRead1">
                            <view class="cardReadText1">
                                <text>读卡额日限＜100张</text>
                            </view>
                            <view class="cardReadText2">
                                <text>间隔＜30秒</text>
                            </view>
                        </view>
                        <view class="tdText2">
                            <text>无限次数写卡</text>
                        </view>
                        <view class="tdText">
                            <text>极速写卡</text>
                        </view>
                    </view>
                    <view class="td orUserText">
                        <view class="tdText1" v-for="(item, index) in listData" :key="index">
                            <icon :class="item.text"></icon>
                        </view>
                    </view>
                    <view class="td vipUserText">
                        <view class="tdText1" v-for="(item, index) in listData" :key="index">
                            <icon :class="item.type"></icon>
                        </view>
                    </view>
                </view>
            </view>
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
            listData: [
                {
                    code: '云解码读卡',
                    text: 'right',
                    type: 'right'
                },
                {
                    code: '云存储卡包',
                    text: 'right',
                    type: 'right'
                },
                {
                    code: '读卡额日限<50张\n间隔<60秒',
                    text: 'right',
                    type: 'right'
                },
                {
                    code: '读卡额日限<100张\n间隔<30秒',
                    text: 'error',
                    type: 'right'
                },
                {
                    code: '无限次数写卡',
                    text: 'error',
                    type: 'right'
                },
                {
                    code: '极速写卡',
                    text: 'error',
                    type: 'right'
                }
            ],
            products: ''
        };
    },
    onLoad: function (t) {},
    onReady: function () {},
    onShow: function () {
        t.checkToken(this);
        var that = this;
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Product/monthCard',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (t) {
                console.log('请求的数据是' + JSON.stringify(t));
                var o = t.data;
                o.forEach(function (e) {
                    e.checked = false;
                    t.data[0].checked = true;
                });
                that.setData({
                    products: t.data
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
        buy: function (e) {
            for (var o = e.currentTarget.dataset.id, n = this.products, a = 0; a < n.length; a++) {
                this.products[a].checked = false;
            }

            this.products[o].checked = true;
            this.setData({
                products: this.products
            });
            for (var c = -1, i = this.products, r = 0; r < i.length; r++) {
                if (i[r].checked) {
                    c = i[r].product_price;
                    var s = i[r].id;
                    break;
                }
            }

            if (-1 == c) {
                console.log('啥都没选');
            } else {
                console.log('我想购买: ' + c);
                console.log('商品的id是: ' + s);
                var p = t.getPhone();
                var d = t.obtain(this);
                console.log('手机号是: ' + p);
                uni.request({
                    url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Openvipwxconfig/prepayId',
                    data: {
                        phone: p,
                        total_fee: c,
                        product_id: s,
                        token: d
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
                                console.log('支付成功！');
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
@import './buy.css';
</style>
