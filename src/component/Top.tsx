import * as React from 'react';
import { connect } from 'react-redux';
import Thread from 'src/model/thread';
import { fetchThreadList } from 'src/module/thread';
import { RootState } from 'src/store';
import styled from 'styled-components';
import ThreadList from './ThreadList';

interface PropTypes {
  threads: Thread[];
  isFetching: boolean;

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
      isFetching
    } = this.props;

    return (
      <StyledWrapper>
        <h2>スレッド一覧</h2>
        {isFetching ? (
          <p>Now loading...</p>
        ) : (<ThreadList threads={threads} />)}
      </StyledWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  threads: state.thread.threads,
  isFetching: state.thread.isFetchingList
});

const mapDispatchToProps = (dispatch: any) => ({
  fetch: () => dispatch(fetchThreadList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Top);
