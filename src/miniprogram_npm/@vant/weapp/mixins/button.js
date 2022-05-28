Object.defineProperty(exports, '__esModule', {
    value: !0
}),
    (exports.button = void 0);

var e = require('./../common/version.js');

exports.button = {
    data() {
        return {
            canIUseGetUserProfile: (0, e.canIUseGetUserProfile)()
        };
    },
    externalClasses: ['hover-class'],
    props: {
        id: String,
        lang: String,
        businessId: Number,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        ariaLabel: String,
        openType: String,
        getUserProfileDesc: String
    },
    methods: {
        onGetUserInfo: function (e) {
            this.$emit('getuserinfo', {
                detail: e.detail
            });
        },
        onContact: function (e) {
            this.$emit('contact', {
                detail: e.detail
            });
        },
        onGetPhoneNumber: function (e) {
            this.$emit('getphonenumber', {
                detail: e.detail
            });
        },
        onError: function (e) {
            this.$emit('error', {
                detail: e.detail
            });
        },
        onLaunchApp: function (e) {
            this.$emit('launchapp', {
                detail: e.detail
            });
        },
        onOpenSetting: function (e) {
            this.$emit('opensetting', {
                detail: e.detail
            });
        }
    }
};
