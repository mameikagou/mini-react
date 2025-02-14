import { Action } from "shared/src/ReactTypes";

export interface Update {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
}

// 泛型参数 State 用于指定状态的类型；
export const createUpdate = <State>(action: Action<State>): Update => {
  return {
    action,
  };
};

export const createUpdateQueue = <Action>() => {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<Action>;
};

export const enqueueUpdate = <Action>(
  updateQueue: UpdateQueue<Action>,
  update: Update
) => {
  updateQueue.shared.pending = update;
};

export const processUpdateQueue = <State>(
    baseState: State,
    pending: Update<State> | null
):{memoizedState: State}=>{

    if(pendingUpdate !== null){
        
    }
}