import firebase from 'firebase/app';
import { IRoom } from './types';

export function roomDocRef(roomId: string) {
  return firebase
    .firestore()
    .doc(`/rooms/${roomId}`) as firebase.firestore.DocumentReference<IRoom>;
}

export function roomColRef() {
  return firebase
    .firestore()
    .collection('/rooms') as firebase.firestore.CollectionReference<IRoom>;
}
