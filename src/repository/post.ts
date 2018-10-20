import * as firebase from 'firebase/app';
import Post from '../model/post';
import { db } from '../util/firebase';

export default {
  getListByThreadId: async (threadId: string): Promise<Post[]> => {
    const threadRef = db.collection('threads').doc(threadId);
    const threadSnapshot = await threadRef.get();

    if (threadSnapshot.exists) {
      const result: Post[] = [];
      const postsSnapshot = await threadRef.collection('posts').orderBy('createdAt').get();
      postsSnapshot.forEach(post => {
        result.push(createPostByDocumentSnapshot(post));
      });

      return result;
    } else {
      throw new Error('Thread not found.');
    }
  },

  create: async (
    threadId: string,
    name: string,
    body: string,
    uid: string
  ): Promise<Post> => {
    const postsRef = db.collection('threads').doc(threadId).collection('posts');
    const docRef = await postsRef.add({
      name,
      body,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return createPostByDocumentSnapshot(await docRef.get());
  }
};

const createPostByDocumentSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): Post => {
  const data = snapshot.data() as firebase.firestore.DocumentData;
  return {
    id: snapshot.id,
    name: data.name,
    body: data.body,
    uid: data.uid,
    createdAt: data.createdAt.toDate()
  };
};
