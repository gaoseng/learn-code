import React, {Component} from "react";
import context from "./context";
import {pathToRegexp, match} from "path-to-regexp";
/**
 * 从上下文对象中获取到当前路由信息，将其中配置的path与当前路由的pathname相同的Route渲染出来
 */
export default class Route extends Component {
    static contextType = context;
    render() {
      debugger
        const currentRoutePath = this.context.location.pathname; // 从上下文中获取到当前路由的路径
        const {path, component:Component, exact=false} = this.props; // 获取给Route组件传递的props属性
        const paramsRegexp = match(path, {end: exact}); // 生成获取params的正则表达式
        const matchResult = paramsRegexp(currentRoutePath);
        console.log(`matchResult is ${JSON.stringify(matchResult)}`);
        this.context.match.params = matchResult.params; // 将匹配的参数保存到上下文的match对象中
        const props = {
            ...this.context
        }
        const pathRegexp = pathToRegexp(path, [], {end: exact}); // 生成匹配路径的正则表达式
        if (pathRegexp.test(currentRoutePath)) {
            return (
                <Component {...props}></Component>// 将当前路由对象信息当做props传递给组件
            );
        }
        return null; // 必须有返回值
    }
}