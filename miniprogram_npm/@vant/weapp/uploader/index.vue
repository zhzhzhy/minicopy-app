<template>
    <view class="van-uploader">
        <view class="van-uploader__wrapper">
            <view @tap="onClickPreview" class="van-uploader__preview" :data-index="index" v-if="previewImage" v-for="(item, index) in lists" :key="index">
                <image
                    :alt="item.name || '图片' + index"
                    @tap="onPreviewImage"
                    class="van-uploader__preview-image"
                    :data-index="index"
                    :mode="imageFit"
                    :src="item.thumb || item.url"
                    :style="computed.sizeStyle({ previewSize: previewSize })"
                    v-if="item.isImage"
                ></image>

                <video
                    :autoplay="item.autoplay"
                    @tap="onPreviewVideo"
                    class="van-uploader__preview-image"
                    :data-index="index"
                    :poster="item.thumb"
                    :src="item.url"
                    :style="computed.sizeStyle({ previewSize: previewSize })"
                    :title="item.name || '视频' + index"
                    v-else-if="item.isVideo"
                ></video>

                <view @tap="onPreviewFile" class="van-uploader__file" :data-index="index" :style="computed.sizeStyle({ previewSize: previewSize })" v-else>
                    <van-icon class="van-uploader__file-icon" name="description"></van-icon>
                    <view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url }}</view>
                </view>

                <view class="van-uploader__mask" v-if="item.status === 'uploading' || item.status === 'failed'">
                    <van-icon class="van-uploader__mask-icon" name="close" v-if="item.status === 'failed'"></van-icon>
                    <van-loading customClass="van-uploader__loading" v-else></van-loading>
                    <text class="van-uploader__mask-message" v-if="item.message">{{ item.message }}</text>
                </view>

                <view @tap.stop.prevent="deleteItem" class="van-uploader__preview-delete" :data-index="index" v-if="deletable && item.deletable">
                    <van-icon class="van-uploader__preview-delete-icon" name="cross"></van-icon>
                </view>
            </view>
            <block v-if="isInCount">
                <view @tap="startUpload" class="van-uploader__slot">
                    <slot></slot>
                </view>
                <view
                    @tap="startUpload"
                    :class="'van-uploader__upload ' + (disabled ? 'van-uploader__upload--disabled' : '')"
                    :style="computed.sizeStyle({ previewSize: previewSize })"
                    v-if="showUpload"
                >
                    <van-icon class="van-uploader__upload-icon" :name="uploadIcon"></van-icon>
                    <text class="van-uploader__upload-text" v-if="uploadText">{{ uploadText }}</text>
                </view>
            </block>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="index.wxs"></script>
<script>
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';
var e = function () {
    return (e =
        Object.assign ||
        function (e) {
            for (var t, i = 1, a = arguments.length; i < a; i++) {
                for (var n in (t = arguments[i])) {
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                        e[n] = t[n];
                    }
                }
            }

            return e;
        }).apply(this, arguments);
};

Object.defineProperty(exports, '__esModule', {
    value: true
});

var t = require('./../common/component.js');

var i = require('././utils.js');

var a = require('././shared.js');

var n = require('./../common/validator.js');

