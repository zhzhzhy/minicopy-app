<template>
    <view>
        <page-container
            @afterleave="onUserback"
            class="hidePageContainer"
            customStyle="display: none; width: 0; height: 0;"
            duration="1"
            :overlay="false"
            overlayStyle="display: none; width: 0; height: 0;"
            :show="backListenPageShow"
            style="display: none; width: 0; height: 0"
            zIndex="-999"
        ></page-container>
    </view>
</template>

<script>
export default {
    data() {
        return {
            backListenPageShow: false,
            backListenerEnable: false
        };
    },

    props: {
        canback: {
            type: Boolean,
            default: true
        }
    },

    watch: {
        canback: {
            handler: function (t) {
                this.updateStatus(t);
            },

            immediate: true,
            deep: true
        }
    },

    onPageShow: function () {
        this.updateStatus(this.canback);
    },

    onPageHide: function () {
        this.updateStatus(true);
    },

    destroyed: function () {
        this.updateStatus(true);
    },

    error: function (t) {
        console.log('页面事件拦截组件错误: ' + t);
    },

    methods: {
        onUserback: function () {
            var that = this;

            if (that.backListenerEnable) {
                console.log('拦截了退出事件！');

                if (that.canback) {
                    that.setData({
                        backListenPageShow: false
                    });
                    console.log('判断到可以返回');
                } else {
                    console.log('判断到无法返回');
                    that.updateStatus(false, function () {
                        that.$emit('back', {
                            detail: {
                                goBack: function (a) {
                                    that.updateStatus(true, function () {
                                        uni.navigateBack(a);
                                    });
                                },
                                '提示: ': '使用 e.detail.goBack(option); 可退出页面，其中参数option将直接传递给 wx.navigateBack(option)。'
                            }
                        });
                    });
                }
            }
        },
        updateStatus: function (t, a) {
            this.setData(
                {
                    backListenerEnable: !t,
                    backListenPageShow: !t
                },
                function () {
                    if ('function' == typeof a) {
                        setTimeout(a, 50);
                    }
                }
            );
        }
    }
};
</script>
<style>
@import './back.css';
</style>
