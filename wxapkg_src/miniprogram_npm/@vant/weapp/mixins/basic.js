Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.basic = void 0, exports.basic = Behavior({
    methods: {
        $emit: function(e, t, i) {
            this.triggerEvent(e, t, i);
        },
        set: function(e) {
            return this.setData(e), new Promise(function(e) {
                return wx.nextTick(e);
            });
        }
    }
});