import React, {Component} from "react";
import context from "./context";
import {pathToRegexp} from "path-to-regexp"

export default class Switch extends Component {
    static contextType = context;
    render() {
        const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        for (let i = 0; i < children.length; i++) { // 遍历Switch组件下的所有子组件
            const child = children[i];
            const {path="/", exact=false} = child.props;
            const {pathname} = this.context.location;
            const regexp = pathToRegexp(path, [], {end: exact});
            if (regexp.test(pathname)) { // 如果匹配成功则立即返回作为<Switch>组件的渲染结果
                return child;
            }
        }
        return null;
    }
}