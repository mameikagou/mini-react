export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;

export interface ReactElement {
    $$typeof: symbol | number;
    type: ElementType;
    key: Key;
    ref: Ref;
    props: Props;
    _mark: string;
} 


export type Action<State> = State | ((prevState: State) => State); // 本身，或者箭头函数；