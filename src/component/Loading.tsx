import * as React from 'react';
import { Loader, Segment } from 'semantic-ui-react';

const Loading = () => {
  return (
    <Segment placeholder='true'>
      <Loader>Loading</Loader>
    </Segment>
  );
};

export default Loading;
