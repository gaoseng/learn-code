import React, {Component} from "react";
import context from "./context";
export default class Link extends Component {
    static contextType = context;
    render() {
        let {to} = this.props; // 从Link组件上获取到配置的to路径
        // 点击Link的时候调用当前路由的history的push方法进行跳转即可
        return (
        <a onClick={() => {this.context.history.push(to)}}>{this.props.children}</a>
        );
    }
}
