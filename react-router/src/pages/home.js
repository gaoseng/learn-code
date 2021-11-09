import React, {useContext} from 'react'
import {RouterContext} from './../router/Router'

const Home = () => {
  const context = useContext(RouterContext);
  
  return <div onClick={() => {
    window.history.pushState({}, {}, '/user');
    context.setRoute('/user')
  }}>home</div>
}

export default Home