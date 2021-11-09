import React, {useState} from 'react';
import {connect} from 'react-redux';
import actions from '../../store/actions/session';


const Login = (props) => {
  const [name, setName] = useState('')
  const submit = (event) => {
    event.preventDefault();
    props.login({name})
  }
  return <div>
    <h3>user login</h3>

    <form onSubmit={submit}>
      <input value={name} onChange={(event) => {
        setName(event.target.value);
      }}/>
      <button type="submit">登录</button>
    </form>
    
  </div>
}

export default connect(state => state.session, actions)(Login);