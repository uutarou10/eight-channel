import Thread from '../model/thread';
import { db } from '../util/firebase';

export default {
  getList: async () => {
    const querySnapshot = await db.collection('threads').get();

    const result: Thread[] = [];
    querySnapshot.forEach(thread => {
      result.push(createThreadByDocumentSnapshot(thread));
    });

    return result;
  },

  getById: async (id: string) => {
    const documentSnapshot = await db.collection('threads').doc(id).get();
    return createThreadByDocumentSnapshot(documentSnapshot);
  }
};

const createThreadByDocumentSnapshot = (snapShot: firebase.firestore.DocumentSnapshot): Thread => {
  // TODO: なんとかする
  const data = snapShot.data() as firebase.firestore.DocumentData;
  return {
    id: snapShot.id,
    title: data.title,
    uid: data.uid,
    createdAt: data.createdAt.toDate()
  };
};
