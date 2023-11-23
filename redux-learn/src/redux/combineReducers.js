export default reducers => (state = {}, action) => Object.keys(reducers).reduce((currentState, key) => {
  console.log('reducer', key, currentState)
  currentState[key] = reducers[key](state[key], action);
  console.log(reducers, currentState);
  return currentState;
}, {});