(0, t.VantComponent)({
    props: e(
        e(
            {
                disabled: Boolean,
                multiple: Boolean,
                uploadText: String,
                useBeforeRead: Boolean,
                afterRead: null,
                beforeRead: null,
                previewSize: {
                    type: null,
                    value: 80
                },
                name: {
                    type: null,
                    value: ''
                },
                accept: {
                    type: String,
                    value: 'image'
                },
                fileList: {
                    type: Array,
                    value: [],
                    observer: 'formatFileList'
                },
                maxSize: {
                    type: Number,
                    value: Number.MAX_VALUE
                },
                maxCount: {
                    type: Number,
                    value: 100
                },
                deletable: {
                    type: Boolean,
                    value: true
                },
                showUpload: {
                    type: Boolean,
                    value: true
                },
                previewImage: {
                    type: Boolean,
                    value: true
                },
                previewFullImage: {
                    type: Boolean,
                    value: true
                },
                imageFit: {
                    type: String,
                    value: 'scaleToFill'
                },
                uploadIcon: {
                    type: String,
                    value: 'photograph'
                }
            },
            a.chooseImageProps
        ),
        a.chooseVideoProps
    ),
    data: {
        lists: [],
        isInCount: true
    },
    methods: {
        formatFileList: function () {
            var t = this.data;
            var a = t.fileList;
            var r = void 0 === a ? [] : a;
            var o = t.maxCount;
            var l = r.map(function (t) {
                return e(e({}, t), {
                    isImage: (0, i.isImageFile)(t),
                    isVideo: (0, i.isVideoFile)(t),
                    deletable: !(0, n.isBoolean)(t.deletable) || t.deletable
                });
            });
            this.setData({
                lists: l,
                isInCount: l.length < o
            });
        },
        getDetail: function (e) {
            return {
                name: this.data.name,
                index: null == e ? this.data.fileList.length : e
            };
        },
        startUpload: function () {
            var that = this;
            var a = this.data;
            var n = a.maxCount;
            var r = a.multiple;
            var o = a.lists;
            a.disabled ||
                (0, i.chooseFile)(
                    e(e({}, this.data), {
                        maxCount: n - o.length
                    })
                )
                    .then(function (e) {
                        that.onBeforeRead(r ? e : e[0]);
                    })
                    .catch(function (e) {
                        that.$emit('error', e);
                    });
        },
        onBeforeRead: function (t) {
            var that = this;
            var a = this.data;
            var r = a.beforeRead;
            var o = a.useBeforeRead;
            var l = true;
            if ('function' == typeof r) {
                l = r(t, this.getDetail());
            }

            if (o) {
                l = new Promise(function (a, n) {
                    that.$emit(
                        'before-read',
                        e(
                            e(
                                {
                                    file: t
                                },
                                that.getDetail()
                            ),
                            {
                                callback: function (e) {
                                    if (e) {
                                        a();
                                    } else {
                                        n();
                                    }
                                }
                            }
                        )
                    );
                });
            }

            if (l) {
                if ((0, n.isPromise)(l)) {
                    l.then(function (e) {
                        return that.onAfterRead(e || t);
                    });
                } else {
                    this.onAfterRead(t);
                }
            }
        },
        onAfterRead: function (t) {
            var i = this.data;
            var a = i.maxSize;
            var n = i.afterRead;
            if (
                Array.isArray(t)
                    ? t.some(function (e) {
                          return e.size > a;
                      })
                    : t.size > a
            ) {
                this.$emit(
                    'oversize',
                    e(
                        {
                            file: t
                        },
                        this.getDetail()
                    )
                );
            } else {
                if ('function' == typeof n) {
                    n(t, this.getDetail());
                }

                this.$emit(
                    'after-read',
                    e(
                        {
                            file: t
                        },
                        this.getDetail()
                    )
                );
            }
        },
        deleteItem: function (t) {
            var i = t.currentTarget.dataset.index;
            this.$emit(
                'delete',
                e(e({}, this.getDetail(i)), {
                    file: this.data.fileList[i]
                })
            );
        },
        onPreviewImage: function (e) {
            if (this.data.previewFullImage) {
                var t = e.currentTarget.dataset.index;
                var a = this.data.lists;
                var n = a[t];
                uni.previewImage({
                    urls: a
                        .filter(function (e) {
                            return (0, i.isImageFile)(e);
                        })
                        .map(function (e) {
                            return e.url;
                        }),
                    current: n.url,
                    fail: function () {
                        uni.showToast({
                            title: '预览图片失败',
                            icon: 'none'
                        });
                    }
                });
            }
        },
        onPreviewVideo: function (t) {
            if (this.data.previewFullImage) {
                var a = t.currentTarget.dataset.index;
                var n = this.data.lists;
                uni.previewMedia({
                    sources: n
                        .filter(function (e) {
                            return (0, i.isVideoFile)(e);
                        })
                        .map(function (t) {
                            return e(e({}, t), {
                                type: 'video'
                            });
                        }),
                    current: a,
                    fail: function () {
                        uni.showToast({
                            title: '预览视频失败',
                            icon: 'none'
                        });
                    }
                });
            }
        },
        onPreviewFile: function (e) {
            var t = e.currentTarget.dataset.index;
            uni.openDocument({
                filePath: this.data.lists[t].url,
                showMenu: true
            });
        },
        onClickPreview: function (t) {
            var i = t.currentTarget.dataset.index;
            var a = this.data.lists[i];
            this.$emit('click-preview', e(e({}, a), this.getDetail(i)));
        }
    }
});
</script>
<style>
@import './index.css';
</style>
