import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { createThread, updateTitle } from 'src/module/thread';
import { RootState } from 'src/store';

interface PropTypes {
  user: firebase.User;
  isCreating: boolean;
  title: string;

  create: (title: string, uid: string) => any;
  updateTitle: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const ThreadForm: React.SFC<PropTypes> = (props) => {
  const onSubmitHandler = () => {
    if (confirm(`スレッド「${props.title}」を作成します。よろしいですか?`)) {
      props.create(props.title, props.user.uid);
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Field>
        <input
          placeholder='スレッド名'
          name="title"
          onChange={props.updateTitle}
          value={props.title}
          disabled={props.isCreating}
        />
      </Form.Field>
      <div style={{textAlign: 'right'}}>
        <Button
          primary={true}
          disabled={props.isCreating || props.title.length === 0}
          loading={props.isCreating}
        >作成</Button>
      </div>
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isCreating: state.thread.isCreating,
  title: state.thread.title
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (title: string, uid: string) => dispatch(createThread(title, uid)),
  updateTitle: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateTitle(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadForm);
