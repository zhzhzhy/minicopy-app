<template>
    <view>
        <view>
            <devicebar :showcontent="true">
                <master></master>
            </devicebar>
        </view>
        <view :class="'container-tag-info ' + taginfo.style" v-if="taginfo">
            <view class="container-dump-nick">
                <view class="txt-dump-nick">{{ taginfo.nick }}</view>
                <view @tap="onUserEditNameCall" class="btn-edit-name"></view>
            </view>
            <view class="container-info-details">
                <view forItem="item" v-for="(item, index) in taginfo.detail" :key="index">
                    <view class="txt-tag-info-detail">{{ item }}</view>
                </view>
            </view>
        </view>
        <view class="container-center-button">
            <view v-for="(item, index) in btnList" :key="index">
                <view class="container-center-item">
                    <van-cell
                        isLink
                        @tap.native="item.bindtap"
                        :border="false"
                        :title="item.title"
                        titleStyle="color:#333333;font-size:30rpx;letter-spacing:2rpx;font-weight:400;"
                        :value="item.value"
                    ></van-cell>
                </view>
            </view>
        </view>
        <view class="container-bottom-button">
            <van-button
                @tap.native="onUserGotoWriteTagCall"
                customStyle="width:160px;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                type="primary"
            >
                前往写卡
            </van-button>
        </view>
        <save-data
            @cancel="onUserCancelNameEdit"
            @confirm="onUserConfirmNameEdit"
            :show="nameEditor.showNameEditor"
            theme="light"
            title="保存数据"
            :value="nameEditor.defaultName"
        ></save-data>
    </view>
</template>

<script>
import vanCell from '../../miniprogram_npm/@vant/weapp/cell/index';
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import devicebar from '@/components/device-tab-bar/device';
import master from '@/components/switch-master-mode/master';
import saveData from '../../components/dialog-tag-nick-editor/editor';
var a = require('../../3E90FCB755C842DF58F694B049818C74.js');

var t = require('../../8473358655C842DFE2155D813E918C74.js');

var e = require('../../4F97F14255C842DF29F19945DB418C74.js');

