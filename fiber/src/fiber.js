import React from "react";
import ReactDOM from "react-dom";
import element from "./element";

const PLACEMENT = 'PLACEMENT'; // 这个fiber对应DOM节点需要被插入到页面中去 父DOM中去

let workInProgressRoot = {
  stateNode: document.getElementById('root'),
  props: {
    children: [element]
  }
}
let nextUnitOfWork = workInProgressRoot;
function wookLoop(deadline) {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork){
    commiRoot();
  }

}
function commiRoot() {
  let currentFiber = workInProgressRoot.firstEffect;
  while(currentFiber) {
    console.log('commitRoot',currentFiber.props.id);
    if(currentFiber.effectTag === PLACEMENT){
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
    }
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}
/**
 *
 * beginwork 1.创建此fiber的真实dom,通过虚拟DOM创建fiber树结构
 */
function performUnitOfWork(workingInProgressFiber) {
  // 创建真实的DOM， 2.创建fiber树
  beginWork(workingInProgressFiber);
  if (workingInProgressFiber.child) {
    return workingInProgressFiber.child;
  }
  while (workingInProgressFiber) {
    completeUnitOfWork(workingInProgressFiber);
    console.log('whale', workingInProgressFiber);
    if (workingInProgressFiber.sibling) {
      return workingInProgressFiber.sibling;
    }
    workingInProgressFiber = workingInProgressFiber.return; //指向父节点
  }
}
function beginWork(workingInProgressFiber) {
  console.log('beginWork', workingInProgressFiber.props.id);
  if (!workingInProgressFiber.stateNode) {
    workingInProgressFiber.stateNode = document.createElement(workingInProgressFiber.type);
    for(let key in workingInProgressFiber.props) {
      if (key !== 'children') {
        workingInProgressFiber.stateNode[key] = workingInProgressFiber.props[key];
      }
    }
  }
  // 创建子fiber
  let previousFiber;
  if (Array.isArray(workingInProgressFiber.props.children)) {
    workingInProgressFiber.props.children.forEach((child, index) => {
      let childFiber = {
        type: child.type, // DOM节点的类型
        props: child.props,
        return: workingInProgressFiber,
        effectTag: PLACEMENT, // 
        nextEffect: null, // 下一个有副作用的节点
      }
      if(index === 0){
        workingInProgressFiber.child = childFiber;
      } else {
        previousFiber.sibling = childFiber
      }
      previousFiber = childFiber;
    });
  }
  
}
function completeUnitOfWork(workingInProgressFiber){
  console.log('completeUnitOfWork', workingInProgressFiber.props.id)
  let returnFiber = workingInProgressFiber.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = workingInProgressFiber.firstEffect;
    }
    if (workingInProgressFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber.firstEffect;
      }
      returnFiber.lastEffect = workingInProgressFiber.lastEffect;
    }
    if (workingInProgressFiber.effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber;
      } else {
        returnFiber.firstEffect = workingInProgressFiber;
      }
      returnFiber.lastEffect = workingInProgressFiber;
    }
  }
}

requestIdleCallback(wookLoop);
