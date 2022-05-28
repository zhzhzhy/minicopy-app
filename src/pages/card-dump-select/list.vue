<template>
    <view>
        <card-wallet-list @selected="onDumpSelected" :cardType="type" :showView="1" style="height: 100%"></card-wallet-list>
    </view>
</template>

<script>
import cardWalletList from '@/components/card-wallet-list/card-wallet-list';
export default {
    components: {
        cardWalletList
    },
    data() {
        return {
            type: '',
            uuid1: '',
            mode: ''
        };
    },
    onLoad: function (e) {
        var t = e.type;
        var a = e.uuid1;
        var i = e.mode;
        console.log('uuid1是' + a);
        this.setData({
            type: t,
            uuid1: a,
            mode: i
        });
    },
    onUnload: function () {},
    onShow: function () {},
    onHide: function () {},
    methods: {
        onDumpSelected: function (e) {
            var t = this.type;
            var a = this.mode;
            if ('IC' == t && 'equal' == a) {
                var i = this.uuid1;
                uni.redirectTo({
                    url: '/pages/data-comparison/index?' + 'uuid1='.concat(i, '&uuid2=').concat(e.detail)
                });
            } else {
                uni.navigateBack();
                this.getOpenerEventChannel().emit('onDumpSelected', e.detail);
            }
        }
    }
};
</script>
<style>
@import './list.css';
</style>
