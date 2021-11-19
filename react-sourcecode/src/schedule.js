import {ELEMENT_TEXT, TAG_TEXT, TAG_HOST, TAG_ROOT, PLACEMENT} from './constants'
import {setProps} from './utils'

/**
 * 从根节点开始渲染和调度 两个阶段
 * 
 * diff阶段 对比新旧的虚拟DOM， 进行增量 更新或者创建， render阶段
 * 这个阶段可能比较花时间，我们可以对任务进行拆分，拆分的维度虚拟DOM.此阶段可以暂停
 * render阶段成果是effect list知道哪些节点更新了，哪些节点删除了，哪些节点新增了
 * render阶段两个任务： 1生成fiber树， 2收集effectlist
 * commit阶段，进行DOM更新创建阶段，此阶段不能暂停，要要一气呵成
 */

let nextUnitOfWork = null; // 下一个执行单元
let workInProgressRoot = null; // RootFiber应用的根
/**
 * rootFiber = {
    tag: TAG_ROOT, 
    stateNode: container,
    props: {children: [element]}
  }
 */
export function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber;
  nextUnitOfWork = workInProgressRoot;
}
function performUnitOfWork(currentFiber) {
  beginWork(currentFiber); // 开始工作
  if (currentFiber.child) {
    return currentFiber.child
  }
  while(currentFiber) {
    completeUnitOfWork(currentFiber);
    if(currentFiber.sibling) {
      return currentFiber.sibling;
    }
    currentFiber = currentFiber.return;
  }
}
function completeUnitOfWork(currentFiber) { // 第一个完成的A1(text)
  let returnFiber = currentFiber.return; // A1
  console.log(currentFiber)
  if (returnFiber) {
    ///// 这段把自己儿子的effect挂到父链上
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      }
      returnFiber.lastEffect = currentFiber.lastEffect;
    }
    //////
    // 把自己挂到父亲身上
    const effectTag = currentFiber.effectTag;
    if (effectTag) { // 自己有副作用
      if (!!returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber;
      }
      returnFiber.lastEffect = currentFiber;

    }
  }
}
/**
 * beginwork开始收下线的钱
 * completeUnitOfWork 把下线的钱收完了
 * 1. 创建真实的Dom元素
 * 2. 创建子fiber
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber);
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber);
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber);
  }
}
function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
  const newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}
function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {  // 文本
    return document.createTextNode(currentFiber.props.text)
  } else if (currentFiber.tag === TAG_HOST) { // span div标签元素
    let stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
  }
}
function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, newProps, oldProps);
}
function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
}
function updateHostRoot(currentFiber) {
  // 先处理自己 如果一个原生节点，创建真实DOM 2、创建子fiber
  let newChildren =currentFiber.props.children; // [element = <div id="A1"]
  reconcileChildren(currentFiber, newChildren);
}
function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0; // 新子节点的索引
  let prevSibling; // 上一个新的子fiber
  // 遍历我们的子虚拟DOM元素数组，为每个虚拟DOM元素创建子Fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex]; // 取出虚拟DOM节点
    let tag;
    if (newChild.type == ELEMENT_TEXT) {
      tag = TAG_TEXT; // 这是一个文本节点
    } else if (typeof newChild.type === 'string') {
      tag = TAG_HOST // 如果type是字符串，那么这是一个原生DOM节点
    }
    let newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null,  // div还么有创建DOM元素
      return: currentFiber, // 父Fiber 
      effectTag: PLACEMENT, // 副作用标识 render收集副作用 新增 删除 更新
      nextEffect: null, // effect list也是一个单链表 记录要更新的fiber

    }
    if (newFiber) {
      if (newChildIndex === 0) {
        currentFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
    }
    newChildIndex++;
  }
}
// 循环执行工作 nextUnitOfWork
function workLoop(deadline) {
  let shouldYield = false; // 是否要让出时间片或者说控制权
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行完一个任务后
    shouldYield = deadline.timeRemaining() < 1; // 没有时间的话就要让出控制权
  }
  if(!nextUnitOfWork){ 
    // console.log('render阶段结束')
    commitRoot();
  }
  // 不管有没有任务，都请求再次调度 每帧都要执行一次workLoop
  requestIdleCallback(workLoop, {timeout: 500});
}
function commitRoot(){
  if(!workInProgressRoot) return;
  console.log('workInProgressRoot',workInProgressRoot);
  let currentFiber = workInProgressRoot.firstEffect;
  while(currentFiber) {
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}
function commitWork(currentFiber) {
  if (!currentFiber)return;
  let returnFiber = currentFiber.return;
  let returnDOM = returnFiber.stateNode;
  if (currentFiber.effectTag === PLACEMENT) {
    returnDOM.appendChild(currentFiber.stateNode);
  }
  currentFiber.effectTag = null;
}
// 有个优先级概念 expirationTime
requestIdleCallback(workLoop, {timeout: 500});