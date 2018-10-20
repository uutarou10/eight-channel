import * as React from 'react';
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import Thread from '../model/thread';

interface PropTypes {
  threads: Thread[];
}

const ThreadList: React.SFC<PropTypes> = ({ threads }) => {
  return (
    <React.Fragment>
      {threads.map(thread => <ThreadItem key={thread.id} thread={thread} />)}
    </React.Fragment>
  );
};

interface ThreadItemPropTypes {
  thread: Thread;
}

const ThreadItem: React.SFC<ThreadItemPropTypes> = ({ thread }) => {
  return (
    <Segment>
      <Link to={`/threads/${thread.id}`}>
        <h3>
          {thread.title}
        </h3>
      </Link>
    </Segment>
  );
};

export default ThreadList;
