import firebase from 'firebase/app';

export function getCurrentUserUID() {
  if (!firebase.auth().currentUser) {
    throw new Error('user logged out');
  }

  return firebase.auth().currentUser!.uid;
}

export function showAdminTools() {
  return localStorage.getItem('showAdminTools') === 'true';
}

export function isMobile() {
  return window.innerWidth <= 576;
}

export function isYouTubeLink(value: string) {
  return (
    value.indexOf('youtube.com') !== -1 || value.indexOf('youtu.be') !== -1
  );
}

export function getYouTubeVideoId(url: string) {
  let match = url.match(/^https:\/\/youtu.be\/(.*)$/);
  if (!match) {
    match = url.match(/^.*watch\?v=(.*)$/);
    if (!match) {
      return;
    }
  }
  return match[1];
}
