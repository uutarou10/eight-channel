import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { createPost, updateBody, updateName } from 'src/module/post';
import { RootState } from 'src/store';

interface PropTypes {
  threadId: string;
  isCreating: boolean;
  name: string;
  body: string;

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
      'uid'
    );
  };


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
  body: state.post.body
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
