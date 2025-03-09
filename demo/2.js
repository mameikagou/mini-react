// 表示下一段工作
let nextUnitOfWork = null;

const workLoop = () => {
	let shouldYield = false;

	while (nextUnitOfWork && !shouldYield) {
		// 通过performUnitOfWork来更新下一次的工作
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

		// 通过检查实际更新“是否中断”；
		shouldYield = deadline.timeRemaining() < 1;
	}

	// 注册下一次空闲时间的回调
	requestIdleCallback(workLoop);
};
// 触发第一次时间片的回调
requestIdleCallback(workLoop);

// 执行工作，并且返回下一个执行单元；
// 1. 增加节点
// 2. 执行工作
// 3. 返回下一个节点（先父母->孩子->父母的兄弟节点）
function performUnitOfWork(fiber) {
	if (!fiber.dom) {
		fiber.dom = createDom(fiber);
	}

	// 添加node节点
	if (fiber.parent) {
		fiber.parent.dom.appendChild(fiber.dom);
	}

	const elements = fiber.props.children;
	let index = 0;
	let prevSibling = null;

    // “遍历”，然后
	// 创建和添加 “兄弟” fiber节点
	while (index < elements.length) {
		const element = elements[index];

		const newFiber = {
			type: element.type,
			props: element.props,
			parent: fiber,
			dom: null,
		};

		if (index === 0) {
			fiber.child = newFiber;
		} else {
			prevSibling.sibling = newFiber;
		}

		prevSibling = newFiber;
		index++;
	}

    // 这里已经在考虑返回值了
    // 有子节点就优先返回，一层一层递归下去
	if (fiber.child) {
		return fiber.child;
	}
    // 没有子节点就返回兄弟节点
    // 兄弟也没，就会返回父节点
    // fiber只读，不修改；这样是为了方便nextFiber = nextFiber.parent;
	let nextFiber = fiber;
	while (nextFiber) {
		if (nextFiber.sibling) {
			return nextFiber.sibling;
		}
		nextFiber = nextFiber.parent;
	}
}
