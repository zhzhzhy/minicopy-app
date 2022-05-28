Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.button = void 0;

var e = require("../common/version");

exports.button = Behavior({
    externalClasses: [ "hover-class" ],
    properties: {
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
    data: {
        canIUseGetUserProfile: (0, e.canIUseGetUserProfile)()
    },
    methods: {
        onGetUserInfo: function(e) {
            this.triggerEvent("getuserinfo", e.detail);
        },
        onContact: function(e) {
            this.triggerEvent("contact", e.detail);
        },
        onGetPhoneNumber: function(e) {
            this.triggerEvent("getphonenumber", e.detail);
        },
        onError: function(e) {
            this.triggerEvent("error", e.detail);
        },
        onLaunchApp: function(e) {
            this.triggerEvent("launchapp", e.detail);
        },
        onOpenSetting: function(e) {
            this.triggerEvent("opensetting", e.detail);
        }
    }
});