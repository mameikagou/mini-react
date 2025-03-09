import type{ Container } from "hostConfig";
import { FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTag";
import { createUpdate, createUpdateQueue, enqueueUpdate } from "./updateQueue";
import type { UpdateQueue } from "./updateQueue";
import type { ReactElement } from "@/shared/src/ReactTypes";


export const createContainer = (container: Container) =>{
    // hostRootFiber 是根fiber，通过stateNode指向fiberRootNode；通过链表连接；
    // 创建单个组件的根节点，它通过stateNode指向fiberRootNode；fiberRootNode通过current指向它；
    // hostRootFiber与App组件之间，通过child与return连接（因为是链表）
    const hostRootFiber = new FiberNode(HostRoot, {}, null); 
    // 创建整个应用的根节点
    const root = new FiberRootNode(container, hostRootFiber); //  dom - fiber - jsx
    hostRootFiber.updateQueue = createUpdateQueue();
    return root;
}

// 更新container
export const updateContainer = (element: ReactElement | null, root: FiberRootNode) => {
    // 获取根fiber
    const hostRootFiber = root.current;
    // 创建更新
    const update = createUpdate<ReactElement | null>(element);
    // 将更新添加到根fiber的更新队列中
    enqueueUpdate(hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>, update);
    return element;
}