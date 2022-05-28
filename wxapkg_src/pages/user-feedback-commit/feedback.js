var t = require("../../A1D2754255C842DFC7B41D4546C18C74.js");

Page({
    data: {
        currentNoteLen: 0,
        limitNoteLen: "",
        fileList: [],
        imgLength: 0,
        textAreaValue: "",
        contactInformation: "",
        imgUrlList: []
    },
    bindTextAreaBlur: function(t) {
        this.setData({
            textAreaValue: t.detail.value
        }), console.log("textarea的值是" + t.detail.value);
    },
    limitWord: function(t) {
        var e = t.detail.value, a = parseInt(e.length);
        a > this.data.noteMaxLen || this.setData({
            currentNoteLen: a,
            limitNoteLen: this.data.noteMaxLen - a
        });
    },
    input: function(t) {
        console.log("input的值是" + t.detail.value), this.setData({
            contactInformation: t.detail.value
        });
    },
    deleteImage: function(t) {
        console.log(t);
        var e = this.data.fileList, a = void 0 === e ? [] : e;
        a.splice(t.detail.index, 1), this.setData({
            fileList: a
        }), this.setData({
            imgLength: this.data.fileList.length
        });
    },
    afterRead: function(t) {
        console.log(t.detail);
        var e = t.detail.file, a = this.data.fileList, i = void 0 === a ? [] : a;
        console.log(e), e.forEach(function(t) {
            i.push({
                url: t.url
            });
        }), this.setData({
            fileList: i
        }), console.log("fileList是 " + JSON.stringify(this.data.fileList)), this.setData({
            imgLength: this.data.fileList.length
        }), console.log("长度是 " + this.data.imgLength);
    },
    submit: function() {
        var e = Date.parse(new Date());
        e /= 1e3;
        var a = new Date(1e3 * e), i = (a.getFullYear(), a.getMonth() + 1 < 10 ? a.getMonth() : a.getMonth(), 
        a.getDate() < 10 ? a.getDate() : a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), 
        this.data.fileList), o = this.data.textAreaValue, n = (this.data.imgUrlList, this.data.contactInformation);
        if ("" == o) return t.showToast("反馈的内容不能为空！"), !1;
        if ("" == i) return t.showToast("请至少选择一张图片上传"), !1;
        if ("" == n) return t.showToast("联系方式不能为空！"), !1;
        if (1 == /^\d+$/.test(n)) {
            if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(n)) return t.showToast("手机号有误"), !1;
            console.log("验证通过");
        } else {
            if (!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(n)) return t.showToast("联系方式有误"), 
            !1;
        }
        i = this.data.fileList;
        for (var s = t.obtain(this), l = t.getPhone(), r = 0; r < i.length; r++) console.log("22222222222222222222"), 
        console.log("content是" + this.data.textAreaValue), console.log("contact_information是" + this.data.contactInformation), 
        wx.uploadFile({
            url: "https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Feedback/uploadimg",
            filePath: i[r].url,
            name: "file",
            formData: {
                feedback_content: this.data.textAreaValue,
                contact_information: this.data.contactInformation,
                phone: l,
                token: s
            },
            success: function(e) {
                if (console.log("返回的信息是" + JSON.stringify(e)), "不支持的文件上传类型" == e.data) return t.showToast("上传失败，文件仅支持 png,jpg,jpeg 格式"), 
                !1;
                200 == e.statusCode ? (wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.switchTab({
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
    record: function() {
        wx.navigateTo({
            url: "/pages/user-feedback-history/history"
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