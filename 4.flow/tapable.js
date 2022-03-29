// let { SyncHook } = require('tapable')
class SyncHook {
  constructor() {
    this.taps = [];
  }
  tap(name, fn) {
    this.taps.push(fn);
  }
  call(...args) {
    this.taps.forEach((tap) => tap(...args));
  }
}
// let syncHook = new SyncHook();
// // tap 类似于 events on
// syncHook.tap("name1", (name) => {
//   console.log("name1", name);
// });
// syncHook.tap("name2", (name) => {
//   console.log("name2", name);
// });
/**
 * 插件就是一个类
 */
// class MyPlugin {
//   apply() {
//     syncHook.tap("MyPlugin", () => {
//       console.log("MyPlugin");
//     });
//   }
// }
// let myplugin = new MyPlugin();
// myplugin.apply();
// // 触发
// // 不能让指定的name执行
// syncHook.call("name");
module.exports = {
  SyncHook,
};
