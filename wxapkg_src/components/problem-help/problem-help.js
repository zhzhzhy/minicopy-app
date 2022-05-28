Component({
    properties: {},
    data: {},
    methods: {
        jumpPage: function() {
            wx.navigateTo({
                url: "/pages/user-device-help/help"
            });
        }
    }
});