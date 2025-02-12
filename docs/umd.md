

### UMD: Universal Module Definition
可以在不同模块系统下运行：
- CJS
- AMD (Asynchronous Module Definition)
- 全局变量（浏览器全局作用域）

兼容性实现：
```js
// CommonJS 环境
module.exports = MyModule;

// AMD 环境
define(['dep'], function(dep) {
  return MyModule;
});

// 浏览器环境
window.MyModule = MyModule;
```

缺点：
- 可读性差，体积大，难以更改
- 更适合React这种需要在各种环境运行的库

### AMD：Asynchronous Module Definition

主要运用于浏览器的异步加载模块规范，特点是：在运行时声明依赖
现代更倾向于使用esm