<template>
    <view>
        <view class="empty"></view>
        <view class="topBlock" v-for="(item, index) in firstBlock" :key="index">
            <view class="topTitle">{{ item.title }}</view>

            <view class="topText">
                <text>{{ item.text }}</text>
            </view>
        </view>
        <view class="empty1"></view>
        <view class="topBlock" v-for="(item, index) in secondBlock" :key="index">
            <view class="topTitle">{{ item.title }}</view>

            <view class="topText">
                <text>{{ item.text }}</text>
            </view>
        </view>
        <view @tap="jump" class="privacyClause">
            <text>《隐私条款》</text>
        </view>
        <view class="bottomBlock"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            firstBlock: [
                {
                    title: 'Story behind the brand',
                    text: 'The brand was inspired after our founder watched the movie “The Current War”. Starting off as an invention hardware company and with all due respect to Nikola Tesla for his contribution to the alternating current (AC) motor and many other inventions, we decide to name our company Nikola T. Lab. Many might have not know Nikola Tesla but he was the Chief rival, Thomas Edison in the 1890s.'
                },
                {
                    title: 'Company Motto. ',
                    text: 'Never settle for less'
                },
                {
                    title: 'Company Core Values and Philosophy',
                    text: 'Craftsmanship: Satisfy our customers with innovative technology and superior quality, value and service.\nIntegrity: Act with uncompromising honesty and integrity in everything we do\nInnovation: Develop & incorporate new technology\nUnity: We achieve more when we collaborate and all work together. '
                }
            ],
            secondBlock: [
                {
                    title: '品牌背后的故事',
                    text: '该品牌的灵感来自于我们的创始人观看了电影《電流戰爭》。作\n为一家发明硬件公司，我们对 Nikola Tesla 对交流 (AC) 电机和\n许多其他发明的贡献表示衷心的敬意，我们决定将我们的公司命名为 Nikola T. Lab。许多人可能不知道尼古拉特斯拉，但他是1890 年代的主要竞争对手托马斯爱迪生.'
                },
                {
                    title: '公司座右铭',
                    text: '永远不要满足于更少.'
                },
                {
                    title: '公司核心价值观与理念',
                    text: '工匠精神：以创新的技术和卓越的品质、价值和服务让我们的客户满意.\n诚信：在我们所做的每一件事中都以不妥协的诚实和正直行事.\n创新：开发和整合新技术.\n团结：当我们合作并一起工作时，我们会取得更多成就.'
                }
            ]
        };
    },
    onLoad: function (e) {},
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        jump: function () {
            uni.navigateTo({
                url: '/pages/user-agreement/agreement'
            });
        }
    }
};
</script>
<style>
@import './about-us.css';
</style>
