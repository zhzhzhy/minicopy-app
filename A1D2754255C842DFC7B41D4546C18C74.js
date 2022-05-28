var e = require('./3E90FCB755C842DF58F694B049818C74.js'),
    n = null;

function t(e) {
    uni.showToast({
        title: e,
        icon: 'none',
        duration: 1e3
    });
}

function o() {
    var n = e.getStorageSyncHasDefault('token', {});
    return console.log('这里的token是' + JSON.stringify(n)), n;
}

function i() {
    var n = e.getStorageSyncHasDefault('phoneObj', null);
    return null != n && (n = n.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')), n;
}

function a() {
    var n = e.getStorageSyncHasDefault('phoneObj', {});
    return console.log('得到的手机是' + n), n;
}

function c() {
    ['token', 'phoneObj'].forEach(function (e) {
        try {
            uni.removeStorageSync(e);
        } catch (e) {
            console.err(e);
        }
    });
}

function r() {
    var e = o(),
        n = a();
    if ((console.log('phoneNumber是' + n), Object.keys(n).length <= 0))
        return (
            uni.navigateTo({
                url: '/pages/user-login-onekey/login'
            }),
            !1
        );
    uni.request({
        url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/checkToken',
        data: {
            phone: n,
            token: e
        },
        header: {
            'content-type': 'application/json'
        },
        success: function (e) {
            var n = e.data.status;
            console.log('后端token状态是' + JSON.stringify(e)),
                1 == n &&
                    (c(),
                    uni.navigateTo({
                        url: '/pages/user-login-onekey/login'
                    }));
        },
        fail: function (e) {
            console.log(e);
        }
    });
}

function s() {
    return e.getStorageSyncHasDefault('dump_nicks', {});
}

function u() {
    return e.getStorageSyncHasDefault('dump_nicks', {});
}

function l() {
    var e = u(),
        n = 0;

    for (var t in e)
        try {
            var o = e[t].match(/家里门卡(\d*)/);

            if (null != o) {
                o = o[1];
                var i = parseInt(o);
                i > n && (n = i);
            }
        } catch (e) {
            console.error('在迭代卡包名称以生成默认值是出现异常: ' + e);
        }

    return '家里门卡' + (n + 1);
}

function p(e, n) {
    var t = u();

    for (var o in t)
        if (t[o] == e)
            return {
                isok: !1,
                uuid: null,
                message: '已经存在相同名称的卡片了'
            };

    var i = n();
    return (
        0 == e.length && (e = l()),
        (t[i] = e),
        uni.setStorageSync('dump_nicks', t),
        {
            isok: !0,
            uuid: i,
            message: '保存成功'
        }
    );
}

module.exports = {
    obtain: o,
    checkToken: r,
    getHidePhone: i,
    getPhone: a,
    removeAppStorage: c,
    judgePhoneNumber: function (e) {
        var n = i();
        return (
            e.setData({
                phone: n
            }),
            n
        );
    },
    getDeviceBindStatus: function (e, n) {
        r();
        var i = o(),
            c = a();
        console.log('util  uuid是' + e),
            uni.request({
                url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Devicebinding/checkBind',
                data: {
                    uuid: e,
                    phone: c,
                    token: i
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (e) {
                    console.log('查询用户设备绑定状态返回的数据是' + JSON.stringify(e.data)), n(e.data.status);
                },
                fail: function (e) {
                    console.log(e),
                        uni.hideLoading({
                            success: function (e) {
                                t('网络异常');
                            }
                        });
                }
            });
    },
    bindDeviceWithUser: function (e, n) {
        r();
        var i = o(),
            c = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/Devicebinding/deviceBinding',
            data: {
                uuid: e,
                phone: c,
                deviceName: n,
                token: i
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (e) {
                console.log('绑定成功');
            },
            fail: function (e) {
                console.log(e), t('绑定失败');
            }
        });
    },
    showToast: t,
    remainNumber: function (e) {
        r();
        var n = o(),
            t = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/remainCount',
            data: {
                phone: t,
                token: n
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (n) {
                if ((console.log('剩余的次数是 ' + JSON.stringify(n)), '会员已过期' == n.data.data.expirationTime)) {
                    console.log('剩余的次数是空 ');
                    var t = '会员已过期',
                        o = n.data.data.remain_count;
                    return e(o, i, t), !1;
                }

                o = n.data.data.remain_count;
                var i = n.data.data.vip_end_date;
                t = n.data.data.expirationTime;
                e(o, i, t), console.log('会员时间是' + n.data.data.expirationTime);
            },
            fail: function (e) {
                console.log(e);
            }
        });
    },
    checkActivity: function (e) {
        var n = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/checkActivity',
            data: {
                phone: n
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (n) {
                console.log('获取到的活动数据是 ' + JSON.stringify(n)),
                    console.log('获取到的活动类型是 ' + JSON.stringify(n.data.activity_status)),
                    console.log('是否有参加活 ' + JSON.stringify(n.data.isAttend));
                var t = n.data.activity_status,
                    o = n.data.activity_type,
                    i = n.data.isAttend;
                'on' == t && 'yes' == i
                    ? (e.setData({
                          sendVip: !0,
                          sendVipClose: 'yes'
                      }),
                      console.log('活动打开也参加了' + e.data.sendVipClose))
                    : 'on' == t && 'no' == i
                    ? (e.setData({
                          sendVip: !1,
                          activity_type: o
                      }),
                      console.log('活动打开没参加' + e.data.sendVipClose))
                    : 'off' == t &&
                      (e.setData({
                          sendVip: !0,
                          sendVipClose: 'yes'
                      }),
                      console.log('活动关闭' + e.data.sendVipClose));
            },
            fail: function (e) {
                console.log(e);
            }
        });
    },
    sendVip: function (e, n) {
        r();
        var t = o(),
            i = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/sendVip',
            data: {
                phone: i,
                token: t,
                activity_type: n
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (n) {
                e.setData({
                    sendVip: !0
                });
            },
            fail: function (e) {
                console.log(e);
            }
        });
    },
    userUseVip: function () {
        r();
        var e = o(),
            n = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/userUseVip',
            data: {
                phone: n,
                token: e
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (e) {
                console.log('用户使用了vip' + JSON.stringify(e));
            },
            fail: function (e) {
                console.log(e);
            }
        });
    },
    remainNumber1: function (e) {
        r();
        var n = o(),
            t = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/remainCount1',
            data: {
                phone: t,
                token: n
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (n) {
                console.log('剩余的次数是 ' + JSON.stringify(n));
                var t = n.data.data.remain_count,
                    o = n.data.data.vip_end_date,
                    i = n.data.data.expirationTime;
                e(t, o, i);
            },
            fail: function (e) {
                console.log(e);
            }
        });
    },
    deductionTimes: function () {
        r();
        var e = o(),
            n = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/deductionTimes',
            data: {
                phone: n,
                token: e
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (e) {
                console.log('获取到的活动数据是 ' + JSON.stringify(e));
            },
            fail: function (e) {
                console.log(e);
            }
        });
    },
    setDeviceInfo: function (e) {
        n = e;
    },
    getDeviceInfo: function () {
        return n;
    },
    setIsConnected: function (e) {
        e = e;
    },
    getIsConnected: function () {
        return null;
    },
    isVip: function () {
        r();
        var e = o(),
            n = a();
        uni.request({
            url: 'https://rcopy.nikola-lab.cn/server2/thinkphp/public/index.php/api/User/isVIP',
            data: {
                phone: n,
                token: e
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (e) {
                if ((console.log('用户使用了vip111' + JSON.stringify(e)), '会员已过期' == e.data.data.expirationTime)) {
                    return !1;
                }
            },
            fail: function (e) {
                console.log(e);
            }
        });
    },
    login: function () {
        r();
        var e = a();
        if ((console.log('phone是' + e), null == e)) return console.log('请先登录'), !1;
    },
    isLogin: function () {
        var e = a();
        return console.log('phone是' + e), !(Object.keys(e).length <= 0);
    },
    processBLEError: function (e) {
        uni.hideLoading({
            success: function () {
                10001 == e.errCode
                    ? t('请开启手机蓝牙')
                    : -1 == e.errCode
                    ? t('连接成功！')
                    : 10002 == e.errCode
                    ? t('没有找到蓝牙设备')
                    : 10003 == e.errCode
                    ? t('蓝牙连接失败！')
                    : 10006 == e.errCode
                    ? t('当前连接已经断开')
                    : 10009 == e.errCode
                    ? uni.showModal({
                          title: '警告！',
                          content: '系统版本低于 4.3 不支持 BLE',
                          showCancel: !1
                      })
                    : 10012 == e.errCode
                    ? t('连接超时')
                    : uni.showModal({
                          title: '警告！',
                          content: '蓝牙适配器异常，错误码: '.concat(e.errCode, '，错误原因: ').concat(e.errMsg),
                          showCancel: !1
                      });
            }
        });
    },
    getDumpNicksInStorage: s,
    setDumpNicksToStorage: function (e) {
        uni.setStorageSync('dump_nicks', e);
    },
    getDumpNickNameByUUID: function (e) {
        var n = s();
        return e in n ? n[e] : void 0;
    },
    saveCard: function (n) {
        return p(n, function () {
            return e.saveDumpDatasToFile();
        });
    },
    getDumpNicks: u,
    createDefaultNick: l,
    newCard: function (n) {
        var t = n.cardName,
            o = n.type;
        return p(t, function () {
            return e.makeDatasSaveToFile({
                type: ''.concat(o)
            });
        });
    }
};
