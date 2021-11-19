//  文本元素
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT');
// React应用需要一个根节点Fiber
export const TAG_ROOT = Symbol.for('TAG_ROOT');
// 原生的节点 span div p 
export const TAG_HOST = Symbol.for('TAG_HOST');
// 文本节点
export const TAG_TEXT = Symbol.for('TAG_TEXT');

export const PLACEMENT = Symbol.for('PLACEMENT');
export const UPDATE = Symbol.for('UPDATE');
export const DELETION = Symbol.for('DELETION');