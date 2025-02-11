

编译时: (由babel编译实现)
```jsx
<div>hello</div>
```

编译后:
```jsx
React.createElement("div", null, "hello"); // 在React17之前

_jsx("div", { children: "hello" }); // 在React17之后
```
  