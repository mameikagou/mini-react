import { REACT_ELEMENT_TYPE } from "@/shared/ReactSymbols";
import type {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
} from "@/shared/ReactTypes";

// 在React17之前，使用JSX转换的是React.createElement；在那之后是jsx-runtime

export const ReactElement = (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props,
): ReactElementType => {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE ?? Symbol.for("react.element"),
		type,
		key,
		ref,
		props,
		_mark: "mrlonely", // 标记
	};
	return element;
};
