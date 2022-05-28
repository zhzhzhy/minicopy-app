<template>
    <view>
        <view>
            <view @tap="get" class="data1">数据1：{{ nick1 }}</view>
            <view @tap="repare" class="data2">数据2：{{ nick2 }}</view>
            <view class="line" style="margin-top: 40rpx; margin-bottom: 25rpx"></view>
            <view class="block" :data-id="key" v-for="(item, key) in baseList" :key="key">
                <view class="block0Title">
                    扇区：
                    <text>{{ item.sector }}</text>
                    <text :decode="true">&nbsp; | &nbsp;</text>
                    块：
                    <text>{{ item.block }}</text>
                </view>

                <view class="identical" v-if="item.same">相同</view>

                <view class="dataBlock">
                    <rich-text :nodes="item.data[0]" style="margin-top: -200rpx"></rich-text>
                    <view class="rich_text_top"></view>
                    <rich-text :nodes="item.data[1]"></rich-text>
                </view>

                <view class="line" style="margin-top: 35rpx"></view>
            </view>
        </view>
    </view>
</template>

<script>
import vanSwitch from '../../miniprogram_npm/@vant/weapp/switch/index';
var a = require('../../3E90FCB755C842DF58F694B049818C74.js');

var t = require('../../4F97F14255C842DF29F19945DB418C74.js');

export default {
    components: {
        vanSwitch
    },
    data() {
        return {
            baseList: [],
            nick1: '',
            nick2: ''
        };
    },
    onLoad: function (n) {
        console.log('数据对比的options是' + JSON.stringify(n));
        var e = n.uuid1;
        var r = n.uuid2;
        var s = a.getStorageSyncHasDefault('dump_nicks', {});
        this.setData({
            nick1: s[e],
            nick2: s[r]
        });

        for (
            var o = a.getCardDataDumpInfo(e).tag_data, i = a.getCardDataDumpInfo(r).tag_data, c = this.getDataHexArray(o), u = this.getDataHexArray(i), l = [], f = 0;
            f < c.length;
            f++
        ) {
            for (var d = c[f], g = u[f], p = f, h = t.mifare_block_2_sector(p), D = '', k = '', v = true, y = 0; y < d.length; y++) {
                var b = d[y];
                var _ = g[y];
                if (b != _) {
                    D += '<span style="background: red;">'.concat(b, '</span>');
                    k += '<span style="background: red;">'.concat(_, '</span>');
                    v = false;
                } else {
                    D += b;
                    k += _;
                }
            }

            var m = '<span style="color: #f5a200;">1：</span>' + D;
            var H = '<span>2：</span>' + k;
            l.push({
                sector: h,
                block: p,
                data: [m, H],
                same: v
            });
        }

        this.setData({
            baseList: l
        });
    },
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    methods: {
        getDataHexArray: function (a) {
            if (null == a || null == a) {
                return null;
            }

            if (0 == a.length) {
                return null;
            }

            var n = [];
            a.forEach(function (a) {
                var e = t.bytes2hex(a);
                n.push(e);
            });
            return n;
        },

        get() {
            console.log('占位：函数 get 未声明');
        },

        repare() {
            console.log('占位：函数 repare 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
