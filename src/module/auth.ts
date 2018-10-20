import { ActionType, createAction } from 'typesafe-actions';

enum Action {
  AUTH_STATE_CHANGED = 'AUTH_STATE_CHANGED'
}

export const authStateChanged = createAction(Action.AUTH_STATE_CHANGED, resolve => (
  (user: firebase.User | null) => resolve(user)
));

interface StateType {
  user: firebase.User | null;
  authHandlerCalled: boolean;
}

const defaultState: StateType = {
  authHandlerCalled: false, // 一度でもonAuthStateChangedが呼ばれればtrueになる
  user: null
};

type ActionTypes = ActionType<
  typeof authStateChanged
>;

export default (state: StateType = defaultState, action: ActionTypes) => {
  switch(action.type) {
    case Action.AUTH_STATE_CHANGED:
      return {
        authHandlerCalled: true,
        user: action.payload
      };

    default:
      return state;
  }
};
