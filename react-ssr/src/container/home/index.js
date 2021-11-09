import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import actions from '../../store/actions/home';

const Home = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (props.list.length === 0) {
      props.getHomeList();
    }
  },[])
  return (
    <div>
      <h3>home page</h3>
      <ul>
        {
          props.list.map(item => {
            return <li key={item.id}>{item.name}</li>
          })
        }
      </ul>
      <button
        onClick={() => {
          props.history.push("/user");
        }}
      >
        go user
      </button>
      <button
        onClick={() => {
          props.history.push("/login");
        }}
      >
        go login
      </button>
    </div>
  );
};

Home.loadData = (store) => {
  return store.dispatch(actions.getHomeList())
}

export default connect(
  state => state.home,
  actions
)(Home);
