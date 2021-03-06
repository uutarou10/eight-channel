import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { createPost, updateBody, updateName } from 'src/module/post';
import { RootState } from 'src/store';
import { signInWithGoogle } from 'src/util/firebase';

interface PropTypes {
  threadId: string;
  isCreating: boolean;
  name: string;
  body: string;
  user: firebase.User | null;

  create: (
    threadId: string,
    name: string,
    body: string,
    uid: string
  ) => any;
  updateName: (e: React.ChangeEvent<HTMLInputElement>) => any;
  updateBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
}

const PostForm: React.SFC<PropTypes> = (props) => {
  const onSubmitHandler = () => {
    props.create(
      props.threadId,
      props.name,
      props.body,
      (props.user as firebase.User).uid
    );
  };

  if (!props.user) {
    return (
      <Segment placeholder="true" textAlign="center">
        <Header icon={true}>
          <Icon name='key' />
          投稿するにはログインが必要です。
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
    );
  }

  return (
    <Form>
      <Form.Field>
        <label>名前</label>
        <input
          type="text"
          onChange={props.updateName}
          value={props.name}
          disabled={props.isCreating}
        />
      </Form.Field>

      <Form.Field>
        <label>本文</label>
        <textarea
          onChange={props.updateBody}
          value={props.body}
          disabled={props.isCreating}
        />
      </Form.Field>

      <Button
        onClick={onSubmitHandler}
        disabled={props.isCreating}
        loading={props.isCreating}
      >投稿</Button>
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  isCreating: state.post.isCreating,
  name: state.post.name,
  body: state.post.body,
  user: state.auth.user
});

const mapDispatchToPorps = (dispatch: any) => ({
  create: (
    threadId: string,
    name: string,
    body: string,
    uid: string
  ) => dispatch(createPost(threadId, name, body, uid)),
  updateName: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateName(event.target.value)),
  updateBody: (event: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(updateBody(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToPorps)(PostForm);
