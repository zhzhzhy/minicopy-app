module.exports = {
    env: {
        es6: !0,
        browser: !0,
        node: !0
    },
    ecmaFeatures: {
        modules: !0
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    globals: {
        wx: !0,
        App: !0,
        Page: !0,
        getCurrentPages: !0,
        getApp: !0,
        Component: !0,
        requirePlugin: !0,
        requireMiniProgram: !0
    },
    rules: {}
};