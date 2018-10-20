import * as React from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import Post from 'src/model/post';

const PostList: React.SFC<{ posts: Post[]}> = ({ posts }) => {
  return (
    <div>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </div>
  );
};

const PostItem: React.SFC<{ post: Post }> = ({ post }) => {
  return (
    <Segment>
      <p>
        名前 {post.name}
        <small>{post.createdAt.toDateString()} {post.createdAt.toLocaleTimeString()}</small>
      </p>
      <Divider />
      <p>{post.body}</p>
    </Segment>
  );
};

export default PostList;
