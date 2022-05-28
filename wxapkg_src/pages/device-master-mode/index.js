var t = require("../../3E90FCB755C842DF58F694B049818C74.js"), a = require("../../8473358655C842DFE2155D813E918C74.js"), s = require("../../4F97F14255C842DF29F19945DB418C74.js"), e = require("../../D5AF71D355C842DFB3C919D452918C74.js"), i = require("../../1736EF7655C842DF715087715F518C74.js"), o = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

function n(t, a, s, e) {
    return {
        img: t,
        text: a,
        disabled: !s,
        bindtap: e
    };
}

Page({
    data: {
        pageMaps: {
            page14443A: {
                title: "IC卡",
                index: 0,
                show: !1
            },
            pageEM410X: {
                title: "ID卡",
                index: 1,
                show: !1
            }
        },
        rightButtonList: {},
        leftTaskStatus: {
            status: 0,
            message: "无"
        },
        taginfo: {},
        keyGroup: [],
        showAllKeysGroup: !1,
        dataList: [],
        dataEditor: {
            sector: 0,
            block: 0,
            data: "",
            show: !1,
            mode: 0
        },
        firmEditor: {
            size: 4,
            data: "",
            show: !1
        },
        nickEditor: {
            show: !1,
            title: "",
            onConfirmCall: ""
        },
        writeProgress: {
            show: !1,
            title: "正在写卡...",
            progress: 0
        },
        writeResult: {
            show: !1,
            success: !0,
            titleMain: "",
            titleSub: ""
        },
        messageBox: {
            show: !1,
            mode: "msg",
            title: "",
            content: "",
            confirmText: "是",
            cancelText: "否",
            maxlength: -1,
            value: "",
            placeholder: "",
            closeCall: "onCloseMessageBox",
            cancelCall: "onCloseMessageBox",
            confirmCall: ""
        },
        modal: !1,
        vip: ""
    },
    rightButtonListForIC: {
        btnStartRead: n("exRead", "读IC卡", !0, "onStartReadICTagClickCall"),
        btnStartWrite: n("exWrite", "写IC卡", !1, "onStartWriteTagClickCall"),
        btnStartWipe: n("clearMaster", "清空卡", !0, "onStartWipeTagClickCall"),
        btnSaveDump: n("exSave", "保存数据", !1, "onSaveDumpToCardWallet"),
        btnSaveDumpNew: n("exSaveAs", "另存数据", !1, "onSaveDumpCardWalletAs"),
        btnOpenDump: n("exOpen", "打开数据", !0, "onOpenDumpClickCall"),
        btnDataEqual: n("exContrast", "数据对比", !1, "onDataFindEqual"),
        btnNewDumpForTemplate: n("exAdd", "新建数据", !0, "onICDataDumpNew"),
        btnShareDump: n("exShare", "分享数据", !1, "exShare"),
        btnKeysManager: n("exCode", "密码管理", !1, "exCode")
    },
    rightButtonListForID: {
        btnStartRead: n("read_id", "读ID卡", !0, "onStartReadIDTagClickCall"),
        btnStartWrite: n("write_id", "写ID卡", !1, "onStartWriteTagClickCall"),
        btnSaveDump: n("save_id", "保存卡号", !1, "onSaveDumpToCardWallet"),
        btnSaveDumpNew: n("saveas_id", "另存卡号", !1, "onSaveDumpCardWalletAs"),
        btnOpenDump: n("exOpen", "打开卡片", !0, "onOpenDumpClickCall"),
        btnNewDumpForTemplate: n("add_id", "新建卡号", !0, "onIDDataDumpNew"),
        btnShareDump: n("share_id", "分享卡号", !1, "exShare")
    },
    showPageByIndex: function(t, a) {
        this.data.pageMaps.page14443A.show && this.setDefaultKeysInfo(), null != a && null != a || (a = {});
        for (var s = Object.keys(this.data.pageMaps), e = 0; e < s.length; e++) {
            var i = this.data.pageMaps[s[e]];
            if (i.show && i.index == t) return void console.log("选中的页面已经是显示状态，不重复触发显示过程！");
            i.index == t ? i.show = !0 : i.show = !1;
        }
        var o = {};
        o[this.data.pageMaps.page14443A.index] = this.rightButtonListForIC, o[this.data.pageMaps.pageEM410X.index] = this.rightButtonListForID, 
        this.data.leftTaskStatus.status = 0, this.setData({
            pageMaps: this.data.pageMaps,
            rightButtonList: o[t],
            leftTaskStatus: this.data.leftTaskStatus,
            taginfo: null,
            dataList: null
        }, function() {
            "showdata" in a && a.showdata ? this.showDataByMemory() : this.setTagReadingStatus(0);
        });
    },
    getTabShow: function() {
        for (var t = Object.keys(this.data.pageMaps), a = 0; a < t.length; a++) {
            var s = this.data.pageMaps[t[a]];
            if (s.show) return s;
        }
        return null;
    },
    changeTab: function(t) {
        var a = this.getTabShow(), s = !0;
        null != a && (s = a.index != t), s && this.showPageByIndex(t);
    },
    onTabClick: function(t) {
        var a = this, s = t.currentTarget.dataset.id;
        if (this.isNoTaskRunning()) {
            if (!this.dumpSaved) return this.showDataSaveDialog(function() {
                a.changeTab(s);
            }), !1;
            this.changeTab(s);
        } else o.showToast("当前有任务正在运行中...");
    },
    onUserBack: function(t) {
        console.log("返回事件被专家模式拦截处理");
        this.isNoTaskRunning() && (this.dumpSaved ? t.detail.goBack() : this.showDataSaveDialog(function() {
            t.detail.goBack();
        }));
    },
    setMainTitle: function(t) {
        null == t ? (this.data.leftTaskStatus.status = 0, this.data.leftTaskStatus.message = "") : (this.data.leftTaskStatus.status = t.status, 
        this.data.leftTaskStatus.message = t.message), this.setData({
            leftTaskStatus: this.data.leftTaskStatus
        });
    },
    setTagInfo: function(t) {
        if (null == t || null == t) return this.setData({
            taginfo: null
        }), void console.log("信息为空");
        var s = [], e = "Unknown", i = !0;
        switch (t.tag_type) {
          case a.TAG_TYPE_HF_14443A:
            e = "14443A", i = !1;
            break;

          case a.TAG_TYPE_MF1_MAYBE:
            e = "可能是M1卡";
            break;

          case a.TAG_TYPE_MF1_GEN1A:
            e = "Gen1A后门卡";
            break;

          case a.TAG_TYPE_MF1_STDHD:
            e = "HardNested";
            break;

          case a.TAG_TYPE_MF1_STDST:
            e = "StaticNested";
            break;

          case a.TAG_TYPE_MF1_STDWK:
            e = "普通M1";
        }
        s.push(e), i && "max_block" in t && (t.max_block <= 20 ? s.push("Mini") : t.max_block <= 63 ? s.push("S50") : t.max_block < 128 ? s.push("".concat(t.max_block, "BLOCK")) : 128 == t.max_block ? s.push("2K") : t.max_block > 128 && 256 != a.max_block ? s.push("".concat(t.max_block, "BLOCK")) : 256 == a.max_block ? s.push("S70") : s.push("".concat(t.max_block, "BLOCK"))), 
        s.push("SAK: ".concat(t.sak_hex)), s.push("ATQA: ".concat(t.atqa_hex)), "ats_hex" in t && s.push("ATS: ".concat(t.ats_hex)), 
        this.setData({
            taginfo: {
                uid: t.uid_hex,
                types: s
            }
        });
    },
    setKeysInfo: function(t) {
        if (null != t) {
            for (var a = [], e = Object.keys(t), i = 0; i < e.length; i++) {
                var o = e[i], n = t[o];
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
        } else this.setData({
            keyGroup: null
        });
    },
    onShowAllKeysGroupClick: function() {
        Array.isArray(this.data.keyGroup) && this.data.keyGroup.length > 1 && this.setData({
            showAllKeysGroup: !this.data.showAllKeysGroup
        });
    },
    setDataInfo: function(t) {
        if (null == t || null == t) null != this.data.dataList && this.setData({
            dataList: null
        }); else {
            if (0 == t.length) return;
            var a = [];
            t.forEach(function(t, e) {
                var i, o;
                if (0 == e) i = s.bytes2hex(t), o = 0; else if (s.mifare_is_trailer_blk(e)) {
                    var n = s.bytes2hex(t);
                    i = {
                        keya: n.slice(0, 12),
                        ctl: n.slice(12, 20),
                        keyb: n.slice(20, 32)
                    }, o = 2;
                } else i = s.bytes2hex(t), o = 1;
                a.push({
                    sector: s.mifare_block_2_sector(e),
                    block: e,
                    data: i,
                    type: o
                });
            }), this.setData({
                dataList: a
            });
        }
    },
    setDefaultKeysInfo: function() {
        for (var t = {}, a = 0; a < 16; a++) t[a] = {
            keya: null,
            keyb: null
        };
        this.setKeysInfo(t);
    },
    showDataByMemory: function() {
        var t = a.getTagInformation();
        switch (t.tag_type) {
          case a.TAG_TYPE_HF_14443A:
            break;

          case a.TAG_TYPE_MF1_GEN1A:
          case a.TAG_TYPE_MF1_MAYBE:
          case a.TAG_TYPE_MF1_STDHD:
          case a.TAG_TYPE_MF1_STDST:
          case a.TAG_TYPE_MF1_STDWK:
            this.setTagInfo(t), this.setDataInfo(a.getMifareTagDatas()), this.setKeysInfo(a.getMifareKeysMap());
            break;

          case a.TAG_TYPE_LF_EM410X:
            this.setTagInfo(t);
        }
        this.setButtonEnable([ this.data.rightButtonList.btnStartWrite, this.data.rightButtonList.btnSaveDumpNew, this.data.rightButtonList.btnDataEqual ], !0), 
        null != this.dumpUUID && this.setMainTitle({
            status: 4,
            message: o.getDumpNickNameByUUID(this.dumpUUID)
        });
    },
    disableButtonExclude: function(t) {
        var a = this;
        Object.keys(a.data.rightButtonList).forEach(function(t) {
            a.data.rightButtonList[t].disabled = !0;
        }), t.forEach(function(t) {
            null != t && null != t && (t.disabled = !1);
        }), a.setData({
            rightButtonList: a.data.rightButtonList
        });
    },
    setButtonEnable: function(t, a) {
        Array.isArray(t) ? t.forEach(function(t) {
            null != t && null != t && (t.disabled = !a);
        }) : null != t && null != t && (t.disabled = !a), null != t && null != t && this.setData({
            rightButtonList: this.data.rightButtonList
        });
    },
    onCloseDataEditor: function() {
        this.data.dataEditor.show = !1, this.setData({
            dataEditor: this.data.dataEditor
        });
    },
    onConfirmDataEdit: function(t) {
        var e = t.detail, i = s.mifare_sector_2_block(e.sector) + e.block, o = a.getMifareTagDatas();
        this.data.dataList.forEach(function(t) {
            if (t.block == i) {
                var a = e.data;
                2 == t.type ? (t.data.keya = a.substr(0, 12), t.data.ctl = a.substr(12, 8), t.data.keyb = a.substr(20, 12)) : t.data = a;
            }
        }), this.data.dataEditor.show = !1, o[i] = s.hex2bytes(e.data), this.setDumpToSavedStatus(!1), 
        this.setData({
            dataList: this.data.dataList,
            dataEditor: this.data.dataEditor
        });
    },
    onCloseFirmEditor: function() {
        this.data.firmEditor.show = !1, this.setData({
            firmEditor: this.data.firmEditor
        });
    },
    onConfirmFirmEdit: function(t) {
        var e = t.detail.data, i = a.getMifareTagDatas();
        this.data.dataList.forEach(function(t) {
            0 == t.block && (t.data = e);
        }), this.data.firmEditor.show = !1, i[0] = s.hex2bytes(e);
        var o = a.getTagInformation();
        o.uid_hex = t.detail.uid, o.sak_hex = t.detail.sak, o.atqa_hex = t.detail.atqa, 
        console.log("新的信息: " + JSON.stringify(o)), this.setTagInfo(o), this.setDumpToSavedStatus(!1), 
        this.setData({
            dataList: this.data.dataList,
            firmEditor: this.data.firmEditor
        });
    },
    onUserClickEditData: function(t) {
        var e = this, i = parseInt(t.currentTarget.dataset.id), o = a.getTagInformation().uid_hex.length / 2;
        console.log("用户想要编辑第".concat(i, "块。")), 0 == i && 4 == o ? (e.data.dataList.forEach(function(t) {
            t.block == i && (e.data.firmEditor.data = t.data);
        }), e.data.firmEditor.show = !0, e.data.firmEditor.size = o, e.setData({
            firmEditor: e.data.firmEditor
        })) : (e.data.dataEditor.sector = s.mifare_block_2_sector(i), e.data.dataEditor.block = s.mifare_secblk_2_index(i, e.data.dataEditor.sector), 
        e.data.dataList.forEach(function(t) {
            t.block == i && (s.mifare_is_trailer_blk(i) ? (e.data.dataEditor.mode = 1, e.data.dataEditor.data = "".concat(t.data.keya).concat(t.data.ctl).concat(t.data.keyb)) : (e.data.dataEditor.mode = 0, 
            e.data.dataEditor.data = t.data));
        }), e.data.dataEditor.show = !0, e.setData({
            dataEditor: e.data.dataEditor
        }));
    },
    onOpenDumpClickCall: function() {
        var a, s = this;
        a = 1 == this.data.pageMaps.page14443A.show ? "IC" : "ID", wx.navigateTo({
            url: "/pages/card-dump-select/list?type=" + a,
            events: {
                onDumpSelected: function(a) {
                    console.log("选定的DUMP是: " + a), null != a && null != a && (s.dumpUUID = a, t.loadFile2DataBuffer(a), 
                    s.showDataByMemory());
                }
            }
        });
    },
    setDumpToSavedStatus: function(t) {
        this.dumpSaved = t, this.setButtonEnable(this.data.rightButtonList.btnSaveDump, !t);
    },
    showNickEditDialog: function(t, a) {
        this.data.nickEditor.show = !0, this.data.nickEditor.title = t, this.data.nickEditor.onConfirmCall = a, 
        this.setData({
            nickEditor: this.data.nickEditor
        });
    },
    onSaveDumpCardWalletAs: function() {
        this.isDumpSaveAs = !0, this.showNickEditDialog("另存数据", "onUserSaveDataConfirm");
    },
    saveDumpToCardWalletImpl: function() {
        if (null == this.dumpUUID) this.isDumpSaveAs = !1, this.showNickEditDialog("保存数据", "onUserSaveDataConfirm"); else {
            if (this.dumpSaved) return void console.log("数据已经保存，");
            t.updateDumpFromMemByID(this.dumpUUID), o.showToast("更新已保存"), this.setDumpToSavedStatus(!0);
        }
    },
    onSaveDumpToCardWallet: function() {
        this.saveDumpToCardWalletImpl();
    },
    dismissNickEdiotDialog: function() {
        this.setData({
            "nickEditor.show": !1
        });
    },
    onUserSaveDataCancel: function() {
        this.dismissNickEdiotDialog();
    },
    onUserSaveDataConfirm: function(t) {
        var a = t.detail.dumpName, s = o.saveCard(a);
        s.isok ? (this.dismissNickEdiotDialog(), this.isDumpSaveAs ? o.showToast("另存成功！") : o.showToast("保存成功！"), 
        this.dumpUUID = s.uuid, this.dumpSaved = !0, this.setButtonEnable(this.data.rightButtonList.btnSaveDump, !1), 
        this.showDataByMemory()) : o.showToast(s.message);
    },
    dismissMessageBoxDialog: function() {
        this.setData({
            "messageBox.show": !1
        });
    },
    dismissWriteFailDialog: function() {
        this.setData({
            "writeResult.show": !1
        });
    },
    dismissWritingDialog: function() {
        this.setData({
            "writeProgress.show": !1
        });
    },
    onCopyUIDBtnClickCall: function() {
        wx.setClipboardData({
            data: this.data.taginfo.uid,
            success: function(t) {
                o.showToast("卡号复制成功");
            }
        });
    },
    showDataSaveDialog: function(t) {
        var a = this;
        this._onDataSaveNoCall = function() {
            a.dumpSaved = !0, a.dismissMessageBoxDialog(), t();
        }, this._onDataSaveYesCall = function() {
            a.dismissMessageBoxDialog(), a.saveDumpToCardWalletImpl();
        }, this.data.messageBox.show = !0, this.data.messageBox.mode = "msg", this.data.messageBox.title = "", 
        this.data.messageBox.content = "是否保存此数据？", this.data.messageBox.cancelText = "否", 
        this.data.messageBox.confirmText = "是", this.data.messageBox.cancelCall = "_onDataSaveNoCall", 
        this.data.messageBox.confirmCall = "_onDataSaveYesCall", this.setData({
            messageBox: this.data.messageBox
        });
    },
    isNoTaskRunning: function() {
        return 0 == this.taskStatus || (o.showToast("有任务正在进行..."), !1);
    },
    setTagReadingStatus: function(t) {
        switch (t) {
          case 0:
            this.disableButtonExclude([ this.data.rightButtonList.btnStartRead, this.data.rightButtonList.btnStartWipe, this.data.rightButtonList.btnOpenDump, this.data.rightButtonList.btnNewDumpForTemplate ]);
            break;

          case 1:
            this.disableButtonExclude([]);
            break;

          case 2:
            this.disableButtonExclude([ this.data.rightButtonList.btnStartRead, this.data.rightButtonList.btnStartWrite, this.data.rightButtonList.btnStartWipe, this.data.rightButtonList.btnSaveDump, this.data.rightButtonList.btnSaveDumpNew, this.data.rightButtonList.btnOpenDump, this.data.rightButtonList.btnDataEqual, this.data.rightButtonList.btnNewDumpForTemplate ]);
        }
    },
    onTagReadingCallback: function(s) {
        if (this.data.pageMaps.page14443A.show) {
            var e = a.getMifareTagDatas();
            e.length > 0 && (this.setMainTitle({
                status: 3,
                message: "扇区数据读取中"
            }), this.setKeysInfo(a.getMifareKeysMap())), this.setDataInfo(e);
        }
        100 == s && (this.wipeTagMode ? (this.setMainTitle({
            status: 3,
            message: "开始清空卡片"
        }), this.dumpSaved = !0, t.startWipeTagAllData(this.onTagWipingProgressCall)) : (this.setMainTitle({
            status: 2,
            message: "读卡成功"
        }), this.taskStatus = 0, this.dumpSaved = !1, this.setTagReadingStatus(2)));
    },
    onMF1AttackCallback: function(t, a, s, i, o) {
        var n = "未知任务";
        switch (t) {
          case e.TASK_NAME_FCHK:
            n = "扫默认密码(FCHK)";
            break;

          case e.TASK_NAME_DARKSIDE:
            n = "全加密解码(DARKSIDE)";
            break;

          case e.TASK_NAME_NESTED:
            n = "半加密解码(NESTED)";
            break;

          case e.TASK_NAME_STATICNESTED:
            n = "无漏洞解码(STATIC)";
        }
        this.setMainTitle({
            status: 3,
            message: "".concat(n, " 预计 ").concat(o, "秒")
        }), this.setKeysInfo(i);
    },
    onMF1Found: function(a) {
        var s = this;
        this.setTagInfo(a), this.setMainTitle({
            status: 3,
            message: "正在启动读卡"
        }), t.startReadTagAllData(function(t) {
            s.onTagReadingCallback(t);
        });
    },
    onIDTagFound: function(a) {
        var s = this;
        this.setTagInfo(a), setTimeout(function() {
            t.startReadTagAllData(function(t) {
                s.onTagReadingCallback(t);
            });
        }, 1e3);
    },
    onICTagFound: function(a) {
        var s = this;
        this.setTagInfo(a), console.log(JSON.stringify(a)), a.readable ? (this.setMainTitle({
            status: 3,
            message: "正在获取M1卡详细信息"
        }), t.startCheckMF1Detail(function(t) {
            s.onMF1Found(t);
        })) : (this.setMainTitle({
            status: 1,
            message: "读卡失败，卡片不支持读取"
        }), this.taskStatus = 0, this.setTagReadingStatus(0));
    },
    onTagNoFound: function() {
        this.setMainTitle({
            status: 1,
            message: "读卡失败，未发现卡片"
        }), this.taskStatus = 0, this.setTagReadingStatus(0);
    },
    processErrorByStatus: function(t) {
        var a = i.getMsg(t), s = t.toString(16);
        s.length < 2 && (s = "0" + s), 2 == this.taskStatus ? (this.data.writeResult.show = !0, 
        this.data.writeResult.titleMain = a, this.data.writeResult.titleSub = "错误代码: 0x".concat(s), 
        this.data.writeResult.success = !1, this.data.writeProgress.show = !1, this.setData({
            writeResult: this.data.writeResult,
            writeProgress: this.data.writeProgress
        })) : (this.setMainTitle({
            status: 1,
            message: a
        }), this.setDefaultKeysInfo(), this.setDataInfo(), this.setTagReadingStatus(0)), 
        this.taskStatus = 0;
    },
    onTagErrorCallback: function(t) {
        this.processErrorByStatus(t);
    },
    onBleComErrorCallback: function() {
        this.processErrorByStatus(97);
    },
    onBleComTimeoutCallback: function() {
        this.processErrorByStatus(108);
    },
    onDeviceDisconnectCallback: function(t) {
        console.log("在专家模式页面监听到设备断开连接！"), 0 != this.taskStatus && this.processErrorByStatus(107);
    },
    showDeviceConnectDialog: function() {
        this.data.messageBox.show = !0, this.data.messageBox.title = "", this.data.messageBox.content = "蓝牙已断开，请重新连接", 
        this.data.messageBox.cancelText = "", this.data.messageBox.confirmText = "我知道了", 
        this.data.messageBox.confirmCall = "onCloseMessageBox", this.setData({
            messageBox: this.data.messageBox
        });
    },
    presetBeforeTagRead: function() {
        this.dumpUUID = null, this.taskStatus = 1, this.setTagReadingStatus(1), this.setMainTitle({
            status: 3,
            message: "正在寻卡..."
        });
    },
    startReadICTagImpl: function() {
        this.setDefaultKeysInfo(), this.setDataInfo(), this.presetBeforeTagRead(), t.startHFTagOneSearch(this.onICTagFound, this.onTagNoFound);
    },
    startReadIDTagImpl: function() {
        this.presetBeforeTagRead(), t.startLFTagOneSearch(this.onIDTagFound, this.onTagNoFound);
    },
    startReadTagCheckConnection: function(t) {
        var a = this;
        s.isBLEDeviceIsConnected() ? a.dumpSaved ? t() : this.showDataSaveDialog(function() {
            a.dumpSaved = !0, t();
        }) : this.showDeviceConnectDialog();
    },
    onStartReadICTagClickCall: function() {
        this.wipeTagMode = !1, this.startReadTagCheckConnection(this.startReadICTagImpl);
    },
    onStartReadIDTagClickCall: function() {
        this.wipeTagMode = !1, this.startReadTagCheckConnection(this.startReadIDTagImpl);
    },
    makeWriteFailString: function() {
        var a = "", s = t.getWriteBlocks4Fail();
        s.sort(function(t, a) {
            return t - a;
        });
        var e = !0;
        return s.length > 0 ? (a += "清空失败的块：", s.forEach(function(t, e) {
            a += "".concat(t), e != s.length - 1 && (a += "、");
        }), e = !1) : (a = "清空卡成功", e = !0), {
            success: e,
            message: a
        };
    },
    onTagWipingProgressCall: function(t) {
        if (100 == (t = parseInt(t))) {
            var a = this.makeWriteFailString();
            this.setMainTitle({
                status: a.success ? 2 : 1,
                message: "".concat(a.message)
            }), this.taskStatus = 0, this.setTagReadingStatus(0);
        } else this.setMainTitle({
            status: 3,
            message: "清空标签中，进度".concat(t, "%")
        });
    },
    onStartWipeTagClickCall: function() {
        this.wipeTagMode = !0, this.startReadTagCheckConnection(this.startReadICTagImpl);
    },
    onTagWritingCallback: function(t) {
        var a = this;
        t = parseInt(t);
        a.data.writeProgress.progress = t, a.setData({
            writeProgress: a.data.writeProgress
        }), 100 == t && (setTimeout(function() {
            a.taskStatus = 0, a.data.writeResult.show = !0, a.data.writeResult.success = !0, 
            a.data.writeResult.titleMain = "写卡成功", a.data.writeResult.titleSub = "请连续刷卡成功开门三次，再使用！", 
            a.data.writeProgress.show = !1, a.setData({
                writeResult: a.data.writeResult,
                writeProgress: a.data.writeProgress
            });
        }, 2e3), 1 == a.data.vip ? console.log("VIP不扣除次数") : o.deductionTimes());
    },
    startWriteTagImpl: function() {
        var a = this;
        s.isBLEDeviceIsConnected() ? (this.data.writeProgress.show = !0, this.data.writeProgress.progress = 0, 
        this.taskStatus = 2, this.setData({
            writeProgress: this.data.writeProgress
        }), t.startWriteCardDatas(function(t) {
            return a.onTagWritingCallback(t);
        })) : this.showDeviceConnectDialog();
    },
    onStartWriteTagClickCall: function() {
        var t = this;
        o.remainNumber1(function(a, s, e) {
            0 == a && "会员已过期" == e ? t.setData({
                modal: !0
            }) : "会员已过期" != e ? (t.setData({
                vip: !0
            }), t.startWriteTagImpl()) : 0 != a && "会员已过期" == e && (t.setData({
                vip: !1
            }), t.startWriteTagImpl());
        });
    },
    onUserCloseWriteResultDialog: function() {
        this.dismissWriteFailDialog();
    },
    onUserRetryWriteTagClick: function() {
        this.dismissWriteFailDialog(), this.startWriteTagImpl();
    },
    onDataFindEqual: function() {
        this.dumpSaved ? null != this.dumpUUID ? wx.navigateTo({
            url: "/pages/card-dump-select/list?" + "uuid1=".concat(this.dumpUUID, "&type=IC&mode=equal")
        }) : o.showToast("请先保存当前读卡数据到卡包~") : o.showToast("请先保存当前数据的修改哦~");
    },
    onUserCreateDataConfirm: function(a) {
        var s = a.detail.dumpName, e = o.newCard({
            cardName: s,
            type: this.newDumpType
        });
        e.isok ? (t.loadFile2DataBuffer(e.uuid), this.dumpUUID = e.uuid, this.showDataByMemory(), 
        this.dismissNickEdiotDialog()) : o.showToast(e.message);
    },
    createNewDump: function(t) {
        this.newDumpType = t.type, this.showNickEditDialog(t.title, "onUserCreateDataConfirm");
    },
    checkSaveAndCreateNewDump: function(t) {
        var a = this, s = this;
        s.dumpSaved ? this.createNewDump(t) : this.showDataSaveDialog(function() {
            s.dumpSaved = !0, a.createNewDump(t);
        });
    },
    onICDataDumpNew: function() {
        this.checkSaveAndCreateNewDump({
            type: "ic",
            title: "新建数据"
        });
    },
    onIDDataDumpNew: function() {
        this.checkSaveAndCreateNewDump({
            type: "id",
            title: "新建卡号"
        });
    },
    onCloseMessageBox: function() {
        this.dismissMessageBoxDialog();
    },
    onUserConfirmEditID: function(t) {
        var s = t.detail.value;
        if (console.log("新的ID卡号是: " + s), s == this.data.taginfo.uid) return this.dismissMessageBoxDialog(), 
        void o.showToast("卡号没有改动哦~");
        if (/[A-Fa-f0-9]{10}/.test(s)) {
            var e = a.getTagInformation();
            e.uid_hex = s, console.log("新的信息: " + JSON.stringify(e)), this.setTagInfo(e), this.setDumpToSavedStatus(!1), 
            this.dismissMessageBoxDialog();
        } else o.showToast("仅限10个HEX字符的卡号哦~");
    },
    onUserClickEditID: function() {
        this.data.messageBox.show = !0, this.data.messageBox.mode = "edit", this.data.messageBox.title = "", 
        this.data.messageBox.content = "编辑卡号", this.data.messageBox.cancelText = "取消", this.data.messageBox.confirmText = "确定", 
        this.data.messageBox.placeholder = "请输入卡号", this.data.messageBox.value = this.data.taginfo.uid, 
        this.data.messageBox.maxlength = 10, this.data.messageBox.cancelCall = "onCloseMessageBox", 
        this.data.messageBox.confirmCall = "onUserConfirmEditID", this.setData({
            messageBox: this.data.messageBox
        });
    },
    onLoad: function(i) {
        if (e.registerOnAttackKeysCbk(this.onMF1AttackCallback), a.onTagErrorCallback(this.onTagErrorCallback), 
        s.onComErrCallback(this.onBleComErrorCallback), s.onTimeoutCallback(this.onBleComTimeoutCallback), 
        s.registerOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), this.dumpUUID = null, 
        this.dumpSaved = !0, this.wipeTagMode = !1, this.isDumpSaveAs = !1, this.taskStatus = 0, 
        "uuid" in i) {
            this.dumpUUID = i.uuid, t.loadFile2DataBuffer(i.uuid);
            var o = {};
            o[a.TAG_TYPE_HF_14443A] = 0, o[a.TAG_TYPE_MF1_GEN1A] = 0, o[a.TAG_TYPE_MF1_MAYBE] = 0, 
            o[a.TAG_TYPE_MF1_STDHD] = 0, o[a.TAG_TYPE_MF1_STDST] = 0, o[a.TAG_TYPE_MF1_STDWK] = 0, 
            o[a.TAG_TYPE_LF_EM410X] = 1;
            var n = o[a.getTagInformation().tag_type];
            this.showPageByIndex(n, {
                showdata: !0
            });
        } else if ("pageIndex" in i) {
            var r = i.pageIndex;
            r = null == r ? 0 : parseInt(r), this.showPageByIndex(r, {
                showdata: !0
            });
        } else this.showPageByIndex(0), this.setDefaultKeysInfo();
    },
    onUnload: function() {
        e.unregisterOnAttackKeysCbk(this.onMF1AttackCallback), s.unregisterOnBLEDisconnectedCallback(this.onDeviceDisconnectCallback), 
        a.onTagErrorCallback(null), s.onComErrCallback(null), s.onTimeoutCallback(null);
    }
});