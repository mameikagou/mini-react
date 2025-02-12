import path from 'path';

import {getPackagesJson, resolvePackage, getBaseRollupPlugins} from './utill'

// 获取react的package.json的name字段
const {name, module} = getPackagesJson('react');
// react包的路径
const pkgPath = resolvePackage(name);
// react产物的路径
const pkgDistPath = resolvePackage(name, true);

export default [
    // react
    {
        input: path.join(pkgPath, module),
        output: {
            name:'index.js',
            file: path.join(pkgDistPath, 'index.js'),
            // 兼容cjs和esm的格式
            format: 'umd'
        },
        plugins: getBaseRollupPlugins()
    },
    // jsx-runtime
    {
        input: path.join(pkgPath, 'src/jsx.ts'),
        output: [
            {
                file: path.join(pkgDistPath, 'jsx-runtime.js'),
                name: 'jsx-runtime',
                format: 'umd'
            },
            {
                file: path.join(pkgDistPath, 'jsx-dev-runtime.js'),
                name: 'jsx-dev-runtime',
                format: 'umd'
            },
        ],
        plugins: getBaseRollupPlugins()
    }
]