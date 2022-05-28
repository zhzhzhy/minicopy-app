<template>
    <view>
        <view class="question">
            <text @tap="jumpPage">遇到问题?</text>
            <icon class="doubleArrow"></icon>
        </view>
    </view>
</template>

<script>
import vanButton from '../../miniprogram_npm/@vant/weapp/button/index';
import vanPopup from '../../miniprogram_npm/@vant/weapp/popup/index';
import vanCell from '../../miniprogram_npm/@vant/weapp/cell/index';
import vanImage from '../../miniprogram_npm/@vant/weapp/image/index';
import vanActionSheet from '../../miniprogram_npm/@vant/weapp/action-sheet/index';
export default {
    components: {
        vanButton,
        vanPopup,
        vanCell,
        vanImage,
        vanActionSheet
    },
    data() {
        return {};
    },
    props: {},
    methods: {
        jumpPage: function () {
            uni.navigateTo({
                url: '/pages/user-device-help/help'
            });
        }
    }
};
</script>
<style>
@import './problem-help.css';
</style>
