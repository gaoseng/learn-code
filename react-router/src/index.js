import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Router } from './router'
import Home from './pages/home'
import User from './pages/user'



class App extends React.Component {
  render() {
    return <div>
      <h3> my router test</h3>
      <Router>
        <Switch>
          <Route path ='/'>
            <Home />
          </Route>
          <Route path='/user'>
            <User />
          </Route>
        </Switch>
      </Router>
      
    </div>
  }
}


ReactDOM.render(<App />, document.getElementById('root'));