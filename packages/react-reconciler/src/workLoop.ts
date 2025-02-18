import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode } from "./fiber";

let workInProgress: FiberNode | null = null;

function preparrFreshStack(fiber: FiberNode) {
    workInProgress = fiber;
}

function renderRoot(root: FiberNode){

    preparrFreshStack(root);

    do {
        try {
            workLoop();
            break;
        }catch (error){
            console.warn("workLoop发生错误", error);
        }
    } while (true);
}

function workLoop() {
    while(workInProgress!==null){
        performUnitOfWork(workInProgress);
    }
}

function performUnitOfWork(fiber: FiberNode) {
    const next = beginWork(fiber);
    fiber.memoizedProps = fiber.pendingProps;

    if(next===null){
        // 没有下一个工作单元了
        completeUnitOfWork(fiber);
    }else{
        workInProgress = next; // 继续向下执行
    }
}

function completeUnitOfWork(fiber: FiberNode){
    let node: FiberNode | null = fiber;

    do {
        completeWork(node);

        const sibling = node.sibling;

        if(sibling!==null){
            workInProgress =  sibling;
            return;
        }
        node = node.return; // 向上返回, 继续完成父节点
        workInProgress = node; // 类似链表移动的那种操作
        
    } while (node!==null);
}