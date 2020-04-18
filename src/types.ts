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
}

export interface IRoomParams {
  roomId: string;
}
