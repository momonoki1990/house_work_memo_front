import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const TextInputActions = {
  updateText: actionCreator<string>('ACTIONS_UPDATE_TEXT'),
}