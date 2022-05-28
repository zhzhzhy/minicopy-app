<template>
    <view>
        <card-reader-fail @retry="retry" helpCode="1" :status="status" title="读卡失败"></card-reader-fail>
    </view>
</template>

<script>
import cardReaderFail from '@/components/card-reader-fail/fail';
export default {
    components: {
        cardReaderFail
    },
    data() {
        return {
            status: ''
        };
    },
    onLoad: function (t) {
        this.setData({
            status: t.status
        });
    },
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    methods: {
        retry: function () {
            uni.navigateBack();
        }
    }
};
</script>
<style>
@import './fail.css';
</style>
