

- react（宿主环境无关的公用方法）
- react-reconciler（协调器的实现，宿主环境
无关）
- 各种宿主环境的包
- shared（公用辅助方法，宿主环境无关）
本节课将实现的JSX转换属于react包。

编译时: (由babel编译实现)
```jsx
<div>hello</div>
```

编译后:
```jsx
React.createElement("div", null, "hello"); // 在React17之前

_jsx("div", { children: "hello" }); // 在React17之后
```
  