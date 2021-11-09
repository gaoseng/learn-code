import React, { Component } from 'react'
import { RouterContext} from './Router';

export default class Switch extends Component {
  static contextType = RouterContext
  render() {
    console.log('Switch', this.context);
    let children = this.props.children;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      let {path} = child.props;
      if (path === location.pathname) {
        return child
      }

    }
    return null;
  }
}