import { Props, Key } from "shared/src/ReactTypes";
import { WorkTag } from "./workTag";
import { Flags, NoFlags } from "./fiberFlags";

export class FiberNode {
  type: any;
  tag: WorkTag;
  pendingProps: Props;
  key: Key;
  ref: any;
  stateNode: any;
  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;
  memoizedProps: Props | null;
  alternate: FiberNode | null; // 便于在两个fiber节点（一个fiber，一个workProgress）之间进行切换，用于diff算法；会保存对另一个fiber节点的引用；
  flags: Flags // 用于保存reconciler标记


  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    // HostComponmet <div> div Dom
    this.stateNode = null; // 对于一个HostComponent类型的fiber节点，stateNode属性指向真实的DOM节点，比如<div>，其stateNode保存了这个dom
    this.type = null; // FubctionComponent类型的fiber节点，type属性指向函数组件本身;

    // 构成树状结构
    this.return = null; // 指向父fibernode节点；当成一个工作单元，当它完成时，会返回到父节点
    this.sibling = null; // 指向下一个兄弟节点
    this.child = null; // 指向第一个子节点

    this.index = 0; // 当前节点在父节点的子节点列表中的索引
    this.ref = null; // ref属性

    // 作为一个工作单元
    this.pendingProps = pendingProps; // pendingProps属性保存了当前工作单元的props
    this.memoizedProps = null; // 保存了上一次渲染时的props
    // 新的更新到来时先存储在pendingProps中，在render阶段计算新的状态，然后与memoizedProps进行比较，找出变化的部分，然后进行更新；
    // 更新后，将memoizedProps更新为pendingProps，然后清空pendingProps；

    this.alternate = null;
    this.flags = NoFlags;
  }
}
