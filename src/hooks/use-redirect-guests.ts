import { useTransitionHistory } from 'react-route-transition';
import { useEffect } from 'react';
import firebase from 'firebase/app';

export default function () {
  const history = useTransitionHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user?.uid) {
        history.push('/');
      }
    });
  }, [history]);
}
