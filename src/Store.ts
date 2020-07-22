import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Reducer, State } from './reducer';
import { createLogger } from 'redux-logger'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { History } from 'history';

export type AppState = {
  state: State
  router: RouterState
}

const logger = createLogger({
  collapsed: true,
  diff: true
})

export default function createStore(history: History) {
  const reducers = combineReducers<AppState>({
    state: Reducer,
    router: connectRouter(history)
  });
  const middlewares = applyMiddleware(thunk, logger, routerMiddleware(history));
  return reduxCreateStore(reducers, middlewares);
}