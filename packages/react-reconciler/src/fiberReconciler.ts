import { Container } from "hostConfig";
import { FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTag";
import { createUpdateQueue } from "./updateQueue";

export const createContainer = (container: Container) =>{
    const hostRootFiber = new FiberNode(HostRoot, {}, null);
    const root = new FiberRootNode(container, hostRootFiber); //  dom - fiber - jsx
    hostRootFiber.updateQueue = createUpdateQueue();
    return root;
}

export const updateContainer = (params: type) => {}

