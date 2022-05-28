# minicopy-app

minicopy双频IC/ID读写卡器android app(crack写卡无限次数)

目前已完成反编译，android app正在开发中，有一些BUG需要修复，需要修改写卡次数的逻辑

欢迎各位大佬提交pull request

`wxapkg_src`文件夹为反编译的小程序源码

`wxapkg` 文件夹为小程序wxapkg包（含子包）

`src`文件夹为uniapp 的反编译源码

TODO LIST:

- [x] init reverse engineering miniprogram
- [ ] fix bluetooth connecting bug
- [ ] fix multiple buy error logic


## 硬件参数

从PCB初步判断，主控芯片为STM32，PCB预留了`TDI` `TMS` `TCK` `TDO`等JTAG通信接口，采用JLINK仿真器烧录调试程序.

![pcb.png](asset/pcb.png)

