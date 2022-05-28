<template>
    <view style="width: 100%; height: 100%; display: flex; flex-direction: column">
        <view class="top-tab-container">
            <view @tap="onTabClick" class="top-tab-item" :data-id="item.index" v-for="(item, index) in pageMaps" :key="index">
                <text class="top-tab-title" :style="item.show ? 'color: #FFFFFF' : ''">{{ item.title }}</text>

                <view class="top-tab-badge" :style="'background: ' + (item.show ? '#F5A200' : 'none') + ';'"></view>
            </view>
        </view>
        <view class="container-main-view">
            <view class="container-main-top">
                <view class="container-left-content">
                    <view class="container-left-title-main">
                        <block v-if="leftTaskStatus.status == 0"></block>
                        <block v-if="leftTaskStatus.status == 1">
                            <icon class="left-title-fail-icon"></icon>
                            <text class="left-title-main-base left-title-main-fail">{{ leftTaskStatus.message }}</text>
                        </block>
                        <block v-if="leftTaskStatus.status == 2">
                            <icon class="left-title-succ-icon"></icon>
                            <text class="left-title-main-base left-title-main-succ">{{ leftTaskStatus.message }}</text>
                        </block>
                        <block v-if="leftTaskStatus.status == 3">
                            <van-loading size="15px" type="spinner"></van-loading>
                            <text class="left-title-main-base left-title-main-run">{{ leftTaskStatus.message }}</text>
                        </block>
                        <view class="left-title-main-base left-title-main-nick" v-if="leftTaskStatus.status == 4">{{ leftTaskStatus.message }}</view>
                    </view>
                    <view class="container-left-tag-info">
                        <view class="container-left-info-main" :style="'display: ' + (pageMaps.page14443A.show ? 'flex' : 'none') + ';'">
                            <view class="container-left-tag-detail" :style="'visibility: ' + (taginfo ? 'visiable' : 'hidden') + ';'">
                                <view @tap="onCopyUIDBtnClickCall" class="left-tag-detail-uid">{{ taginfo.uid ? '卡号：' : '' }}{{ taginfo.uid }}</view>
                                <view class="container-left-tag-detail-type">
                                    <text class="left-tag-detail-type-item" v-for="(type, index) in taginfo.types" :key="index">{{ type }}</text>
                                </view>
                            </view>
                            <view @tap="onShowAllKeysGroupClick" class="container-left-tag-detail" v-if="keyGroup">
                                <view style="width: 100%; margin-top: 20rpx" v-for="(keyList, indexList) in keyGroup" :key="indexList">
                                    <view
                                        :style="
                                            'display: ' +
                                            (keyGroup.length == 1 || (keyGroup.length > 1 && (indexList == 0 || showAllKeysGroup)) ? 'flex' : 'none') +
                                            '; flex-direction: row;'
                                        "
                                    >
                                        <view style="height: 96rpx; display: flex; flex-direction: column">
                                            <text class="key-get-status-top-index"></text>
                                            <text class="key-get-status-left-type">KEYA</text>
                                            <text class="key-get-status-left-type">KEYB</text>
                                        </view>
                                        <view style="height: 96rpx; display: flex; flex-direction: row; margin-left: 10rpx">
                                            <view class="container-left-tag-keys-item" v-for="(keyItem, indexItem) in keyList" :key="indexItem">
                                                <text class="key-get-status-top-index">{{ keyItem.sector }}</text>

                                                <view :class="keyItem.keya != null ? 'keys-get-status-ok-icon' : 'key-get-status-checkbox'"></view>

                                                <view :class="keyItem.keyb != null ? 'keys-get-status-ok-icon' : 'key-get-status-checkbox'"></view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view
                                    :class="showAllKeysGroup ? 'keys-list-close-icon' : 'keys-list-open-icon'"
                                    style="margin-left: auto; margin-right: auto; margin-top: 20rpx"
                                    v-if="keyGroup.length > 1"
                                ></view>
                            </view>
                            <view class="container-left-tag-data">
                                <view class="container-mifare-data-base container-mifare-data-title">
                                    <text class="container-mifare-data-sector">扇区</text>
                                    <text class="container-mifare-data-block">块</text>
                                    <text class="container-mifare-data-hex">数据</text>
                                </view>
                                <view class="container-mifare-data-base container-mifare-data-datas">
                                    <view
                                        @tap="onUserClickEditData"
                                        class="container-mifare-data-item"
                                        :data-id="key"
                                        hoverClass="right-button-item-hover"
                                        hoverStartTime="10"
                                        hoverStayTime="100"
                                        v-for="(item, key) in dataList"
                                        :key="key"
                                    >
                                        <view class="container-mifare-data-sector">
                                            <text class="mifare-data-block-font mifare-data-index-number">{{ item.sector }}</text>
                                        </view>

                                        <view class="container-mifare-data-block">
                                            <text class="mifare-data-block-font mifare-data-index-number">{{ item.block }}</text>
                                        </view>

                                        <view class="container-mifare-data-hex">
                                            <text class="mifare-data-block-font mifare-data-block-manufacturer" v-if="item.type == 0">{{ item.data }}</text>
                                            <text class="mifare-data-block-font mifare-data-block-userdata" v-if="item.type == 1">{{ item.data }}</text>
                                            <block v-if="item.type == 2">
                                                <text class="mifare-data-block-font mifare-data-block-trail-keya">{{ item.data.keya }}</text>
                                                <text class="mifare-data-block-font mifare-data-block-trail-ctl">{{ item.data.ctl }}</text>
                                                <text class="mifare-data-block-font mifare-data-block-trail-keyb">{{ item.data.keyb }}</text>
                                            </block>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="container-left-info-main" :style="'display: ' + (pageMaps.pageEM410X.show ? 'flex' : 'none') + ';'">
                            <view class="container-left-tag-detail" :style="'visibility: ' + (taginfo ? 'visiable' : 'hidden') + ';'">
                                <view @tap="onUserClickEditID" class="left-tag-detail-uid">
                                    <text>卡号：{{ taginfo.uid }}</text>
                                    <icon class="icon-uid-edit" style="margin-left: 10rpx"></icon>
                                </view>
                                <view class="left-tag-detail-uid" style="margin-top: 20rpx">类型：{{ taginfo.uid ? 'ID卡' : '' }}</view>
                            </view>
                            <view class="container-left-id-copy">
                                <icon class="icon-uid-copy"></icon>
                                <text @tap="onCopyUIDBtnClickCall" class="txt-uid-copy">复制卡号</text>
                            </view>
                            <image src="/static/static/img/image6.png" style="width: 100%; flex: 1"></image>
                        </view>
                    </view>
                </view>
                <view class="container-right-buttons">
                    <view
                        @tap="item.bindtap"
                        class="container-right-button-item"
                        hoverClass="right-button-item-hover"
                        hoverStartTime="10"
                        hoverStayTime="50"
                        :style="item.disabled ? 'pointer-events: none;' : ''"
                        v-for="(item, index) in rightButtonList"
                        :key="index"
                    >
                        <image class="right-button-item-img" :src="'/static/img/' + item.img + '.png'" :style="'opacity:' + (item.disabled ? '0.3' : '1')"></image>

                        <view class="right-button-item-text" :disabled="item.disabled">{{ item.text }}</view>
                    </view>
                </view>
            </view>
            <view class="container-main-bottom"></view>
        </view>
        <data-editor
            @cancel="onCloseDataEditor"
            @close="onCloseDataEditor"
            @confirm="onConfirmDataEdit"
            :block="dataEditor.block"
            :mode="dataEditor.mode"
            :sector="dataEditor.sector"
            :show="dataEditor.show"
            :value="dataEditor.data"
        ></data-editor>
        <firm-editor
            @cancel="onCloseFirmEditor"
            @close="onCloseFirmEditor"
            @confirm="onConfirmFirmEdit"
            :show="firmEditor.show"
            :size="firmEditor.size"
            :value="firmEditor.data"
        ></firm-editor>
        <save-data @cancel="onUserSaveDataCancel" @confirm="nickEditor.onConfirmCall" :show="nickEditor.show" theme="dark" :title="nickEditor.title"></save-data>
        <write-progress @cancel="" @close="" :progress="writeProgress.progress" :show="writeProgress.show" :title="writeProgress.title"></write-progress>
        <write-result
            @cancel="onUserCloseWriteResultDialog"
            @close="onUserCloseWriteResultDialog"
            @complete="onUserCloseWriteResultDialog"
            @retry="onUserRetryWriteTagClick"
            :show="writeResult.show"
            :success="writeResult.success"
            :titleMain="writeResult.titleMain"
            :titleSub="writeResult.titleSub"
        ></write-result>
        <message-dark
            @cancel="messageBox.cancelCall"
            @close="messageBox.closeCall"
            @confirm="messageBox.confirmCall"
            :cancelText="messageBox.cancelText"
            :confrimText="messageBox.confirmText"
            :content="messageBox.content"
            :maxlength="messageBox.maxlength"
            :mode="messageBox.mode"
            :placeholder="messageBox.placeholder"
            :show="messageBox.show"
            :title="messageBox.title"
            :value="messageBox.value"
        ></message-dark>
        <dialog-buy-service :contentColor="2" :showView="modal"></dialog-buy-service>
        <backitp @back="onUserBack" :canback="false"></backitp>
    </view>
