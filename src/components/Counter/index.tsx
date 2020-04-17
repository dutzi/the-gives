import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from './reducers';
import { useTypedSelector } from '../../state/store';

export default () => {
  const dispatch = useDispatch();
  const counter = useTypedSelector(state => state.counter);

  function handleIncrease() {
    dispatch(counterSlice.actions.increment());
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
};
