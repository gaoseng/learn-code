import React, {useState} from 'react';
import {connect} from 'react-redux';
import counter from '../../store/actions/counter';


const User = (props) => {
  const [count, setCount] = useState(0)
  return <div>
    <p>user page</p>
    <div>{props.number}</div>
    <button onClick={() => {
      // setCount(count + 1);
      props.increment();
    }}>add</button>
     <button onClick={() => {
      props.history.push('/')
    }}>go home</button>
  </div>
}

export default connect(state => state.counter, counter)(User);