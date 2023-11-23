import React from 'react';
import store from '../store';
import { DECREASE, INCREASE } from '../store/types';


export default class Home extends React.Component {
  state = {
    num: 10
  }
  constructor(props) {
    super(props);
    let reducers = store.getState();
    this.state = {}
    if (reducers.counter) {
      this.state.num = reducers.counter.num;
    }
    let logger1 = function(opts){
      let {dispatch,getState} = opts;
      console.log(getState)
      return function(next){
         return function(action){
           console.log('老状态1 ',getState());
           next(action);//派发动作
           console.log('新状态1 ',getState());}
       }
   }
   let logger2 = function({dispatch,getState}){
       return function(next){//= store.dispatch
          return function(action){
            console.log('老状态2 ',getState());
            next(action);//派发动作
            console.log('新状态2 ',getState());}
        }
    }
    function compose(...fns){
       if(fns.length==1)
          return fns[0];
        return fns.reduce((a,b)=>(...args)=>a(b(...args)));
   }
   let v = compose(logger1, logger2)
   v(()=> {})
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        num: store.getState().counter.num
      })
    })
  }
  descrease = () => {
    store.dispatch({
      type: DECREASE
    })
  }
  inscrease = () => {
    store.dispatch({
      type: INCREASE
    })
  }
  render() {
    console.log(this.state)
    return <div>
      <button onClick={this.descrease}>descrease</button>
      <span style={{margin: '0 10px'}}>{this.state.num}</span>
      <button onClick={this.inscrease}>inscrease</button>
    </div>
  }
}