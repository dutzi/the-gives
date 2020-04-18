import firebase from 'firebase/app';

export function getCurrentUserUID() {
  if (!firebase.auth().currentUser) {
    throw new Error('user logged out');
  }

  return firebase.auth().currentUser!.uid;
}
