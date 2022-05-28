<template>
    <view>
        <view class="topLine"></view>
        <view class="questionBlock">问题和意见反馈</view>
        <view class="section">
            <textarea @blur="bindTextAreaBlur" @input="limitWord" class="textarea" maxlength="500" placeholder="请输入您要反馈的问题"></textarea>
            <view class="block">
                <view class="textNumber">
                    <text>{{ currentNoteLen }}/500</text>
                </view>
            </view>
        </view>
        <view class="upImgBlock">
            <view>
                <text class="upImgText" :decode="true">
                    上传图片&nbsp;&nbsp;
                    <text class="upImgRemain">{{ imgLength }}/4</text>
                </text>
            </view>
            <view class="upImg">
                <van-uploader accept="image" @after-read="afterRead" @delete="deleteImage" class="van_uploader" :fileList="fileList" maxCount="4" :multiple="true"></van-uploader>
            </view>
        </view>
        <view class="contactInformation">联系手机</view>
        <view>
            <input @input="input" placeholder="填写您的手机号码或邮箱，便于与您联系" type="text" />
        </view>
        <view class="submit">
            <van-button
                @tap.native="submit"
                customStyle="width:90%;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                type="primary"
            >
                提交
            </van-button>
        </view>
        <view @tap="record" class="RecordBlock">
            <view class="RecordText">
                <text>反馈记录</text>
                <image class="RecordImg" src="/static/static/img/doubleArrow.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
import vanField from '../../miniprogram_npm/@vant/weapp/field/index';
import vanUploader from '../../miniprogram_npm/@vant/weapp/uploader/index';
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
var t = require('../../A1D2754255C842DFC7B41D4546C18C74.js');

export default {
    components: {
        vanField,
        vanUploader,
        vanButton
    },
    data() {
        return {
            currentNoteLen: 0,
            limitNoteLen: '',
            fileList: [],
            imgLength: 0,
            textAreaValue: '',
            contactInformation: '',
            imgUrlList: []
        };
    },
    onLoad: function (t) {},
    onReady: function () {},
    onShow: function () {
        t.checkToken(this);
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        bindTextAreaBlur: function (t) {
            this.setData({
                textAreaValue: t.detail.value
            });
            console.log('textarea的值是' + t.detail.value);
        },

        limitWord: function (t) {
            var e = t.detail.value;
            var a = parseInt(e.length);
            a > this.noteMaxLen ||
                this.setData({
                    currentNoteLen: a,
                    limitNoteLen: this.noteMaxLen - a
                });
        },

        input: function (t) {
            console.log('input的值是' + t.detail.value);
            this.setData({
                contactInformation: t.detail.value
            });
        },

        deleteImage: function (t) {
            console.log(t);
            var e = this.fileList;
            var a = void 0 === e ? [] : e;
            a.splice(t.detail.index, 1);
            this.setData({
                fileList: a
            });
            this.setData({
                imgLength: this.fileList.length
            });
        },

        afterRead: function (t) {
            console.log(t.detail);
            var e = t.detail.file;
            var a = this.fileList;
            var i = void 0 === a ? [] : a;
            console.log(e);
            e.forEach(function (t) {
                i.push({
                    url: t.url
                });
            });
            this.setData({
                fileList: i
            });
            console.log('fileList是 ' + JSON.stringify(this.fileList));
            this.setData({
                imgLength: this.fileList.length
            });
            console.log('长度是 ' + this.imgLength);
        },

        submit: function () {
            var e = Date.parse(new Date());
            e /= 1000;
            var a = new Date(1000 * e);
            var i =
                (a.getFullYear(),
                a.getMonth() + 1 < 10 ? a.getMonth() : a.getMonth(),
                a.getDate() < 10 ? a.getDate() : a.getDate(),
                a.getHours(),
                a.getMinutes(),
                a.getSeconds(),
                this.fileList);
            var o = this.textAreaValue;
            var n = (this.imgUrlList, this.contactInformation);
            if ('' == o) {
                t.showToast('反馈的内容不能为空！');
                return false;
            }

            if ('' == i) {
                t.showToast('请至少选择一张图片上传');
                return false;
            }

            if ('' == n) {
                t.showToast('联系方式不能为空！');
                return false;
            }

            if (1 == /^\d+$/.test(n)) {
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(n)) {
                    t.showToast('手机号有误');
                    return false;
                }

                console.log('验证通过');
            } else {
                if (!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(n)) {
                    t.showToast('联系方式有误');
                    return false;
                }
            }

            i = this.fileList;

            for (var s = t.obtain(this), l = t.getPhone(), r = 0; r < i.length; r++) {
                console.log('22222222222222222222');
                console.log('content是' + this.textAreaValue);
                console.log('contact_information是' + this.contactInformation);
                uni.uploadFile({
                    url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Feedback/uploadimg',
                    filePath: i[r].url,
                    name: 'file',
                    formData: {
                        feedback_content: this.textAreaValue,
                        contact_information: this.contactInformation,
                        phone: l,
                        token: s
                    },
                    success: function (e) {
                        console.log('返回的信息是' + JSON.stringify(e));

                        if ('不支持的文件上传类型' == e.data) {
                            t.showToast('上传失败，文件仅支持 png,jpg,jpeg 格式');
                            return false;
                        }

                        if (200 == e.statusCode) {
                            uni.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1000
                            });
                            setTimeout(function () {
                                uni.switchTab({
                                    url: '/pages/user-my-info-main/user'
                                });
                            }, 1000);
                        } else {
                            uni.showToast({
                                title: '上传失败',
                                icon: 'error',
                                duration: 1000
                            });
                        }
                    },
                    fail: function (t) {
                        console.log('错误的原因是' + JSON.stringify(t));
                    }
                });
            }
        },

        record: function () {
            uni.navigateTo({
                url: '/pages/user-feedback-history/history'
            });
        }
    }
};
</script>
<style>
@import './feedback.css';
</style>
