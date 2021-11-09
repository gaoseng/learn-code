import React, {Component} from "react";
import Context from "./context"; // 引入上下文对象
export default class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                pathname: window.location.pathname || "/",
                query: undefined,
            },
            match: {
                params: undefined
            }
        }
    }
    componentDidMount() {
        window.addEventListener("popstate", () => { // 监听浏览器前进后退按钮
            this.setState({ // 触发页面更新
                location: {
                    pathname: window.location.pathname // 路径变化后更新当前路由对应的pathname
                }
            });
        });
    }
    render() {
        const currentRoute = { // 构造一个当前路由对象，保存当前路由信息，包括location、match、history
            location: this.state.location, // location直接从state中获取
            match: this.state.match, // match直接从state中获取
            history: { // 新增一个history对象用于实现当前路由的切换
                push: (to) => {
                    if (typeof to === "object") { // 如果to是一个对象
                        let {pathname, query} = to; // 取出pathname和query
                        this.state.location.query = query; // 更新query
                        this.state.location.pathname = pathname;// 更新当前路由对应的pathname
                        window.history.pushState({}, {}, pathname); // 添加一条history
                    } else { // 如果to是一个路径字符串
                        this.state.location.pathname = to; // 更新当前路由对应的pathname
                        window.history.pushState({}, {}, to); // 添加一条history
                    }
                    this.setState({}); // 触发页面更新
                }
            }
        }
        return (
            // 使用上下文提供的Provider组件将当前路由信息对象注入上下文中，以便其Route子组件能够获取到当前路由信息
            <Context.Provider value={currentRoute}>
                {this.props.children}
            </Context.Provider>
        );
    }
}