import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export default ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().signInAnonymously();

    firebase.auth().onAuthStateChanged((authState) => {
      if (authState?.uid) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};
