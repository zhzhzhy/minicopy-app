<template>
    <view class="container-main">
        <view class="container-dump-list">
            <devicebar :showcontent="true" v-if="showView == 0">
                <master></master>
            </devicebar>
            <view class="container-list-scroll" v-if="show == true">
                <view @tap="onDumpItemClick" class="contents" :data-id="index" v-for="(item, index) in list" :key="index">
                    <view class="block">
                        <view :class="item.type == 'IC卡' ? 'picView' : 'picView1'">
                            <text class="type">{{ item.type }}</text>
                        </view>
                        <view class="name">
                            <text>{{ item.nick }}</text>
                        </view>
                        <view class="code">
                            <text>{{ item.type }}</text>
                        </view>
                        <view class="rightArrow">
                            <image class="rightArrowImg" src="/static/static/img/rightArrow.png" v-if="showView == 0"></image>
                            <radio :checked="item.checked" class="rightArrowImg" v-if="showView == 1"></radio>
                        </view>
                    </view>
                </view>
            </view>
            <view v-if="show == false">
                <view class="noneCard">
                    <image class="noneCardImg" src="/static/static/img/noneCard.png"></image>
                    <view class="noneCardText">
                        <text>{{ cardType == '' ? '暂无卡片' : cardType == 'IC' ? '暂无IC卡' : '暂无ID卡' }}</text>
                    </view>
                </view>
                <view class="addCard" v-if="show == false && cardType == ''">
                    <van-button
                        @tap.native="addCard"
                        customStyle="width:40%;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                        type="primary"
                    >
                        <icon class="addBtn"></icon>
                        添加卡片
                    </van-button>
                </view>
            </view>
        </view>
        <view v-if="show == true || cardType == 'IC' || cardType == 'ID'">
            <view class="bottomBtn" v-if="showView == 1">
                <button @tap="openData" :class="list.length <= 0 ? 'prohibit' : 'noProhibit'">打开数据</button>
            </view>
        </view>
        <view class="default-tab-bar-height" v-if="showView == 0"></view>
        <add-card @cancel="bottomBtnCancel" @confirm="bottomBtnConfirm" :showDailog="showModal"></add-card>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import vanActionSheet from '../../miniprogram_npm/@vant/weapp/action-sheet/index';
import devicebar from '@/components/device-tab-bar/device';
import master from '@/components/switch-master-mode/master';
import addCard from '@/components/dialog-add-card/index';
var t = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

var a = require('../../3E90FCB755C842DF58F694B049818C74.js');

var e = require('../../8473358655C842DFE2155D813E918C74.js');

export default {
    components: {
        vanButton,
        vanActionSheet,
        devicebar,
        master,
        addCard
    },
    data() {
        return {
            imgUrl: ['/static/static/img/logo.jpg'],
            list: [],
            show: false,
            index: -1,
            showModal: false,
            modelBackground: 'IC卡'
        };
    },
    props: {
        showView: {
            type: String,
            default: '0'
        },
        cardType: {
            type: String,
            default: ''
        }
    },
    watch: {
        showView: {
            handler: function (t) {
                console.log('新的值是' + t);
            },

            immediate: true,
            deep: true
        }
    },
    onPageShow: function () {
        this.saveData();
    },
    methods: {
        saveData: function () {
            var t = a.getCardDataFileList();
            var i = a.getStorageSyncHasDefault('dump_nicks', {});
            if (null == i || '{}' == JSON.stringify(i)) {
                console.log('没有任何缓存数据');
                this.setData({
                    show: false
                });
                return false;
            }

            var s = [];

            if (t.length > 0) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o];
                    var d = a.getCardDataDumpInfo(n);
                    if ('' == this.cardType);
                    else if ('IC' == this.cardType) {
                        if ('IC卡' == (d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? 'ID卡' : 'IC卡')) {
                            s.push({
                                nick: i[n],
                                type: d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? 'ID卡' : 'IC卡',
                                checked: false,
                                uuid: n
                            });
                            this.setData({
                                show: true
                            });
                        }
                    } else if ('ID' == this.cardType) {
                        if ('ID卡' == (d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? 'ID卡' : 'IC卡')) {
                            s.push({
                                nick: i[n],
                                type: d.tag_info.tag_type == e.TAG_TYPE_LF_EM410X ? 'ID卡' : 'IC卡',
                                checked: false,
                                uuid: n
                            });
                            this.setData({
                                show: true
                            });
                        }
                    }
                }

                this.setData({
                    list: s
                });
            } else {
                this.setData({
                    show: false
                });
            }
        },
        addCard: function () {
            this.setData({
                showModal: true
            });
        },
        bottomBtnCancel: function () {
            this.setData({
                showModal: false
            });
        },
        bottomBtnConfirm: function (a) {
            var e = a.detail;

            if (t.newCard(e).isok) {
                this.setData({
                    showModal: false
                });
                this.saveData();
            }
        },
        onDumpItemClick: function (t) {
            var e = this.showView;
            var i = t.currentTarget.dataset.id;
            if ('0' == e) {
                var s = a.getCardDataFileList();
                uni.navigateTo({
                    url: '/pages/card-wallet-info/info?id=' + s[i]
                });
            } else if ('1' == e) {
                if (1 == this.list[i].checked) {
                    this.list[i].checked = false;
                    return void this.setData({
                        list: this.list,
                        index: -1
                    });
                }

                for (var o = 0; o < this.list.length; o++) {
                    this.list[o].checked = false;
                }

                this.list[i].checked = true;
                this.setData({
                    list: this.list,
                    index: i
                });
            }
        },
        openData: function () {
            if (!(this.list.length <= 0)) {
                var a = this.index;
                console.log('index == ' + a);

                if (-1 != a) {
                    var e = this.list;
                    this.$emit('selected', {
                        detail: e[a].uuid
                    });
                } else {
                    t.showToast('请选择需要打开的数据');
                }
            }
        }
    }
};
</script>
<style>
@import './card-wallet-list.css';
</style>
