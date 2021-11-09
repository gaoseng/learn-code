import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "../container/home";
import User from "../container/user";
import Login from "../container/login";
import App from "../container/app";

// const RouteWrapper = () => {
//   return (
//     <>
//       <Route path="/" exact component={Home}/>
//       <Route path="/user" exact component={User}/>
//     </>
//   )
// }
const routes = [
  {
    path: "/",
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
        key: "/",
        loadData: Home.loadData,
      },
      {
        path: "/user",
        component: User,
        key: "/user",
      },
      {
        path: "/login",
        component: Login,
        key: "/login",
      },
    ],
  },
];

export default routes;
