import { Dispatch } from 'redux';
import Post from 'src/model/post';
import { ActionType, createAction } from 'typesafe-actions';
import repository from '../repository';

enum Action {
  START_FETCH_POST_LIST = 'START_FETCH_POST_LIST',
  FINISH_FETCH_POST_LIST = 'FINISH_FETCH_POST_LIST',
  START_CREATE_POST = 'START_CREATE_POST',
  FINISH_CREATE_POST = 'FINISH_CREATE_POST',
  UPDATE_NAME = 'UPDATE_NAME',
  UPDATE_BODY = 'UPDATE_BODY'
}

export const startFetchPostList = createAction(Action.START_FETCH_POST_LIST, resolve => (
  () => resolve()
));

export const finishFetchPostList = createAction(Action.FINISH_FETCH_POST_LIST, resolve => (
  (posts: Post[]) => resolve(posts)
));

export const startCreatePost = createAction(Action.START_CREATE_POST, resolve => (
  () => resolve()
));

export const finishCreatePost = createAction(Action.FINISH_CREATE_POST, resolve => (
  (post: Post) => resolve(post)
));

export const updateName = createAction(Action.UPDATE_NAME, resolve => (
  (name: string) => resolve(name)
));

export const updateBody = createAction(Action.UPDATE_BODY, resolve => (
  (body: string) => resolve(body)
));

export const fetchPostList = (threadId: string) => async (dispatch: Dispatch) => {
  dispatch(startFetchPostList());
  // TODO: 例外処理
  const posts = await repository.post.getListByThreadId(threadId);
  dispatch(finishFetchPostList(posts));
};

export const createPost = (
  threadId: string,
  name: string,
  body: string,
  uid: string
) => async (dispatch: Dispatch) => {
  dispatch(startCreatePost());
  const post = await repository.post.create(threadId, name, body, uid);
  dispatch(finishCreatePost(post));
};

interface StateType {
  posts: Post[];
  isFetching: boolean;
  isCreating: boolean;
  name: string;
  body: string;
}

const defaultState: StateType = {
  posts: [],
  isFetching: false,
  isCreating: false,
  name: '名無しさん',
  body: ''
};

type ActionTypes = ActionType<
  typeof startFetchPostList |
  typeof finishFetchPostList |
  typeof startCreatePost |
  typeof finishCreatePost |
  typeof updateName |
  typeof updateBody
>;

export default (state: StateType = defaultState, action: ActionTypes) => {
  switch (action.type) {
    case Action.START_FETCH_POST_LIST:
      return {
        ...state,
        isFetching: true
      };

    case Action.FINISH_FETCH_POST_LIST:
      return {
        ...state,
        isFetching: false,
        posts: action.payload
      };

    case Action.START_CREATE_POST:
      return {
        ...state,
        isCreating: true
      };

    case Action.FINISH_CREATE_POST:
      return {
        ...state,
        isCreating: false,
        posts: [...state.posts, action.payload],
        body: ''
      };

    case Action.UPDATE_NAME:
      return {
        ...state,
        name: action.payload
      };

    case Action.UPDATE_BODY:
      return {
        ...state,
        body: action.payload
      };

    default:
      return state;
  }
};
