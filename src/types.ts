export interface IVideo {
  id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

export type TPlatform = 'youtube' | 'vimeo' | 'redtube';

export interface IRoom {
  video: IVideo;
  platform: TPlatform;
  offer?: {
    type?: 'answer' | 'offer' | 'pranswer' | 'rollback';
    sdp?: string;
  };
  answer?: any; // Todo: type
  remoteOwner: string;
  host: string;
  date: string;
}

export interface IPlaybackState {
  isPlaying: boolean;
  currentTime: number;
}

export interface IRoomParams {
  roomId: string;
}
