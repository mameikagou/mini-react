// Symbol.for 是Symbol的静态方法，用于在全局Symbol注册表中注册或获取一个Symbol; 他注册以及获取的Symbol都是同一个Symbol
// 如果 Symbol 存在，则将 Symbol.for 方法赋值给 ReactSymbol
// 如果 Symbol 不存在，则 ReactSymbol 会是 false
const ReactSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = ReactSymbol ? Symbol.for('react.element') : 0xeac7;
