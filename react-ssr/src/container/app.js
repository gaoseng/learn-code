import React from 'react'
import { Route } from "react-router-dom";

const App = (props) => {
  return (
    <div>
      test
      {props.route.routes.map((route => <Route {...route}/>))}
    </div>
  )
}

export default App;