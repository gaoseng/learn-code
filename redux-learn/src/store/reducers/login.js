import { LOGNIN, LOGOUT} from '../types';

export default (state={isLogin: false}, action) => {
  switch(action.type) {
    case LOGNIN:
      return { isLogin: true};
    case LOGOUT:
      return { isLogin: false };
    default:
      return state;
  }
}