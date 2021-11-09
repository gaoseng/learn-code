import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import routes from '../routes';
import {Provider} from 'react-redux';
import { getClientStore } from '../store';
import {Route} from 'react-router-dom'
import {renderRoutes, matchRoutes} from 'react-router-config'

const App = () => {
  const store = getClientStore();
  return (
    <Provider store={store} >
      <BrowserRouter>
      {/* <Route/> */}
      {/* {routes.map((route => <Route {...route}/>))} */}
      {renderRoutes(routes)}
    </BrowserRouter>
    </Provider>
    
  )
}

ReactDOM.hydrate(<App />, document.getElementById('root'));