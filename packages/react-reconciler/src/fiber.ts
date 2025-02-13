import { Props, Key } from "shared/ReactTypes";
import { WorkTag } from "./workTag";

export class FiberNode {
  type: any;
  tag: WorkTag;
  pendingProps: Props;
  key: Key;
  stateNode: any;
  
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    // HostComponmet <div> div Dom
    this.stateNode = null; // 对于一个HostComponent类型的fiber节点，stateNode属性指向真实的DOM节点，比如<div>，其stateNode保存了这个dom
    this.type = null;
  }
}
