import { IVideo } from '../types';
import { roomColRef } from '../firestore-refs';
import { getCurrentUserUID } from '../utils';

export default async function (video: IVideo) {
  return await roomColRef().add({
    video,
    platform: 'youtube',
    remoteOwner: getCurrentUserUID(),
    host: getCurrentUserUID(),
    date: new Date().toISOString(),
  });
}
