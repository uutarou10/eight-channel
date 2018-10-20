import { Dispatch } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';
import Thread from '../model/thread';
import repository from '../repository';

enum Action {
  START_FETCH_THREAD_LIST = 'START_FETCH_THREAD_LIST',
  FETCHED_THREAD_LIST = 'FETCHED_THREAD_LIST',
  START_FETCH_THREAD = 'START_FETCH_THREAD',
  FINISH_FETCH_THRAED = 'FINISH_FETCH_THREAD'
}

export const startFetchThreadList = createAction(Action.START_FETCH_THREAD_LIST, resolve => (
  () => resolve()
));

export const fetchedThreadList = createAction(Action.FETCHED_THREAD_LIST, resolve => (
  (threads: Thread[]) => resolve(threads)
));

export const startFetchThread = createAction(Action.START_FETCH_THREAD, resolve => (
  () => resolve()
));

export const finishFetchThread = createAction(Action.FINISH_FETCH_THRAED, resolve => (
  (thread: Thread) => resolve(thread)
));

export const fetchThreadList = () => async (dispatch: Dispatch) => {
  dispatch(startFetchThreadList());
  const threads = await repository.thread.getList();
  dispatch(fetchedThreadList(threads));
};

export const fetchThread = (id: string) => async (dispatch: Dispatch) => {
  dispatch(startFetchThread());
  const thread = await repository.thread.getById(id);
  dispatch(finishFetchThread(thread));
};

interface StateType {
  threads: Thread[];
  isFetchingList: boolean;
  isFetching: boolean;
}

const defaultState: StateType = {
  threads: [],
  isFetchingList: false,
  isFetching: false
};

type ActionTypes = ActionType<
  typeof startFetchThreadList |
  typeof fetchedThreadList |
  typeof startFetchThread |
  typeof finishFetchThread
>;

export default (state: StateType = defaultState, action: ActionTypes) => {
  switch(action.type) {
    case Action.START_FETCH_THREAD_LIST:
      return {
        ...state,
        threads: [],
        isFetchingList: true
      };

    case Action.FETCHED_THREAD_LIST:
      return {
        ...state,
        threads: action.payload,
        isFetchingList: false
      };

    case Action.START_FETCH_THREAD:
      return {
        ...state,
        isFetching: true
      };

    case Action.FINISH_FETCH_THRAED:
      return {
        ...state,
        isFetching: false,
        threads: [action.payload]
      };

    default:
      return state;
  }
};
