import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TextInputActions } from './actions';

export interface State {
  text: string
};

const initialState: State = {
  text: ''
};

export const Reducer = reducerWithInitialState(initialState)
  .case(TextInputActions.updateText, (state, inputValue) => {
    return { ...state, inputValue }
  })
