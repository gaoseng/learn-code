import axios from "axios";
import { SET_HOME_LIST } from "../action-types";

export default {
  getHomeList() {
    return function(dispatch, getstate, request) {
      let url = request.defaults.baseUrl + 'api/users'
      debugger
      return request.get(url).then(res => {
        let list = res.data;
        dispatch({
          type: SET_HOME_LIST,
          payload: list
        });
      }).catch(err => {
        console.log('err');
        // dispatch({
        //   type: SET_HOME_LIST,
        //   payload: []
        // });
      })
    }
  }
}