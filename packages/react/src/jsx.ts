import { REACT_ELEMENT_TYPE } from "@/shared/ReactSymbols";
import type {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
} from "@/shared/ReactTypes";
import { ElementType } from "@/shared/src/ReactTypes";

// 在React17之前，使用JSX转换的是React.createElement；在那之后是jsx-runtime

// 工厂函数，用于创建ReactElement
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

export const jsx = (type: ElementType, config:any, ...maybeChildren:any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	// 遍历config对象，将其的key， ref， children属性提取出来，分别赋值给key， ref， props
	for(const prop in config) {
		
		const val = config[prop];

		if(prop==='key'){
			if(val!==undefined){
				// 类型转换成字符串，类似于String(val)
				key = '' + val;
			}
			continue;
		}

		if(prop==='ref'){
			if(val!==undefined){
				ref = val;
			}
			continue;
		}

		// 这里相当于config.hasOwnProperty(prop),但是这样写更加安全;
		// config可能是一个原型链，可能会有hasOwnProperty方法, 将其覆盖了
		// 而使用这种写法，确保了调用的是Object.prototype.hasOwnProperty
		if({}.hasOwnProperty.call(config, prop)){
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if(maybeChildrenLength){
		// 可能有一个子元素，也可能有多个子元素（数组）
		if(maybeChildrenLength===1){
			props.children = maybeChildren[0];
		}else{
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
}

// 在生产环境下，jsx和jsxDev是一样的
// 在开发环境下，会多做一些检查
export const jsxDev = jsx;