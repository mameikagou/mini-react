
1， 
```zsh
[!] RollupError: Node tried to load your configuration file as CommonJS even though it is likely an ES module. To resolve this, change the extension of your configuration to ".mjs", set "type": "module" in your package.json file or pass the "--bundleConfigAsCjs" flag.

Original error: Cannot use import statement outside a module
```

2，

```zsh
> rollup --config --bundleConfigAsCjs scripts/rollup/react.config.js -w

[!] Error: ENOENT: no such file or directory, open '/Users/luoyu/code/personal/mini-react/rollup.config.js'
Error
```

路径顺序很重要：
--bundleConfigAsCjs -w应该放在最后面

```
"scripts": {
    "build:dev": "rollup --config scripts/rollup/react.config.js --bundleConfigAsCjs -w"
  },
```
