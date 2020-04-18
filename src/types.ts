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
}
