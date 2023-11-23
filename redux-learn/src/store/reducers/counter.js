import { INCREASE, DECREASE} from '../types';

export default (state={num: 0}, action) => {
  switch(action.type) {
    case INCREASE:
      return { num: state.num+1 };
    case DECREASE:
      return { num: state.num-1 };
    default:
      return state;
  }
}