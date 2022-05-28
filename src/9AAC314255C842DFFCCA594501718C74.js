var e = require('./39DE27D555C842DF5FB84FD20B718C74.js'),
    o = require('./4F97F14255C842DF29F19945DB418C74.js'),
    n = !1,
    t = !1,
    i = function (e) {},
    l = null,
    c = null;

function s() {
    uni.showToast({
        title: '设备重连成功',
        icon: 'none'
    });
}

function r(l) {
    o.disconnectExistsDevice(function () {
        (n = !0),
            (t = !1),
            e.deviceDisconnect(),
            e.deviceConnect({
                deviceId: l,
                connected: function (o) {
                    console.log('欲OTA的设备已经连接: ' + JSON.stringify(o) + ', 将会自动启动OTA过程！'),
                        n &&
                            ((n = !1),
                            e.startUpdate({
                                rebootMode: 2,
                                progress: function (e) {
                                    e.txSize >= e.frimSize
                                        ? (console.log('更新成功'),
                                          uni.showToast({
                                              title: '更新成功',
                                              icon: 'none'
                                          }),
                                          (t = !0),
                                          (c = null))
                                        : 'function' == typeof i && i(Math.round((e.txSize / e.frimSize) * 100));
                                },
                                fail: function (e) {
                                    console.log('更新失败: ' + e.errMsg);
                                }
                            }));
                },
                disconnected: function () {
                    uni.showToast({
                        title: '设备已断开',
                        icon: 'none'
                    }),
                        t && ((t = !1), o.connectTheBLEByMacAddr(l, s));
                },
                fail: function (e) {
                    uni.showModal({
                        showCancel: !1,
                        title: '连接失败',
                        content: e.errMsg
                    });
                }
            });
    });
}

function a() {
    var n = e.getFrimwareInfo();

    if (null == n) {
        var t = e.load(c);
        if (void 0 !== t)
            return void uni.showModal({
                showCancel: !1,
                title: '固件错误',
                content: t
            });
        (n = e.getFrimwareInfo()), console.log('OTA固件中的信息: ' + JSON.stringify(n));
    }

    var i = o.getBLEDeviceIDByEstablished();
    null != i || null != l ? (null == i ? (i = l) : (l = i), r(i)) : console.error('不允许未建立连接就发起更新！');
}

module.exports = {
    startUpdate: function () {
        var e;
        null == c
            ? ((e = function (e) {
                  (c = e.data), a();
              }),
              uni.downloadFile({
                  url: 'http://10.30.0.11:8080/firmware/download',
                  timeout: 3e3,
                  success: function (o) {
                      if (200 == o.statusCode) {
                          console.log('下载的文件的临时路径: ' + o.tempFilePath);
                          var n = uni.getFileSystemManager();
                          n.readFile({
                              filePath: o.tempFilePath,
                              success: e,
                              complete: function () {
                                  n.removeSavedFile({
                                      filePath: o.tempFilePath
                                  });
                              }
                          });
                      } else console.log('下载失败: ' + o.statusCode);
                  }
              }))
            : a();
    },
    setOnOTAProgressUpdate: function (e) {
        i = e;
    }
};
