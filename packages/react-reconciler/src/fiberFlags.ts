export type Flags = number;

// 这些是 React Fiber 中用于标记副作用（side effects）的二进制标记位。使用二进制位运算可以高效地进行标记和判断。

export const NoFlags = /* 无标记                     */ 0b0000001;
export const Placement = /* 插入/移动                */ 0b0000010;
export const Update = /* 更新                       */ 0b0000100;
export const ChildDeletion = /* 子节点删除           */ 0b0001000;