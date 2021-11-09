import React, {Component} from "react";
import context from "./context";

export default class Redirect extends Component {
    static contextType = context;
    render() {
        // 无限制，直接重定向跳转到指定的路径
        this.context.history.push(this.props.to);
        return null;
    }
}