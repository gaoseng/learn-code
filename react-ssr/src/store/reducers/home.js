import { SET_HOME_LIST } from "../action-types";

export default function home(state={list: []}, action) {
  switch (action.type) {
    case SET_HOME_LIST:
      return {list: action.payload};
    default:
      return state;
  }
}