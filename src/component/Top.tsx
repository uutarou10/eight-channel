import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Segment } from 'semantic-ui-react';
import Thread from 'src/model/thread';
import { fetchThreadList } from 'src/module/thread';
import { RootState } from 'src/store';
import { signInWithGoogle } from 'src/util/firebase';
import styled from 'styled-components';
import ThreadForm from './ThreadForm';
import ThreadList from './ThreadList';

interface PropTypes {
  threads: Thread[];
  isFetching: boolean;
  user: firebase.User | null;

  fetch: () => any;
}

const StyledWrapper = styled.div`
  h2 {
    text-align: center;
  }
`;

class Top extends React.Component<PropTypes> {
  public componentDidMount() {
    this.props.fetch();
  }

  public render() {
    const {
      threads,
      isFetching,
      user
    } = this.props;

    return (
      <StyledWrapper>
        <h2>スレッド作成</h2>
        { user ? (
          <ThreadForm />
        ) : (
          <Segment placeholder="true" textAlign="center">
            <Header>
              スレッドを作成するにはログインが必要です。
          </Header>
            <Button
              primary={true}
              style={{
                display: 'block',
                margin: 'auto'
              }}
              onClick={signInWithGoogle}
            >Login with Google</Button>
          </Segment>
        )}
        <h2>スレッド一覧</h2>
        {isFetching ? (
          undefined
        ) : (<ThreadList threads={threads} />)}
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  threads: state.thread.threads,
  isFetching: state.thread.isFetchingList,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch: any) => ({
  fetch: () => dispatch(fetchThreadList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Top);
