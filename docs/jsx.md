

- react（宿主环境无关的公用方法）
- react-reconciler（协调器的实现，宿主环境
无关）
- 各种宿主环境的包
- shared（公用辅助方法，宿主环境无关）
本节课将实现的JSX转换属于react包。

### jsx转换

编译时: (由babel编译实现)
```jsx
<div>hello</div>
```

编译后:
```jsx
React.createElement("div", null, "hello"); // 在React17之前, 旧版本，使用React.createElement()转换成js代码

_jsx("div", { children: "hello" }); // 在React17之后，新版本，使用bible编译实现
```

### 函数组件和类组件

```js
class AppClass extends React.Component {
  render() {
    return <p>KaSong</p>;
  }
}
console.log("这是ClassComponent：", AppClass);
console.log("这是Element：", <AppClass />);

function AppFunc() {
  return <p>KaSong</p>;
}
console.log("这是FunctionComponent：", AppFunc);
console.log("这是Element：", <AppFunc />);
```

无法通过简单typeof区分，需要去原型上找
```js
AppClass instanceof Function === true;
AppFunc instanceof Function === true;

ClassComponent.prototype.isReactComponent = {};
```

在fiber中，而不在jsx中的内容：
- 组件更新优先级
- state
- 协调器打上的Render标记

#### DFS顺序

一个组件卸载了，是子组件先remount还是父组件先remount？
- 递归的过程，先下，再上；先子，再父；

DFS：
- 有子节点遍历子节点
- 没有子节点遍历兄弟节点

递：beginWork
归：completeWork 