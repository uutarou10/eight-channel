import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { StateType } from 'typesafe-actions';
import rootReducer from './module';

export const history = createBrowserHistory();
export type RootState = StateType<typeof rootReducer>;

export default createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(
    routerMiddleware(history),
    thunk
  ))
);
