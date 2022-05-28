<template>
    <view>
        <view class="topLine"></view>
        <van-cell-group>
            <van-field
                @change="username"
                :errorMessage="usernameError"
                errorMessageAlign="right"
                inputAlign="right"
                label="姓名"
                :value="username"
                placeholder="我的名字"
            ></van-field>
            <van-field
                @change="contactImformation"
                errorMessageAlign="right"
                inputAlign="right"
                label="联系方式"
                maxlength="11"
                placeholder="请输入"
                type="number"
                :value="contactImformation"
            ></van-field>
            <van-field
                @change="tiktokNumber"
                :errorMessage="tiktokNumberError"
                errorMessageAlign="right"
                inputAlign="right"
                label="抖音账号"
                placeholder="请输入"
                type="number"
                :value="tiktokNumber"
            ></van-field>
            <van-field @change="videoTitle" inputAlign="right" label="视频标题" :value="videoTitle" placeholder="请输入"></van-field>
            <van-field @change="fansNumber" inputAlign="right" label="粉丝数量" :value="fansNumber" placeholder="请输入" type="number"></van-field>
            <van-field @change="videoLike" inputAlign="right" label="视频点赞数" :value="videoLike" placeholder="请输入" type="number"></van-field>
        </van-cell-group>
        <view class="empty"></view>
        <view class="upImgBlock">
            <view>
                <text class="upImgText">上传图片</text>
                <text class="upImgRemain">
                    上传视频播放页截图
                    <text>{{ imgLength }}/4</text>
                </text>
            </view>
            <view class="upImg">
                <van-uploader accept="image" @after-read="afterRead" @delete="deleteImage" class="van_uploader" :fileList="fileList" maxCount="4" :multiple="true"></van-uploader>
            </view>
        </view>
        <view style="position: absolute; margin-top: 266rpx; margin-bottom: 100rpx; width: 100%; height: 100rpx; text-align: center">
            <van-button
                @tap.native="submit"
                customStyle="width:90%;height: 40px;font-size:30rpx;border-radius:20px 20px 20px 20px;background:#F5A200;border:1px solid #F5A200;color:#fff;font-weight:500;"
                type="primary"
            >
                提交
            </van-button>
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
            username: '',
            contactImformation: '',
            tiktokNumber: '',
            videoTitle: '',
            fansNumber: '',
            videoLike: '',
            usernameError: '',
            phoneError: '手机号格式错误',
            fileList: [],
            imgLength: 0,
            tiktokNumberError: 0
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
        deleteImage: function (t) {
            console.log(t);
            var i = this.fileList;
            var e = void 0 === i ? [] : i;
            e.splice(t.detail.index, 1);
            this.setData({
                fileList: e
            });
            this.setData({
                imgLength: this.fileList.length
            });
        },

        usernameFun: function (t) {
            this.setData({
                username: t.detail
            });
        },

        contactImformation: function (t) {
            this.setData({
                contactImformation: t.detail
            });
        },

        tiktokNumber: function (t) {
            this.setData({
                tiktokNumber: t.detail
            });
        },

        videoTitle: function (t) {
            this.setData({
                videoTitle: t.detail
            });
        },

        fansNumber: function (t) {
            this.setData({
                fansNumber: t.detail
            });
        },

        videoLike: function (t) {
            this.setData({
                videoLike: t.detail
            });
        },

        afterRead: function (t) {
            console.log(t.detail);
            var i = t.detail.file;
            var e = this.fileList;
            var a = void 0 === e ? [] : e;
            console.log(i);
            i.forEach(function (t) {
                a.push({
                    url: t.url
                });
            });
            this.setData({
                fileList: a
            });
            console.log('fileList是 ' + JSON.stringify(this.fileList));
            this.setData({
                imgLength: this.fileList.length
            });
            console.log('长度是 ' + this.imgLength);
        },

        submit: function () {
            var i = this.username;
            var e = this.contactImformation;
            var a = this.tiktokNumber;
            var o = this.videoTitle;
            var n = this.fansNumber;
            var s = this.videoLike;
            console.log('username是' + i);

            if ('' == i) {
                t.showToast('需要填写姓名');
                return false;
            }

            if ('' == e) {
                t.showToast('需要填写联系方式');
                return false;
            }

            if ('' == a) {
                t.showToast('需要填写抖音账号');
                return false;
            }

            if ('' == o) {
                t.showToast('需要填写视频标题');
                return false;
            }

            if ('' == n) {
                t.showToast('需要填写粉丝数量');
                return false;
            }

            if ('' == s) {
                t.showToast('需要填写视频点赞数');
                return false;
            }

            if ('' == this.fileList) {
                t.showToast('请至少上传一张图片');
                return false;
            }

            for (var r = 0; r < i.length; r++) {
                var u = i[r].charCodeAt();

                if (u >= 48 && u <= 57) {
                    console.log('存在数字' + i[r]);
                    this.setData({
                        usernameError: '不能存在数字'
                    });
                    return false;
                }
            }

            var l = '~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：\'"“‘,./<>《》?？，。';
            var f = l.length;
            for (r = 0; r < f; r++) {
                if (-1 != i.indexOf(l.substring(r, r + 1))) {
                    console.log('存在特殊字符');
                    this.setData({
                        usernameError: '不能存在特殊字符'
                    });
                    return false;
                }
            }

            var h = this.fileList;
            var c = t.obtain(this);
            var d = t.getPhone();
            for (r = 0; r < h.length; r++) {
                uni.uploadFile({
                    url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tiktok/index',
                    filePath: h[r].url,
                    name: 'file',
                    formData: {
                        user_name: this.username,
                        contact_information: this.contactImformation,
                        tiktok_number: this.tiktokNumber,
                        video_title: this.videoTitle,
                        fans_number: this.fansNumber,
                        video_like: this.videoLike,
                        phone: d,
                        token: c
                    },
                    success: function (i) {
                        console.log('返回的信息是' + JSON.stringify(i));

                        if ('不支持的文件上传类型' == i.data) {
                            t.showToast('上传失败，文件仅支持 png,jpg,jpeg 格式');
                            return false;
                        }

                        if (200 == i.statusCode) {
                            uni.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1000
                            });
                            setTimeout(function () {
                                uni.reLaunch({
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
        }
    }
};
</script>
<style>
@import './tiktok.css';
</style>
