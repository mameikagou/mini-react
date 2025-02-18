import { Action } from "shared/src/ReactTypes";


// setState（{xx:1}
// setState((state)=>{return {xx:1}})
export interface Update<State> {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
}

// 泛型参数 State 用于指定状态的类型；
// action属性用于保存更新的内容；
// Update的实例化方法
export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return {
    action,
  };
};

// updateQueue的实例化方法
export const createUpdateQueue = <Action>() => {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<Action>;
};

// 插入update到queue中的方法
export const enqueueUpdate = <Action>(
  updateQueue: UpdateQueue<Action>,
  update: Update<Action>
) => {
  updateQueue.shared.pending = update;
};

// 消费updateQueue的方法
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null
): { memoizedState: State } => {


  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState,
  };

  if (pendingUpdate !== null) {
    // baseState 1 update 2 -> memoizedState 2
    // baseState 1 update ((x) -> 4x) -> memoizedState 4
    const action = pendingUpdate.action;

    // instanceof 用于判断一个变量是否某个对象的实例
    if (action instanceof Function) {
      result.memoizedState = action(result.memoizedState);
    } else {
      result.memoizedState = action;
    }
  }
  return result;
};
