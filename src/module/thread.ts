import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';
import Thread from '../model/thread';
import repository from '../repository';

enum Action {
  START_FETCH_THREAD_LIST = 'START_FETCH_THREAD_LIST',
  FETCHED_THREAD_LIST = 'FETCHED_THREAD_LIST',
  START_FETCH_THREAD = 'START_FETCH_THREAD',
  FINISH_FETCH_THRAED = 'FINISH_FETCH_THREAD',
  START_CREATE_THREAD = 'START_CREATE_THREAD',
  FINISH_CREATE_THREAD = 'FINISH_CREATE_THREAD',
  UPDATE_TITLE = 'UPDATE_TITLE'
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

export const startCreateThread = createAction(Action.START_CREATE_THREAD, resolve => (
  () => resolve()
));

export const finishCreateThread = createAction(Action.FINISH_CREATE_THREAD, resolve => (
  (thread: Thread) => resolve(thread)
));

export const updateTitle = createAction(Action.UPDATE_TITLE, resolve => (
  (title: string) => resolve(title)
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

export const createThread = (title: string, uid: string) => async (dispatch: Dispatch) => {
  dispatch(startCreateThread());
  const thread = await repository.thread.create(title, uid);
  dispatch(finishCreateThread(thread));
  dispatch(push(`/threads/${thread.id}`));
};

interface StateType {
  threads: Thread[];
  isFetchingList: boolean;
  isFetching: boolean;
  isCreating: boolean;
  title: string;
}

const defaultState: StateType = {
  threads: [],
  isFetchingList: false,
  isFetching: false,
  isCreating: false,
  title: ''
};

type ActionTypes = ActionType<
  typeof startFetchThreadList |
  typeof fetchedThreadList |
  typeof startFetchThread |
  typeof finishFetchThread |
  typeof startCreateThread |
  typeof finishCreateThread |
  typeof updateTitle
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

    case Action.START_CREATE_THREAD:
      return {
        ...state,
        isCreating: true
      };

    case Action.FINISH_CREATE_THREAD:
      return {
        ...state,
        isCreating: false,
        threads: [...state.threads, action.payload],
        title: ''
      };

    case Action.UPDATE_TITLE:
      return {
        ...state,
        title: action.payload
      };

    default:
      return state;
  }
};
