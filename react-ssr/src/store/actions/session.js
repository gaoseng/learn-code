import axios from "axios";
import { SET_SESSION } from "../action-types";

export default {
  login(user) {
    return function(dispatch, getstate, request) {
      console.log('-----')
      return request.post('/api/login',user).then(res => {
        let {data} = res.data;
        dispatch({
          type: SET_SESSION,
          payload: data
        });
      })
    }
  }
}