var i = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanCell,
        vanButton,
        devicebar,
        master,
        saveData
    },
    data() {
        return {
            btnList: [
                {
                    title: '修改数据',
                    value: '',
                    bindtap: 'onDataEditCall'
                },
                {
                    title: '复制数据',
                    value: '',
                    bindtap: 'onDataCopyCall'
                },
                {
                    title: '分享数据',
                    value: '',
                    bindtap: 'onDataShareCall'
                },
                {
                    title: '数据分析',
                    value: '',
                    bindtap: 'onDataAnalysisCall'
                },
                {
                    title: '删除卡片',
                    value: '',
                    bindtap: 'onDataDumpDelCall'
                }
            ],

            nameEditor: {
                showNameEditor: false,
                defaultName: ''
            },

            taginfo: {
                style: '',
                nick: '',
                detail: []
            }
        };
    },
    onLoad: function (a) {
        this.uuid = a.id;
        console.log('卡包详情页接收到的DUMP序号是: ' + this.uuid);
    },
    onShow: function () {
        this.dumpinfo = a.getCardDataDumpInfo(this.uuid);
        var t = a.getStorageSyncHasDefault('dump_nicks', {});
        var e = this.dumpinfo.tag_info;
        this.setData({
            taginfo: {
                nick: t[this.uuid],
                style: this.createInfoStyle(e),
                detail: this.createInfoDetail(e)
            }
        });
    },
    methods: {
        onDataEditCall: function () {
            uni.navigateTo({
                url: '/pages/device-master-mode/index?' + 'uuid='.concat(this.uuid)
            });
        },

        getTagDataFromMifareTag: function () {
            for (var a = '', t = 0; t < this.dumpinfo.tag_data.length; t++) {
                a += ''.concat(e.bytes2hex(this.dumpinfo.tag_data[t]), '\n');
            }

            return a;
        },

        getTagDataFromEm410xTag: function () {
            return this.dumpinfo.tag_info.uid_hex;
        },

        onDataCopyCall: function () {
            var a = null;

            switch (this.dumpinfo.tag_info.tag_type) {
                case t.TAG_TYPE_HF_14443A:
                    break;

                case t.TAG_TYPE_MF1_GEN1A:
                case t.TAG_TYPE_MF1_MAYBE:
                case t.TAG_TYPE_MF1_STDHD:
                case t.TAG_TYPE_MF1_STDST:
                case t.TAG_TYPE_MF1_STDWK:
                    a = this.getTagDataFromMifareTag();
                    break;

                case t.TAG_TYPE_LF_EM410X:
                    a = this.getTagDataFromEm410xTag();
            }

            if (null != a) {
                uni.setClipboardData({
                    data: a,
                    success: function (a) {
                        i.showToast('数据复制成功');
                    }
                });
            } else {
                i.showToast('无数据可复制');
            }
        },

        onDataDumpDelCall: function () {
            var that = this;
            uni.showModal({
                content: '是否确认删除此卡片',
                success: function (e) {
                    if (e.confirm) {
                        var i = that.uuid;
                        a.deleteDumpFilesByID(i);
                        var n = a.getStorageSyncHasDefault('dump_nicks', {});
                        delete n[i];
                        uni.setStorageSync('dump_nicks', n);
                        uni.navigateBack();
                    }
                }
            });
        },

        onUserGotoWriteTagCall: function () {
            if (i.isLogin()) {
                var t = this.uuid;

                if (a.loadFile2DataBuffer(t)) {
                    if (e.isBLEDeviceIsConnected()) {
                        uni.navigateTo({
                            url: '/pages/device-card-write-ready/write'
                        });
                    } else {
                        i.showToast('设备没有连接');
                    }
                } else {
                    i.showToast('加载数据失败');
                }
            } else {
                uni.navigateTo({
                    url: '/pages/user-login-onekey/login'
                });
            }
        },

        onDataShareCall: function () {
            i.showToast('正在开发中');
        },

        onDataAnalysisCall: function () {
            i.showToast('正在开发中');
        },

        onUserEditNameCall: function () {
            this.nameEditor.showNameEditor = true;
            this.nameEditor.defaultName = this.taginfo.nick;
            this.setData({
                nameEditor: this.nameEditor
            });
        },

        dissmissNameEditorDialog: function () {
            this.nameEditor.showNameEditor = false;
            this.setData({
                nameEditor: this.nameEditor
            });
        },

        onUserCancelNameEdit: function () {
            this.dissmissNameEditorDialog();
        },

        onUserConfirmNameEdit: function (t) {
            var e = a.getStorageSyncHasDefault('dump_nicks', {});
            e[this.uuid] = t.detail.dumpName;
            uni.setStorageSync('dump_nicks', e);
            this.dissmissNameEditorDialog();
            this.taginfo.nick = t.detail.dumpName;
            this.setData({
                taginfo: this.taginfo
            });
            i.showToast('修改成功！');
        },

        dateFormat: function (a) {
            var t = new Date(a);
            return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
        },

        createInfoDetail: function (a) {
            var e = [];

            switch (a.tag_type) {
                case t.TAG_TYPE_HF_14443A:
                    break;

                case t.TAG_TYPE_MF1_GEN1A:
                case t.TAG_TYPE_MF1_MAYBE:
                case t.TAG_TYPE_MF1_STDHD:
                case t.TAG_TYPE_MF1_STDST:
                case t.TAG_TYPE_MF1_STDWK:
                    e.push('类型: IC卡');
                    e.push('UID: '.concat(a.uid_hex));
                    e.push('SAK: '.concat(a.sak_hex, ' ATQA: ').concat(a.atqa_hex));

                    if ('ats_hex' in a) {
                        e.push('ATS: '.concat(a.ats_hex));
                    }

                    break;

                case t.TAG_TYPE_LF_EM410X:
                    e.push('类型: ID卡');
                    e.push('卡号: '.concat(a.uid_hex));
            }

            e.push('创建时间: '.concat(this.dateFormat(this.dumpinfo.tag_date)));
            return e;
        },

        createInfoStyle: function (a) {
            switch (a.tag_type) {
                case t.TAG_TYPE_HF_14443A:
                    break;

                case t.TAG_TYPE_MF1_GEN1A:
                case t.TAG_TYPE_MF1_MAYBE:
                case t.TAG_TYPE_MF1_STDHD:
                case t.TAG_TYPE_MF1_STDST:
                case t.TAG_TYPE_MF1_STDWK:
                    return 'bg-tag-info-type-ic';

                case t.TAG_TYPE_LF_EM410X:
                    return 'bg-tag-info-type-id';
            }

            return '';
        }
    }
};
</script>
<style>
@import './info.css';
</style>
