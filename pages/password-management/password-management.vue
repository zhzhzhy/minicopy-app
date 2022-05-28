<template>
    <view>
        <view class="top-tab-container">
            <view @tap="onTabClick" :class="pageIndex == index ? 'top-tab-item' : 'chooseItem'" :data-id="index" v-for="(name, index) in pageList" :key="index">
                <text class="top-tab-title" :style="pageIndex == index ? 'color: #FFFFFF' : ''">{{ name }}</text>
            </view>
        </view>
        <block v-if="pageIndex == 0">
            <view class="passwordNumber">
                密码数量：
                <text>-</text>
                <text :decode="true">&nbsp; | &nbsp;</text>
                预计耗时：
                <text>-</text>
            </view>
            <view class="autoSaveSwitch">
                <van-switch activeColor="#08c264" @change="onChange" :checked="autoSave" size="24px" title=""></van-switch>
            </view>
            <view class="table">
                <view class="tr bg-w">
                    <view class="th" style="width: 17%">ID</view>
                    <view class="th" style="width: 35%">KEY</view>
                    <view class="th" style="width: 25%">频率</view>
                    <view class="th">日期</view>
                    <view class="th" style="width: 17%">操作</view>
                </view>
            </view>
            <view class="notYetOpen">
                <image class="notYetOpenImg" src="/static/static/img/notYetOpen.svg"></image>
            </view>
            <view class="doubleBtn">
                <view class="leftBtn">
                    <button @tap="deleteData" class="bottomBtnCancel">清空数据</button>
                </view>
                <view class="rightBtn">
                    <button @tap="addPassword" class="bottomBtnConfirm">添加密码</button>
                </view>
            </view>
        </block>
        <view style="color: #fff" v-if="pageIndex == 1">读卡历史库</view>
        <view style="color: #fff" v-if="pageIndex == 2">用户秘匙库</view>
        <view>
            <view @touchmove.stop.prevent="preventTouchMove" class="modal-mask" v-if="deleteAdd == true"></view>
            <view class="modal-dialog">
                <view class="modal-title" v-if="addPassword == true">添加密码</view>
                <view class="modal-content" v-if="deleteAdd == true">
                    <view class="modal-input" v-if="addPassword == true">
                        <input @input="onCardNameInput" class="input" placeholder="请输入密码" placeholderClass="input-holder" />
                    </view>
                    <view class="cardWritingSucceeded" v-if="deleteData == true">是否清空数据,清空后不可恢复</view>
                </view>
                <view class="modal-footer" v-if="deleteAdd == true">
                    <view @tap="onSaveCancel" class="btn-cancel" data-status="cancel" v-if="addPassword == true">取消</view>
                    <view @tap="onSaveDumpClick" class="btn-confirm" data-status="confirm" v-if="addPassword == true">确定</view>
                    <view @tap="cardWrittinComplete" class="complete" data-status="confirm" v-if="deleteData == true">否</view>
                    <view @tap="exWrite" class="btn-confirm" data-status="confirm" v-if="deleteData == true">是</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import vanSwitch from '../../miniprogram_npm/@vant/weapp/switch/index';
var a = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanSwitch
    },
    data() {
        return {
            listData: [
                {
                    ID: '1',
                    KEY: '1151561561516',
                    code: '120',
                    date: '2022-01-22 10:21:01'
                },
                {
                    ID: '1',
                    KEY: '1151561561516',
                    code: '120',
                    date: '2022-01-22 10:21:01'
                },
                {
                    ID: '1',
                    KEY: '1151561561516',
                    code: '120',
                    date: '2022-01-22 10:21:01'
                },
                {
                    ID: '1',
                    KEY: '1151561561516',
                    code: '120',
                    date: '2022-01-22 10:21:01'
                }
            ],

            pageList: ['公共资源库', '读卡历史库', '用户秘匙库'],
            pageIndex: 0,
            autoSave: true,
            deleteAdd: false,
            addPassword: false,
            deleteData: false,
            name: ''
        };
    },
    onLoad: function (a) {
        var e = a.pageIndex;

        if (null == e) {
            e = 0;
        } else {
            e = parseInt(e);
        }

        this.setData({
            pageIndex: e
        });
    },
    methods: {
        onChange: function (e) {
            var that = this;
            return (function (e) {
                if (0 == e) {
                    var d = that.autoSave;
                    console.log('autosave是' + d);

                    if (1 == d) {
                        e = false;
                        that.setData({
                            autoSave: false
                        });
                    }

                    a.showToast('自动保存已关闭');
                } else {
                    e = true;
                    that.setData({
                        autoSave: true
                    });
                    a.showToast('自动保存已开启');
                }
            })(e.detail);
        },

        deleteData: function () {
            this.setData({
                deleteAdd: true,
                deleteData: true
            });
        },

        addPasswordFun: function () {
            this.setData({
                deleteAdd: true,
                addPassword: true
            });
        },

        onTabClick: function (a) {
            this.setData({
                pageIndex: a.currentTarget.dataset.id
            });
        },

        preventTouchMove() {
            console.log('占位：函数 preventTouchMove 未声明');
        },

        onCardNameInput() {
            console.log('占位：函数 onCardNameInput 未声明');
        },

        onSaveCancel() {
            console.log('占位：函数 onSaveCancel 未声明');
        },

        onSaveDumpClick() {
            console.log('占位：函数 onSaveDumpClick 未声明');
        },

        cardWrittinComplete() {
            console.log('占位：函数 cardWrittinComplete 未声明');
        },

        exWrite() {
            console.log('占位：函数 exWrite 未声明');
        }
    }
};
</script>
<style>
@import './password-management.css';
</style>
