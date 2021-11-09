import { SET_SESSION} from "../action-types";

let initState = {
  user: null,
  seccuss: null,
  error: null
}
export default function session(state=initState, action) {
  switch (action.type) {
    case SET_SESSION:
      return action.payload;
    default:
      return state;
  }
}