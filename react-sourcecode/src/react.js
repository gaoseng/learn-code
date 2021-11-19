import {ELEMENT_TEXT} from './constants';

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : {
          type: ELEMENT_TEXT,
          props: {
            text: child,
            children: []
          }
        }
      })
    }
  }
}
const React = {
  createElement
}
export default React;