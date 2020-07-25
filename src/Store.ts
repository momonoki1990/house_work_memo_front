import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { formReducer, homeReducer, dailyReducer, monthlyReducer, Form, Home, Daily, Monthly } from './reducer';
import { createLogger } from 'redux-logger'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { History } from 'history';

export type AppState = {
  form: Form,
  home: Home,
  daily: Daily,
  monthly: Monthly,
  router: RouterState
}

const logger = createLogger({
  collapsed: true,
  diff: true
})

export default function createStore(history: History) {
  const reducers = combineReducers<AppState>({
    form: formReducer,
    home: homeReducer,
    daily: dailyReducer,
    monthly: monthlyReducer,
    router: connectRouter(history)
  });
  const middlewares = applyMiddleware(thunk, logger, routerMiddleware(history));
  return reduxCreateStore(reducers, middlewares);
}