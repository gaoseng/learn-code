import React, { Component } from "react";
import Context from "./context"; // 引入上下文对象

export default class HashRouter extends Component {
  // 在HashRouter中新增构造函数，并且将location和match定义到state对象中
  constructor(props) {
    super(props);
    this.state = {
      // 为了方便更改当前路由信息，将location和match放到state中
      location: {
        pathname: window.location.hash.slice(1) || "/", // 获取浏览器地址栏中的hash值，如果不存在则默认为"/"
        query: undefined,
      },
      match: {
        params: undefined,
      },
    };
  }
  componentDidMount() {
    window.addEventListener("hashchange", () => { // 监听浏览器地址栏hash值变化
        this.setState({ // 当hash值变化后更新当前路由信息, HashRouter组件内的子组件Route将会重新渲染
            location: {
                ...this.state.location,
                pathname: window.location.hash.slice(1) // 更新pathname
            }
        });
    });
}
  render() {
    // 填充当前路由信息，新增了一个history对象
    const currentRoute = {
      // 当前路由对象
      location: this.state.location, // location直接从state中获取
      match: this.state.match, // match直接从state中获取
      history: {
        // 新增一个history对象用于实现当前路由的切换
        push: (to) => {
          if (typeof to === "object") {
            // 如果to是一个对象
            let { pathname, query } = to; // 取出pathname和query
            window.location.hash = pathname; // 更新浏览器hash值，触发浏览器hashchange事件
            this.state.location.query = query; // 更新query
          } else {
            // 修改浏览器地址栏的hash值
            window.location.hash = to; // 更新浏览器hash值
          }
        },
      },
    };
    return (
      // 使用上下文对象提供的Provider组件将当前路由信息对象注入上下文中，以便其Route等子组件能够获取到当前路由信息
      <Context.Provider value={currentRoute}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
