

React 是一个纯运行时的框架，从视图到运行时，没有编译优化；一般vue或者别的框架是有的；

过程驱动：开发者直接调用jq
状态驱动：是前端框架的核心模块（React的reconciler，或者Vue的render）在调用宿主环境（如web或者native）的api；

可以开放通用的api，供不同的宿主环境使用；

### 为什么需要React DOM？

协调就是指diff算法的意思；

ReactElement没法表达自己跟其他节点的关系

需要一种节点，介于ReactElement与真实dom之间，既可以反应真实dom，也可以反映React状态

- jsx：开发者编写的
- React Element：React元素节点
- FiberNode：
- DOM Element：浏览器的api

Reconciler的工作就是构建fiber树，标记增加/删除/改动 等等，不断diff，然后更新；

可中断的diff：

两个阶段：
可中断阶段： render：构建fiber树，进行diff，收集effect（生命周期）
不可中断阶段：