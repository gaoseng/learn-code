import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import clientRequest from '../client/request';
import serverRequest from '../server/request';


export function getServerStore() {
  return createStore(reducers, applyMiddleware(thunk.withExtraArgument(serverRequest), logger));
}
export function getClientStore() {
  // console.log(window.context);
  // if (window.context){
  //   let initState = window.context.state;
  //   return createStore(reducers, initState, applyMiddleware(thunk.withExtraArgument(serverClient), logger));
  // }
  let initState = window.context.state;
  return createStore(reducers, initState, applyMiddleware(thunk.withExtraArgument(clientRequest), logger));
  // return createStore(reducers, applyMiddleware(thunk, logger));
}