import firebase from 'firebase/app';
import { IRoom, IPlaybackState } from './types';

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

export function playbackStateDocRef(roomId: string) {
  return firebase
    .firestore()
    .doc(`/playback-states/${roomId}`) as firebase.firestore.DocumentReference<
    IPlaybackState
  >;
}

export function playSbacktateColRef() {
  return firebase
    .firestore()
    .collection('/playback-states') as firebase.firestore.CollectionReference<
    IPlaybackState
  >;
}
