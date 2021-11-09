import React, {useContext} from 'react'
import {RouterContext} from './../router/Router'

const User = () => {
  const context = useContext(RouterContext);
  
  return <div onClick={() => {
    window.history.pushState({}, {}, '/');
    context.setRoute('/')
  }}>user</div>
}

export default User