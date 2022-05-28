Object.defineProperty(exports, '__esModule', {
    value: !0
}),
    (exports.basic = void 0),
    (exports.basic = {
        methods: {
            $emit: function (e, t, i) {
                this.$emit(
                    e,
                    {
                        detail: t
                    },
                    i
                );
            },
            set: function (e) {
                return (
                    this.setData(e),
                    new Promise(function (e) {
                        return uni.nextTick(e);
                    })
                );
            }
        }
    });
