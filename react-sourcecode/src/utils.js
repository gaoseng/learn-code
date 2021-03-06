export function setProps(dom, oldProps, newProps) {
  for (let key in oldProps) {
    if (key !== 'children') {
      if (newProps.hasOwnProperty(key)){
        setProp(dom, key, newProps[key]);
      } else {
        dom.removeAttribute(key);
      }
    }
  }
  for (let key in newProps) {
    if (key !== 'children') {
      if (!oldProps.hasOwnProperty(key)) {
        setProp(dom, key, newProps[key]);
      }
    }
  }
}
function setProp(dom, key, value) {
  if(/^on/.test(key)) {
    dom[key.toLowerCase()] = value; // 没有合成事件
  } else if (key === 'style') {
    if (value) {
      for(let styleName in value) {
        dom.style[styleName] = value[styleName];
      }
    }
  } else {
    dom.setAttribute(key, value);
  }
}