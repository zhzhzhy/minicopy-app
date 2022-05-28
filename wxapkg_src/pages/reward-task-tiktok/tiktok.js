var t = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        username: "",
        contactImformation: "",
        tiktokNumber: "",
        videoTitle: "",
        fansNumber: "",
        videoLike: "",
        usernameError: "",
        phoneError: "手机号格式错误",
        fileList: [],
        imgLength: 0
    },
    deleteImage: function(t) {
        console.log(t);
        var i = this.data.fileList, e = void 0 === i ? [] : i;
        e.splice(t.detail.index, 1), this.setData({
            fileList: e
        }), this.setData({
            imgLength: this.data.fileList.length
        });
    },
    username: function(t) {
        this.setData({
            username: t.detail
        });
    },
    contactImformation: function(t) {
        this.setData({
            contactImformation: t.detail
        });
    },
    tiktokNumber: function(t) {
        this.setData({
            tiktokNumber: t.detail
        });
    },
    videoTitle: function(t) {
        this.setData({
            videoTitle: t.detail
        });
    },
    fansNumber: function(t) {
        this.setData({
            fansNumber: t.detail
        });
    },
    videoLike: function(t) {
        this.setData({
            videoLike: t.detail
        });
    },
    afterRead: function(t) {
        console.log(t.detail);
        var i = t.detail.file, e = this.data.fileList, a = void 0 === e ? [] : e;
        console.log(i), i.forEach(function(t) {
            a.push({
                url: t.url
            });
        }), this.setData({
            fileList: a
        }), console.log("fileList是 " + JSON.stringify(this.data.fileList)), this.setData({
            imgLength: this.data.fileList.length
        }), console.log("长度是 " + this.data.imgLength);
    },
    submit: function() {
        var i = this.data.username, e = this.data.contactImformation, a = this.data.tiktokNumber, o = this.data.videoTitle, n = this.data.fansNumber, s = this.data.videoLike;
        if (console.log("username是" + i), "" == i) return t.showToast("需要填写姓名"), !1;
        if ("" == e) return t.showToast("需要填写联系方式"), !1;
        if ("" == a) return t.showToast("需要填写抖音账号"), !1;
        if ("" == o) return t.showToast("需要填写视频标题"), !1;
        if ("" == n) return t.showToast("需要填写粉丝数量"), !1;
        if ("" == s) return t.showToast("需要填写视频点赞数"), !1;
        if ("" == this.data.fileList) return t.showToast("请至少上传一张图片"), !1;
        for (var r = 0; r < i.length; r++) {
            var u = i[r].charCodeAt();
            if (u >= 48 && u <= 57) return console.log("存在数字" + i[r]), this.setData({
                usernameError: "不能存在数字"
            }), !1;
        }
        var l = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。", f = l.length;
        for (r = 0; r < f; r++) if (-1 != i.indexOf(l.substring(r, r + 1))) return console.log("存在特殊字符"), 
        this.setData({
            usernameError: "不能存在特殊字符"
        }), !1;
        var h = this.data.fileList, c = t.obtain(this), d = t.getPhone();
        for (r = 0; r < h.length; r++) wx.uploadFile({
            url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Tiktok/index",
            filePath: h[r].url,
            name: "file",
            formData: {
                user_name: this.data.username,
                contact_information: this.data.contactImformation,
                tiktok_number: this.data.tiktokNumber,
                video_title: this.data.videoTitle,
                fans_number: this.data.fansNumber,
                video_like: this.data.videoLike,
                phone: d,
                token: c
            },
            success: function(i) {
                if (console.log("返回的信息是" + JSON.stringify(i)), "不支持的文件上传类型" == i.data) return t.showToast("上传失败，文件仅支持 png,jpg,jpeg 格式"), 
                !1;
                200 == i.statusCode ? (wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/user-my-info-main/user"
                    });
                }, 1e3)) : wx.showToast({
                    title: "上传失败",
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function(t) {
                console.log("错误的原因是" + JSON.stringify(t));
            }
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        t.checkToken(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});