export type WorkTag = typeof FunctionComponent | typeof HostRoot | typeof HostComponent | typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 3; // 项目挂载的根节点，即ReactDOM.render()的第一个参数
export const HostComponent = 5; // <div>对应的fiber节点就是HostComponent
export const HostText = 6; // 文本节点 div里面的文本节点 <div>123</div>

