import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Post from 'src/model/post';
import { fetchPostList } from 'src/module/post';
import { fetchThread } from 'src/module/thread';
import { RootState } from 'src/store';
import styled from 'styled-components';
import ThreadModel from '../model/thread';
import PostForm from './PostForm';
import PostList from './PostList';

interface PropTypes extends RouteComponentProps<{threadId: string}> {
  posts: Post[];
  threads: ThreadModel[];
  isFetchingPost: boolean;
  isFetchingThread: boolean;

  fetchPostList: (threadId: string) => any;
  fetchThread: (threadId: string) => any;
}

const StyledWrapper = styled.div`
  h2 {
    text-align: center;
  }
`;

class Thread extends React.Component<PropTypes> {
  public componentDidMount() {
    const threadId = this.props.match.params.threadId;
    this.props.fetchPostList(threadId);

    if (!this.currentThread()) {
      this.props.fetchThread(threadId);
    }
  }

  public render() {
    const {
      posts,
      isFetchingPost,
      isFetchingThread,
      threads,
      match
    } = this.props;

    const currentThread = threads.find(t => t.id === match.params.threadId);

    if (!isFetchingThread && !currentThread) {
      return (
        <p>Not found...</p>
      );
    }

    if (isFetchingPost || !currentThread) {
      return (
        <p>Now loading...</p>
      );
    }

    return (
      <StyledWrapper>
        <h2>{currentThread.title}</h2>
        <PostList posts={posts} />
        <hr />
        <PostForm threadId={match.params.threadId} />
      </StyledWrapper>
    );
  }

  private currentThread = () => {
    const threadId = this.props.match.params.threadId;
    return this.props.threads.find(thread => thread.id === threadId);
  }
}

const mapStateToProps = (state: RootState) => ({
  posts: state.post.posts,
  threads: state.thread.threads,
  isFetchingPost: state.post.isFetching,
  isFetchingThread: state.thread.isFetching
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchPostList: (threadId: string) => dispatch(fetchPostList(threadId)),
  fetchThread: (threadId: string) => dispatch(fetchThread(threadId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
