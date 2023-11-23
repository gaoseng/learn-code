export default function (reducer, preloadedState) {
  let state = preloadedState;
  let listeners = [];

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  function dispatch(action) {
    console.log('action',action, state);
    state = reducer(state, action);
    console.log('state',state)
    listeners.forEach(listener => listener())
  }

  dispatch({ type: '@@redux/INIT' });

  function subscribe(listener) {
    listeners.push(listener);
    return function() {
      listener = listeners.filter(item => item !== listener);
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}