</template>

<script>
import vanLoading from '../../miniprogram_npm/@vant/weapp/loading/index';
import dataEditor from '@/components/dialog-m1-data-editor/editor';
import firmEditor from '@/components/dialog-m1-firm-editor/editor';
import saveData from '../../components/dialog-tag-nick-editor/editor';
import writeResult from '../../components/dialog-tag-write-result/result';
import writeProgress from '../../components/dialog-write-progress/progress';
import messageDark from '../../components/dialog-msg-box-dark/dialog';
import dialogBuyService from '@/components/dialog-buy-service/index';
import backitp from '@/components/back-intercept/back';
var t = require('../../3E90FCB755C842DF58F694B049818C74.js');

var a = require('../../8473358655C842DFE2155D813E918C74.js');

var s = require('../../4F97F14255C842DF29F19945DB418C74.js');

var e = require('../../D5AF71D355C842DFB3C919D452918C74.js');

var i = require('../../1736EF7655C842DF715087715F518C74.js');

var o = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

function n(t, a, s, e) {
    return {
        img: t,
        text: a,
        disabled: !s,
        bindtap: e
    };
}

export default {
    components: {
        vanLoading,
        dataEditor,
        firmEditor,
        saveData,
        writeResult,
        writeProgress,
        messageDark,
        dialogBuyService,
        backitp
    },
    data() {
        return {
            pageMaps: {
                page14443A: {
                    title: 'IC卡',
                    index: 0,
                    show: false
                },
                pageEM410X: {
                    title: 'ID卡',
                    index: 1,
                    show: false
                }
            },

            rightButtonList: {},

            leftTaskStatus: {
                status: 0,
                message: '无'
            },

            taginfo: {
                uid: false,
                types: []
            },

            keyGroup: [],
            showAllKeysGroup: false,
            dataList: [],

            dataEditor: {
                sector: 0,
                block: 0,
                data: '',
                show: false,
                mode: 0
            },

            firmEditor: {
                size: 4,
                data: '',
                show: false
            },

            nickEditor: {
                show: false,
                title: '',
                onConfirmCall: ''
            },

            writeProgress: {
                show: false,
                title: '正在写卡...',
                progress: 0
            },

            writeResult: {
                show: false,
                success: true,
                titleMain: '',
                titleSub: ''
            },

            messageBox: {
                show: false,
                mode: 'msg',
                title: '',
                content: '',
                confirmText: '是',
                cancelText: '否',
                maxlength: -1,
                value: '',
                placeholder: '',
                closeCall: 'onCloseMessageBox',
                cancelCall: 'onCloseMessageBox',
                confirmCall: ''
            },

            modal: false,
            vip: '',
            type: '',
            keyList: [],

            keyItem: {
                sector: '',
                keya: '',
                keyb: ''
            }
        };
    },
    onLoad: function (i) {
        e.registerOnAttackKeysCbk(this.onMF1AttackCallback);
        a.onTagErrorCallback(this.onTagErrorCallback);
        s.onComErrCallback(this.onBleComErrorCallback);
        s.onTimeoutCallback(this.onBleComTimeoutCallback);
        s.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback);
        this.dumpUUID = null;
        this.dumpSaved = true;
        this.wipeTagMode = false;
        this.isDumpSaveAs = false;
        this.taskStatus = 0;

        if ('uuid' in i) {
            this.dumpUUID = i.uuid;
            t.loadFile2DataBuffer(i.uuid);
            var o = {};
            o[a.TAG_TYPE_HF_14443A] = 0;
            o[a.TAG_TYPE_MF1_GEN1A] = 0;
            o[a.TAG_TYPE_MF1_MAYBE] = 0;
            o[a.TAG_TYPE_MF1_STDHD] = 0;
            o[a.TAG_TYPE_MF1_STDST] = 0;
            o[a.TAG_TYPE_MF1_STDWK] = 0;
            o[a.TAG_TYPE_LF_EM410X] = 1;
            var n = o[a.getTagInformation().tag_type];
            this.showPageByIndex(n, {
                showdata: true
            });
        } else if ('pageIndex' in i) {
            var r = i.pageIndex;

            if (null == r) {
                r = 0;
            } else {
                r = parseInt(r);
            }

            this.showPageByIndex(r, {
                showdata: true
            });
        } else {
            this.showPageByIndex(0);
            this.setDefaultKeysInfo();
        }
    },
    onUnload: function () {
        e.unregisterOnAttackKeysCbk(this.onMF1AttackCallback);
        s.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback);
        a.onTagErrorCallback(null);
        s.onComErrCallback(null);
        s.onTimeoutCallback(null);
    },
    methods: {
        rightButtonListForIC: {
            btnStartRead: n('exRead', '读IC卡', true, 'onStartReadICTagClickCall'),
            btnStartWrite: n('exWrite', '写IC卡', false, 'onStartWriteTagClickCall'),
            btnStartWipe: n('clearMaster', '清空卡', true, 'onStartWipeTagClickCall'),
            btnSaveDump: n('exSave', '保存数据', false, 'onSaveDumpToCardWallet'),
            btnSaveDumpNew: n('exSaveAs', '另存数据', false, 'onSaveDumpCardWalletAs'),
            btnOpenDump: n('exOpen', '打开数据', true, 'onOpenDumpClickCall'),
            btnDataEqual: n('exContrast', '数据对比', false, 'onDataFindEqual'),
            btnNewDumpForTemplate: n('exAdd', '新建数据', true, 'onICDataDumpNew'),
            btnShareDump: n('exShare', '分享数据', false, 'exShare'),
            btnKeysManager: n('exCode', '密码管理', false, 'exCode')
        },

        rightButtonListForID: {
            btnStartRead: n('read_id', '读ID卡', true, 'onStartReadIDTagClickCall'),
            btnStartWrite: n('write_id', '写ID卡', false, 'onStartWriteTagClickCall'),
            btnSaveDump: n('save_id', '保存卡号', false, 'onSaveDumpToCardWallet'),
            btnSaveDumpNew: n('saveas_id', '另存卡号', false, 'onSaveDumpCardWalletAs'),
            btnOpenDump: n('exOpen', '打开卡片', true, 'onOpenDumpClickCall'),
            btnNewDumpForTemplate: n('add_id', '新建卡号', true, 'onIDDataDumpNew'),
            btnShareDump: n('share_id', '分享卡号', false, 'exShare')
        },

        showPageByIndex: function (t, a) {
            if (this.pageMaps.page14443A.show) {
                this.setDefaultKeysInfo();
            }

            a || (a = {});
            for (var s = Object.keys(this.pageMaps), e = 0; e < s.length; e++) {
                var i = this.pageMaps[s[e]];

                if (i.show && i.index == t) {
                    return void console.log('选中的页面已经是显示状态，不重复触发显示过程！');
                }

                if (i.index == t) {
                    i.show = true;
                } else {
                    i.show = false;
                }
            }

            var o = {};
            o[this.pageMaps.page14443A.index] = this.rightButtonListForIC;
            o[this.pageMaps.pageEM410X.index] = this.rightButtonListForID;
            this.leftTaskStatus.status = 0;
            this.setData(
                {
                    pageMaps: this.pageMaps,
                    rightButtonList: o[t],
                    leftTaskStatus: this.leftTaskStatus,
                    taginfo: null,
                    dataList: null
                },
                function () {
                    if ('showdata' in a && a.showdata) {
                        this.showDataByMemory();
                    } else {
                        this.setTagReadingStatus(0);
                    }
                }
            );
        },

        getTabShow: function () {
            for (var t = Object.keys(this.pageMaps), a = 0; a < t.length; a++) {
                var s = this.pageMaps[t[a]];

                if (s.show) {
                    return s;
                }
            }

            return null;
        },

        changeTab: function (t) {
            var a = this.getTabShow();
            var s = true;
            if (null != a) {
                s = a.index != t;
            }

            if (s) {
                this.showPageByIndex(t);
            }
        },

        onTabClick: function (t) {
            var that = this;
            var s = t.currentTarget.dataset.id;
            if (this.isNoTaskRunning()) {
                if (!this.dumpSaved) {
                    this.showDataSaveDialog(function () {
                        that.changeTab(s);
                    });
                    return false;
                }

                this.changeTab(s);
            } else {
                o.showToast('当前有任务正在运行中...');
            }
        },

        onUserBack: function (t) {
            console.log('返回事件被专家模式拦截处理');

            if (this.isNoTaskRunning()) {
                if (this.dumpSaved) {
                    t.detail.goBack();
                } else {
                    this.showDataSaveDialog(function () {
                        t.detail.goBack();
                    });
                }
            }
        },

        setMainTitle: function (t) {
            if (null == t) {
                this.leftTaskStatus.status = 0;
                this.leftTaskStatus.message = '';
            } else {
                this.leftTaskStatus.status = t.status;
                this.leftTaskStatus.message = t.message;
            }

            this.setData({
                leftTaskStatus: this.leftTaskStatus
            });
        },

        setTagInfo: function (t) {
            if (null == t || null == t) {
                this.setData({
                    taginfo: null
                });
                return void console.log('信息为空');
            }

            var s = [];
            var e = 'Unknown';
            var i = true;
            switch (t.tag_type) {
                case a.TAG_TYPE_HF_14443A:
                    e = '14443A';
                    i = false;
                    break;

                case a.TAG_TYPE_MF1_MAYBE:
                    e = '可能是M1卡';
                    break;

                case a.TAG_TYPE_MF1_GEN1A:
                    e = 'Gen1A后门卡';
                    break;

                case a.TAG_TYPE_MF1_STDHD:
                    e = 'HardNested';
                    break;

                case a.TAG_TYPE_MF1_STDST:
                    e = 'StaticNested';
                    break;

                case a.TAG_TYPE_MF1_STDWK:
                    e = '普通M1';
            }

            s.push(e);

            if (i && 'max_block' in t) {
                if (t.max_block <= 20) {
                    s.push('Mini');
                } else {
                    if (t.max_block <= 63) {
                        s.push('S50');
                    } else {
                        if (t.max_block < 128) {
                            s.push(''.concat(t.max_block, 'BLOCK'));
                        } else {
                            if (128 == t.max_block) {
                                s.push('2K');
                            } else {
                                if (t.max_block > 128 && 256 != a.max_block) {
                                    s.push(''.concat(t.max_block, 'BLOCK'));
                                } else {
                                    if (256 == a.max_block) {
                                        s.push('S70');
                                    } else {
                                        s.push(''.concat(t.max_block, 'BLOCK'));
                                    }
                                }
                            }
                        }
                    }
                }
            }

            s.push('SAK: '.concat(t.sak_hex));
            s.push('ATQA: '.concat(t.atqa_hex));

            if ('ats_hex' in t) {
                s.push('ATS: '.concat(t.ats_hex));
            }

            this.setData({
                taginfo: {
                    uid: t.uid_hex,
                    types: s
                }
            });
        },

        setKeysInfo: function (t) {
            if (null != t) {
                for (var a = [], e = Object.keys(t), i = 0; i < e.length; i++) {
                    var o = e[i];
                    var n = t[o];
                    a.push({
                        sector: o,
                        keya: n.keya,
                        keyb: n.keyb
                    });
                }

                var r = s.chunkArray(a, 16);
                this.setData({
                    keyGroup: r
                });
            } else {
                this.setData({
                    keyGroup: null
                });
            }
        },

        onShowAllKeysGroupClick: function () {
            if (Array.isArray(this.keyGroup) && this.keyGroup.length > 1) {
                this.setData({
                    showAllKeysGroup: !this.showAllKeysGroup
                });
            }
        },

        setDataInfo: function (t) {
            if (null == t || null == t) {
                if (null != this.dataList) {
                    this.setData({
                        dataList: null
                    });
                }
            } else {
                if (0 == t.length) {
                    return;
                }

                var a = [];
                t.forEach(function (t, e) {
                    var i;
                    var o;
                    if (0 == e);
                    else if (s.mifare_is_trailer_blk(e)) {
                        var n = s.bytes2hex(t);
                        i = {
                            keya: n.slice(0, 12),
                            ctl: n.slice(12, 20),
                            keyb: n.slice(20, 32)
                        };
                        o = 2;
                    } else {
                        i = s.bytes2hex(t);
                        o = 1;
                    }
                    a.push({
                        sector: s.mifare_block_2_sector(e),
                        block: e,
                        data: i,
                        type: o
                    });
                });
                this.setData({
                    dataList: a
                });
            }
        },

        setDefaultKeysInfo: function () {
            for (var t = {}, a = 0; a < 16; a++) {
                t[a] = {
                    keya: null,
                    keyb: null
                };
            }

            this.setKeysInfo(t);
        },

        showDataByMemory: function () {
            var t = a.getTagInformation();

            switch (t.tag_type) {
                case a.TAG_TYPE_HF_14443A:
                    break;

                case a.TAG_TYPE_MF1_GEN1A:
                case a.TAG_TYPE_MF1_MAYBE:
                case a.TAG_TYPE_MF1_STDHD:
                case a.TAG_TYPE_MF1_STDST:
                case a.TAG_TYPE_MF1_STDWK:
                    this.setTagInfo(t);
                    this.setDataInfo(a.getMifareTagDatas());
                    this.setKeysInfo(a.getMifareKeysMap());
                    break;

                case a.TAG_TYPE_LF_EM410X:
                    this.setTagInfo(t);
            }

            this.setButtonEnable([this.rightButtonList.btnStartWrite, this.rightButtonList.btnSaveDumpNew, this.rightButtonList.btnDataEqual], true);

            if (null != this.dumpUUID) {
                this.setMainTitle({
                    status: 4,
                    message: o.getDumpNickNameByUUID(this.dumpUUID)
                });
            }
        },

        disableButtonExclude: function (t) {
            var that = this;
            Object.keys(that.rightButtonList).forEach(function (t) {
                that.rightButtonList[t].disabled = true;
            });
            t.forEach(function (t) {
                if (t) {
                    t.disabled = false;
                }
            });
            that.setData({
                rightButtonList: that.rightButtonList
            });
        },

        setButtonEnable: function (t, a) {
            if (Array.isArray(t)) {
                t.forEach(function (t) {
                    if (t) {
                        t.disabled = !a;
                    }
                });
            } else {
                if (t) {
                    t.disabled = !a;
                }
            }

            if (t) {
                this.setData({
                    rightButtonList: this.rightButtonList
                });
            }
        },

        onCloseDataEditor: function () {
            this.dataEditor.show = false;
            this.setData({
                dataEditor: this.dataEditor
            });
        },

        onConfirmDataEdit: function (t) {
            var e = t.detail;
            var i = s.mifare_sector_2_block(e.sector) + e.block;
            var o = a.getMifareTagDatas();
            this.dataList.forEach(function (t) {
                if (t.block == i) {
                    var a = e.data;

                    if (2 == t.type) {
                        t.data.keya = a.substr(0, 12);
                        t.data.ctl = a.substr(12, 8);
                        t.data.keyb = a.substr(20, 12);
                    } else {
                        t.data = a;
                    }
                }
            });
            this.dataEditor.show = false;
            o[i] = s.hex2bytes(e.data);
            this.setDumpToSavedStatus(false);
            this.setData({
                dataList: this.dataList,
                dataEditor: this.dataEditor
            });
        },

        onCloseFirmEditor: function () {
            this.firmEditor.show = false;
            this.setData({
                firmEditor: this.firmEditor
            });
        },

        onConfirmFirmEdit: function (t) {
            var e = t.detail.data;
            var i = a.getMifareTagDatas();
            this.dataList.forEach(function (t) {
                if (0 == t.block) {
                    t.data = e;
                }
            });
            this.firmEditor.show = false;
            i[0] = s.hex2bytes(e);
            var o = a.getTagInformation();
            o.uid_hex = t.detail.uid;
            o.sak_hex = t.detail.sak;
            o.atqa_hex = t.detail.atqa;
            console.log('新的信息: ' + JSON.stringify(o));
            this.setTagInfo(o);
            this.setDumpToSavedStatus(false);
            this.setData({
                dataList: this.dataList,
                firmEditor: this.firmEditor
            });
        },

        onUserClickEditData: function (t) {
            var that = this;
            var i = parseInt(t.currentTarget.dataset.id);
            var o = a.getTagInformation().uid_hex.length / 2;
            console.log('用户想要编辑第'.concat(i, '块。'));

            if (0 == i && 4 == o) {
                that.dataList.forEach(function (t) {
                    if (t.block == i) {
                        that.firmEditor.data = t.data;
                    }
                });
                that.firmEditor.show = true;
                that.firmEditor.size = o;
                that.setData({
                    firmEditor: that.firmEditor
                });
            } else {
                that.dataEditor.sector = s.mifare_block_2_sector(i);
                that.dataEditor.block = s.mifare_secblk_2_index(i, that.dataEditor.sector);
                that.dataList.forEach(function (t) {
                    if (t.block == i) {
                        if (s.mifare_is_trailer_blk(i)) {
                            that.dataEditor.mode = 1;
                            that.dataEditor.data = ''.concat(t.data.keya).concat(t.data.ctl).concat(t.data.keyb);
                        } else {
                            that.dataEditor.mode = 0;
                            that.dataEditor.data = t.data;
                        }
                    }
                });
                that.dataEditor.show = true;
                that.setData({
                    dataEditor: that.dataEditor
                });
            }
        },

        onOpenDumpClickCall: function () {
            var a;
            var that = this;
            if (1 == this.pageMaps.page14443A.show) {
                a = 'IC';
            } else {
                a = 'ID';
            }

            uni.navigateTo({
                url: '/pages/card-dump-select/list?type=' + a,
                events: {
                    onDumpSelected: function (a) {
                        console.log('选定的DUMP是: ' + a);

                        if (a) {
                            that.dumpUUID = a;
                            t.loadFile2DataBuffer(a);
                            that.showDataByMemory();
                        }
                    }
                }
            });
        },

        setDumpToSavedStatus: function (t) {
            this.dumpSaved = t;
            this.setButtonEnable(this.rightButtonList.btnSaveDump, !t);
        },

        showNickEditDialog: function (t, a) {
            this.nickEditor.show = true;
            this.nickEditor.title = t;
            this.nickEditor.onConfirmCall = a;
            this.setData({
                nickEditor: this.nickEditor
            });
        },

        onSaveDumpCardWalletAs: function () {
            this.isDumpSaveAs = true;
            this.showNickEditDialog('另存数据', 'onUserSaveDataConfirm');
        },

        saveDumpToCardWalletImpl: function () {
            if (null == this.dumpUUID) {
                this.isDumpSaveAs = false;
                this.showNickEditDialog('保存数据', 'onUserSaveDataConfirm');
            } else {
                if (this.dumpSaved) {
                    return void console.log('数据已经保存，');
                }

                t.updateDumpFromMemByID(this.dumpUUID);
                o.showToast('更新已保存');
                this.setDumpToSavedStatus(true);
            }
        },

        onSaveDumpToCardWallet: function () {
            this.saveDumpToCardWalletImpl();
        },

        dismissNickEdiotDialog: function () {
            this.setData({
                'nickEditor.show': false
            });
        },

        onUserSaveDataCancel: function () {
            this.dismissNickEdiotDialog();
        },

        onUserSaveDataConfirm: function (t) {
            var a = t.detail.dumpName;
            var s = o.saveCard(a);
            if (s.isok) {
                this.dismissNickEdiotDialog();

                if (this.isDumpSaveAs) {
                    o.showToast('另存成功！');
                } else {
                    o.showToast('保存成功！');
                }

                this.dumpUUID = s.uuid;
                this.dumpSaved = true;
                this.setButtonEnable(this.rightButtonList.btnSaveDump, false);
                this.showDataByMemory();
            } else {
                o.showToast(s.message);
            }
        },

        dismissMessageBoxDialog: function () {
            this.setData({
                'messageBox.show': false
            });
        },

        dismissWriteFailDialog: function () {
            this.setData({
                'writeResult.show': false
            });
        },

        dismissWritingDialog: function () {
            this.setData({
                'writeProgress.show': false
            });
        },

        onCopyUIDBtnClickCall: function () {
            uni.setClipboardData({
                data: this.taginfo.uid,
                success: function (t) {
                    o.showToast('卡号复制成功');
                }
            });
        },

        showDataSaveDialog: function (t) {
            var that = this;

            this._onDataSaveNoCall = function () {
                that.dumpSaved = true;
                that.dismissMessageBoxDialog();
                t();
            };

            this._onDataSaveYesCall = function () {
                that.dismissMessageBoxDialog();
                that.saveDumpToCardWalletImpl();
            };

            this.messageBox.show = true;
            this.messageBox.mode = 'msg';
            this.messageBox.title = '';
            this.messageBox.content = '是否保存此数据？';
            this.messageBox.cancelText = '否';
            this.messageBox.confirmText = '是';
            this.messageBox.cancelCall = '_onDataSaveNoCall';
            this.messageBox.confirmCall = '_onDataSaveYesCall';
            this.setData({
                messageBox: this.messageBox
            });
        },

        isNoTaskRunning: function () {
            return 0 == this.taskStatus || (o.showToast('有任务正在进行...'), false);
        },

        setTagReadingStatus: function (t) {
            switch (t) {
                case 0:
                    this.disableButtonExclude([
                        this.rightButtonList.btnStartRead,
                        this.rightButtonList.btnStartWipe,
                        this.rightButtonList.btnOpenDump,
                        this.rightButtonList.btnNewDumpForTemplate
                    ]);
                    break;

                case 1:
                    this.disableButtonExclude([]);
                    break;

                case 2:
                    this.disableButtonExclude([
                        this.rightButtonList.btnStartRead,
                        this.rightButtonList.btnStartWrite,
                        this.rightButtonList.btnStartWipe,
                        this.rightButtonList.btnSaveDump,
                        this.rightButtonList.btnSaveDumpNew,
                        this.rightButtonList.btnOpenDump,
                        this.rightButtonList.btnDataEqual,
                        this.rightButtonList.btnNewDumpForTemplate
                    ]);
            }
        },

        onTagReadingCallback: function (s) {
            if (this.pageMaps.page14443A.show) {
                var e = a.getMifareTagDatas();

                if (e.length > 0) {
                    this.setMainTitle({
                        status: 3,
                        message: '扇区数据读取中'
                    });
                    this.setKeysInfo(a.getMifareKeysMap());
                }

                this.setDataInfo(e);
            }

            if (100 == s) {
                if (this.wipeTagMode) {
                    this.setMainTitle({
                        status: 3,
                        message: '开始清空卡片'
                    });
                    this.dumpSaved = true;
                    t.startWipeTagAllData(this.onTagWipingProgressCall);
                } else {
                    this.setMainTitle({
                        status: 2,
                        message: '读卡成功'
                    });
                    this.taskStatus = 0;
                    this.dumpSaved = false;
                    this.setTagReadingStatus(2);
                }
            }
        },

        onMF1AttackCallback: function (t, a, s, i, o) {
            var n = '未知任务';

            switch (t) {
                case e.TASK_NAME_FCHK:
                    n = '扫默认密码(FCHK)';
                    break;

                case e.TASK_NAME_DARKSIDE:
                    n = '全加密解码(DARKSIDE)';
                    break;

                case e.TASK_NAME_NESTED:
                    n = '半加密解码(NESTED)';
                    break;

                case e.TASK_NAME_STATICNESTED:
                    n = '无漏洞解码(STATIC)';
            }

            this.setMainTitle({
                status: 3,
                message: ''.concat(n, ' 预计 ').concat(o, '秒')
            });
            this.setKeysInfo(i);
        },

        onMF1Found: function (a) {
            var that = this;
            this.setTagInfo(a);
            this.setMainTitle({
                status: 3,
                message: '正在启动读卡'
            });
            t.startReadTagAllData(function (t) {
                that.onTagReadingCallback(t);
            });
        },

        onIDTagFound: function (a) {
            var that = this;
            this.setTagInfo(a);
            setTimeout(function () {
                t.startReadTagAllData(function (t) {
                    that.onTagReadingCallback(t);
                });
            }, 1000);
        },

        onICTagFound: function (a) {
            var that = this;
            this.setTagInfo(a);
            console.log(JSON.stringify(a));

            if (a.readable) {
                this.setMainTitle({
                    status: 3,
                    message: '正在获取M1卡详细信息'
                });
                t.startCheckMF1Detail(function (t) {
                    that.onMF1Found(t);
                });
            } else {
                this.setMainTitle({
                    status: 1,
                    message: '读卡失败，卡片不支持读取'
                });
                this.taskStatus = 0;
                this.setTagReadingStatus(0);
            }
        },

        onTagNoFound: function () {
            this.setMainTitle({
                status: 1,
                message: '读卡失败，未发现卡片'
            });
            this.taskStatus = 0;
            this.setTagReadingStatus(0);
        },

        processErrorByStatus: function (t) {
            var a = i.getMsg(t);
            var s = t.toString(16);
            if (s.length < 2) {
                s = '0' + s;
            }

            if (2 == this.taskStatus) {
                this.writeResult.show = true;
                this.writeResult.titleMain = a;
                this.writeResult.titleSub = '错误代码: 0x'.concat(s);
                this.writeResult.success = false;
                this.writeProgress.show = false;
                this.setData({
                    writeResult: this.writeResult,
                    writeProgress: this.writeProgress
                });
            } else {
                this.setMainTitle({
                    status: 1,
                    message: a
                });
                this.setDefaultKeysInfo();
                this.setDataInfo();
                this.setTagReadingStatus(0);
            }

            this.taskStatus = 0;
        },

        onTagErrorCallback: function (t) {
            this.processErrorByStatus(t);
        },

        onBleComErrorCallback: function () {
            this.processErrorByStatus(97);
        },

        onBleComTimeoutCallback: function () {
            this.processErrorByStatus(108);
        },

        onDeviceDisconnectCallback: function (t) {
            console.log('在专家模式页面监听到设备断开连接！');

            if (0 != this.taskStatus) {
                this.processErrorByStatus(107);
            }
        },

        showDeviceConnectDialog: function () {
            this.messageBox.show = true;
            this.messageBox.title = '';
            this.messageBox.content = '蓝牙已断开，请重新连接';
            this.messageBox.cancelText = '';
            this.messageBox.confirmText = '我知道了';
            this.messageBox.confirmCall = 'onCloseMessageBox';
            this.setData({
                messageBox: this.messageBox
            });
        },

        presetBeforeTagRead: function () {
            this.dumpUUID = null;
            this.taskStatus = 1;
            this.setTagReadingStatus(1);
            this.setMainTitle({
                status: 3,
                message: '正在寻卡...'
            });
        },

        startReadICTagImpl: function () {
            this.setDefaultKeysInfo();
            this.setDataInfo();
            this.presetBeforeTagRead();
            t.startHFTagOneSearch(this.onICTagFound, this.onTagNoFound);
        },

        startReadIDTagImpl: function () {
            this.presetBeforeTagRead();
            t.startLFTagOneSearch(this.onIDTagFound, this.onTagNoFound);
        },

        startReadTagCheckConnection: function (t) {
            var that = this;

            if (s.isBLEDeviceIsConnected()) {
                if (that.dumpSaved) {
                    t();
                } else {
                    this.showDataSaveDialog(function () {
                        that.dumpSaved = true;
                        t();
                    });
                }
            } else {
                this.showDeviceConnectDialog();
            }
        },

        onStartReadICTagClickCall: function () {
            this.wipeTagMode = false;
            this.startReadTagCheckConnection(this.startReadICTagImpl);
        },

        onStartReadIDTagClickCall: function () {
            this.wipeTagMode = false;
            this.startReadTagCheckConnection(this.startReadIDTagImpl);
        },

        makeWriteFailString: function () {
            var a = '';
            var s = t.getWriteBlocks4Fail();
            s.sort(function (t, a) {
                return t - a;
            });
            var e = true;

            if (s.length > 0) {
                a += '清空失败的块：';
                s.forEach(function (t, e) {
                    a += ''.concat(t);

                    if (e != s.length - 1) {
                        a += '、';
                    }
                });
                e = false;
            } else {
                a = '清空卡成功';
                e = true;
            }

            return {
                success: e,
                message: a
            };
        },

        onTagWipingProgressCall: function (t) {
            if (100 == (t = parseInt(t))) {
                var a = this.makeWriteFailString();
                this.setMainTitle({
                    status: a.success ? 2 : 1,
                    message: ''.concat(a.message)
                });
                this.taskStatus = 0;
                this.setTagReadingStatus(0);
            } else {
                this.setMainTitle({
                    status: 3,
                    message: '清空标签中，进度'.concat(t, '%')
                });
            }
        },

        onStartWipeTagClickCall: function () {
            this.wipeTagMode = true;
            this.startReadTagCheckConnection(this.startReadICTagImpl);
        },

        onTagWritingCallback: function (t) {
            var that = this;
            t = parseInt(t);
            that.writeProgress.progress = t;
            that.setData({
                writeProgress: that.writeProgress
            });

            if (100 == t) {
                setTimeout(function () {
                    that.taskStatus = 0;
                    that.writeResult.show = true;
                    that.writeResult.success = true;
                    that.writeResult.titleMain = '写卡成功';
                    that.writeResult.titleSub = '请连续刷卡成功开门三次，再使用！';
                    that.writeProgress.show = false;
                    that.setData({
                        writeResult: that.writeResult,
                        writeProgress: that.writeProgress
                    });
                }, 2000);

                if (1 == that.vip) {
                    console.log('VIP不扣除次数');
                } else {
                    o.deductionTimes();
                }
            }
        },

        startWriteTagImpl: function () {
            var that = this;

            if (s.isBLEDeviceIsConnected()) {
                this.writeProgress.show = true;
                this.writeProgress.progress = 0;
                this.taskStatus = 2;
                this.setData({
                    writeProgress: this.writeProgress
                });
                t.startWriteCardDatas(function (t) {
                    return that.onTagWritingCallback(t);
                });
            } else {
                this.showDeviceConnectDialog();
            }
        },

        onStartWriteTagClickCall: function () {
            var that = this;
            o.remainNumber1(function (a, s, e) {
                if (0 == a && '会员已过期' == e) {
                    that.setData({
                        modal: true
                    });
                } else {
                    if ('会员已过期' != e) {
                        that.setData({
                            vip: true
                        });
                        that.startWriteTagImpl();
                    } else {
                        if (0 != a && '会员已过期' == e) {
                            that.setData({
                                vip: false
                            });
                            that.startWriteTagImpl();
                        }
                    }
                }
            });
        },

        onUserCloseWriteResultDialog: function () {
            this.dismissWriteFailDialog();
        },

        onUserRetryWriteTagClick: function () {
            this.dismissWriteFailDialog();
            this.startWriteTagImpl();
        },

        onDataFindEqual: function () {
            if (this.dumpSaved) {
                if (null != this.dumpUUID) {
                    uni.navigateTo({
                        url: '/pages/card-dump-select/list?' + 'uuid1='.concat(this.dumpUUID, '&type=IC&mode=equal')
                    });
                } else {
                    o.showToast('请先保存当前读卡数据到卡包~');
                }
            } else {
                o.showToast('请先保存当前数据的修改哦~');
            }
        },

        onUserCreateDataConfirm: function (a) {
            var s = a.detail.dumpName;
            var e = o.newCard({
                cardName: s,
                type: this.newDumpType
            });
            if (e.isok) {
                t.loadFile2DataBuffer(e.uuid);
                this.dumpUUID = e.uuid;
                this.showDataByMemory();
                this.dismissNickEdiotDialog();
            } else {
                o.showToast(e.message);
            }
        },

        createNewDump: function (t) {
            this.newDumpType = t.type;
            this.showNickEditDialog(t.title, 'onUserCreateDataConfirm');
        },

        checkSaveAndCreateNewDump: function (t) {
            var that = this;
            var s = this;
            if (s.dumpSaved) {
                this.createNewDump(t);
            } else {
                this.showDataSaveDialog(function () {
                    s.dumpSaved = true;
                    that.createNewDump(t);
                });
            }
        },

        onICDataDumpNew: function () {
            this.checkSaveAndCreateNewDump({
                type: 'ic',
                title: '新建数据'
            });
        },

        onIDDataDumpNew: function () {
            this.checkSaveAndCreateNewDump({
                type: 'id',
                title: '新建卡号'
            });
        },

        onCloseMessageBox: function () {
            this.dismissMessageBoxDialog();
        },

        onUserConfirmEditID: function (t) {
            var s = t.detail.value;
            console.log('新的ID卡号是: ' + s);

            if (s == this.taginfo.uid) {
                this.dismissMessageBoxDialog();
                return void o.showToast('卡号没有改动哦~');
            }

            if (/[A-Fa-f0-9]{10}/.test(s)) {
                var e = a.getTagInformation();
                e.uid_hex = s;
                console.log('新的信息: ' + JSON.stringify(e));
                this.setTagInfo(e);
                this.setDumpToSavedStatus(false);
                this.dismissMessageBoxDialog();
            } else {
                o.showToast('仅限10个HEX字符的卡号哦~');
            }
        },

        onUserClickEditID: function () {
            this.messageBox.show = true;
            this.messageBox.mode = 'edit';
            this.messageBox.title = '';
            this.messageBox.content = '编辑卡号';
            this.messageBox.cancelText = '取消';
            this.messageBox.confirmText = '确定';
            this.messageBox.placeholder = '请输入卡号';
            this.messageBox.value = this.taginfo.uid;
            this.messageBox.maxlength = 10;
            this.messageBox.cancelCall = 'onCloseMessageBox';
            this.messageBox.confirmCall = 'onUserConfirmEditID';
            this.setData({
                messageBox: this.messageBox
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
