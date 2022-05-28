Object.defineProperty(exports, '__esModule', {
    value: !0
}),
    (exports.link = void 0),
    (exports.link = {
        props: {
            url: String,
            linkType: {
                type: String,
                value: 'navigateTo'
            }
        },
        methods: {
            jumpLink: function (e) {
                void 0 === e && (e = 'url');
                var t = this[e];
                t &&
                    ('navigateTo' === this.linkType && getCurrentPages().length > 9
                        ? uni.redirectTo({
                              url: t
                          })
                        : uni[this.linkType]({
                              url: t
                          }));
            }
        }
    });
