function createStore(reducer) {
  let state = 0;
  const subscribers = []; // {}

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
    // if (subscribers[subscriber]) return;
    // subscribers[subscriber] = subscriber;
    // return () => {
    //   subscribers[subscriber]();
    //   delete subscribers[subscriber];
    // };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}

const CounterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(CounterReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: 'INCREMENT' }); // dispatch increment
store.dispatch({ type: 'DECREMENT' }); // dispatch decrement

unsubscribe();

store.dispatch({ type: 'INCREMENT' }); // dispatch increment
