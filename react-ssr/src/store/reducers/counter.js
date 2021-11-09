import { INCREMENT } from "../action-types";

export default function counter(state={number: 0}, action) {
  switch (action.type) {
    case INCREMENT:
      return {number: state.number +1};
    default:
      return state;
  }
}