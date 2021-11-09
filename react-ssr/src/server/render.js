import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../routes";
import { getServerStore } from "../store";
import {renderRoutes, matchRoutes} from 'react-router-config'

export default function (req, res) {
  const store = getServerStore();
  // let matchRoutes = routes.filter((route) => matchPath(req.path, route));
  let matchedRoutes = matchRoutes(routes, req.path);
  let promises = [];
  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store));
    }
  });
  // console.log('matchedRoutes', matchedRoutes);
  Promise.all(promises).then(() => {
    let html = renderToString(
      <Provider store={store}>
        <StaticRouter context={{}} loction={req.path}>
            {/* {routes.map((route) => (
              <Route {...route} />
            ))} */}
            {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    res.send(`
      <html>
        <head>
          <title>ssr</title>
        </head>
        <body>
          <div id="root">${html}</div>
          
        </body>
        <script>
          window.context ={
            state:${JSON.stringify(store.getState())}
          }
          console.log(window.context);
        </script>
        <script src="/client.js"></script>
      </html> 
    `);
  });
}
