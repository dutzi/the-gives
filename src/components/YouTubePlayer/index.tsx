import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import counterSlice from './reducers';
import { useTypedSelector } from '../../state/store';

let youtubeIframeAPIReady = false;

(window as any).onPlayerReady = (e: any) => {
  console.log('youtube ready');
};

(window as any).onYouTubeIframeAPIReady = (e: any) => {
  console.log('sss');
  youtubeIframeAPIReady = true;
};

export default ({ videoId }: { videoId?: string }) => {
  // const dispatch = useDispatch();
  // const counter = useTypedSelector((state) => state.counter);
  const [isPlayerReady, setIsPlayerReady] = useState(youtubeIframeAPIReady);
  const [player, setPlayer] = useState<YT.Player>();

  useEffect(() => {
    if (!youtubeIframeAPIReady) {
      // throw new Error('Player not ready');
      (window as any).onYouTubeIframeAPIReady = (e: any) => {
        setIsPlayerReady(true);
      };
    }
  }, []);

  useEffect(() => {
    if (!isPlayerReady) {
      return;
    }

    if (!videoId) {
      return;
    }

    let player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        onReady: (window as any).onPlayerReady,
        // onStateChange: onPlayerStateChange,
      },
    });

    setPlayer(player);
  }, [isPlayerReady, videoId]);

  if (!isPlayerReady) {
    return null;
  }

  return <div id="player"></div>;
};
